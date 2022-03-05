const express = require("express");
const Libs = require("../libs");
const { ProductModel } = require("../models/Product");
const { baseURL, env } = require("../config");

const productRouter = express.Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProducts);

productRouter.put("/edit/:productId([A-Fa-f0-9]{24})", updateProduct);

productRouter.get("/:productId([A-Fa-f0-9]{24})", getProductById);

productRouter.delete("/:productId", deleteProduct);

function responseError(response, errMessage) {
  let status = 500;
  return response.status(status).send(errMessage);
}

async function getProductById(req, res) {
  try {
    const { productId } = req.params;
    const result = await ProductModel.getProductById(productId);
    res.send(result);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    if (productId === "undefined")
      return responseError(res, "Colud not find product to delete");
    const result = await ProductModel.deleteproduct(productId || null);
    if (result.deletedCount === 0) {
      return responseError(
        res,
        "Colud not find product to delete"
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
async function updateProduct(req, res) {
  try {
    const newproductObj = await ProductModel.updateproduct(req.body);
    res.send(newproductObj);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.getAllProducts();
    res.send(products);
  } catch (err) {
    return responseError(res, err.message);
  }
}

module.exports = productRouter;
