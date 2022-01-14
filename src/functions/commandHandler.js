const fs = require("fs")
const colors = require('colors');

module.exports = (client) => {
    const commandFiles = fs.readdirSync("./src/commands/").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            console.info(colors.green("[LOG] ") + `Command ${command.name} loaded`);
        } else {
            continue;
        }
    }
}