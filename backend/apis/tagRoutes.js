const express = require('express');
const Libs = require('../libs');
const { TagModel } = require('../models/Tag');
const { baseURL, env } = require('../config');
const { UserModel } = require('../models/User');
const { ProductModel } = require('../models/Product');

const tagRouter = express.Router();

tagRouter.post('/', createTag);

tagRouter.get('/', getAlltags);

tagRouter.get('/user/:userId', getUserTags);

tagRouter.put('/edit/:tagId([A-Fa-f0-9]{24})', updatetag);

tagRouter.get("/:tagId([A-Fa-f0-9]{24})", getTagById);

tagRouter.get("/scan/:tagId([A-Fa-f0-9]{24})", getTagByIdForScan);

tagRouter.delete('/:tagId', deletetag);

function responseError(response, errMessage) {
    let status = 500;
    return response.status(status).send(errMessage);
}

async function getTagById(req, res){
    try{
        const { tagId } = req.params;
        const result = await TagModel.getTagById(tagId)
        res.send(result)
    }catch(err){
        return responseError(res, err.message);
    }
}
async function getTagByIdForScan(req, res){
    try{
        const { tagId } = req.params;
        const result = await TagModel.getTagById(tagId)
        const tagObj = result.toObject()
        const {userId} = result
        const ownerObj = await UserModel.getById(userId)
        res.send({...tagObj, owner: ownerObj.name, phoneNumber: ownerObj.phoneNumber, email: ownerObj.email})
    }catch(err){
        return responseError(res, err.message);
    }
}

async function getUserTags(req, res){
    try{
        const {userId} = req.params;
        const result = await TagModel.getUserTags(userId)
        const productsIds = result.map(tag => tag.productId)
        const products = await ProductModel.getProductsByIds(productsIds)
        
        const productsMapping = products.reduce(
            (map, product) => map.set(product._id.toString(), product),
            new Map()
        )
        console.log(productsMapping, '62');
        const final = result.map(tag => {
            return {
                ...tag.toObject(),
                _id: tag._id.toString(),
                productDetails: productsMapping.get(tag.productId.toString())
            };
        });
        console.log(final);
        res.send(final)
    }catch(err){
        return responseError(res, err.message);
    }
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

module.exports = tagRouter;
