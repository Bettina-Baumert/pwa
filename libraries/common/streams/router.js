import { CONDUCTOR_RESET, CONDUCTOR_UPDATE } from '@virtuous/redux-conductor/constants';
import { main$ } from './main';
import {
  NAVIGATE,
  ROUTE_WILL_ENTER,
  ROUTE_DID_ENTER,
  ROUTE_WILL_LEAVE,
  ROUTE_DID_LEAVE,
} from '../constants/ActionTypes';

/**
 * @type {Observable}
 */
export const navigate$ = main$
  .filter(({ action }) => action.type === NAVIGATE);

/**
 * @type {Observable}
 */
export const routeWillEnter$ = main$
  .filter(({ action }) => action.type === ROUTE_WILL_ENTER);

/**
 * @type {Observable}
 */
export const routeDidEnter$ = main$
  .filter(({ action }) => action.type === ROUTE_DID_ENTER);

/**
 * @type {Observable}
 */
export const routeWillLeave$ = main$
  .filter(({ action }) => action.type === ROUTE_WILL_LEAVE);

/**
 * @type {Observable}
 */
export const routeDidLeave$ = main$
  .filter(({ action }) => action.type === ROUTE_DID_LEAVE);

/**
 * @type {Observable}
 * @deprecated use routeDidEnter$
 */
export const routeDidChange$ = routeWillEnter$
  .merge(routeDidEnter$)
  .merge(routeWillLeave$)
  .merge(routeDidLeave$);

/**
* @type {Observable}
*/
export const historyDidUpdate$ = routeDidEnter$.merge(routeDidLeave$);

/**
* @type {Observable}
*/
export const historyDidReset$ = main$
  .filter(({ action }) => action.type === CONDUCTOR_RESET)
  .zip(routeDidEnter$)
  .map(([first]) => first);

export const routeDidUpdate$ = main$
  .filter(({ action }) => action.type === CONDUCTOR_UPDATE);
