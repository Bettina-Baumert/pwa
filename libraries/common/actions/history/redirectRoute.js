import { setRedirectLocation } from '../../action-creators/history';
import { getRedirectLocation } from '../../selectors/history';
import replaceHistory from './replaceHistory';
import goBackHistory from './goBackHistory';

/**
 * Redirects the user to the redirectLocation property within the history state and resets it
 * afterwards.
 * @returns {Function} A redux thunk.
 */
const redirectRoute = () => (dispatch, getState) => {
  const redirectLocation = getRedirectLocation(getState());

  // If there is a redirect location set, go to this page.
  if (redirectLocation) {
    /**
     * Redirect location MUST be nulled before replace history happens.
     * Otherwise syncHistory would abort.
     */
    dispatch(setRedirectLocation(null));
    dispatch(replaceHistory(redirectLocation));
  } else {
    // No further redirect set. Go back the previous page.
    dispatch(goBackHistory(1));
  }
};

export default redirectRoute;
