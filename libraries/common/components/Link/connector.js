import { connect } from 'react-redux';
import { navigate } from '../../action-creators/router';

/**
 * Maps action dispatchers to the component props.
 * @param {function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  navigate: (action, href, state) => dispatch(navigate(action, href, state)),
});

export default connect(null, mapDispatchToProps);