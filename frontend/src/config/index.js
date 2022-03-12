const environment = process.env.VUE_APP_ENVIRONMENT || 'dev';
function tryRequire(environment) {
    try {
        return require(`./${environment}`);
    } catch (err) {
        if ('MODULE_NOT_FOUND' === err.code) {
            throw Error(
                'Incorrect ENVIRONMENT variable set, exiting\nAllowed Environments:\n1. dev\n2. prod'
            );
        }
    }
}

const envConfig = tryRequire(environment);

module.exports = envConfig;
