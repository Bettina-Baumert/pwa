import * as Sentry from '@sentry/browser';
import { themeName, appConfig } from '../../constants/AppSettings';

/**
 * The error tracking class.
 */
class ErrorTracking {
  /**
   * @param {Object} pck The current package.json.
   * @param {Object} [sentry=Sentry] A custom sentry.io instance.
   */
  constructor(pck, sentry = Sentry) {
    this.package = pck;
    this.sentry = sentry;
  }

  /**
   *
   */
  init() {
    this.sentry.init({
      dsn: 'https://fb8a688ee2dc43a891b7fcdb3d73f9ff@sentry.io/1285271',
      environment: process.env.NODE_ENV,
      debug: (process.env.NODE_ENV === 'development'),
      release: this.package.version,
      attachStacktrace: true,
    });

    this.setupScopes();
    this.setupGlobalCatcher();
  }

  setupScopes = () => {
    this.sentry.configureScope((scope) => {
      scope.setTag('appId', appConfig.appId);
      scope.setTag('pwaVersion', this.package.version);
      scope.setTag('theme', themeName);
      scope.setTag('language', appConfig.language);
      scope.setTag('currency', appConfig.currency);
      scope.setTag('hasFavorites', appConfig.hasFavorites);
      scope.setTag('hasReviews', appConfig.hasReviews);
      scope.setTag('showWriteReview', appConfig.showWriteReview);
    });
  }

  setupGlobalCatcher = () => {
    if (!window) {
      return;
    }

    window.onerror = (message, source, lineno, colno, error) => {
      this.sentry.captureException(error);
    };
  }
}

export default ErrorTracking;
