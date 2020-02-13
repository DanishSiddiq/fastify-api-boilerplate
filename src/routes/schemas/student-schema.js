const HttpStatus = require('http-status-codes');

const errorSchema = require('./common/error-schema');
const notFoundSchema = require('./common/not-found-schema');

const studentCreateSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', example: 'Danish' },
        middleName: { type: 'string', example: 'Muhammad' },
        lastName: { type: 'string', example: 'Siddiq' },
        registrationNumber: { type: 'number', example: 1234567 }
    },
    required: ['firstName', 'lastName', 'registrationNumber']
};

const studentUpdateSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', example: 'Danish' },
        middleName: { type: 'string', example: 'Muhammad' },
        lastName: { type: 'string', example: 'Siddiq' }
    },
    required: ['firstName', 'lastName']
};

module.exports = {
    createOne: {
        description: 'Create Student',
        tags: ['Student'],
        summary: 'Create Student Data',
        body: studentCreateSchema,
        response: {
            [HttpStatus.OK]: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    registrationNumber: { type: 'string' },
                    createdAt: { type: 'string', example: '2019-01-02T00:00:00Z' },
                    updatedAt: { type: 'string', example: '2019-01-02T00:00:00Z' }
                },
            },
            [HttpStatus.BAD_REQUEST]: notFoundSchema,
            [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
        }
    },
    updateOne: {
        description: 'Update Student',
        tags: ['Student'],
        summary: 'Update Student Data',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'student id'
                }
            }
        },
        querystring: studentUpdateSchema,
        response: {
            [HttpStatus.OK]: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    status: { type: 'string' },
                },
            },
            [HttpStatus.BAD_REQUEST]: notFoundSchema,
            [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
        }
    },
    findById: {
        description: 'Get the student details',
        tags: ['Student'],
        summary: 'Student details',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'student id'
                }
            }
        },
        response: {
            [HttpStatus.OK]: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    registrationNumber: { type: 'string' },
                    createdAt: { type: 'string', example: '2019-01-02T00:00:00Z' },
                    updatedAt: { type: 'string', example: '2019-01-02T00:00:00Z' }
                },
            },
            [HttpStatus.BAD_REQUEST]: notFoundSchema,
            [HttpStatus.INTERNAL_SERVER_ERROR]: errorSchema
        }
    }
};
