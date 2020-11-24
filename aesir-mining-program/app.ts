import { join } from "path";

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.once('ready', () => {
    console.log('Ready!');
    client.channels.fetch('776943538633965638').then((channel:any) => {
        channel.bulkDelete(100).then(() => {
            channel.send(`
            If you’re a Omega Clone looking to earn some serious isk, Aesir has you covered. We will provide you a safe place to mine valuable ores, and pay you well for what you mine. 

            :: No more Cheap Ore
            :: No more time consuming jumps to market. 
            :: No more market fees eating your profit. 
            :: No more worry about pirates.
            
            Depending on the size of your Venture, each cargo-hold-full could earn you over 2M isk depending on the size of your Venture. 
            
            How many holds you can fill in 2 weeks is up to you!
            
            Over the two weeks that you’ll have access to our sector Aesir will:
            
            ::  Provide access to our T6 ores. 
            ::  Protect you from pirates. 
            ::  Replace your Venture if it is destroyed.
            ::  Purchase the ore you mine. 
            
            Feel free to stop by <#778377903129624616> to chat, howl at the moon and hear the latest rumors.
            
            When your ready to sell your ore head to <#776280849288921129>. Be sure to check the pinned post to see the rates for ore. 
            
            Before moving forward, you must adjust your discord tag to include the type of Venture you fly.  (VT, V1, V2, or V3)
            
            Example: [V3]Ethos Ari`);
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
                                message.channel.send(`Post here what you are ready to sell and what you calculate to be the total cost. We will purchase a minimum of 50,000 m3 of ore at a time. \n \n The prices below will be updated weekly. \n \n Bring a friend! \n If your friend comes and joins the program, we will pay you 2.5M isk when they sell us their first batch of 50,000 m3. \n *NOT applicable for alts* \n \n \`\`\`  Spodumain: ${values[0]} ISK / m3 \n Dark Ochre: ${values[1]} ISK / m3 \n  Pyroxeres: ${values[2]} ISK / m3 \n     Gneiss: ${values[3]} ISK / m3 \n Hemorphite: ${values[4]} ISK / m3 \n Hedbergite: ${values[5]} ISK / m3 \`\`\` \n`);
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
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            console.log(oreAvg);
            resolve(Math.floor((oreAvg * 0.8)/3.2));
        }).catch(console.error);
    });
}

let doValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51010000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor((oreAvg * 0.8)/1.8));
        }).catch(console.error);
    });
}

let pyroValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51002000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor((oreAvg * 0.8)/1.5));
        }).catch(console.error);
    });
}

let gneissValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51011000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor((oreAvg * 0.8)/2));
        }).catch(console.error);
    });
}

let hemValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51007000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor((oreAvg * 0.8)/3));
        }).catch(console.error);
    });
}

let hedValue = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        let oreAvg = 0;
        axios.get('https://api.eve-echoes-market.com/market-stats/51008000000').then((res:any) => {
            var totalBuyHigh = 0;
            for(var i = 0; i < res.data.length; i++) {
                totalBuyHigh += res.data[i].highest_buy;
            }
            oreAvg = totalBuyHigh / res.data.length;
            resolve(Math.floor((oreAvg * 0.8)/3));
        }).catch(console.error);
    });
}

client.login('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A');