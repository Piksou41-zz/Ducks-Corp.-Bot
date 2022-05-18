//@ts-check
const { EmbedBuilder, Util, ApplicationCommandOptionType } = require ("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Hballs extends Commands {
    constructor(client) {
        super(client, {
            name: "8ball",
            description: "Permet de poser une question au bot.",
            category: "Jeux",
            owner: false,
            slash: true,
            options: [{
                name: "question",
                type: ApplicationCommandOptionType.String,
                description: "La question à poser au bot.",
                required: true
            }],
            args: true
        });
    };
    
    async run(interaction) {
        let huitball = ["Oui","Non", "Bien sûr que non", "Bien sûr que oui !"];
        // @ts-ignore
        huitball = huitball[Math.floor(Math.random() * huitball.length)];
       
        const embed = new EmbedBuilder()
        .setColor(Util.resolveColor("Random"))
        .setDescription(`**Question :** ${interaction.options.getString("question")} \n\n\n**Réponse :** ${huitball}`)
        .setTimestamp()
    
        return interaction.reply({ embeds: [embed] });
    };
};