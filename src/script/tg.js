let message = "ПІБ: Дятел Михайло\Група: ТР-12\Оцінка: 14 / 14";

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = -519873227;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = -519873227;

  
  bot.sendMessage(chatId, message);
});