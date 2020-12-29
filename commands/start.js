const Discord = require("discord.js"),
client = new Discord.Client();
const ms = require("ms");
const config = require("../config.json")
const hostedBy = config.hostedBy
const everyoneMention = config.everyoneMention
module.exports.run = async (client, message, args) => { 
  let çekilişKanal = message.mentions.channels.first();
  if(!çekilişKanal) return message.channel.send(':x: Kanal belirtin.').then(x => x.delete({timeout: 10000}));
  let çekilişSüre = args[1];
  if(!çekilişSüre || isNaN(ms(çekilişSüre))) return message.channel.send(':x: Zaman belirtin. 1s/1m/1h/1d/1w').then(x => x.delete({timeout: 10000}));
  let çekilişKazanan = args[2];
  if(isNaN(çekilişKazanan) || (parseInt(çekilişKazanan) <= 0)) return message.channel.send(':x: Kazanacak kişi sayısını belirtin.').then(x => x.delete({timeout: 10000}));
  let çekilişÖdül = args.slice(3).join(' ');
  if(!çekilişÖdül) return message.channel.send(':x: Ödülü belirtin.').then(x => x.delete({timeout: 10000}));
  client.giveawaysManager.start(çekilişKanal, {
    time: ms(çekilişSüre),
    prize: çekilişÖdül,
    winnerCount: çekilişKazanan,
    hostedBy: config.hostedBy ? message.author : null,
    messages: {
      giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ** 🎉🎉",
      giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ BİTTİ** 🎉🎉",
      timeRemaining: "Kalan Süre: **{duration}**!",
      inviteToParticipate: "Çekilişe katılmak için 🎉 emojisine tıklayın.",
      winMessage: "Tebrikler, {winners}! **{prize}** ödülü kazandın!",
      embedFooter: "Çekiliş",
      noWinner: "Çekilişe kimse katılmadığı için çekiliş iptal edildi.",
      hostedBy: "Paylaşan: {user}",
      winners: "Kazananlar",
      endedAt: "Bitiş Süresi",
      units: {
        seconds: "saniye",
        minutes: "dakika",
        hours: "saat",
        days: "gün",
        pluralS: false 
      }
    }
  });
  message.channel.send(`Çekilişi ${çekilişKanal} adlı kanalda başlattım.`).then(x => x.delete({timeout: 10000}));
};

exports.config = {
  name: "start",
  guildOnly: true,
  aliases: ["başlat", "new", "create"],
};
