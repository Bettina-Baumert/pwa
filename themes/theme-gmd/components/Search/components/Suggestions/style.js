import { css } from 'glamor';
import variables from 'Styles/variables';
import colors from 'Styles/colors';

export default css({
  background: colors.background,
  bottom: 0,
  left: 0,
  overflowY: 'scroll',
  position: 'fixed',
  right: 0,
  top: `calc(${variables.navigator.height}px + var(--safe-area-inset-top))`,
});
