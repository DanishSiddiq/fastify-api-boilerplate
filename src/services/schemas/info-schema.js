const HttpStatus = require('http-status-codes');

const errorSchema = require('./common/error-schema');
const notFoundSchema = require('./common/not-found-schema');

module.exports = {
  keepAlive: {
    description: 'Get the status of the API',
    tags: ['Info'],
    summary: 'Obtain the status of the API',
    response: {
      [HttpStatus.OK]: {
        description: 'Successful response',
        type: 'string'
      },
      [HttpStatus.BAD_REQUEST]: notFoundSchema,
      [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
    }
  }
};
