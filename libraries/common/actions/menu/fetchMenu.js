import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import * as pipelines from '../../constants/Pipelines';
import {
  requestMenu,
  receiveMenu,
  errorMenu,
} from '../../action-creators/menu';

/**
 * Get the custom service menu entries.
 * @param {string} id The menu id.
 * @return {Function} A redux thunk.
 */
const fetchMenu = id => (dispatch) => {
  dispatch(requestMenu(id));

  new PipelineRequest(pipelines.SHOPGATE_CMS_GET_MENU)
    .setInput({ id })
    .dispatch()
    .then((response) => {
      dispatch(receiveMenu(id, response.entries));
    })
    .catch((error) => {
      logger.error(error);
      dispatch(errorMenu(id));
    });
};

export default fetchMenu;
