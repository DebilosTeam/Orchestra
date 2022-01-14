const { Client } = require("discord.js");
const fs = require("fs");
const path = require("path");
const colors = require('colors');

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
    let EventsDir = path.join(__dirname, "..", "events");
    fs.readdir(EventsDir, (err, files) => {
        if (err) console.log(colors.red("[Error] ") + `${err}`);

        else
            files.forEach((file) => {
                const event = require(EventsDir + "/" + file);
                client.on(file.split(".")[0], event.bind(null, client));
                console.log(colors.green("[LOG] ") + `Event ${file.split(".")[0]} loaded`);
            });
    });
};