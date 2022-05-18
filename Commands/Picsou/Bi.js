const { EmbedBuilder, Util, version} = require("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Bi extends Commands {
    constructor(client) {
        super(client, {
            name: "bot-infos",
            description: "Permet d'obtenir des informations sur le bot.",
            category: "Picsou",
            slash: true,
            args: false
        });
    };

    async run(interaction) {
        const embed = new EmbedBuilder()
        .setColor(Util.resolveColor("Random"))
	    .setAuthor({ name: `${this.client.user.username} infos`})
        .setThumbnail(`${this.client.user.avatarURL()}`)
        .addFields([
            { name: "Nom complet:", value: `${this.client.user.tag}`, inline: true },
            { name: "Surnom du bot:", value: `${this.client.user.username}`, inline: true },
            { name: "Id du bot:", value: `${this.client.config.clientId}`, inline: true },
            { name: "Nombre de commandes:", value: `${this.client.commands.size}`, inline: true },
            { name: "Développé en :", value: "JavaScript", inline: true },
            { name: "Avec la librairie :", value: "Discord.js", inline: true },
            { name: "Version de discord.js :", value: `${version}`, inline: true },
            { name: "Version de nodejs", value: `${process.version}`, inline: true }
        ])
        .setFooter({ text: "Créé par amour : Picsou#0937." })
        .setTimestamp()

        return interaction.reply({ embeds: [embed] });
    };
};