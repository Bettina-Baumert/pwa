import {
  REQUEST_PAGE_CONFIG,
  RECEIVE_PAGE_CONFIG,
} from '../../constants/ActionTypes';
import { persist } from '../../store/persistent';

/**
 * The current version of the state created by this reducer.
 * @type {string}
 */
const STATE_VERSION = 'v1';

/**
 * Enrich the widget data.
 * @param {Object} action The action that was received.
 * @return {Object} An enriched set of widgets.
 */
const enrichWidgets = action =>
  action.config.widgets.map((widget, index) => ({
    ...widget,
    id: `${action.pageId}-${index}-${widget.type}`,
  }));

/**
 * The page config reducer.
 * @param {Object} [state={}] The current application state.
 * @param {Object} action The action object.
 * @return {Object} The store data.
 */
const page = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PAGE_CONFIG:
      return {
        ...state,
        [action.pageId]: {
          ...state[action.pageId],
          isFetching: true,
          expires: 0,
        },
      };
    case RECEIVE_PAGE_CONFIG: {
      return {
        ...state,
        [action.pageId]: {
          title: action.config.title,
          widgets: enrichWidgets(action),
          isFetching: false,
          expires: Date.now(),
        },
      };
    }
    default:
      return state;
  }
};

export default persist('page', page, STATE_VERSION);
