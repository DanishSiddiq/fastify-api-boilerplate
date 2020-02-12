const schema = require('./schemas/info-schema');
const controller = require('../controllers/info-controller');

const infoRoutesMiddleware = (fastify, opts, next) => {
    const routes = [
        {
            method: 'GET',
            url: '/keep-alive',
            schema: schema.keepAlive,
            handler: controller.keepAlive
        },
        {
            method: 'GET',
            url: '/ping',
            schema: schema.ping,
            handler: controller.ping
        },
        {
            method: 'GET',
            url: '/version',
            schema: schema.version,
            handler: controller.getVersion
        },
        {
            method: 'GET',
            url: '/health',
            schema: schema.health,
            handler: controller.checkHealth
        }
    ];
    routes.forEach(route => fastify.route(route));
    next();
};
/**
 * Info routes endpoints
 */
module.exports = { infoRoutesMiddleware };
