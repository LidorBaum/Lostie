const express = require("express");
const Libs = require("../libs");
const { OrderModel } = require("../models/Order");
const { baseURL, env } = require("../config");
const { TagModel } = require("../models/Tag");
const { UserModel } = require("../models/User");

const orderRouter = express.Router();

orderRouter.post("/", createOrder);

orderRouter.get("/", getAllorders);

orderRouter.get("/user/:userId", getUserOrders);

orderRouter.put("/edit/:orderId([A-Fa-f0-9]{24})", updateorder);

orderRouter.get("/:orderId([A-Fa-f0-9]{24})", getOrderById);

orderRouter.delete("/:orderId", deleteorder);

function responseError(response, errMessage) {
  let status = 500;
  return response.status(status).send(errMessage);
}

async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;
    const result = await OrderModel.getOrderById(orderId);
    res.send(result);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getUserOrders(req, res) {
  try {
    // const {userId} = req.params;
    // const result = await OrderModel.getUserOrders(userId)
    // const productsIds = result.map(order => order.productId)
    // const products = await ProductModel.getProductsByIds(productsIds)
    // const productsMapping = products.reduce(
    //     (map, product) => map.set(product._id.toString(), product),
    //     new Map()
    // )
    // console.log(productsMapping, '62');
    // const final = result.map(order => {
    //     return {
    //         ...order.toObject(),
    //         _id: order._id.toString(),
    //         productDetails: productsMapping.get(order.productId.toString())
    //     };
    // });
    // console.log(final);
    // res.send(final)
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function deleteorder(req, res) {
  try {
    const { orderId } = req.params;
    if (orderId === "undefined")
      return responseError(res, "Colud not find order to delete");
    const result = await orderModel.deleteorder(orderId || null);
    if (result.deletedCount === 0) {
      return responseError(
        res,
        "Colud not find order to delete"
        // Libs.Errors.EmployeeValidation.EmployeeDoesNotExists
      );
    }
    return res.send();
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function createOrder(req, res) {
  try {
    const newTag = await TagModel.createTag(req.body);
    await UserModel.addTag(newTag.userId, newTag._id)
    const newOrder = await OrderModel.createOrder({
      tagId: newTag._id,
      userId: newTag.userId,
    });
    res.send({ tag: newTag, order: newOrder });
  } catch (err) {
    return responseError(res, err.message);
  }
}
async function updateorder(req, res) {
  try {
    const neworderObj = await orderModel.updateorder(req.body);
    res.send(neworderObj);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllorders(req, res) {
  try {
    const orders = await orderModel.getAllorders();
    res.send(orders);
  } catch (err) {
    return responseError(res, err.message);
  }
}

module.exports = orderRouter;
