import { connect } from 'react-redux';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = (dispatch) => {
  const { pathname, state } = getCurrentRoute();
  return {
    navigate: () =>
      dispatch(historyPush({
        pathname: `${pathname}#search`,
        state,
      })),
  };
};

export default connect(null, mapDispatchToProps);
