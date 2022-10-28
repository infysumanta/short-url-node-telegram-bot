const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

require("dotenv").config();
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let url = msg.text;
  if (url.startsWith("/start")) {
    bot.sendMessage(
      chatId,
      "Welcome to the Telegram bot for Url Shortener. Just paste the URL into the Chat bot it will return the short link"
    );
  } else {
    await axios
      .get(`https://is.gd/create.php?format=json&url=${url}`)
      .then(({ data }) => {
        console.log(data);
        if (data.errorcode) {
          bot.sendMessage(chatId, `${data.errormessage}`);
        } else {
          bot.sendMessage(chatId, `Short URL is : ${data.shorturl}`);
        }
      });
  }
});
