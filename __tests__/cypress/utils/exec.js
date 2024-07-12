const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

/**
 * Run a shell command, and return the output, even if it fails
 * @param {Object} params parameters for the command
 * @param {string} params.command shell command to run
 * @param {string[]} [params.args] additional args
 * @returns {Promise<string>} stdout + stderr from the command
 */
const runCommand = async ({ command, args = [] }) => {
  const commandWithArgs = `${command} ${args.join(' ')}`;
  const result = await exec(args.length ? commandWithArgs : command)
    .then(({ stderr, stdout }) => ({ stderr, stdout, status: 0 }))
    .catch(({ stderr, stdout }) => ({ stderr, stdout, status: 1 }));
  const { status, stderr, stdout } = result;
  if (process.env.DEBUG) console.log({ command, result });
  return { status, stderr, stdout };
};

const cacheWrapper = (callback) => {
  let cachedResults = null;
  const getCallbackResults = async () => {
    if (cachedResults === null) {
      cachedResults = await callback();
    }
    return cachedResults;
  };
  return getCallbackResults;
};

module.exports = {
  runCommand,
  cacheWrapper,
};
