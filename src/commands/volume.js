const { Client } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["vol"],
    cooldown: 1,
    description: "🔉 Set playback volume",
    permissions: [""],

    /**
     * @param {Client} client 
     */

    run: async (client, args) => {
        const vc = global.connections.get(client.guild.me.voice.channel?.id);

        if(!vc) return client.channel.send({content: `ℹ There is currently nothing playing!`});
        if(!args[0]) return client.channel.send({content: `❌ Please provide the volume`});
        if(Number(args[0]) < 1 || Number(args[0]) > 10) return client.channel.send({content: `❌ Please provide a volume between 1-10`});
        global.audioManager.volume(vc, Number(args[0]));
    }
}