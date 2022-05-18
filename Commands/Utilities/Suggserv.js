// @ts-check
const { EmbedBuilder, Util, ApplicationCommandOptionType } = require("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Suggserv extends Commands {
    constructor(client, message) {
        super(client, {
            name: "suggestion",
            description: "Permet de proposer une suggestion.",
            category: "Picsou",
            slash: true,
            options: [{
                name: "suggestion",
                type: ApplicationCommandOptionType.String,
                description: "La suggestion à faire.",
                required: true
            }],
            args: true,
            owner: false
        });
    };

    async run(interaction) {
        if(interaction.options.getString("suggestion").length > 1024) return interaction.reply("Votre suggestion ne doit pas dépasser 1024 caractères");

        const embed = new EmbedBuilder()
        .setColor(Util.resolveColor("Random"))
        .setTitle("Une nouvelle suggestion a été réalisé !")
        .setThumbnail(`${interaction.user.avatarURL({ dynamic: true })}`)
        .addFields([
            { name: "Suggestion :", value: interaction.options.getString("suggestion") }
        ])
        .setFooter({ text: `Suggestion de: ${interaction.user.tag} (${interaction.user.id})` })
        .setTimestamp()

        // @ts-ignore;
        this.client.channels.cache.get(this.client.config.suggestionChannelId).send({ embeds: [embed] }).then(m => {
            m.react("✅");
            m.react("➖");
            m.react("❌");
        });

        return interaction.reply({ embeds: [embed] });
    };
};