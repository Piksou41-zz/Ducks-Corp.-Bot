const { EmbedBuilder, Util } = require("discord.js");
module.exports = (client, oldMessage, newMessage) => {
    if(oldMessage.embeds.length || newMessage.embeds.length || oldMessage.attachments.first() || newMessage.attachments.first()) return;

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${newMessage.author.tag}`, iconURL: `${newMessage.author.avatarURL({ dynamic: true }) }`})
    .setColor(Util.resolveColor("Random"))
    .setDescription(`
        [Aller au message](${newMessage.url}) (${newMessage.channel}).
        Id du message : ${newMessage.id}
        
        **Ancien message** :  \n ${oldMessage.content}
        **Nouveau message** : \n  ${newMessage.content}
    `)
    .setFooter({ text: `Id de l'utilisateur : ${newMessage.author.id}` })
    .setTimestamp()

    return client.channels.cache.get("925744986820055090").send({ embeds: [embed] });
};