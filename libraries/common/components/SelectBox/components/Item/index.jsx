import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';

/**
 * The SelectBoxItem component.
 * @param {Object} props The components props.
 * @returns {JSX}
 */
class SelectBoxItem extends Component {
  static propTypes = {
    handleSelectionUpdate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    wrapper: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  /**
   * Calls the handleSelectionUpdate prop and prevents further events.
   */
  handleSelectionUpdate = () => {
    this.props.handleSelectionUpdate(this.props.value);
  };

  /**
   * Renders the component
   * @returns {JSX}
   */
  render() {
    const Wrapper = this.props.wrapper;

    return (
      <button
        className={this.props.className}
        onClick={this.handleSelectionUpdate}
        data-test-id={this.props.label}
      >
        <Wrapper>
          <I18n.Text string={this.props.label} />
        </Wrapper>
      </button>
    );
  }
}

export default SelectBoxItem;
