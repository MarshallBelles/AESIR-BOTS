const Discord = require('discord.js');
const client = new Discord.Client();
const events = require('events');
const eventEmitter = new events.EventEmitter();

// Setup all commands
var glob = require( 'glob' );
path = require( 'path' );

glob.sync( './commands/*.js' ).forEach( ( file ) => {
  require( path.resolve( file ) ).setup(eventEmitter, client);
});

client.once('ready', () => {
  eventEmitter.emit('ready');
});

client.on('messageReactionAdd', (messageReaction, user) => {
  // const { message, emoji } = messageReaction;
  eventEmitter.emit('reaction', messageReaction, user);
});

client.on('message', async (message) => {
  eventEmitter.emit('message', message);
});

client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');