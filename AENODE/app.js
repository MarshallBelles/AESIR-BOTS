const Discord = require('discord.js');
const client = new Discord.Client();
const events = require('events');
const eventEmitter = new events.EventEmitter();
const glob = require('glob');
const path = require('path');
const { Pool } = require('pg');
const db = new Pool({ connectionString:'postgresql://postgres:898asa43sdfas9d244ses@localhost:5555/postgres' });

client.once('ready', () => {
	eventEmitter.emit('ready');
});

client.on('messageReactionAdd', (messageReaction, user) => {
	// we do not listen to bot reactions
	if(user.bot) {return;}
	eventEmitter.emit('reaction', messageReaction, user);
});

client.on('message', async (message) => {
	if(message.member.user.bot) {return;}
	// we do not listen to bot messages
	eventEmitter.emit('message', message);
});

glob.sync('./modules/*.js').forEach((file) => {
	require(path.resolve(file)).setup(eventEmitter, client, db);
});

client.login('Nzc2NTI5NDM5MTYwNzk1MTY1.X62NZQ.s90oWkajTJo2PLRk8HwksK7JaK8');