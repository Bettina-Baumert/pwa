import {
  requestClientInformation,
  receiveClientInformation,
  errorClientInformation,
} from './index';
import {
  REQUEST_CLIENT_INFORMATION,
  RECEIVE_CLIENT_INFORMATION,
  ERROR_CLIENT_INFORMATION,
} from '../../constants/ActionTypes';

describe('Action Creators: client', () => {
  describe('requestClientInformation()', () => {
    it('should work as expected', () => {
      const expected = { type: REQUEST_CLIENT_INFORMATION };
      expect(requestClientInformation()).toEqual(expected);
    });
  });

  describe('receiveClientInformation()', () => {
    it('should work as expected', () => {
      const data = { some: 'data' };
      const expected = {
        type: RECEIVE_CLIENT_INFORMATION,
        data,
      };
      expect(receiveClientInformation(data)).toEqual(expected);
    });
  });

  describe('errorClientInformation()', () => {
    it('should work as expected', () => {
      const expected = { type: ERROR_CLIENT_INFORMATION };
      expect(errorClientInformation()).toEqual(expected);
    });
  });
});
