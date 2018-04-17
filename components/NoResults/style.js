import { css } from 'glamor';
import colors from 'Styles/colors';
import variables from 'Styles/variables';

const wrapper = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  background: colors.shade8,
}).toString();

const icon = css({
  width: 216,
  color: colors.primary,
}).toString();

const headline = css({
  fontSize: '1.25rem',
  fontWeight: 500,
  marginTop: 40,
}).toString();

const text = css({
  marginTop: variables.gap.big,
  padding: `0 ${variables.gap.big}px`,
}).toString();

export default {
  wrapper,
  icon,
  headline,
  text,
};
