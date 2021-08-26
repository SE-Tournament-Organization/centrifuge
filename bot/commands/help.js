const Discord = require("discord.js");
const mainFile = require("../botmain.js");

module.exports = {
    name: 'help',
    description: 'Lists all commands or gives info about the specific command you provide.',
    usage: ' [Command Name]',
    execute(message, args) {
        const prefix = mainFile.prefix();
        const { commands } = message.client;

        if (args.length == 0) {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Commands')
                .setDescription('Arguments enclosed in <> **are required**, while those enclosed in [] are optional.')
                .setFooter('SETO Bot');

            const names = commands.map(command => command.name);
            const descriptions = commands.map(command => command.description);
            const useages = commands.map(command => command.usage);

            for (let i = 0; i < names.length; i++) {
                // console.log("`" + prefix + names[i] + useages[i] + "` " + descriptions[i]);
                embed.addField("`" + prefix + names[i] + useages[i] + "`", descriptions[i]);
            }
            message.channel.send({embeds: [embed]});

        }

        else {
            const name = args[0].toLowerCase();
            const command = commands.get(name);
            if (!command) {
                return message.reply("Get on point, mercenary! That's not a valid command. **Try typing " + prefix + "help** to see the list of commands.");
            }
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Help: `" + prefix + command.name + "`")
                .setDescription('Arguments enclosed in <> **are required**, while those enclosed in [] are optional.')
                .addFields(
                    { name: "Usage", value: "`" + prefix + command.name + command.usage + "`" },
                    { name: "Description", value: command.description })
                .setFooter('SETO Bot');
            
            message.channel.send({embeds: [embed]});
        }
    },
};