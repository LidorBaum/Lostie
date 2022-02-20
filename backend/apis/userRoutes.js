const express = require('express');
const Libs = require('../libs');
const { UserModel } = require('../models/User');
const { baseURL, env } = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userRouter = express.Router();

userRouter.post('/', createUser);

userRouter.get('/', getAllUsers);

userRouter.get('/sorted', getFilteredUsers);

userRouter.get('/type/:name', getExistanceAndType);

userRouter.put('/edit/:userId([A-Fa-f0-9]{24})', updateUser);

userRouter.get('/:userId([A-Fa-f0-9]{24})', getUserById);

userRouter.delete('/:userId([A-Fa-f0-9]{24})', deleteUser);

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
        if (result.type === 'admin') return res.send({ admin: true });
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
        return response.status(status).send(errMessage);
    }
}
async function createUser(req, res) {
    try {
        const userObj = req.body;
        if (userObj.type === 'customer') userObj.password = undefined;
        else {
            const hash = await bcrypt.hash(userObj.password, saltRounds);
            userObj.password = hash;
        }
        const newUser = await UserModel.createUser(userObj);
        res.send(newUser);
    } catch (err) {
        err;
        return responseError(res, err.message);
    }
}

async function updateUser(req, res) {
    try {
        const userObj = req.body;
        if (userObj.type === 'customer') userObj.password = undefined;
        else {
            const hash = await bcrypt.hash(userObj.password, saltRounds);
            userObj.password = hash;
        }
        if (
            userObj.image ===
            'https://res.cloudinary.com/echoshare/image/upload/v1638211337/1997805_dje7p6.png'
        )
            userObj.image = undefined;
        const newUserObj = await UserModel.updateUser(req.body);
        res.send(newUserObj);
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
