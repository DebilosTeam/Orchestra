const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 649
});

const { token } = require("./config.json");

client.commands = new Collection();
client.events = new Collection();

["eventHandler", "commandHandler"].forEach(func => {
    require(`./functions/${func}`)(client);
});

client.login(token);
