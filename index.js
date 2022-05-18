const { client } = require("./functions");
const { Collection } = require("discord.js");

client.commands = new Collection();
client.config = require("./config.json");
client.utils = require("./functions");

client.utils.loadCommands();
client.utils.loadEvents();

client.login(client.config.token);