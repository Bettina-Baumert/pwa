import { css } from 'glamor';

export default css({
  alignItems: 'center',
  bottom: 0,
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
  boxSizing: 'content-box',
  display: 'flex',
  height: 48,
  justifyContent: 'space-around',
  left: 0,
  paddingBottom: 'var(--safe-area-inset-bottom)',
  position: 'fixed',
  transition: 'transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  width: '100%',
  willChange: 'transform',
  zIndex: 10,
  ':before': {
    background: 'rgba(249, 249, 249, 0.9)',
    bottom: 0,
    backdropFilter: 'blur(20px)',
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
