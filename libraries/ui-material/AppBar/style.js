import { css } from 'glamor';

const outer = css({
  left: 0,
  paddingTop: 'var(--safe-area-inset-top)',
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 2,
});

const inner = css({
  background: 'inherit',
  display: 'flex',
  position: 'relative',
  zIndex: 1,
});

export default {
  outer,
  inner,
};
