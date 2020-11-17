import { join } from "path";

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.once('ready', () => {
    console.log('Ready!');
    client.channels.fetch('776943538633965638').then((channel:any) => {
        channel.bulkDelete(100).then(() => {
            channel.send(`If you’re a Omega Clone looking to earn some serious isk, Aesir has you covered! \n \n We will provide you a safe place to mine valuable ores, and pay you well for what you mine. \n This means no more cheap ore, no more constant hauling to market, no more worry over pirates. \n \n Depending on the size of your Venture, each cargo-hold-full could earn you well over 2.0M ISK! \n How much ISK you can make in 2 weeks is up to you! \n \n When you accept this program, Aesir will:\n ::  Provide access to System Level 6 ores. \n ::  Protect you from pirates. \n ::  Replace your Venture if it is destroyed.\n ::  Purchase the ore that you mine \n \n Feel free to stop by <#776560170095607828> to chat, howl at the moon, and hear the latest rumors.\n When your ready to sell your ore head to <#776280849288921129> to see our rates for ore. \n \n Before moving forward, please adjust your discord tag to include the type of Venture you fly.  (VT, V1, V2, or V3) \n \n React to this message with: <:yes:776488521090465804> if you agree with the <#776943478416080978> and accept the offer. \n`);
        }).catch(console.error);
    }).catch(console.error);
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    const { message, emoji } = messageReaction;
    if(user.bot)  return;
    if (message.author == client.user) {
        if (message.channel.id == '776943538633965638') {
            if(emoji.name === "yes") {
                message.guild.member(user).roles.set(['776945218729017354']).catch(console.error);
            }
            if(emoji.name === "no") {
                message.guild.member(user).roles.set([]).catch(console.error);
                message.guild.member(user).kick().catch(console.error);
             }
        }
    }
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (message.author == client.user) {
        if (parts[0] == 'If') {
            message.react('<:yes:776488521090465804>')
            .then(() => message.react('<:no:776488521414344815>'));
        }
    }
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (message.author == client.user) {
        return;
    }
    if (parts[0] == '!mp') {
        switch (parts[1]) {
            case "market":
                if (message.member.hasPermission('ADMINISTRATOR')) {
                    message.delete().then(() => {
                        message.channel.bulkDelete(100).then(() => {
                            const getSpod = spodumainValue();
                            const getDO = doValue();
                            const getPyro = pyroValue();
                            const getGN = gneissValue();
                            const getHem = hemValue();
                            const getHed = hedValue();
                            Promise.all([getSpod, getDO, getPyro, getGN, getHem, getHed]).then((values:number[]) => {
                                console.log(values);
                                message.channel.send(`
                                Post here what you are ready to sell and what you calculate to be the total cost. Please only request to sell once you have at least 50,000 cubic meters of ore. \n \`\`\`  Spodumain: ${values[0]} ISK / Unit \n Dark Ochre: ${values[1]} ISK / Unit \n  Pyroxeres: ${values[2]} ISK / Unit \n     Gneiss: ${values[3]} ISK / Unit \n Hemorphite: ${values[4]} ISK / Unit \n Hedbergite: ${values[5]} ISK / Unit \`\`\` \n`);
                            });
                        }).catch(console.error);
                    }).catch(console.error)
                }
            break;
            default:
            break;
        }
    }
});

let spodumainValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51009000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            console.log(oreAvg);
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

let doValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51010000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

let pyroValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51002000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

let gneissValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51011000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

let hemValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51007000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

let hedValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51008000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor(oreAvg * 0.75));
        }).catch(console.error);
    });
}

client.login('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A');