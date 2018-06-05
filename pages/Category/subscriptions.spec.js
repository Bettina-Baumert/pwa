import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_VIEW_TITLE } from '@shopgate/pwa-common/constants/ActionTypes';
import { REQUEST_CATEGORY } from '@shopgate/pwa-common-commerce/category/constants';
import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import {
  routerState,
  childCategoryRouteMock,
  uiState,
  categoryState,
  initialCategoryState,
} from '@shopgate/pwa-common-commerce/category/mock';
import { categoryWillEnter$, receivedVisibleCategory$ } from './streams';
import subscribe from './subscriptions';

const mockedStore = configureStore([thunk]);

const mockedResolver = jest.fn();
jest.mock('@shopgate/pwa-core/classes/PipelineRequest', () => mockedPipelineRequestFactory((mockInstance, resolve, reject) => {
  mockedResolver(mockInstance, resolve, reject);
}));

describe('Category subscriptions', () => {
  let subscribeMock;
  let first;
  let store = mockedStore();
  beforeAll(() => {
    jest.resetAllMocks();
    store.clearActions();
    subscribeMock = jest.fn();
  });
  it('should subscribe', () => {
    subscribe(subscribeMock);
    expect(subscribeMock.mock.calls.length).toBe(2);
    [first] = subscribeMock.mock.calls;
    expect(first[0]).toBe(categoryWillEnter$);
  });

  describe('categoryWillEnter$', () => {
    it('should fetch category when page is entered', () => {
      const action = {
        route: childCategoryRouteMock,
      };
      const mockedState = {
        ...routerState,
        ...initialCategoryState,
        ...uiState,
      };

      store = mockedStore(mockedState);
      first[1]({
        action,
        dispatch: store.dispatch,
      });
      const actions = store.getActions();
      expect(actions[0].type).toBe(REQUEST_CATEGORY);
      expect(actions[1].type).toBe(SET_VIEW_TITLE);
    });
  });
});
