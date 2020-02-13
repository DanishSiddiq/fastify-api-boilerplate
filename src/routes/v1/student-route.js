const controller = require('../../controllers/student-controller');
const schema = require('../schemas/student-schema');

/**
 * Info routes endpoints
 */
module.exports = () => {
    return [
        {
            method: 'GET',
            url: '/student/:_id',
            schema: schema.findById,
            handler: controller.findOne
        },
        {
            method: 'PUT',
            url: '/student/:_id',
            schema: schema.updateOne,
            handler: controller.updateOne
        },
        {
            method: 'POST',
            url: '/student',
            schema: schema.createOne,
            handler: controller.createOne
        }
    ];
};
