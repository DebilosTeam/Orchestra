const path = require("path");
const colors = require('colors');
const { readdir } = require("fs");

/**
 * @param {Client} client
 */

module.exports = (client) => {
    let commandDir = path.join(__dirname, "..", "commands");
    readdir(commandDir, (err, files) => {
        if (err) console.log(colors.red("[Error] ") + `${err}`);

        else
            files.forEach((file) => {
                const command = require(commandDir + "/" + file);
                client.commands.set(command.name, command);
                console.info(colors.green("[LOG] ") + `Command ${command.name} loaded`);
            });
    });
}