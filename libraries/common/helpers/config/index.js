import { themeConfig as mock } from './mock';
/**
 * Provides a default app config as a fallback.
 * @type {Object}
 */
const defaultAppConfig = {
  appId: 'shop_30179',
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
  shopCNAME: null,
  currency: 'USD',
  showGmdMenuSubHeaders: false,
};

export const themeName = process.env.THEME || 'theme';

/**
 * Provides a default theme config as a fallback.
 * @type {Object}
 */
const defaultThemeConfig = {
  font: {},
  colors: {},
  variables: {},
};

/**
 * Provides a default components config as a fallback.
 * @type {{portals: {}, widgets: {}}}
 */
const defaultComponentsConfig = {
  portals: {},
  widgets: {},
};

/**
 * The app.json config from the theme.
 * @typedef {Object}
 */
const appConfig = process.env.NODE_ENV !== 'test' ? process.env.APP_CONFIG : defaultAppConfig;

/**
 * The components.json config from the theme.
 * @typedef {Object}
 */
export const componentsConfig = { ...defaultComponentsConfig, ...process.env.COMPONENTS_CONFIG };

/**
 * The theme configuration.
 * @typedef {Object}
 */
export const themeConfig = process.env.NODE_ENV === 'test' ? mock : (process.env.THEME_CONFIG || defaultThemeConfig);

/**
 * The shop number.
 * @typedef {string}
 */
const { appId } = appConfig;
export const shopNumber = appId ? appId.replace('shop_', '') : '';

export default appConfig;
