const cors = require('cors');
const { config } = require('./helper/config');
const { dbService } = require('./helper/mongo.db');
const { infoRoutesMiddleware } = require('./routes/info');
const { initiateRabbitMQ } = require('./queues/connection/rabbitmq');
const { v1RoutesMiddleware } = require('./routes');
const { handleExit, handleUncaughtErrors } = require('./helper/fatal');

const fastifyOpts   = config.get('fastify', {});
const fastifyConfig = typeof fastifyOpts === 'string' ? JSON.parse(fastifyOpts) : fastifyOpts;
const fastify       = require('fastify')(fastifyConfig);

// Export fastify for later reference
module.exports = fastify;

(async function() {
    try {

        handleExit();
        handleUncaughtErrors();

        // Connect to DB
        if (process.env.NODE_ENV !== 'test') {
            await dbService();

            // queue listener
            // initiateRabbitMQ();
        }

        // Middlewares
        fastify.use(cors());

        // Plugins
        fastify.register(require('fastify-boom'));
        fastify.register(infoRoutesMiddleware);
        fastify.register(v1RoutesMiddleware, { prefix: '/v1' });

        // Server
        await fastify.listen(config.get('NODE_PORT', 6661), '0.0.0.0');
        fastify.log.info(
            '%s listening in %s environment',
            config.name,
            process.env.NODE_ENV
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();
