import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import GridItem from './components/Item';
import style from './style';
import transition from './transition';
/**
* The TabBar component.
*/
class TabBar extends Component {
  static Item = GridItem;

  static propTypes = {
    children: PropTypes.node.isRequired,
    nodeRef: PropTypes.shape(),
    visible: PropTypes.bool,
  }

  static defaultProps = {
    nodeRef: null,
    visible: false,
  }

  /**
  * @param {Object} props The component props.
  */
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  /**
  * @param {boolean} props.visible Flag to hide/show the bar.
  */
  componentWillReceiveProps({ visible }) {
    if (this.state.visible === visible) {
      return;
    }
    this.setState({ visible });
  }

  /**
  * @param {Object} nextProps The next component props.
  * @param {Object} nextState The next component state.
  * @returns {boolean}
  */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.visible !== nextState.visible;
  }

  /**
  * @returns {JSX}
  */
  render() {
    return (
      <Transition in={this.state.visible} timeout={200}>
        {state => (
          <nav className={style} ref={this.props.nodeRef} style={transition[state]}>
            {this.props.children}
          </nav>
        )}
      </Transition>
    );
  }
}

export default TabBar;
