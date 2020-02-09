const HttpStatus = require('http-status-codes/index');
const { checkHealthMongoDb } = require('../helper/mongo.db');
const { logErrDetails } = require('../helper/logger');
const { readVersion } = require('../helper/info');
const { getConnectionStatus } = require('../queues/connection/rabbitmq');
const { SERVICE_UNAVAILABLE, MONGO_UNAVAILABLE, RABBIT_QUEUE_UNAVAILABLE } = require('../constants/info-constants');

/**
 *
 * @param request
 * @param reply
 */
const keepAlive = async (request, reply) => {
  reply.code(HttpStatus.OK).send('API is alive');
};

/**
 *
 * @param request
 * @param reply
 */
const ping = async (request, reply) => {
    reply.code(HttpStatus.OK).send({
        ok: 'ok',
    });
};

/**
 *
 * @param request
 * @param reply
 */
const getVersion = async (request, reply) => {
    reply.code(HttpStatus.OK).send({
        version: readVersion(),
    });
};

/**
 *
 * @param request
 * @param reply
 * @returns {Promise<{isQueueConnectionAlive: (boolean|*)}>}
 */
const checkRabbitMQConnection = async (request, reply) => {
    // check queue status
    const isQueueConnectionAlive = await getConnectionStatus();
    if(!isQueueConnectionAlive) {
        logErrDetails({ message: 'Error Health api: RabbitMQ connection error'});
    }

    reply.code(HttpStatus.OK).send({
        status: 'OK',
        version: readVersion(),
        rabbitMQConnectionStatus: isQueueConnectionAlive
    });
};

/**
 *
 * @param request
 * @param reply
 * @returns {Promise<{isQueueConnectionAlive: (boolean|*)}>}
 */
const checkMongoConnection = async (request, reply) => {
    let mongoHealth = null;

    // check mongo status
    try {
        mongoHealth = await checkHealthMongoDb();
    } catch (error) {
        logErrDetails({ error, message: MONGO_UNAVAILABLE, additionalData: { mongoHealth } });
    }

    reply.code(HttpStatus.OK).send({
        status: 'OK',
        version: readVersion(),
        mongo: mongoHealth,
    });
};

/**
 * it checks health and reconnect if connection is not ready
 * @param request
 * @param reply
 * @returns {Promise<void>}
 */
const checkHealth = async (request, reply) => {
    let mongoHealth = null;

    // check mongo status
    try {
        mongoHealth = await checkHealthMongoDb();
    } catch (error) {
        logErrDetails({ error, message: MONGO_UNAVAILABLE, additionalData: { mongoHealth } });
    }

    // check queue status
    const isQueueConnectionAlive = await getConnectionStatus();
    if(!isQueueConnectionAlive) {
        logErrDetails({ message: 'Error Health api: RabbitMQ connection error'});
    }

    if (mongoHealth != null && isQueueConnectionAlive) {
        reply.code(HttpStatus.OK).send({
            status: 'OK',
            version: readVersion(),
            mongo: mongoHealth,
            rabbitMQConnectionStatus: isQueueConnectionAlive
        });
    } else {
        if(!mongoHealth) {
            reply.code(HttpStatus.SERVICE_UNAVAILABLE).send({
                status: SERVICE_UNAVAILABLE,
                message: MONGO_UNAVAILABLE,
            });
        }

        if (!isQueueConnectionAlive) {
            reply.code(HttpStatus.SERVICE_UNAVAILABLE).send({
                status: SERVICE_UNAVAILABLE,
                message: RABBIT_QUEUE_UNAVAILABLE,
            });
        }
    }
};

module.exports = { keepAlive, ping, getVersion, checkRabbitMQConnection, checkMongoConnection, checkHealth };
