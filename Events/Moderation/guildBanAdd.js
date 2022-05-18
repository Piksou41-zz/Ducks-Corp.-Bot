const { EmbedBuilder, Util } = require("discord.js");
module.exports = async(client, ban) => {
    const fetchedLogs = await ban.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
    const deletionLog = fetchedLogs.entries.first();
    const { executor } = deletionLog;

    const embed = new EmbedBuilder()
    .setTitle("Un utilisateur a été banni !")
    .setColor("#FF0000")
    .setDescription(`
        Personne sanctionnée : ${ban.user.tag}
        Banni par : ${executor.tag}
    `)
    .setTimestamp()

    return (
        client.channels.cache.get("925744986820055090").send({ embeds: [embed] }),
        client.channels.cache.get("867695417331810305").send(`${ban.user.tag} a été banni! N'oubliez pas de respecter le <#867695417331810304> !`)
    );
};