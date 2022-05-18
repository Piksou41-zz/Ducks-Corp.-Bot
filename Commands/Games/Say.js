//@ts-check
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Suggserv extends Commands {
    constructor(client, message) {
        super(client, {
            name: "test",
            description: "Permet de faire répéter un message au bot.",
            category: "Jeux",
            slash: true,
            options: [{
                name: "message",
                type: ApplicationCommandOptionType.String,
                description: "Le message à répéter",
                required: true
            }],
            args: true,
            owner: false
        });
    };

    async run(interaction) {
        const embed = new EmbedBuilder()
        .setColor(this.client.utils.colors.red)
        .setTitle("La commande `say` vient d'être utilisée !")
        .setThumbnail(`${interaction.user.avatarURL({ dynamic: true })}`)
        .addFields([
            { name: "Message :", value: interaction.options.getString("message") }
        ])
        .setFooter({ text: `Message de: ${interaction.user.tag} (${interaction.user.id})` })
        .setTimestamp()
        
        return (
            // @ts-ignore
            this.client.channels.cache.get("925744986820055090").send({ embeds: [embed] }),
            interaction.reply(interaction.options.getString("message"))
        );
    };
};