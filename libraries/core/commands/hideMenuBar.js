import AppCommand from '../classes/AppCommand';

/**
 * Sends hideMenuBar command to the app.
 * @param {Object} [params=null] The command parameters.
 */
export default (params = null) => {
  const command = new AppCommand();

  command
    .setCommandName('hideMenuBar')
    .dispatch(params);
};
