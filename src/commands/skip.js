const { Client } = require("discord.js");

module.exports = {
    name: "skip",
    aliases: [],
    cooldown: 1,
    description: "⚡ Skip current song",
    permissions: [""],

    /**
     * @param {Client} client 
     */

    run: async (client, args) => {
        const vc = global.connections.get(client.guild.me.voice.channel?.id);

        if(!vc) return client.channel.send({content: `❌ There is currently nothing playing!`});
            global.audioManager.skip(vc).then(() => client.channel.send({content: `✅ Successfully skipped the song!`})).catch(err => {
                console.log(err);
                client.channel.send({content: `❌ There was an error while skipping the song!`});
            });
    }
}