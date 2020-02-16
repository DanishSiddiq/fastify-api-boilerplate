const { config }    = require('./config');
const fastifyOpts   = config.get('fastify', {});
const fastifyConfig = typeof fastifyOpts === 'string' ? JSON.parse(fastifyOpts) : fastifyOpts;
const fastify       = require('fastify')(fastifyConfig);


/**
 *
 * @param message
 * @param error
 * @param additionalData
 */
const logErrDetails = ({ message = '', error = {}, additionalData }) => {
  fastify.log.error(error, message, additionalData);
};

/**
 *
 * @param message
 * @param additionalData
 */
const logInfoDetails = ({ message = '', additionalData = {} }) => {
  fastify.log.info(message, additionalData);
};

module.exports = { logErrDetails, logInfoDetails };
