let mClient;
let database;
let config;

exports.setup = (eventEmitter, client, db) => {
  mClient = client;
  database = db;
  eventEmitter.on('ready', wpStart);
  eventEmitter.on('reaction', wpReaction);
}

const wpStart = async () => {
  console.log('wolfpack start');
  // pull config from the DB.
  config = await database.query('SELECT * FROM config');
  config = config.rows[0];
  // clear the woods channel and post our landing message.
  mClient.channels.fetch(config.the_woods_channel).then((channel) => {
      channel.bulkDelete(100).then(() => {
          channel.send(`Thanks for checking out our humble Discord. \n \n If you are joining our corporation, be sure to review the corp rules page once your application is approved. \n \n if you are here for diplomatic reasons, then welcome. \n \n Please select an option below to continue. \n \n 🤝 = Diplomacy \n 🐺 = join the wolf pack`).then((msg) => {
              msg.react('🤝').then(() => msg.react('🐺'));
          })
      }).catch(console.error);
  }).catch(console.error);
  mClient.channels.fetch(config.hr_channel).then((channel) => {
      channel.bulkDelete(100).then(() => {
          channel.guild.roles.resolve('776841167123120158').members.forEach((mem) => {
              channel.send(`<@&796749710681178132>, <@${mem.id}> has joined the server and is interested in joining Aesir. React YES to accept, or NO to reject and boot from the server.`).then((msg) => {
                  msg.react('<:yes:776488521090465804>')
                  .then(() => msg.react('<:no:776488521414344815>'));
              })
          });
      }).catch(console.error);
  }).catch(console.error);
}

const wpReaction = async (messageReaction, user) => {
  // when someone reacts to the message, do the thing.
  const { message, emoji } = messageReaction;
  if (user.bot) return;
  if (message.channel.id == config.the_woods_channel) {
      if(emoji.name === "🐺") {
          await message.guild.member(user).roles.add('776841167123120158').catch(console.error);
          await message.channel.send(`Welcome <@${user.id}>! Please see <#780453159544815689>`).then((msg) => {msg.delete({ timeout: 300000 })}).then(() => {message.reactions.resolve("🐺").users.remove(user.id);});
          mClient.channels.fetch(config.hr_channel).then((channel) => {
              channel.send(`<@&796749710681178132>, <@${user.id}> has joined the server and is interested in joining Aesir. React YES to accept, or NO to reject and boot from the server.`).then((msg) => {
                  msg.react('<:yes:776488521090465804>')
                  .then(() => msg.react('<:no:776488521414344815>'));
              });
          }).catch(console.error);

      }
      if(emoji.name === "🤝") {
          await message.guild.member(user).roles.add('776841070419247104').catch(console.error);
          await message.channel.send(`Welcome <@${user.id}>! Please see <#780453159544815689>`).then((msg) => {msg.delete({ timeout: 300000 })}).then(() => {message.reactions.resolve("🤝").users.remove(user.id);});
      }
  }
    if (message.channel.id == config.hr_channel) {
        var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
        if (parts[0] === "<@&796749710681178132>") {
          const refMem = parts[1].replace(/</g, '').replace(/@/g, '').replace(/&/g, '').replace(/>/g, '').replace(/!/g, '');
          if (emoji.name === "yes") {
              // allow member in
              if (message.guild.member(refMem)) {
                  message.guild.member(refMem).roles.set(['776243945285746689']).catch(console.error);
                  message.channel.send(`<@${user.id}> has accepted <@${refMem}> into the corp!`);
              } else {
                  message.channel.send('That user has left the server.').then((msg) => {msg.delete({timeout:50000})});
              }
              message.delete();
          }
          if (emoji.name === "no") {
              // kick member
              if (message.guild.member(refMem)) {
                  message.guild.member(refMem).kick();
                  message.channel.send(`<@${user.id}> has kicked <@${refMem}>!`);
                  message.delete();
              }
            } else {
                message.channel.send('That user has left the server.').then((msg) => {msg.delete({timeout:50000})});
            }
        } 
    }  
}