import {
  event,
  emitter as errorEmitter,
  registerEvents,
  closeInAppBrowser,
  hideSplashScreen,
} from '@shopgate/pwa-core';
import { SOURCE_APP, SOURCE_PIPELINE } from '@shopgate/pwa-core/classes/ErrorManager/constants';
import { MODAL_PIPELINE_ERROR } from '@shopgate/pwa-common/constants/ModalTypes';
import pipelineManager from '@shopgate/pwa-core/classes/PipelineManager';
import * as errorCodes from '@shopgate/pwa-core/constants/Pipeline';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import * as events from '@virtuous/conductor-events';
import { appError, pipelineError } from '../action-creators';
import {
  historyPush,
  routeWillPush,
  routeDidPush,
  routeWillPop,
  routeDidPop,
  routeWillReplace,
  routeDidReplace,
  routeWillReset,
  routeDidReset,
} from '../actions/router';
import { appDidStart$, appWillStart$, pipelineError$ } from '../streams';
import registerLinkEvents from '../actions/app/registerLinkEvents';
import showModal from '../actions/modal/showModal';
import { isAndroid } from '../selectors/client';
import {
  updateNavigationBarNone,
  showPreviousTab,
  pageContext,
} from '../helpers/legacy';

/**
 * App subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function app(subscribe) {
  // Gets triggered before the app starts.
  subscribe(appWillStart$, ({ dispatch, action }) => {
    dispatch(registerLinkEvents(action.location));

    events.onWillPush(id => dispatch(routeWillPush(id)));
    events.onDidPush(id => dispatch(routeDidPush(id)));
    events.onWillPop(() => dispatch(routeWillPop()));
    events.onDidPop(() => dispatch(routeDidPop()));
    events.onWillReplace(id => dispatch(routeWillReplace(id)));
    events.onDidReplace(id => dispatch(routeDidReplace(id)));
    events.onWillReset(id => dispatch(routeWillReset(id)));
    events.onDidReset(id => dispatch(routeDidReset(id)));

    // Suppress errors globally
    pipelineManager.addSuppressedErrors([
      errorCodes.EACCESS,
      errorCodes.E999,
      errorCodes.ENOTFOUND,
    ]);

    // Map the error events into the Observable streams.
    errorEmitter.addListener(SOURCE_APP, error => dispatch(appError(error)));
    errorEmitter.addListener(SOURCE_PIPELINE, error => dispatch(pipelineError(error)));
  });

  /**
   * Gets triggered when the app starts.
   */
  subscribe(appDidStart$, ({ action, dispatch, getState }) => {
    // Register for custom events
    registerEvents([
      'showPreviousTab',
      'closeInAppBrowser',
      // TODO The iOS apps don't emit the event to the webviews without registration till Lib 15.2.
      // This needs to be removed, when IOS-1886 is done and the the iOS apps are updated.
      'httpResponse',
    ]);

    // Add event callbacks
    event.addCallback('pageContext', pageContext);
    // Handle native/legacy navigation bar
    event.addCallback('viewWillAppear', updateNavigationBarNone);
    event.addCallback('showPreviousTab', showPreviousTab);
    /**
     * This event is triggered form the desktop shop in the inAppBrowser.
     * We have to close the inAppBrowser and redirect the user to the given url.
     */
    event.addCallback('closeInAppBrowser', (data = {}) => {
      if (data.redirectTo) {
        dispatch(historyPush({
          pathname: data.redirectTo,
        }));
      }

      closeInAppBrowser(isAndroid(getState()));
    });

    /**
     * The following events are sometimes sent by the app, but don't need to be handled right now.
     * To avoid console warnings from the event system, empty handlers are registered here.
     */
    event.addCallback('viewDidAppear', () => {});
    event.addCallback('viewWillDisappear', () => {});
    event.addCallback('viewDidDisappear', () => {});
    event.addCallback('pageInsetsChanged', () => {});

    if (action.location !== INDEX_PATH) {
      dispatch(historyPush({
        pathname: INDEX_PATH,
        silent: true,
      }));
    }

    dispatch(historyPush({
      pathname: action.location,
    }));
    /*
     * Hide splashscreen must be send AFTER app did start.
     * Interjections events (like openPushMessage) would not work if this command is sent
     * before registering to interjections.
     */
    hideSplashScreen();
  });

  subscribe(pipelineError$, ({ dispatch, action }) => {
    const { error } = action;
    const {
      message, code, context, meta,
    } = error;

    dispatch(showModal({
      confirm: 'modal.ok',
      dismiss: null,
      title: null,
      message,
      type: MODAL_PIPELINE_ERROR,
      params: {
        pipeline: context,
        request: meta.input,
        message: meta.message,
        code,
      },
    }));
  });
}
