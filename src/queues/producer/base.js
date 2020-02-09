exchange = 'email_ex';

/**
 * @param channel
 * @param params
 * @param routingKey
 * @returns {Promise<void>}
 */
const publish = async (channel, params, routingKey) => {
    // check exchange method is an overhead and slows down application if called on each request
    /*  await channel.checkExchange(this.exchange, function (err, ok) {
        console.log(err, ok);
      });*/
    const isQueueAlive = await getConnectionStatus();
    if (isQueueAlive) {
        return await channel.publish(this.exchange, routingKey, Buffer.from(JSON.stringify(params)));
    } else {
        logError(`RabbitMQ is not available for a routing key: ${routingKey} to push a message: ${JSON.stringify(params)}`);
    }
};

module.exports = {
    publish
};
