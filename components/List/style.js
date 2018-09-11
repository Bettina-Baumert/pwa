import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

export const IMAGE_SPACE = 72;

const item = css({
  marginLeft: variables.gap.big,
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
