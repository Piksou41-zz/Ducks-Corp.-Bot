//@ts-check
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle } = require("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Avatar extends Commands {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Permet d'obtenir la photo d'un utilisateur.",
            category: "Informations",
            owner: false,
            slash: true,
            options: [{
                name: "utilisateur",
                type: ApplicationCommandOptionType.User,
                description: "Utilisateur"
            }],
            args: true
        });
    };

    run(interaction) {
        if(interaction.user.id !== "636658002010832927") return interaction.reply(":x: Commande en travaux !");
        const target = interaction.options.getUser("utilisateur") || interaction.member.user;

        const row = new ActionRowBuilder()
        .addComponents([
            new SelectMenuBuilder()
                .setCustomId("format")
                .setPlaceholder("Format")
                .addOptions([
                    {
                        label: ".png",
                        description: "Format .png",
                        value: "png"
                    },
                    {
                        label: ".jpg",
                        description: "Format .jpg",
                        value: "jpg"
                    }
                ])
        ])
        .addComponents([
            new SelectMenuBuilder()
                .setCustomId("Taille")
                .setPlaceholder("size")
                .addOptions([
                    {
                        label: "16 px",
                        description: "Taille 16 pixels",
                        value: "16 px"
                    },
                    {
                        label: "32 px",
                        description: "Taille 32 pixels",
                        value: "32 pixels"
                    }
                ])
        ])
        .addComponents([
            new ButtonBuilder()
            .setCustomId("server")
            .setLabel("Serveur")
            .setStyle(ButtonStyle.Primary),
        ])
        .addComponents([
            new ButtonBuilder()
            .setCustomId("user")
            .setLabel("User")
            .setStyle(ButtonStyle.Primary)
        ])

        const validExtension = ["png", "jpg", "jpeg", "gif", "webp"];

        const embed = new EmbedBuilder()
        .setTitle(`Avatar de ${target.username}`)
        .setImage(`${target.avatarURL({ dynamic: true, size: 4096, extension: validExtension[0] })}`)
        .setTimestamp()
        
        const filter = i => i.customId === "format" && i.user.id === `${interaction.member.id}`;
        const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 6e5 });

        collector.on("collect", e => {
            switch(e.values[0]) {
                case validExtension[0]: changeExtension(validExtension[0]); break;
                case validExtension[1]: changeExtension(validExtension[1]); break;
                case validExtension[2]:
                    embed.setImage(`${target.avatarURL({ dynamic: true, size: 4096, extension: validExtension[2] })}`);
                    interaction.editReply("Modifié.", { embeds: [embed], components: [row] });
                    break;
                default: 
                    console.log("Error.");
                    break;
            };
        });

        function changeExtension(ext) {
            embed.setImage(`${target.avatarURL({ dynamic: true, size: 4096, extension: ext })}`);
            interaction.editReply("Modifié.", { embeds: [embed], components: [row] });
        };

        return interaction.reply({ embeds: [embed], components: [row] });
    };
};