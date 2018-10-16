import { css } from 'glamor';

const priceWrapper = css({
  lineHeight: 1.75,
  alignItems: 'center',
}).toString();

const price = css({
  fontSize: '0.95rem',
}).toString();

const basicPrice = css({
  fontSize: '0.85rem',
  marginTop: -1,
}).toString();

const strikedPrice = css({
  whiteSpace: 'nowrap',
  fontSize: '0.75rem',
}).toString();

export default {
  priceWrapper,
  price,
  basicPrice,
  strikedPrice,
};
