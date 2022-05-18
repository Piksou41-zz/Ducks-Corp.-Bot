const { EmbedBuilder, Util } = require("discord.js");
module.exports = async(client, emoji) => {
    const fetchedLogs = await emoji.guild.fetchAuditLogs({ limit: 1, type: "EMOJI_DELETE" });
    const deletionLog = fetchedLogs.entries.first();
    const { executor } = deletionLog;

    const embed = new EmbedBuilder()
        .setColor("#E11515")
        .setTitle(`Un emiji vient d'être supprimé !`)
        .setDescription(`
            Nom : **${emoji.name}**
            Animé ? **${emoji.animated ? "Oui" : "Non"}**
            URL : **${emoji.url}**
            Crée par : **${executor.tag}**
        `)
        .setFooter({ text: `Id de l'émoji : ${emoji.id}` })
        .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};