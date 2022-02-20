const express = require('express');
const Libs = require('../libs');
const { TagModel } = require('../models/Tag');
const { baseURL, env } = require('../config');

const tagRouter = express.Router();

tagRouter.post('/', createTag);

tagRouter.get('/', getAlltags);

tagRouter.put('/edit/:tagId([A-Fa-f0-9]{24})', updatetag);

// userRouter.get("/:userId([A-Fa-f0-9]{24})", getUserById);

tagRouter.delete('/:tagId', deletetag);

function responseError(response, errMessage) {
    let status = 500;
    return response.status(status).send(errMessage);
}

async function deletetag(req, res) {
    try {
        const { tagId } = req.params;
        if (tagId === 'undefined')
            return responseError(res, 'Colud not find tag to delete');
        const result = await tagModel.deletetag(tagId || null);
        if (result.deletedCount === 0) {
            return responseError(
                res,
                'Colud not find tag to delete'
                // Libs.Errors.EmployeeValidation.EmployeeDoesNotExists
            );
        }
        return res.send();
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function createTag(req, res) {
    try {
        const newTag = await TagModel.createTag(req.body);
        res.send(newTag);
    } catch (err) {
        return responseError(res, err.message);
    }
}
async function updatetag(req, res) {
    try {
        const newtagObj = await tagModel.updatetag(req.body);
        res.send(newtagObj);
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function getAlltags(req, res) {
    try {
        const tags = await tagModel.getAlltags();
        res.send(tags);
    } catch (err) {
        return responseError(res, err.message);
    }
}

// async function updateUser(req, res) {
//   try {
//     const newUserObj = await UserModel.updateUser(req.body);
//     res.send(newUserObj);
//   } catch (err) {
//     return responseError(res, err.message);
//   }
// }
// async function getUserById(req, res) {
//   try {
//     const { userId } = req.params;
//     const user = await UserModel.getById(userId);
//     res.send(user);
//   } catch (error) {
//     return response.status(status).send(errMessage);
//   }
// }

module.exports = tagRouter;
