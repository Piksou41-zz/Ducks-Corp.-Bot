//@ts-check
const { EmbedBuilder, Util } = require("discord.js");
const Commands = require("../../Commands.js");
const { readFileSync } = require("fs");
const { EmbedPagination } = require("djs-embedpagination");

module.exports = class Levels extends Commands {
    constructor(client) {
        super(client, {
            name: "levels",
            description: "Permet d'obtenir le classement des gens les plus actifs sur le serveur.",
            category: "Informations",
            owner: false,
            slash: true,
            args: false
        });
    };

    run(interaction) {
        const file = JSON.parse(readFileSync("./Bdd/Levels/users.json").toString());

        const data = [];
        for(const [userId, { level, xp }] of Object.entries(file).sort(([, a], [, b]) => b.xp - a.xp)) data.push(`<@${userId}> ; Niveau : ${level} | Xp : ${xp}`);

        function createEmbed(i) {
            return new EmbedBuilder()
                .setTitle(`${i.page === 1 ? "Classement des utilisateurs en fonction de leurs expériences :" : "Page" + i.page}`)
                .setDescription(data.slice((i.page - 1) * 10, i.page * 10).join("\n\n"))
                .setColor(Util.resolveColor("Random"))
                .setFooter({ text: "En béta" })
                .setTimestamp()
        };

        const functions = [];
        for(let k = 0; k < data.length / 10; k++) functions.push(createEmbed);

        const pagination = new EmbedPagination(this.client.user.id)
        .setUserId(interaction.user.id, "Vous n'êtes pas autorisé à intéragir avec cet embed.")
        .setInteraction(interaction)
        .setEmbeds(functions)

        return pagination.start();
    };
};