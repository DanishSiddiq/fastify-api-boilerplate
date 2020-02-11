const controller = require('../../controllers/student-controller');

/**
 * Info routes endpoints
 */
module.exports = () => {
    return [
        {
            method: 'GET',
            url: '/student',
            handler: controller.findOne
        },
        {
            method: 'POST',
            url: '/student/create',
            handler: controller.create
        }
    ];
};
