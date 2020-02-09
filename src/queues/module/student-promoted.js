const { logInfoDetails, logErrDetails } = require('../../helper/logger');

const promoted = async (body) => {

    try {
        if (body) {
            logInfoDetails({ message: `Data received for student promoted: `, additionalData: { body } });
        }
    } catch (error) {
        logErrDetails({ message: `Failure while reading body for student promoted: `, additionalData: { body } });
    }
};

module.exports = { promoted };
