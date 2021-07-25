// init discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN || require("../local_env.json").TOKEN;
client.login(token).catch(err => {console.log(err)});

// constants setup
const prefix = "!";