const { Client } = require("discord.js");

module.exports = {
    name: "stop",
    aliases: [],
    cooldown: 1,
    description: "⛔ Stop playback",
    permissions: [""],

    /**
     * @param {Client} client 
     */

    run: async (client, args) => {
        const vc = global.connections.get(client.guild.me.voice.channel?.id);

        if(!vc) return client.channel.send({content: `ℹ There is currently nothing playing!`});
            global.audioManager.skip(vc).then(() => client.channel.send({content: `✅ Successfully skipped the song!`})).catch(err => {
                console.log(err);
                client.channel.send({content: `❌ There was an error while skipping the song!`});
            });
    }
}