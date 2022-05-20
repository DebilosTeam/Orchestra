const { Client, Collection } = require("discord.js");
const { AudioManager } = require('discordaudio');


const client = new Client({
    intents: 649
});

const { token } = require("./config.json");

client.commands = new Collection();
client.events = new Collection();

//PLZ FIX THAT I FUCK THIS LANGUAGE (or just ignore, but global vars are really sussy)
global.connections = new Map();
global.audioManager = new AudioManager();

["eventHandler", "commandHandler"].forEach(func => {
    require(`./src/functions/${func}`)(client);
});

client.login(token);