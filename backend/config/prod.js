const mongoURL = process.env.NODE_MONGOURL
console.log(mongoURL);
module.exports = {
  dbURL:
    mongoURL,
  baseURL: "https://lostie.herokuapp.com/",
  env: "prod",
};
