//@ts-check
"use strict";

const { readFileSync, readdirSync } = require("fs");
const { Client, GatewayIntentBits, Util } = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
] });

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

function loadCommands(dirCommands = "./Commands") {
  readdirSync(dirCommands).forEach(dirs => {
    const commands = readdirSync(`${dirCommands}/${dirs}/`).filter(files => files.endsWith(".js"));
    for(const file of commands) {
      const getFileName = require(`${dirCommands}/${dirs}/${file}`);
      const { name } = new getFileName(client);
      // @ts-ignore
      client.commands.set(name, getFileName);
      console.log(`${name} chargé !`);
    };
  });
};

function loadEvents(dirEvent = "./Events") {
readdirSync(dirEvent).forEach(dirs => {
  const events = readdirSync(`${dirEvent}/${dirs}/`).filter(files => files.endsWith(".js"));
  for(const event of events) {
    const evt = require(`${dirEvent}/${dirs}/${event}`);
    const evtName = event.split(".")[0];
    client.on(evtName, evt.bind(null, client));
    console.log(`${evtName} chargé !`);
  };
});
};

const fileInfos = JSON.parse(readFileSync("./Bdd/infos.json").toString());
const colors = {
  "red": "#E11515",
  "green": "#4F9721"
};

module.exports = {
  fileInfos: fileInfos,
  colors: colors,
  client: client,

  loadEvents: loadEvents,
  loadCommands: loadCommands,
  sleep: sleep
};