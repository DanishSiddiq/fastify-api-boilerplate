const { getConnectedChannel } = require('../connection/rabbitmq');
const { publish } = require('./base');

const routingKey = 'email.user.register';

const process = async (msg) => {
    const crmChannel = await getConnectedChannel();
    return await publish(crmChannel, { id: 'B201026'}, routingKey);
};

module.exports = {
    process
};
