    const Discord = require("discord.js")

module.exports = {
  name: 'avaliar_rec', // Coloque o nome do comando
  description: 'Avalie um staff do servidor.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'recrutador',
        description: 'Qual o (a) recrutador (a) que você deseja avaliar?',
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: 'estrelas',
        description: 'Dê uma nota de 0 a 10 estrelas para o (a) recrutador (a) escolhido.',
        type: Discord.ApplicationCommandOptionType.Number,
        required: true,
    },
    {
        name: 'descrição',
        description: 'Descreva sua experiência com o (a) recrutador (a) escolhido.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    const staffRoleID = '1117571793943797870' // ID cargo de staff
    const channelLogID = '1137155614318022777' // ID canal de logs
    const staffMember_Verification = interaction.options.getUser('recrutador');
    const staffMember = interaction.guild.members.cache.get(staffMember_Verification.id)
    const stars = interaction.options.getNumber('estrelas')
    const description = interaction.options.getString('descrição')

    function avaliarStaff(user, estrelas, desc) {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor('Green')
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`O membro ${interaction.user} ) enviou uma avaliação.`)
        .addFields(
            {
                name: `> 💼 Staff`,
                value: `${user} )`,
                inline: false
            },
            {
                name: `> ⭐ Estrelas`,
                value: `\`${estrelas}/10 Estrelas\``,
                inline: false
            },
            {
                name: `> 📝 Descrição`,
                value: `${desc}`,
                inline: false
            }
        )
        try {
            interaction.guild.channels.cache.get(channelLogID).send({ embeds: [embed] }).then( () => {
                interaction.reply({ ephemeral: true, content: `Sucesso, sua avaliação foi enviada!\nDados:\n\`\`\`\n- [💼] Staff: ${user.user.username} (${user.user.id})\n- [⭐] Estrelas: ${estrelas}/10\n- [📝] Descrição: ${desc}\n\`\`\`` })
            })
        } catch (err) {
            interaction.reply({ ephemeral: true, content: `Algo deu errado: \`\`\`\n${err}\n\`\`\`` })
        } 
    }

    if (!interaction.guild.roles.cache.get(staffRoleID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O cargo de staff não existe ou foi configurado incorretamente.' })
    }
    else if (!interaction.guild.channels.cache.get(channelLogID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O canal de logs não existe ou foi configurado incorretamente.' })
    }
    else if (!staffMember) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O usuário mencionado não está no servidor.' })
    }
    else if (!staffMember.roles.cache.get(staffRoleID)) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: O usuário mencionado não é da staff.' })
    }
    else if (stars < 1 || stars > 10) {
        interaction.reply({ ephemeral: true, content: '[❌] Erro: Você só pode colocar estrelas de 1 a 10.' })
    }
    else {
        avaliarStaff(staffMember, stars, description)
    }
  }
}