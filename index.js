// The best way to keep things organised is to make it modular.

// Run the bot
const bot = require("./bot/botmain.js");
bot.run("se!");

// Connect to Google Sheets API
const sheets = require("./googleapis/sheets.js");
sheets.authenticate();

// Sample code getting player data from database
// setTimeout(testFunc, 1000);
function testFunc() {
    sheets.getUserData("TotallyToasted")
        .then(row => { console.log(row[0] + " " + row[1] + " " + row[2] + " " + row[3] + " " + row[4] + " " + row[5] + " " + row[6]) })
        .catch(err => {console.log(err)});
}

