/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { generateResultHash, shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import { getSortOrder } from '@shopgate/pwa-common/selectors/history';
import { isNumber } from '@shopgate/pwa-common/helpers/validation';
import requestProducts from '../action-creators/requestProducts';
import receiveProducts from '../action-creators/receiveProducts';
import errorProducts from '../action-creators/errorProducts';
import { getActiveFilters } from '../../filter/selectors';

/**
 * Process the pipeline params to be compatible.
 * Currently the categoryId field cannot be used in combination with the filter field. In order to
 * use them together the categoryId field has to be extracted into the filter field.
 * Then the pipeline is happy.
 * @param {Object} params The request params.
 * @param {Object} filters The current active filters.
 * @param {boolean} includeSort Tells if the sort parameters shall be included to the request.
 * @param {boolean} includeFilters Tells if the filter parameters shall be included to the request.
 * @returns {Object} A set of compatible params.
 */
const processParams = (params, filters, includeSort = true, includeFilters = true) => {
  const newParams = {
    ...params,
    ...(includeFilters && filters && Object.keys(filters).length) && { filters },
  };

  /**
   * Check if the sort parameter should be included in the request parameters,
   * and remove it if necessary.
   */
  if (includeSort === false && params && params.sort) {
    delete newParams.sort;
  }

  return newParams;
};

/**
 * Retrieves a product from the Redux store.
 * @param {Object} options The options for the getProducts request.
 * @param {Object} options.params The params for the getProduct pipeline.
 * @param {string} [options.pipeline='getProducts'] The pipeline to call.
 * @param {boolean} [options.cached=true] If the result will be cached.
 * @param {string} [options.id=null] A unique id for the component that is using this action.
 * @param {boolean} [options.includeSort=true] Tells if the sort parameters shall be included
 *   into the product hash and the request.
 * @param {boolean} [options.includeFilters=true] Tells if the filter parameters shall be included
 *   into the product hash and the request.
 * @param {Function} [options.onBeforeDispatch=() => {}] A callback which is fired, before new data
 *  will be returned.
 * @return {Function} A Redux Thunk
 */
const getProducts = ({
  params = {},
  pipeline = 'getProducts',
  cached = true,
  id = null,
  includeSort = true,
  includeFilters = true,
  onBeforeDispatch = () => {},
}) =>
  (dispatch, getState) => {
    const state = getState();
    const { offset, limit, ...hashParams } = params;

    const sort = getSortOrder(state);
    const filters = getActiveFilters(state);

    // We need to process the params to handle edge cases in the pipeline params.
    const requestParams = processParams(params, filters, includeSort, includeFilters);

    const hash = generateResultHash({
      pipeline,
      sort,
      ...hashParams,
      ...filters && { filters },
      ...id && { id },
    }, includeSort, includeFilters);

    const result = state.product.resultsByHash[hash];
    let requiredProductCount = null;

    // Only set a required number of products if both offset and limit are valid.
    if (isNumber(offset) && isNumber(limit)) {
      requiredProductCount = offset + limit;
    }

    // Stop if we don't need to get any data.
    if (!shouldFetchData(result, 'products', requiredProductCount)) {
      const { products } = result;

      if (Array.isArray(products)) {
        // Fire the onBeforeDispatch callback to inform a caller that getProducts will return data.
        onBeforeDispatch();
        return Promise.resolve(result);
      }

      return null;
    }

    // Fire the onBeforeDispatch callback to inform a caller that getProducts will return data.
    onBeforeDispatch();

    dispatch(requestProducts({
      hash,
      requestParams,
    }));

    return new PipelineRequest(pipeline)
      .setInput(requestParams)
      .dispatch()
      .then((response) => {
        let totalResultCount = response.totalProductCount;

        /**
         * When the next check was written, getHighlightProducts and getLiveshoppingProducts
         * didn't deliver a totalProductCount within their responses - they simply returned all
         * available products.
         * So we set the products count of the response as totalProductCount to decrease the
         * amount of logic, which is necessary to deal with product related pipelines.
         */
        if (
          typeof totalResultCount === 'undefined' &&
          (pipeline === 'getHighlightProducts' || pipeline === 'getLiveshoppingProducts')
        ) {
          totalResultCount = response.products.length;
        }

        dispatch(receiveProducts({
          hash,
          requestParams,
          products: response.products,
          totalResultCount,
          cached,
        }));

        return response;
      })
      .catch((error) => {
        logger.error(error);
        dispatch(errorProducts({
          hash,
          requestParams,
        }));

        return error;
      });
  };

export default getProducts;
