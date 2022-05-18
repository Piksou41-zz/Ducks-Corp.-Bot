//@ts-check

const { EmbedBuilder } = require("discord.js");

module.exports = async(client, emoji) => {
    console.log(emoji);
	const fetchedLogs = await emoji.fetchAuditLogs({
		limit: 1,
		type: "EMOJI_CREATE",
	});
	const deletionLog = fetchedLogs.entries.first();

	const { executor } = deletionLog;

    const embed = new EmbedBuilder()
    .setColor("#4F9721")
    .setTitle(`Un émoji vient d'être crée !`)
    .setDescription(`
        Nom : **${emoji.name}**
        Animé ? **${emoji.animated ? "Oui" : "Non"}**
        URL : **${emoji.url}**
        Crée par : **${executor.tag ?? "inconnue"}**
    `)
    .setFooter({ text: `Id de l'émogi : ${emoji.id}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};