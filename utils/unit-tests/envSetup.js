/* global jasmine */

require('jest-enzyme/lib/index');

global.SGEvent = {
  __call: () => {},
};

if (jasmine) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
}
