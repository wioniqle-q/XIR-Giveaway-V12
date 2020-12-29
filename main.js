const Discord = require("discord.js")   
const client = new Discord.Client();  
const config = require("./config.js")   
const fs = require("fs");             
require('./util/Loader.js')(client); 
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection(); 
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                      
    let props = require(`./commands/${f}`);  
    console.log(`${props.config.name} komutu yüklendi.`);  
    console.log("BOT KULLANIMA HAZIR!");
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})

client.login(config.token)
