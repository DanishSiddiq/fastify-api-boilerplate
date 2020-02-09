const fs = require('fs');
const path = require('path');

/**
 * Sync read routes directory for dynamic load
 *
 * @param {Fastify} fastify
 * @param {Object} opts
 * @param {Callback} next
 */
const v1RoutesMiddleware = (fastify, opts, next) => {
  const directory = path.join(__dirname, 'v1');

  fs.readdirSync(directory).forEach(file => {
    const routePath = path.join(directory, file);
    const routes = require(routePath)(fastify);
    routes.forEach(route => fastify.route(route));
  });

  next();
};

module.exports = { v1RoutesMiddleware };
