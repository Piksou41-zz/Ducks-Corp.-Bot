//@ts-check

const Commands = require("../../Commands.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");

module.exports = class Test extends Commands {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Permet de tester.",
            category: "Owner",
            owner: true,
            slash: false,
            args: true
        });
    };

    async run(message, args) {
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();
        const rss = createAudioResource("../../t.mp3", {
            metadata: { 
                title: "A sound."
            }
        });

        connection.subscribe(player);
        player.play(rss);
        player.on("error", console.log)
    };
};