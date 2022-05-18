const { EmbedBuilder, Util } = require("discord.js");
module.exports = async(client, message) => {
    if(message.embeds.length || message.attachments.first()) return;

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}`})
    .setColor("#FF0000")
    .setDescription(`
        **Un message envoyé par ${message.author} a été supprimé dans ${message.channel}.**
        ${message.content}
    `)
    .setFooter({ text: `Id de l'utilisateur : ${message.author.id}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};