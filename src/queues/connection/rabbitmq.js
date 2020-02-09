const amqp = require('amqplib');
const { config } = require('../../helper/config');
const { logInfoDetails, logErrDetails } = require('../../helper/logger');
const { RABBIT_QUEUE_CONNECTED,
  RABBIT_QUEUE_CONNECTION_ERROR,
  RABBIT_QUEUE_DISCONNECTED } = require('../../constants/info-constants');

/*
to track status of the connection, it is not available on channel
 */
let isQueueConnectionAlive = true;
let channel = null;
const reConnectLapse = parseInt(config.get('RABBITMQ_RECONNECT_TIME' , 10000));

/*
rabbit config
 */
const host = {
  protocol: 'amqp',
  hostname: config.get('RABBITMQ_HOST', ''),
  port: config.get('RABBITMQ_PORT', ''),
  username: config.get('RABBITMQ_USERNAME', ''),
  password: config.get('RABBITMQ_PASSWORD', ''),
  vhost: config.get('RABBITMQ_VHOST', ''),
};

/*
queue processor
 */
const queue = {
  "student_promoted": require('../consumer/student_promoted'),
  "student_enrolled": require('../consumer/student_enrolled')
};

/**
 * @param host
 * @returns {Promise<void>}
 */
const connectRabbitMQ = async (host) => {
  try {
    const connection = await amqp.connect(host);
    logInfoDetails({ message: RABBIT_QUEUE_CONNECTED });

    // error
    connection.on("error", function(error)
    {
      isQueueConnectionAlive = false;
      logErrDetails({ error, message: RABBIT_QUEUE_CONNECTION_ERROR });
      setTimeout(() => connectRabbitMQ(host), reConnectLapse);
    });

    // terminated
    connection.on("close", function()
    {
      isQueueConnectionAlive = false;
      logInfoDetails({ message: RABBIT_QUEUE_DISCONNECTED });
      setTimeout(() => connectRabbitMQ(host), reConnectLapse);
    });

    channel = await connection.createChannel();
    isQueueConnectionAlive = true;
    subscribeQueue();

  } catch (err) {
    // exception
    isQueueConnectionAlive = false;
    logErrDetails({ message: RABBIT_QUEUE_CONNECTION_ERROR });
    setTimeout(() => connectRabbitMQ(host), reConnectLapse);
  }
};

/*
attach queue with a callback
 */
const subscribeQueue = async () => {
  const preFetchCount = parseInt(config.get('RABBITMQ_PRE_FETCH_MSG', 10));
  channel.prefetch(preFetchCount);

  for (let key in queue){
    logInfoDetails({ message: `[*] Waiting for messages in Queue: ${key}` });
    channel.consume(key, queue[key].process, { noAck: false });
    // acknowledgment on channel
    queue[key].setChannel(channel);
  }
};

/**
 *
 * @returns {Promise<*>}
 */
const getConnectedChannel = async () => {
  return channel;
};

/**
 *
 * @returns {Promise<boolean>}
 */
const getConnectionStatus = async () => {
  return isQueueConnectionAlive;
};

/**
 *
 * @returns {Promise<void>}
 */
const initiateRabbitMQ = async () => {
  connectRabbitMQ(host);
};

module.exports = {
  initiateRabbitMQ,
  getConnectionStatus,
  getConnectedChannel
};
