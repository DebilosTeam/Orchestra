const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
    cooldown: 1,
    description: "Pong 🏓",
    permissions: [""],

    /**
     * @param {Client} client 
     * @param {Message} message 
     */

    run: async (client, message, args, prefix) => {
        client.channel.send("Pong 🏓");
    }
}
