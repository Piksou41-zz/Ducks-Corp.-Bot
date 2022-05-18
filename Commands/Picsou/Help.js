// @ts-check
const Commands = require("../../Commands.js");
const { EmbedBuilder, Util, ApplicationCommandOptionType } = require("discord.js");

module.exports = class Ping extends Commands {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Permet d'obtenir la listes des commandes.",
            category: "Picsou",
            slash: true,
            options: [{
                name: "commande",
                type: ApplicationCommandOptionType.String,
                description: "La commande dont vous souhaitez avoir des informations."
            }],
            args: true,
            owner: false
        });
    };

    async run(interaction) {
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setThumbnail(this.client.user.avatarURL())
        .setColor("#8DD508")

        if(interaction.options.getString("commande")) {
            const command = this.client.commands.get(interaction.options.getString("commande"));
            // @ts-ignore
            const cmd = new command(this.client);
            
            if(cmd?.owner && interaction.author.id !== "636658002010832927") return;

            if(!cmd) return interaction.reply("Commande introuvable !");
            if(cmd.owner && interaction.user.id !== "636658002010832927") return;

            embed.setTitle(`${cmd.name} infos !`)
            .addFields([
                { name: "Description :", value: `${cmd.description ?? "Aucune description."}`, inline: true },
                { name: "Catégorie :", value: `${cmd.category ?? "Aucune catégorie."}`, inline: true },
                { name: "Disponible en slash commande ?", value: `${cmd.slash ? "Oui" : "Non"}`, inline: true },
                { name: "Ajout possible d'arguments ?", value: `${cmd.args ? "Oui" : "Non"}`, inline: true }
            ])
        } else {
            embed.setTitle("La liste de mes commandes !")
            .addFields([
                { name: "Picsou :", value: "`ping`, `help`, `bot-infos`" },
                { name: "Jeux :", value: "`8ball`, `blagues`" },
                { name: "Modération :", value: "`ban`, `clear`" },
                { name: "Utilitaire :", value: "`suggserv`, `channel-infos`, `levels`, `rank`, `serveur-infos`, `ticket(open | close | infos)`, `user-infos`" }
            ])
            .setFooter({ text: `Pour plus d'informations sur une commandes ; faites la commande suivante ; /help <nom de la commande>` })
        };

        return interaction.reply({ embeds: [embed] });
    };
};