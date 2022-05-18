const { EmbedBuilder, Util } = require("discord.js");
module.exports = async(client, ban) => {
    const fetchedLogs = await ban.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_REMOVE" });
    const deletionLog = fetchedLogs.entries.first();
    const { executor } = deletionLog;

    const embed = new EmbedBuilder()
    .setTitle("Un utilisateur a été débanni !")
    .setColor("#FF0000")
    .setDescription(`
        Utilisateur : ${ban.user.tag}
        Débanni par : ${executor.tag}
    `)
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};