const Discord = require("discord.js");
const sheets = require("../../googleapis/sheets.js");

module.exports = {
    name: 'stats',
    description: 'Sends the overall stats of a player who has played in any SETO tournament.',
    usage: ' <player>',
    execute(message, args) {
        if (args.length == 0) {
            return message.reply("Which Mercenary's stats would you like to see? I can't read your mind, you know.");
        }
        sheets.getUserData(args[0])
            .then(row => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#005eff')
                    .setTitle('Player Stats: ' + row[0] + " [Rank " + row[7] + "]")
                    .setDescription('This message shows their overall stats across all SETO tournaments they have played in.')
                    .setFooter('SETO Bot')
                    .addFields({ name: "Points", value: row[1], inline: true },
                        { name: "Match Wins", value: row[2], inline: true },
                        { name: "Match Losses", value: row[3], inline: true },
                        { name: "Placements", value: "---", inline: false },
                        { name: "Gold", value: row[4], inline: true },
                        { name: "Silver", value: row[5], inline: true },
                        { name: "Bronze", value: row[6], inline: true }
                    );
                message.channel.send({embeds: [embed]});
            })
            .catch(err => { 
                console.log(err);
                message.reply("**Something went wrong**: " + err);
             });
    }
}