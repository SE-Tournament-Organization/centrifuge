const Discord = require("discord.js");

module.exports = {
	name: 'help',
	description: 'Lists all commands or info about a specific command',
    usage: '[command name]',
	execute(message, args) {
		message.channel.send("sup")      
	},
};