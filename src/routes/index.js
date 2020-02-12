const fs = require('fs');
const path = require('path');
const { guardMiddleware } = require('../middlewares/guard-middleware');

/**
 *
 * @param fastify
 * @param opts
 * @param next
 */
const v1RoutesMiddleware = (fastify, opts, next) => {
  const directory = path.join(__dirname, 'v1');

  // middlewares
  fastify.use(guardMiddleware);

  fs.readdirSync(directory).forEach(file => {
    const routePath = path.join(directory, file);
    const routes = require(routePath)(fastify);
    routes.forEach(route => fastify.route(route));
  });

  next();
};

module.exports = { v1RoutesMiddleware };
