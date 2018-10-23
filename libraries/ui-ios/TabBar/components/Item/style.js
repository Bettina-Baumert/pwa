import { css } from 'glamor';

export const button = css({
  alignItems: 'center',
  display: 'flex',
  flexBasis: 0,
  flexDirection: 'column',
  height: '100%',
  outline: 0,
  padding: '0 8px',
  position: 'relative',
});

export const icon = css({
  alignItems: 'center',
  display: 'flex',
  flexGrow: 1,
}).toString();

export const label = css({
  fontSize: 10,
  fontWeight: 500,
  lineHeight: 1,
  marginBottom: 4,
}).toString();
