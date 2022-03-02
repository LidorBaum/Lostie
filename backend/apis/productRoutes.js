const express = require('express');
const Libs = require('../libs');
const { ProductModel } = require('../models/Product');
const { baseURL, env } = require('../config');
const { UserModel } = require('../models/User');

const productRouter = express.Router();

productRouter.post('/', createProduct);

productRouter.get('/', getAllproducts);

productRouter.get('/user/:userId', getUserProducts);

productRouter.put('/edit/:productId([A-Fa-f0-9]{24})', updateproduct);

productRouter.get("/:productId([A-Fa-f0-9]{24})", getProductById);

productRouter.get("/scan/:productId([A-Fa-f0-9]{24})", getProductByIdForScan);

productRouter.delete('/:productId', deleteproduct);

function responseError(response, errMessage) {
    let status = 500;
    return response.status(status).send(errMessage);
}

async function getProductById(req, res){
    try{
        const { productId } = req.params;
        const result = await ProductModel.getProductById(productId)
        res.send(result)
    }catch(err){
        return responseError(res, err.message);
    }
}
async function getProductByIdForScan(req, res){
    try{
        const { productId } = req.params;
        const result = await ProductModel.getProductById(productId)
        const productObj = result.toObject()
        const {userId} = result
        const ownerObj = await UserModel.getById(userId)
        res.send({...productObj, owner: ownerObj.name, phoneNumber: ownerObj.phoneNumber, email: ownerObj.email})
    }catch(err){
        return responseError(res, err.message);
    }
}

async function getUserProducts(req, res){
    try{
        const {userId} = req.params;
        const result = await ProductModel.getUserProducts(userId)
        res.send(result)
    }catch(err){
        return responseError(res, err.message);
    }
}

async function deleteproduct(req, res) {
    try {
        const { productId } = req.params;
        if (productId === 'undefined')
            return responseError(res, 'Colud not find product to delete');
        const result = await productModel.deleteproduct(productId || null);
        if (result.deletedCount === 0) {
            return responseError(
                res,
                'Colud not find product to delete'
                // Libs.Errors.EmployeeValidation.EmployeeDoesNotExists
            );
        }
        return res.send();
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await ProductModel.createProduct(req.body);
        res.send(newProduct);
    } catch (err) {
        return responseError(res, err.message);
    }
}
async function updateproduct(req, res) {
    try {
        const newproductObj = await productModel.updateproduct(req.body);
        res.send(newproductObj);
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function getAllproducts(req, res) {
    try {
        const products = await productModel.getAllproducts();
        res.send(products);
    } catch (err) {
        return responseError(res, err.message);
    }
}

module.exports = productRouter;
