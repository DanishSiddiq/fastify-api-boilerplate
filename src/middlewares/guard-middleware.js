const HttpStatus = require('http-status-codes/index');

const guardMiddleware = (request, reply, next) => {

    const msg = 'apiKey is required to access the endpoint';
    if (request.headers['apikey'] && request.headers['apikey'] !== 'api-authorization-key') {
        reply.writeHead(HttpStatus.FORBIDDEN);
        reply.write(JSON.stringify({ msg }));
        reply.end();
    }

    next();
};

module.exports = { guardMiddleware };
