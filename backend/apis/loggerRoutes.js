const express = require("express");

const TelegramBot = require('node-telegram-bot-api');

// const TELEGRAM = '5140385413:AAHA2ZS0fPyv1mr2Q18x5RT8vKXpBq9-b_g'
const TELEGRAM = process.env.NODE_TELEGRAM
console.log(TELEGRAM, 'telegram from proces');
const bot = new TelegramBot(TELEGRAM, { polling: true });
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
})

const { VisitorModel } = require("../models/Visitor");

const loggerRouter = express.Router();

loggerRouter.get("/visit", logVisitor);


function responseError(response, errMessage) {
    let status = 500;
    return response.status(status).send(errMessage);
}

async function logVisitor(req, res) {
    try {
        console.log(req.headers['x-forwarded-for'], 'ip')
        const ip = req.headers['x-forwarded-for'] || '192.168.1.1'
        const result = await VisitorModel.createVisitor({ ip })
        const res2 = await VisitorModel.isAlertNeeded(result.ip)
        if (res2.length === 1) bot.sendMessage('201893230', `${ip} Entered Lostie`);
        // bot.sendMessage('201893230', `${ip} Entered Lostie`);
        res.send(result)
    } catch (err) {
        return responseError(res, err.message);
    }
}


module.exports = loggerRouter;
