//@ts-check
const { EmbedBuilder, Util, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const moment = require("moment");
const Commands = require("../../Commands.js");
module.exports = class Eval extends Commands {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Permet d'évaluer un code.",
            category: "Owner",
            owner: true,
            slash: false,
            args: true
        });
    };

    async run(message, args) {
        if(!args.length) return message.channel.send("Veuillez mettre des arguments !");

        try {
            const evalueted = await eval(args.join(" "));
            return message.channel.send(`${evalueted}`, { code: "js" });
        } catch (e) {
            return message.channel.send(`${e}`, { code: "js" });
        };
    };
};