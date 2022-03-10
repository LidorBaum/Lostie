const express = require("express");
const Libs = require("../libs");
const { UserModel } = require("../models/User");
const { TagModel } = require("../models/Tag");
const { baseURL, env } = require("../config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateUser } = require("./generateFakeUser");
const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.get("/fake/", createFakeUser);

userRouter.get("/", getAllUsers);

userRouter.get("/ids", getAllUsersIDs);

userRouter.get("/geocodes", getAllGeocodes);

userRouter.get("/sorted", getFilteredUsers);

userRouter.get("/type/:name", getExistanceAndType);

userRouter.put("/edit/:userId([A-Fa-f0-9]{24})", updateUser);

userRouter.get("/:userId([A-Fa-f0-9]{24})", getUserById);

userRouter.delete("/:userId([A-Fa-f0-9]{24})", deleteUser);

function responseError(response, errMessage) {
  let status = 500;
  return response.status(status).send(errMessage);
}

async function getFilteredUsers(req, res) {
  try {
    const { filter } = req.query;
    const result = await UserModel.getFilteredUsers(filter);
    res.send(result);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getExistanceAndType(req, res) {
  try {
    const { name } = req.params;
    const result = await UserModel.getExistanceAndType(name);
    if (!result) return res.send({ noUserFound: true });
    if (result.type === "admin") return res.send({ admin: true });
    res.send(result);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const result = await UserModel.deleteUser(userId);
    if (result.deletedCount === 0) {
      return responseError(
        res,
        Libs.Errors.EmployeeValidation.EmployeeDoesNotExists
      );
    }
    return res.send();
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    const user = await UserModel.getById(userId);
    res.send(user);
  } catch (error) {
    return responseError(res, err.message);
  }
}

async function getAllGeocodes(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    const tags = await TagModel.getAllTags()
    let userTagCount = []

    let geos = [];
    users.forEach((element, idx) => {
      geos.push({ id: idx, position: element.geocode });
    });
    res.send(geos);
  } catch (error) {
    return responseError(res, err.message);
    
  }
}

async function createUser(req, res) {
  try {
    const userObj = req.body;
    const hash = await bcrypt.hash(userObj.password, saltRounds);
    userObj.password = hash;
    const newUser = await UserModel.createUser(userObj);
    res.send(newUser);
  } catch (err) {
    err;
    return responseError(res, err.message);
  }
}

async function createFakeUser(req, res) {
  try {
    const { fullName } = req.query;
    const userObj = await generateUser(fullName);
    const hash = await bcrypt.hash(userObj.password, saltRounds);
    userObj.password = hash;
    const newUser = await UserModel.createUser(userObj);
    res.send(newUser);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function updateUser(req, res) {
  try {
    const userObj = req.body;
    // const hash = await bcrypt.hash(userObj.password, saltRounds);
    // userObj.password = hash;
    const newUserObj = await UserModel.updateUser(req.body);
    res.send(newUserObj);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllUsersIDs(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    let ids = [];
    users.forEach((element) => {
      ids.push(element._id);
    });
    res.send(ids);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.send(users);
  } catch (err) {
    return responseError(res, err.message);
  }
}

module.exports = userRouter;
