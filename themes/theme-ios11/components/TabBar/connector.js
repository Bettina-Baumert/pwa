import { connect } from 'react-redux';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { getCurrentPattern } from '@shopgate/pwa-common/selectors/router';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  routePattern: getCurrentPattern(state),
});

const mapDispatchToProps = {
  historyPush: pathname => historyPush({ pathname }),
};

export default connect(mapStateToProps, mapDispatchToProps);

