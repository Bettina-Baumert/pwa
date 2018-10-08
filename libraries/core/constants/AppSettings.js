/**
 * Provides a default app config as a fallback.
 * @type {Object}
 */
const defaultAppConfig = {
  appId: 'shop_30179',
  browserConnector: false,
  colors: {},
  forgotPasswordUrl: null,
  hasFavorites: false,
  hasReviews: true,
  showWriteReview: true,
  language: 'en-us',
  logo: 'https://example.com/logo',
  marketId: 'US',
  publicPath: 'https://example.com/public',
  shopName: 'Shopgate Connect',
  webCheckoutShopify: null,
  apiUrl: 'https://shop_30179.dev.connect.shopgate.com/',
  shopCNAME: null,
  currency: 'USD',
  benchmark: false,
  showGmdMenuSubHeaders: false,
};

export const themeName = process.env.THEME || 'theme';

/**
 * The app.json config from the theme.
 * @type {Object}
 */
export const appConfig = process.env.NODE_ENV !== 'test' ? process.env.APP_CONFIG : defaultAppConfig;
