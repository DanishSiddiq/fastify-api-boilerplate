const { logInfoDetails, logErrDetails } = require('../../helper/logger');

const enrolled = async (body) => {

    try {
        if (body) {
            logInfoDetails({ message: `Data received for student enrolled: `, additionalData: { body } });
        }
    } catch (error) {
        logErrDetails({ message: `Failure while reading body for student enrolled: `, additionalData: { body } });
    }
};

module.exports = { enrolled };
