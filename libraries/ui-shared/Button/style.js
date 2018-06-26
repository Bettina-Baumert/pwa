import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const buttonPadding = `${themeConfig.variables.gap.small + 1}px ${themeConfig.variables.gap.big}px ${themeConfig.variables.gap.small - 1}px`;

/**
 * Creates the button style.
 * @param {string} text The text color.
 * @param {string|null} background The fill color.
 * @return {Object} The button style.
 */
const button = (text, background) => ({
  position: 'relative',
  display: 'inline-block',
  outline: 0,
  color: text,
  backgroundColor: background,
  minWidth: 64,
  ...themeConfig.variables.buttonBase,
});

/**
 * The basic content wrapper styles.
 */
const contentWrapper = css({
  padding: buttonPadding,
}).toString();

/**
 * Creates the button styles object.
 * @param {string} textColor The text color.
 * @param {string|null} fillColor The fill color.
 * @return {Object} The styles object.
 */
const createButtonStyles = (textColor, fillColor) => {
  const buttonStyle = {
    ...button(
      textColor,
      fillColor
    ),
  };

  const contentStyle = {
    padding: buttonPadding,
    color: buttonStyle.color,
  };

  return {
    button: css(buttonStyle).toString(),
    content: css(contentStyle).toString(),
  };
};

/**
 * Creates a plain button style object without any styling.
 * @return {Object}
 */
const plain = () => ({
  button: css({
    padding: 0,
    outline: 0,
    border: 0,
    textAlign: 'left',
  }).toString(),
  content: '',
});

/**
 * The regular flat button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @return {Object} An object of style definitions.
 */
const regular = (disabled) => {
  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(themeConfig.colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(themeConfig.colors.dark, null);
};

/**
 * The primary button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @param {boolean} flat Whether this button should be rendered flat.
 * @return {Object} An object of style definitions.
 */
const primary = (disabled, flat) => {
  if (!flat) {
    if (disabled) {
      // Regular disabled button style.
      return createButtonStyles(themeConfig.colors.shade4, themeConfig.colors.shade7);
    }

    // Regular enabled button style.
    return createButtonStyles(themeConfig.colors.accentContrast, themeConfig.colors.accent);
  }

  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(themeConfig.colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(themeConfig.colors.accent, null);
};

/**
 * The secondary button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @param {boolean} flat Whether this button should be rendered flat.
 * @return {Object} An object of style definitions.
 */
const secondary = (disabled, flat) => {
  if (!flat) {
    if (disabled) {
      // Regular disabled button style.
      return createButtonStyles(themeConfig.colors.shade4, themeConfig.colors.shade7);
    }

    // Regular enabled button style.
    return createButtonStyles(themeConfig.colors.primaryContrast, themeConfig.colors.primary);
  }

  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(themeConfig.colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(themeConfig.colors.primary, null);
};

/**
 * The checkout button style.
 * @param {boolean} disabled Whether this button is disabled.
 * @param {boolean} flat Whether this button should be rendered flat.
 * @return {Object} An object of style definitions.
 */
const checkout = (disabled, flat) => {
  const useCtaColors = (themeConfig.colors.ctaPrimary && themeConfig.colors.ctaPrimaryContrast);
  const ctaPrimary = useCtaColors ? themeConfig.colors.ctaPrimary : themeConfig.colors.primary;
  const ctaPrimaryContrast = useCtaColors
    ? themeConfig.colors.ctaPrimaryContrast
    : themeConfig.colors.primary;
  if (!flat) {
    if (disabled) {
      // Regular disabled button style.
      return createButtonStyles(themeConfig.colors.shade4, themeConfig.colors.shade7);
    }

    // Regular enabled button style.
    return createButtonStyles(ctaPrimaryContrast, ctaPrimary);
  }

  if (disabled) {
    // Flat disabled button style.
    return createButtonStyles(themeConfig.colors.shade4, null);
  }

  // Flat enabled button style.
  return createButtonStyles(ctaPrimary, null);
};

export default {
  checkout,
  plain,
  regular,
  primary,
  secondary,
  contentWrapper,
};
