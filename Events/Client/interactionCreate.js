module.exports = (client, interaction) => {
    const Cmd = client.commands.get(interaction.commandName);
    if(!Cmd) return;

    const command = new Cmd(client).run(interaction);
};