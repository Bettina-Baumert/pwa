import { historyPush } from '@shopgate/pwa-common/actions/router';
import { CATEGORY_PATH } from '@shopgate/pwa-common-commerce/category/constants';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import getCurrentRoute from '@virtuous/conductor-helpers/getCurrentRoute';

/**
 * Opens the filter route with the relevant url.
 * @param {Object} props The component props.
 * @returns {Function} A redux thunk.
 */
const openFilterRoute = () => (dispatch) => {
  const {
    id,
    params: { categoryId },
    query,
    state,
  } = getCurrentRoute();

  const forwardState = {
    filters: state.filters || null,
    parentId: id,
  };

  if (categoryId) {
    dispatch(historyPush({
      pathname: `${CATEGORY_PATH}/${categoryId}/filter`,
      state: forwardState,
    }));
  } else if (query.s) {
    dispatch(historyPush({
      pathname: `${SEARCH_PATH}/filter`,
      state: forwardState,
    }));
  }
};

export default openFilterRoute;
