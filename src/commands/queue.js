const { Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: [],
    cooldown: 1,
    description: "ℹ Check current queue",
    permissions: [""],

    /**
     * @param {Client} client 
     */

    run: async (client, args) => {
        const vc = global.connections.get(client.guild.me.voice.channel?.id);

        if(!vc) return client.channel.send({content: `ℹ There is currently nothing playing!`});
            const queue = global.audioManager.queue(vc).reduce((text, song, index) => {
                if(song.title) text += ` **${index + 1}.** ${song.title}`;
                else text += `**${index + 1}.** ${song.url}`;
                return text;
            }, `__**QUEUE**__`);
            const queueEmbed = new MessageEmbed()
            .setColor(`BLURPLE`)
            .setTitle(`Queue`)
            .setDescription(queue);
            client.channel.send({embeds: [queueEmbed]});
    }
}

