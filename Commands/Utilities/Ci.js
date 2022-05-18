// @ts-check
const { EmbedBuilder, Util, ChannelType, ApplicationCommandOptionType } = require("discord.js");
const Commands = require("../../Commands.js");
const moment = require("moment");
const ms = require("ms");

module.exports = class Ci extends Commands {
    constructor(client) {
        super(client, {
            name: "channel-infos",
            description: "Donne des informations sur le salon sélectionné.",
            category: "Informations",
            owner: false,
            slash: true,
            options: [{
                name: "salon",
                type: ApplicationCommandOptionType.Channel,
                description: "Salon"
            }],
            args: true
        });
    };

    run(interaction) {
        const cha = {
            [ChannelType.GuildText]: "Textuel",
            [ChannelType.GuildVoice]: "Vocal",
            [ChannelType.GuildCategory]: "Catégorie",
            [ChannelType.GuildNews]: "Salon des annonces",
            [ChannelType.GuildNewsThread]: "Thread d'un salon d'annonces",
            [ChannelType.GuildPublicThread]: "Thread d'un salon publique",
            [ChannelType.GuildPrivateThread]: "Thread d'un salon privé",
            [ChannelType.GuildStageVoice]: "Salon de stage",
        };

        const target = interaction.options.getChannel("salon") || interaction.channel;

        const embed = new EmbedBuilder()
        .setColor(Util.resolveColor("Random"))
        .setTitle(`${target.name} infos`)
        .addFields([
            { name: "Id:", value: `${target.id}`, inline: true },
            { name: "Crée le:", value: `${moment(target.createdAt).format("DD/MM/YYYY à HH:mm:ss")}`, inline: true },
            { name: "Type:", value: `${cha[target.type]}`, inline: true }
        ])
        .setTimestamp()

        switch(target.type) {
            case ChannelType.GuildStageVoice:
            case ChannelType.GuildVoice:
                embed.addFields([
                    { name: "Bitrate :", value: `${target.bitrate}`, inline: true },
                    { name: "Limite d'utilisateurs :", value: `${target.userLimit}`, inline: true },
                    { name: "Catégorie:", value: `${target.parent ? target.parent.name : "Aucune"}`, inline: true },
                    { name: "Région :", value: `${target.rtcRegion}`, inline: true }
                ]);
                break;

            case ChannelType.GuildCategory:
                return interaction.reply({ embeds: [embed] });

            case ChannelType.GuildPrivateThread:
            case ChannelType.GuildPublicThread:
                embed.addFields([
                    { name: "Cooldown:", value: `${target.rateLimitPerUser ? ms(target.rateLimitPerUser * 1e3): "Aucun."}`, inline: true },
                    { name: "Catégorie:", value: `${target.parent ? target.parent.name : "Aucune"}`, inline: true }
                ]);
                break;

            case ChannelType.GuildText:
                embed.addFields([
                    { name: "Catégorie:", value: `${target.parent ? target.parent.name : "Aucune"}`, inline: true },
                    { name: "Description :", value: `${target.topic || "Aucune"}` },
                    { name: "Cooldown:", value: `${target.rateLimitPerUser ? ms(target.rateLimitPerUser * 1e3): "Aucun."}`, inline: true}
                ]);
                break;
        };
        return interaction.reply({ embeds: [embed] });
    };
};