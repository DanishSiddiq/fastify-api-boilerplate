const controller = require('../../controllers/student-controller');
const schema = require('../schemas/student-schema');

/**
 * Info routes endpoints
 */
module.exports = () => {
    return [
        {
            method: 'GET',
            url: '/student/find/:_id',
            schema: schema.findById,
            handler: controller.findOne
        },
        {
            method: 'POST',
            url: '/student',
            schema: schema.create,
            handler: controller.create
        }
    ];
};
