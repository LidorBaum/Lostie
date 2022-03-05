const environment = process.env.NODE_ENV || "prod";

function tryRequire(environment) {
  try {
    return require(`./${environment}`);
  } catch (err) {
    if ("MODULE_NOT_FOUND" === err.code) {
      throw Error(
        "Incorrect NODE_ENV variable set, exiting\nAllowed Environments:\n1. dev\n2. prod"
      );
    }
  }
}

const envConfig = tryRequire(environment);

module.exports = envConfig;
