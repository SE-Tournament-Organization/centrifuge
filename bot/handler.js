// This is where commands should be handled

// give us access to discord.js
const Discord = require ("discord.js")

// constants setup, some are set from the main file.
var prefix = "";

module.exports = {

    command: (message) => {
        message.channel.send("You've just run what I identified as a command.");
    },
    updateVars: (newPrefix) => {
        prefix = newPrefix;
    }
}