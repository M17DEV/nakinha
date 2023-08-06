const Discord = require("discord.js")

module.exports = {
  name: "ban",
  description: "Banir um usuário.", 
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione o usuário que queira banir para ser banido.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira o motivo do banimento.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {


    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Você não possui a permissão de Banir Membros.`);
    } else {
        let banlogs = "1112245089763348480"; // Coloque o ID do canal de texto onde ficará as logs.
        if (!banlogs) return;
        let userr = interaction.options.getUser("user");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";
    
         let embed = new Discord.EmbedBuilder()
         .setTitle(`Novo Banimento:`)
         .setDescription(`**Usuário:** ${user}\n\n **Motivo:** \`${motivo}\``)
         .setColor('Green')
        .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })
       
        user.ban({ reason: [motivo] }).then( () => {
            interaction.guild.channels.cache.get(banlogs).send({ embeds: [embed] })
            interaction.reply({content: `O usuário ${user} foi banido com sucesso.`, ephemeral: true})
        }).catch(e => {
            interaction.reply({content: `${interaction.user}, você não possui permissão para banir este usuário.`, ephemeral: true})
        })


  }}}