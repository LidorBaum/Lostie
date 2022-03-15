const mongoURL = 'secret'
console.log(mongoURL);
module.exports = {
  dbURL:
    mongoURL,
  baseURL: "http://localhost:4444/",
  env: "dev",
};
