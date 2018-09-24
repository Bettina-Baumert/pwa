import { appConfig } from '@shopgate/pwa-core/constants/AppSettings';
import { themeConfig as mock } from './mock';

export { themeName } from '@shopgate/pwa-core/constants/AppSettings';

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
 * The components.json config from the theme.
 * @type {Object}
 */
export const componentsConfig = {
  ...defaultComponentsConfig,
  ...process.env.COMPONENTS_CONFIG,
};

/**
 * The theme configuration.
 * @type {Object}
 */
export const themeConfig = process.env.NODE_ENV === 'test' ? mock : (process.env.THEME_CONFIG || defaultThemeConfig);

/**
 * The shop number.
 * @type {string}
 */
const { appId } = appConfig;
export const shopNumber = appId ? appId.replace('shop_', '') : '';

export default appConfig;
