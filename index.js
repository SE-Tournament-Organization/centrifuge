require("dotenv").config();
// The best way to keep things organised is to make it modular.

// Run the bot
const bot = require("./bot/botmain.js");
bot.run("se!");

// Connect to Google Sheets API
const sheets = require("./googleapis/sheets.js");
sheets.authenticate();



