const Discord = require('discord.js');
const client = new Discord.Client();
const events = require('events');
const eventEmitter = new events.EventEmitter();
const glob = require( 'glob' );
const path = require( 'path' );
const { Pool } = require('pg');
const db = new Pool({connectionString:'postgresql://postgres:898asa43sdfas9d244ses@localhost:5555/postgres'})

glob.sync( './modules/*.js' ).forEach( ( file ) => {
  require( path.resolve( file ) ).setup(eventEmitter, client, db);
});

client.once('ready', () => {
  eventEmitter.emit('ready');
});

client.on('messageReactionAdd', (messageReaction, user) => {
  eventEmitter.emit('reaction', messageReaction, user);
});

client.on('message', async (message) => {
  eventEmitter.emit('message', message);
});

client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');