const { EmbedBuilder, Util } = require("discord.js");
const moment = require("moment");
module.exports = async(client, invite) => {
    const fetchedLogs = await invite.guild.fetchAuditLogs({ limit: 1, type: "INVITE_REMOVE" });
    const deletionLog = fetchedLogs.entries.first();
    const { executor } = deletionLog;

    const age = {
        0: "N'expire pas",
        1800: "30 minutes",
        3600: "1 heure",
        21600: "6 heures",
        43200: "12 heures",
        86400: "1 jour",
        604800: "7 jours"
    };
    
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Une invitation vient d'être supprimée !`, iconURL: `${executor.displayAvatarURL()}`})
    .setColor(client.colors.red)
    .setDescription(`
        **Salon:** ${invite.channel}
        **Url:** ${invite.url}
    `)
    .setFooter({ text: `Id du salon : ${invite.channelId}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};