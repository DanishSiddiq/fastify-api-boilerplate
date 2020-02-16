const mongoose = require('mongoose');
const { logInfoDetails, logErrDetails } = require('../helper/logger');

/**
 *
 * @param err
 */
function errorHandler(err) {
  disconnectMongo();
  logErrDetails( { error: err, message: 'Error occurred in student-api-boilerplate' } );
}

/**
 * Gracefully closes the MongoDB connection
 */
const disconnectMongo = () => {
  mongoose.connection.close(function () {
    logInfoDetails( { message: 'Mongoose default connection disconnected through app termination' });
  });
};

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
const handleUncaughtErrors = () => {
  process.on('unhandledRejection', errorHandler);
  process.on('uncaughtException', errorHandler);
};

/**
 *
 */
const handleExit = () => {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    disconnectMongo();
    process.exit(0);
  });

  process.on('exit', () => {
    disconnectMongo();
    process.exit(0);
  });
};

module.exports = { handleExit, handleUncaughtErrors };



