const mongoURL = 'localHeroku'
console.log(mongoURL);
module.exports = {
  dbURL:
    mongoURL,
  baseURL: "http://localhost:4444/",
  env: "dev",
};
