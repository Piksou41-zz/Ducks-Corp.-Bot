const { EmbedBuilder, Util } = require("discord.js");
const moment = require("moment");

module.exports = async(client, member) => {
    const embedLogs = new EmbedBuilder()
    .setTitle(`${member.user.tag} à quitté le serveur !`)
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true }) }`)
    .setDescription(`Ce compte à été crée le : ${moment(member.user.createdAt).format("DD/MM/YYYY à HH:mm:ss")}`)
    .setColor("#FF0000")
    .setFooter({ text: `Id : ${member.id}` })
    .setTimestamp()

    return (
        client.channels.cache.get("925744986820055090").send({ embeds: [embedLogs] }),
        client.channels.cache.get("867695417331810305").send(`**${member.user.tag}** nous a quitté ! Bonne continuation à lui !`)
    );
};