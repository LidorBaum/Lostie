const express = require("express");

const TelegramBot = require('node-telegram-bot-api');
const TELEGRAM = '5193126866:AAG2SzSWyYYdoo1uqb3iVpLZ5DL9wh--fT0'
const bot = new TelegramBot(TELEGRAM, {polling: true});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  console.log(chatId);
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  })

const Libs = require("../libs");
const { VisitorModel } = require("../models/Visitor");
const { baseURL, env } = require("../config");

const loggerRouter = express.Router();

loggerRouter.post("/", createlogger);

loggerRouter.get("/visit", logVisitor);

loggerRouter.get("/ids", getAllloggersIDs);

loggerRouter.put("/edit/:loggerId([A-Fa-f0-9]{24})", updatelogger);

loggerRouter.get("/:loggerId([A-Fa-f0-9]{24})", getloggerById);

loggerRouter.delete("/:loggerId", deletelogger);

function responseError(response, errMessage) {
  let status = 500;
  return response.status(status).send(errMessage);
}

async function logVisitor(req, res){
    console.log(req.headers['x-forwarded-for'], 'ip')
    const ip = req.headers['x-forwarded-for'] || '192.168.1.1'
    const result = await VisitorModel.createVisitor({ip})
    bot.sendMessage('201893230', `${ip} just enteres`);
    res.send(result)
}

async function getloggerById(req, res) {
  try {
    const { loggerId } = req.params;
    const result = await VisitorModel.getloggerById(loggerId);
    res.send(result);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function deletelogger(req, res) {
  try {
    const { loggerId } = req.params;
    if (loggerId === "undefined")
      return responseError(res, "Colud not find logger to delete");
    const result = await VisitorModel.deletelogger(loggerId || null);
    if (result.deletedCount === 0) {
      return responseError(
        res,
        "Colud not find logger to delete"
        // Libs.Errors.EmployeeValidation.EmployeeDoesNotExists
      );
    }
    return res.send();
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function createlogger(req, res) {
  try {
    const newlogger = await VisitorModel.createlogger(req.body);
    res.send(newlogger);
  } catch (err) {
    return responseError(res, err.message);
  }
}
async function updatelogger(req, res) {
  try {
    const newloggerObj = await VisitorModel.updatelogger(req.body);
    res.send(newloggerObj);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllloggersIDs(req, res) {
  try {
    const loggers = await VisitorModel.getAllloggers();
    let ids = [];
    loggers.forEach((element) => {
      ids.push(element._id);
    });
    res.send(ids);
  } catch (err) {
    return responseError(res, err.message);
  }
}

async function getAllloggers(req, res) {
  try {
    const loggers = await VisitorModel.getAllloggers();
    res.send(loggers);
  } catch (err) {
    return responseError(res, err.message);
  }
}

module.exports = loggerRouter;
