const mongoose = require('mongoose');
const { config } = require('./config');
const { logInfoDetails, logErrDetails } = require('./logger');
const { MONGO_CONNECTED } = require('../constants/info-constants');

const mongoOptions = config.get('MONGODB_OPT', { poolSize: 5, useNewUrlParser: true });
const opts = typeof mongoOptions === 'string' ? JSON.parse(mongoOptions) : mongoOptions;
const uri = config.get('MONGODB_DSN', '');

async function dbService(){
    try {
        await mongoose.connect(uri, opts);
        logInfoDetails( { message: 'Mongodb Connected' });
    } catch (error) {
        logErrDetails({ error, message: 'Mongo DB not connected' });
    }
}

const checkHealthMongoDb = async () => {
    if(mongoose && mongoose.connection && mongoose.connection.readyState) {
        return MONGO_CONNECTED;
    }

    // request new connection before leaving so next time health will have a ready connection
    dbService();

    // returns null since connection opening might will take time in async mode
    return null;
};

module.exports = { dbService, checkHealthMongoDb };
