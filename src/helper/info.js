const path = require('path');
const fs = require('fs');

let version = '';

const readVersion = () => {
    if (version) {
        return version;
    }

    // Read the version configuration from bumpversion config file
    const versionFilePath = path.join(__dirname, '../../.bumpversion.cfg');
    const configContent = fs.readFileSync(versionFilePath, 'utf8');

    // extract the `current_version = {}` value form the file
    const configMatches = /current_version\s*?=\s*?(\d+?\.\d+?\.\d+?)/g.exec(configContent);
    if (!configMatches || !configMatches[1]) {
        console.error(`Could not read version from config file ${versionFilePath}`);
    } else {
        version = configMatches[1];
    }

    return version || '0.0.0';
};

module.exports = { readVersion };
