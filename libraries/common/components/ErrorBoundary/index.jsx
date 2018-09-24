import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

/**
 * The error boundary component.
 */
class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { hasError: false };

  /**
   * @param {Object} error The error object.
   * @param {Object} errorInfo The error information.
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  /**
   * @returns {JSX}
   */
  render() {
    if (this.state.hasError) {
      return this.props.children;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
