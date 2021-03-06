import { css } from 'glamor';
import colors from 'Styles/colors';

/**
 * By default the GMD theme doesn't have a tabbar. But it's conceivable that 3rd party developers
 * might want to implement one via an extension. So the code which calculates content bottom
 * paddings for example is prepared to deal with it. For now the value is initialized with 0.
 */
css.global('html', {
  '--tabbar-height': '0px',
  background: colors.light,
});

css.global('body', {
  userSelect: 'none',
});

/**
 * Updates the page inset css variables
 * @param {Object} pageInsets A page insets object
 */
export const updatePageInsets = (pageInsets) => {
  const {
    safeAreaInsetTop,
    safeAreaInsetBottom,
  } = pageInsets;

  css.global(':root', {
    '--safe-area-inset-top': `${safeAreaInsetTop}px`,
    '--safe-area-inset-bottom': `${safeAreaInsetBottom}px`,
  });
};

export default css({
  minHeight: '100vh',
  overflowX: 'hidden',
  width: '100vw',
  position: 'relative',
}).toString();
