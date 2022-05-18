//@ts-check
const { PermissionsBitField, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const Commands = require("../../Commands.js");

module.exports = class Clear extends Commands {
    constructor(client) {
        super(client, {
            name: "clear",
            description: "Permet de supprimer un groupe de message.",
            category: "Modération",
            owner: false,
            slash: true,
            options: [
                {
                    name: "quantitee",
                    type: ApplicationCommandOptionType.Integer,
                    description: "quantite",
                    minValue: 1,
                    maxValue: 100,
                    required: true
                },
                {
                    name: "salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread, ChannelType.GuildForum, ChannelType.GuildNews, ChannelType.GuildNewsThread],
                    description: "salon"
                }
            ],
            args: true
        });
    };

    async run(interaction) {
        if(interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            let target = interaction.options.getChannel("salon");
            const number = interaction.options.getNumber("quantitee");

            if(!target) target = interaction.channel;

            await target.bulkDelete(`${number}`, true);
            return interaction.reply({ content: `${number} messages ont été supprimés avec succès !`, ephemeral: true })
        } else return interaction.reply("Permission insuffisante !");
    };
};