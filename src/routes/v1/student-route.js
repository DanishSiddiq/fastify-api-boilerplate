const controller = require('../../controllers/student-controller');

/**
 * Info routes endpoints
 */
module.exports = () => {
    return [
        {
            method: 'GET',
            url: '/student/find/:_id',
            handler: controller.findOne
        },
        {
            method: 'POST',
            url: '/student',
            handler: controller.create
        }
    ];
};
