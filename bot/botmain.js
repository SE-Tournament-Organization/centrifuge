// Main bot file

// init discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN || require("../local_env.json").TOKEN;

// constants setup, some are set from the index file.
var prefix = "";
const handler = require("./handler.js")

module.exports = {
    run: (newPrefix) => {
        client.login(token).catch(err => {console.log(err)});
        prefix = newPrefix;
    }
}


// handle ready event
client.on("ready", () => {
    console.log("Bot connected to Discord");
    client.user.setActivity(prefix + "help");
    handler.updateVars(prefix);
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        handler.command(message);
    }
});