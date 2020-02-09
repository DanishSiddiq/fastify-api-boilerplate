const get = require('lodash/get');
const cmn = require('./common');

let loadedConfig = {};

class config {
  /**
   * Read the configuration from the config file.
   *
   * @example  config.get('REDIS_HOST', '127.0.0.1');
   *
   * @param {string} targetConfig
   * @param {*} defaultValue
   * @returns {*}
   */
  static get(targetConfig, defaultValue) {
    const envVariable = get(process.env, targetConfig);
    /**
     * if it's in env
     */
    if (envVariable !== undefined) {
      return envVariable;
    }

    /**
     * if it's already loaded
     */
    if (Object.keys(loadedConfig).length) {
      return loadedConfig[targetConfig] || defaultValue;
    }

    let configPath = './../../.config.json';
    let configOverridePath = './../../.config.override.json';

    if (!cmn.isPathExist(configPath)) {
      throw new Error('.config.json file is missing');
    }

    let configJson = require(configPath);
    let configOverride = cmn.isPathExist(configOverridePath) ? require(configOverridePath) : {};

    loadedConfig = { ...configJson, ...configOverride };

    // free mem-leak
    configPath = null;
    configJson = null;
    configOverride = null;
    configOverridePath = null;

    return loadedConfig[targetConfig] || defaultValue;
  }
}

module.exports = { config };
