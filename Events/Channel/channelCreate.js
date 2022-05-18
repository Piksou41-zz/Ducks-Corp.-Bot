const { EmbedBuilder, ChannelType, AuditLogEvent } = require("discord.js");
module.exports = async(client, channel) => {
    const fetchedLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelCreate });
    const deletionLog = fetchedLogs.entries.first();
    const { executor } = deletionLog;
    const cha = {
        [ChannelType.GuildText]: "Textuel",
        [ChannelType.GuildVoice]: "Vocal",
        [ChannelType.GuildCategory]: "Catégorie",
        [ChannelType.GuildNews]: "Salon des annonces",
        [ChannelType.GuildNewsThread]: "Thread d'un salon d'annonces",
        [ChannelType.GuildPublicThread]: "Thread d'un salon publique",
        [ChannelType.GuildPrivateThread]: "Thread d'un salon privé",
        [ChannelType.GuildStageVoice]: "Salon de stage",
    };

    const embed = new EmbedBuilder()
        .setColor("#4F9721")
        .setTitle(`Un salon vient d'être crée !`)
        .setDescription(`
            Nom du salon : ${channel.name} \n 
            Catégorie : ${channel.parent ?? "Aucune catégorie."} \n
            Salon crée par : **${executor.tag}** \n 
            Type : ${cha[channel.type]}
        `)
        .setFooter({ text: `Id du salon : ${channel.id}` })
        .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};