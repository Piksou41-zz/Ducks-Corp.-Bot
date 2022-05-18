// @ts-check
const Commands = require("../../Commands.js");
const { EmbedBuilder, Util } = require("discord.js");

module.exports = class Ping extends Commands {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Permet d'obtenir la latence du bot et de l'API.",
            category: "Picsou",
            slash: true,
            args: false,
            owner: false
        });
    };

    async run(interaction) {
        const msg = await interaction.reply({ content: "Pong !", fetchReply: true });

        const embed = new EmbedBuilder()
        .setColor(Util.resolveColor("Random"))
        .addFields([
            { name: "Bot :", value: `${msg.createdTimestamp - interaction.createdTimestamp} ms` },
            { name: "API :", value: `${this.client.ws.ping} ms` }
        ])
        .setTimestamp();

        return interaction.editReply({ embeds: [embed] });   
    };
};