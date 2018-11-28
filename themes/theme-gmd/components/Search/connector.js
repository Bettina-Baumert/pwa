import { connect } from 'react-redux';
import { historyPush, historyPop } from '@shopgate/pwa-common/actions/router';
import fetchSearchSuggestions from '@shopgate/pwa-common-commerce/search/actions/fetchSearchSuggestions';

import { routeDidLeave$ } from '@shopgate/pwa-common/streams/router';
import { TOGGLE_SEARCH } from './constants';

routeDidLeave$.subscribe(({ events, action }) => {
  if (action.historyAction === 'POP') {
    events.emit(TOGGLE_SEARCH, false);
  }
});

/**
 * @param {Function} dispatch The store dispatcher.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  fetchSuggestions: query => dispatch(fetchSearchSuggestions(query)),
  navigate: pathname => dispatch(historyPush({ pathname })),
  pop: () => dispatch(historyPop()),
});

export default connect(null, mapDispatchToProps);
