// eslint-disable-next-line import/no-unresolved
import {
  getRelevantConfigs,
} from 'Library/helpers/tracking';
import Plugin from './Plugin';
import config from './config';

/**
 * Read the config and create plugin instances
 * @param {Object} clientInformation Information about the current client
 */
export default function init(clientInformation) {
  getRelevantConfigs(config, clientInformation).forEach(tracker => new Plugin(tracker.config));
}
