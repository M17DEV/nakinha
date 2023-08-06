require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("guildMemberAdd", (member) => {
    let canal_logs = "1112245107463311440";
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 TROPA DA NAKAMOTO!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content".
  })
  
  client.on("guildMemberRemove", (member) => {
    let canal_logs = "1112245136634675271"; // Coloque o ID do canal de texto
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Adeus ${member.user.username}....`)
    .setDescription(`> O usuário ${member} acabou de sair! \n> 😓 Agora temos ! \`${member.guild.memberCount}\` membros.`);
  
    
  let logsChannel = member.guild.channels.cache.get(canal_logs);
  if (logsChannel) {
    logsChannel.send({ embeds: [embed], content: `${member}` });
    // Caso queira que o usuário não seja mencionado, retire a parte do "content". 
  }
});
  
  