const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

var slightlyOffensiveNames = [
    'you magnificent potato!',
    'you sly dog!',
    'you phat mamma jamma!',
    'you elvis impersonator you!',
    'you strut like a rooster!',
    'bring on the pain!',
    'took you long enough!'
]

const random = ():number => { return Math.floor(Math.random() * slightlyOffensiveNames.length) };

client.on('guildMemberAdd', (member: any) => {
    client.channels.fetch('776559380970995712')
        .then((channel:any) => {
            channel.send(`Welcome ${member.displayName}, ${slightlyOffensiveNames[random()]} \n \n Thanks for checking out our humble Discord. \n \n If you are here to take advantage of our “Mining For Isk” program to earn over 100M ISK per week, then we hope your stay is a profitable one. \n \n If you are joining our corporation, be sure to review the corp rules page once your application is approved. \n \n And if you are here for diplomatic reasons, then welcome. \n \n Please select an option below to continue. \n \n 🤝 = Diplomacy \n <:miner:776567439701704714> = mining program \n 🐺 = join the wolf pack`)
            .then((msg:any) => {
                client.channels.fetch('776943538633965638').then((channel:any) => {
                    channel.bulkDelete(100).then(() => {
                        channel.send(`If you’re a Omega Clone looking to earn some serious isk, Aesir has you covered! \n \n We will provide you a safe place to mine valuable ores, and pay you well for what you mine. \n This means no more cheap ore, no more constant hauling to market, no more worry over pirates. \n \n Depending on the size of your Venture, each cargo-hold-full could earn you well over 2.0M ISK! \n How much ISK you can make in 2 weeks is up to you! \n \n When you accept this program, Aesir will:\n ::  Provide access to System Level 6 ores. \n ::  Protect you from pirates. \n ::  Replace your Venture if it is destroyed.\n ::  Purchase the ore that you mine \n \n Feel free to stop by <#776560170095607828> to chat, howl at the moon, and hear the latest rumors.\n When your ready to sell your ore head to <#776280849288921129> to see our rates for ore. \n \n Before moving forward, please adjust your discord tag to include the type of Venture you fly.  (VT, V1, V2, or V3) \n \n React to this message with: <:yes:776488521090465804> if you agree with the <#776943478416080978> and accept the offer. \n`);
                    }).catch(console.error);
                }).catch(console.error);
                msg.delete({ timeout: 600000 }).catch(console.error);
              })
        })
        .catch(console.error);
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (message.author == client.user) {
        if (parts[0] == 'Welcome') {
            // This is one of our welcome messages above
            message.react('🤝')
            .then(() => message.react('<:miner:776567439701704714>'))
            .then(() => message.react('🐺'));
        }
    }
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (parts[0] == '!wp') {
        if (parts[1] == 'test') {
            message.channel.send(`Welcome ${message.member.displayName}, ${slightlyOffensiveNames[random()]} \n \n Thanks for checking out our humble Discord. \n \n If you are here to take advantage of our “Mining For Isk” program to earn over 100M in a week, then we hope your stay is a profitable one. \n \n If you are joining our corporation, be sure to review the corp rules page once your application is approved. \n \n And if you are here for diplomatic reasons, then welcome. \n \n Please select an option below to continue. \n \n 🤝 = Diplomacy \n <:miner:776567439701704714> = mining program \n 🐺 = join the wolf pack`);
        } else if (parts[1] == 'clear'&& message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.bulkDelete(100);
        } else {
            message.channel.send('<:direwolf:776488702468685854>');
        }
    }
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    if(user.bot)  return;
    const { message, emoji } = messageReaction;
    
    if(emoji.name === "🐺") {
        message.guild.member(user).roles.set(['776841167123120158']).catch(console.error);
    }
    if(emoji.name === "miner") {
        message.guild.member(user).roles.set(['776840866492842004']).catch(console.error);
    }
    if(emoji.name === "🤝") {
        message.guild.member(user).roles.set(['776841070419247104']).catch(console.error);
    }
});

client.login('Nzc2NTI5NDM5MTYwNzk1MTY1.X62NZQ.s90oWkajTJo2PLRk8HwksK7JaK8');