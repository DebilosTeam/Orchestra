const { Client } = require("discord.js");

module.exports = {
    name: "play",
    aliases: [],
    cooldown: 1,
    description: "🔉 Plays given song",
    permissions: [""],

    /**
     * @param {Client} client
     */

    run: async (client, args) => {
        if(!client.member.voice.channel && !client.guild.me.voice.channel) return client.channel.send({content: `❌ Please join a voice channel in order to play a song!`});
        if(!args[0]) return client.channel.send({content: `❌ Please provide a song!`});

        const voicechannel = client.member.voice.channel || client.guild.me.voice.channel;

        global.audioManager.play(voicechannel, args[0], {
            quality: 'high',
            audiotype: 'arbitrary',
            volume: 10
        }).then(queue => {
            global.connections.set(voicechannel.id, voicechannel);
            if(queue === false) client.channel.send({content: `✅ Your song is now playing!`});
            else client.channel.send({content: `✅ Your song has been added to the queue!`});
        }).catch(err => {
            console.log(err);
            client.channel.send({content: `❌ There was an error while trying to connect to the voice channel!`});
        });
    }
}