const { status, name, type, url } = require("../config.json")

module.exports = async (client) => {
	console.log(`Successfully logged in ${client.user.tag}`);

	client.user.setPresence({ 
		activities: [{ name: `${name}`, type: `${type}` }], 
		status: `${status}`
	});
}