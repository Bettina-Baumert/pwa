import React, { Component } from 'react';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { ViewContext } from '@shopgate/pwa-common/providers/view/context';
import { TabBar as Bar } from '@shopgate/pwa-ui-ios';
import HomeButton from './components/HomeButton';
import CartButton from './components/CartButton';
import FavoritesButton from './components/FavoritesButton';

console.log(ViewContext);

const tabBar = React.createRef();

export const DEFAULT_ICON_COLOR = '#9b9b9b';

// handle colors - need route pattern to come from correct place

/**
 * 
 */
class TabBar extends Component {

  componentDidMount() {
    this.props.setBottom(48);
  }

  render() {
    return (
      <Bar visible={true} nodeRef={tabBar}>
        <HomeButton />
        <CartButton />
        {appConfig.hasFavorites && (
          <FavoritesButton />
        )}
      </Bar>
    );
  }
}

// export default TabBar;

export default () => (
  <ViewContext.Consumer>
    {({ setBottom }) => <TabBar setBottom={setBottom} />}
  </ViewContext.Consumer>
);
