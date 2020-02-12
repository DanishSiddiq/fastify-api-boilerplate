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
  },
  ping: {
    description: 'Ping API',
    tags: ['Ping'],
    summary: 'Obtain response of the API',
    response: {
      [HttpStatus.OK]: {
        description: 'Successful response',
        type: 'object',
        properties: {
          ok: { type: 'string' }
        }
      },
      [HttpStatus.BAD_REQUEST]: notFoundSchema,
      [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
    }
  },
  version: {
    description: 'Application version',
    tags: ['Health'],
    summary: 'Obtain version of the application',
    response: {
      [HttpStatus.OK]: {
        description: 'Successful response',
        type: 'object',
        properties: {
          "version": { type: 'string' }
        },
        [HttpStatus.BAD_REQUEST]: notFoundSchema,
        [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
      }
    }
  },
  health: {
    description: 'Health of an application',
    tags: ['Health'],
    summary: 'Obtain health of the application',
    response: {
      [HttpStatus.OK]: {
        description: 'Successful response',
        type: 'object',
        properties: {
          "status": { type: 'string' },
          "version": { type: 'string' },
          "mongo": { type: 'string' },
          "rabbitMQConnectionStatus": { type: 'boolean' }
        },
        [HttpStatus.BAD_REQUEST]: notFoundSchema,
        [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
      }
    }
  }
};
