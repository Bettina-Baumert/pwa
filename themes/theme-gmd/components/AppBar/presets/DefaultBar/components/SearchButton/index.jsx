import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { UIEvents } from '@shopgate/pwa-core';
import { AppBar } from '@shopgate/pwa-ui-material';
import { MagnifierIcon } from '@shopgate/pwa-ui-shared';
import { TOGGLE_SEARCH } from 'Components/Search/constants';
import connect from './connector';

/**
 * The SearchButton component.
 */
class SearchButton extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  handleOnClick = () => {
    UIEvents.emit(TOGGLE_SEARCH, true);
    this.props.navigate();
  }

  /**
   * @returns {JSX}
   */
  render() {
    return (
      <AppBar.Icon icon={MagnifierIcon} onClick={this.handleOnClick} testId="SearchButton" />
    );
  }
}

export default connect(SearchButton);
