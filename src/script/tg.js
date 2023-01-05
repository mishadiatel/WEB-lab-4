let message = "User: Diatel Mykhailo\nGroup: TR-12\nResult: 10 / 10";

const TelegramBot = require('node-telegram-bot-api');

const token = '1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk';

const bot = new TelegramBot(token, {polling: true});

const chatId = -519873227;

bot.sendMessage(chatId, message);
