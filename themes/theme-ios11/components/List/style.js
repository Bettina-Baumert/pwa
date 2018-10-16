import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

export const IMAGE_SPACE = 72;

const item = css({
  margin: `0 ${variables.gap.bigger}px`,
  boxShadow: `0 1px 0 0 ${colors.darkGray}`,
}).toString();

const itemNotLast = css({

  marginBottom: 1,
}).toString();

const itemWithImage = css({
  marginLeft: IMAGE_SPACE,
}).toString();

const innerContainer = css({
  minHeight: 56,
  position: 'relative',
}).toString();

export default {
  item,
  itemNotLast,
  itemWithImage,
  innerContainer,
};
