const { EmbedBuilder, Util } = require("discord.js");
const moment = require("moment");
module.exports = (client, invite) => {
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
    .setAuthor({ name: `Une invitation vient d'être crée !`, iconURL: `${invite.inviter.displayAvatarURL()}`})
    .setColor(client.utils.colors.green)
    .setDescription(`
        **Salon:** ${invite.channel}
        **Créateur:** ${invite.inviter} (${invite.inviterId})
        **Crée le:** ${moment(invite.createdAt).format("DD/MM/YYYY à HH:mm:ss")}
        **Expire le:** ${moment(invite.expiresAt).format("DD/MM/YYYY à HH:mm:ss")}
        **Duré:** ${age[invite.maxAge]}
        **Url:** ${invite.url}
        **Maximum d'utilisation:** ${invite.maxUses}
    `)
    .setFooter({ text: `Id du salon : ${invite.channelId}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};