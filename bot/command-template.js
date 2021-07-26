const Discord = require("discord.js");

module.exports = {
    // The command you want the user to send to run this code
    name: 'template',
    // The description which shows up in help commands
    description: 'The template command file to help developers on the project',
    // A space, and then any arguments. Required arguments in <>, optional arguments in []
    usage: ' <foo> [bar]',
    execute(message, args) {
        // The actual code
        return "executed";
    }
}