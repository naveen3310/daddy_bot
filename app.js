const express = require("express");
const app = express();
const TeleBot = require("telebot");
const bot = new TeleBot("2012648633:AAE5ZObCikxhN3eUjTcppYt1YucSaHBGJ08");
const bodyParser = require("body-parser");
const https = require("https");
const { urlencoded } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
let cross = "";
let image_name = "";

//bot
bot.on(["/start", "/hello"], (msg) => {
  msg.reply.text(
    "If you want to finding any picture of any kind of, you have to just Type /image and then image name"
  );
  msg.reply.text("Welcome! " + msg.from.first_name);
});

bot.on("text", (msg) => {
  if (
    msg.text === "hi" ||
    msg.text === "Hi" ||
    msg.text === "HI" ||
    msg.text === "Hello" ||
    msg.text === "HELLO" ||
    msg.text === "hello"
  ) {
    msg.reply.text("hello!");
  } else if (
    msg.text === "i love you" ||
    msg.text === "I love you" ||
    msg.text === "I luv u" ||
    msg.text === "i luv u" ||
    msg.text === "I LOVE YOU"
  ) {
    msg.reply.text("its not working🤐");
  } else if (
    msg.text === "How are you" ||
    msg.text === "how are you" ||
    msg.text === "HOW ARE YOU"
  ) {
    msg.reply.text("I'm Fine how about you!");
  }
  console.log(msg.from.first_name);
});

bot.on(/(show\s)?flower*/, (msg) => {
  return msg.reply.photo(cross);
});

bot.on(["/image"], (msg) => {
  let m1 = msg.text;
  let m2 = m1.slice(7);
  m2 = m2.replace(/\s/g, "+");

  console.log(m2);
  let url =
    "https://pixabay.com/api/?key=12719053-2efd9f4edb197bf13e099f45a&q=" +
    m2 +
    "&image_type=photo&pretty=true";

  https.get(url, function (response) {
    // console.log(response);
    let dada = "";
    response.on("data", function (data) {
      dada += data;
    });
    response.on("end", function () {
      let dala = JSON.parse(dada);
      let randomNum1 = dala.hits;
      let randomNum3 = randomNum1.length;
      let randomNum2 = Math.round(Math.random() * randomNum3);
      cross = dala.hits[randomNum2].largeImageURL;
      console.log(randomNum2);
      return msg.reply.photo(cross);
    });
  });
});

bot.start();
