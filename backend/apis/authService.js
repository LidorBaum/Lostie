const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User");

const saltRounds = 10;

async function login(email, password) {
  const user = await UserModel.getUserByEmail(email);
  if (!user)
    return Promise.reject({
      message: "User Not Found",
    });
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return Promise.reject({
      message: "Password or name is not match",
    });
  user.password = undefined;
  return user;
}

async function signup(userObj) {
  const hash = await bcrypt.hash(userObj.password, saltRounds);
  userObj.password = hash;
  const createdUser = await UserModel.createUser(userObj);
  return createdUser;
}

module.exports = {
  signup,
  login,
};
