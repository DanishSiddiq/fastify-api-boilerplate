const HttpStatus = require('http-status-codes/index');

/**
 *
 * @param request
 * @param reply
 */
const get = async (request, reply) => {
    reply.code(HttpStatus.OK).send({ id: 'B201026', fistName: 'Danish', lastName: 'Siddiq' });
};

/**
 *
 * @param request
 * @param reply
 */
const create = async (request, reply) => {
    reply.code(HttpStatus.OK).send({ isCreated: true });
};

module.exports = { get, create };

