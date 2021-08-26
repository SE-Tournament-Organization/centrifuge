// Main bot file

// init discord.js
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});
const token = process.env.TOKEN || require("../local_env.json").TOKEN;

module.exports = {
    run: (newPrefix) => {
        client.login(token).catch(err => { console.log(err) });
        prefix = newPrefix;
    },
    prefix: () => {
        return prefix;
    }
}

// constants setup, some are set from the index file.
const fs = require('fs');
client.commands = new Collection();
let prefix = "";

const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// handle ready event
client.on("ready", () => {
    console.log("Bot connected to Discord");
    client.user.setActivity("the SE Comp Scene | " + prefix + "help", { type: 'COMPETING' });
});

// separate file command handler
client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.reply("The zone is the other way! `" + command + "` is not a command. **Type " + prefix + "help** to see the list of commands.");
        return;
    };

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('🤦‍♀️ I just dug into a Soltrium Canister! Sorry, I was **unable to execute your command.**');
    }
});