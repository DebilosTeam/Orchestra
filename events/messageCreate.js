const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");

const cooldowns = new Map();

module.exports = async (client, message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    };

    const currentTime = Date.now();
    const timeStamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;

    if(timeStamps.has(message.author.id)){
        const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;

        if(currentTime < expirationTime){
            const time_left = (expirationTime - currentTime) / 1000;

            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
        }
    }

    timeStamps.set(message.author.id, currentTime);
    setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

    if(command.permissions) {
        const cmdAuthorPerms = message.channel.permissionsFor(message.author);
        if(!cmdAuthorPerms || !cmdAuthorPerms.has(command.permissions)) {
            message.channel.send("You don't have permissions to use this command");
            return;
        };
    };

    try {
        command.run(message, args, commandName, client);
    } catch(error) {
        console.log(error);
    }
}