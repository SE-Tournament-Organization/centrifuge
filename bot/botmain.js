// Main bot file

// init discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN || require("../local_env.json").TOKEN;

module.exports = {
    run: (newPrefix) => {
        client.login(token).catch(err => {console.log(err)});
        prefix = newPrefix;
    }
}

// constants setup, some are set from the index file.
const fs = require('fs');
client.commands = new Discord.Collection();

var prefix = "";

const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// handle ready event
client.on("ready", () => {
    console.log("Bot connected to Discord");
    client.user.setActivity(prefix + "help");
});

// separate file command handler
client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
        message.reply("`" + command + "` is not a command. **Type " + prefix + "help** to see the list of commands.");
        return;
    };

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('🤦‍♀️ I just dug into a Soltrium Canister! Sorry, I was **unable to execute your command.**');
	}
});