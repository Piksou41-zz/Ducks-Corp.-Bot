const { EmbedBuilder, Util } = require("discord.js");
module.exports = async(client, messages) => {
    const col = messages.first();
    const embed = new EmbedBuilder()
    //.setAuthor({ name: `${col.author.username}`, iconURL: `${col.author.avatarURL({ dynamic: true }) }`})
    .setColor("#FF0000")
    .setDescription(`
        **${messages.size} messages ont été supprimés dans <#${col.channelId}>.**
    `)
    .setFooter({ text: `Id du salon : ${col.channelId}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};