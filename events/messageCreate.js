const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = async (client, message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return;

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