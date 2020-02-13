const Boom = require('boom');
const HttpStatus = require('http-status-codes/index');
const studentService = require('../services/student-service');

/**
 *
 * @param request
 * @param reply
 */
const create = async (request, reply) => {
    try {
        const document = await studentService.create(request.body);
        reply.code(HttpStatus.CREATED).send(document);
    } catch  (e) {
        request.log.error(e);
        return Boom.boomify(e);
    }
};

/**
 *
 * @param request
 * @param reply
 */
const findOne = async (request, reply) => {
    try {
        const requestParams = { ...request.body, ...request.query, ...request.params };
        const document = await studentService.findOne(requestParams);
        reply.code(document ? HttpStatus.OK : HttpStatus.BAD_REQUEST).send(document || {});
    } catch (e) {
        request.log.error(e);
        return Boom.boomify(e);
    }
};

module.exports = { findOne, create };

