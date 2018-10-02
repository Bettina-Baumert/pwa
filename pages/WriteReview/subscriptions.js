import { historyPop } from '@shopgate/pwa-common/actions/router';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import { userDidLogout$ } from '@shopgate/pwa-common/streams/user';
import {
  requestReviewSubmit$,
  responseReviewSubmit$,
  successReviewSubmit$,
} from '@shopgate/pwa-common-commerce/reviews/streams';
import getCurrentRoute from '@virtuous/conductor-helpers/getCurrentRoute';
import { ProgressBar } from '@shopgate/pwa-ui-shared';
import getUserReview from '@shopgate/pwa-common-commerce/reviews/actions/getUserReview';
import flushUserReview from '@shopgate/pwa-common-commerce/reviews/actions/flushUserReview';
import ToastProvider from '@shopgate/pwa-common/providers/toast';
import { productRoutesWillEnter$ } from './streams';

/**
 * @param {Function} subscribe The subscribe function.
 */
export default function writeReview(subscribe) {
  /**
   * Gets triggered when item, reviews or write_reviews route will be entered.
   */
  subscribe(productRoutesWillEnter$, ({ action, dispatch, getState }) => {
    const state = getState();
    const { productId } = action.route.params;

    if (!productId || !state.user.login.isLoggedIn) {
      return;
    }

    dispatch(getUserReview(hex2bin(productId)));
  });

  /**
   * Get triggered when a review submit is requested.
   */
  subscribe(requestReviewSubmit$, () => {
    const { pattern } = getCurrentRoute();
    ProgressBar.show(pattern);
  });

  /**
   * Get triggered when a review submitted got a response.
   */
  subscribe(responseReviewSubmit$, () => {
    const { pattern } = getCurrentRoute();
    ProgressBar.hide(pattern);
  });

  /**
   * Get triggered when a review was successfully submitted
   */
  subscribe(successReviewSubmit$, ({ dispatch, events }) => {
    dispatch(historyPop());
    events.emit(ToastProvider.ADD, {
      id: 'reviews.success_message',
      message: 'reviews.success_message',
    });
  });
  /**
   * When user is logged out reviews relation should be removed.
   */
  subscribe(userDidLogout$, ({ dispatch }) => dispatch(flushUserReview()));
}
