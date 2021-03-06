import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-inline-transition-group';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import style from '../../style';

/**
 * The ripple animation component.
 */
class RippleAnimation extends Component {
  static propTypes = {
    color: PropTypes.string,
    duration: PropTypes.number,
    onComplete: PropTypes.func,
    size: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    color: themeConfig.colors.dark,
    duration: 300,
    onComplete: () => {},
    size: 48,
    x: 0,
    y: 0,
  };

  handlePhaseEnd = () => {
    this.props.onComplete();
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { duration } = this.props;

    return (
      <Transition
        childrenStyles={{
          base: {
            backgroundColor: this.props.color,
            height: this.props.size,
            width: this.props.size,
            transform: 'translate3d(-50%, -50%, 0) scale3d(0, 0, 1)',
            transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1), transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            left: this.props.x,
            top: this.props.y,
            opacity: 0.25,
          },
          appear: {
            transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
            opacity: 0,
          },
          enter: {
            transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
            opacity: 0,
          },
          leave: {},
        }}
        onPhaseEnd={this.handlePhaseEnd}
      >
        <div className={style.ripple} />
      </Transition>
    );
  }
}

export default RippleAnimation;
