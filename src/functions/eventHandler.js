const { Client } = require("discord.js");
const { readdir } = require("fs");
const path = require("path");
const colors = require('colors');

/**
 * @param {Client} client 
 * @param {Map} global.connections
 */

module.exports = async (client) => {
    let eventsDir = path.join(__dirname, "..", "events");
    readdir(eventsDir, (err, files) => {
        if (err) console.log(colors.red("[Error] ") + `${err}`);

        else
            files.forEach((file) => {
                const event = require(eventsDir + "/" + file);
                client.on(file.split(".")[0], event.bind(null, client));
                console.info(colors.green("[LOG] ") + `Event ${file.split(".")[0]} loaded`);
            });
    });
};