const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    if(user.bot)  return;
    const { message, emoji } = messageReaction;
    
    console.log(emoji.name)
    if(emoji.name === "the emoji here") {
        console.log(emoji.name)
     }
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (message.author == client.user) {
        return;
    }
    if (parts[0] == '!mp') {
        switch (parts[1]) {
            case "hello":
                message.channel.send("So you're interested in our mining program, huh? We'd love to have you as part of the wolf pack!");
            break;
            case "join":
                message.channel.send("So you're interested in our mining program, huh? We'd love to have you as part of the wolf pack!");
            break;
            case "leave":
                message.channel.send("You have successfully removed yourself from the Aesir Mining Program \n Please provide feedback to Ethos Ari \n Thank you for participating as part of the pack!");
                message.channel.send('<:direwolf:776488702468685854>');
            break;
            case "help":
                message.channel.send("I can help you! \n \n Proper usage: !mp [option] [value] \n \n Examples: \n * !mp join (to join the mining program) \n * !mp sell 5000 spodumain (to tell us you want to sell 5000 spodumain) \n \n Options: \n * help \n * join \n * leave \n * sell [quantity] [ore]");
            break;
            case "sell":
            break;
            default:
                message.channel.send("I don't understand your request! \n \n Proper usage: !mp [option] [value] \n \n Examples: \n * !mp join (to join the mining program) \n * !mp sell 5000 spodumain (to tell us you want to sell 5000 spodumain) \n \n Options: \n * help \n * join \n * leave \n * sell [quantity] [ore]");
            break;
        }
    }
});

client.login('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A');