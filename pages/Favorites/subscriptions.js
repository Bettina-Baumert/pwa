import { FAVORITES_PATH } from '@shopgate/pwa-common-commerce/favorites/constants';
import { addFavorites } from '@shopgate/pwa-common-commerce/favorites/actions/toggleFavorites';
import { favoritesWillRemoveItem$ } from '@shopgate/pwa-common-commerce/favorites/streams';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';
import { FAVORITES_SHOW_TOAST_DELAY } from './constants';

/**
 * Favorites page subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function favorites(subscribe) {
  subscribe(favoritesWillRemoveItem$, ({ dispatch, action, getState }) => {
    if (getHistoryPathname(getState()) !== FAVORITES_PATH) {
      // No toast message when favorites is not active page.
      return;
    }
    // Animations are too fast. This should wait a little bit.
    setTimeout(() => {
      dispatch(createToast({
        action: 'common.undo',
        actionOnClick: addFavorites(action.productId, true),
        message: 'favorites.removed',
        replaceable: true,
        duration: 6000,
      }));
    }, FAVORITES_SHOW_TOAST_DELAY);
  });
}

