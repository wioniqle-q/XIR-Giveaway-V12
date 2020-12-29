const Discord = require("discord.js"),
client = new Discord.Client();
const ms = require('ms');
module.exports.run = async (client, message, args) => {
  if(!args[0]) return message.channel.send(':x: Çekiliş ID belirtin.');
  let giveaway =  client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
  if(!giveaway) return message.channel.send('Çekiliş Bulunamadı : `'+ args.join(' ') + '`.');
    client.giveawaysManager.edit(giveaway.messageID, { setEndTimestamp: Date.now() }).then(() => {
        message.channel.send('Çekiliş '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye sonra sonlandırılıyor...');
    }).catch((e) => { if(e.startsWith(`${giveaway.messageID} ID'li çekiliş zaten sonlandırılmış.`)){ message.channel.send('Çekiliş zaten sonlandırılmış.');
        } else {
            console.error(e);
        }
    });
};

exports.config = {
  name: "end",
  guildOnly: true,
  aliases: ["bitir", "durdur", "sonlandır"],
};