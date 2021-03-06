import AppCommand from '../classes/AppCommand';

/**
 * Sends a setDebugLoggingEnabled command to the app.
 * @param {Object} params The command parameters.
 */
export default (params = {}) => {
  const command = new AppCommand();

  command
    .setCommandName('setDebugLoggingEnabled')
    .dispatch(params);
};
