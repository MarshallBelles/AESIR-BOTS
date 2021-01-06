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
        if (message.channel.id === '776943538633965638') {
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
                                Post here when you are ready to sell your ore. After your first day mining we will buy your ore. After that, Aesir Corp will purchase ore from you once per week. 50,000 m3 minimum per weekly purchase. 

Standard Member / Guest Miner prices:
\`\`\`  Spodumain: ${Math.floor(values[0] * 0.7)} ISK / Unit, ${Math.floor((values[0] * 0.7)/3.2)} ISK / m3 \n Dark Ochre: ${Math.floor(values[1] * 0.7)} ISK / Unit, ${Math.floor((values[1] * 0.7)/1.8)} ISK / m3 \n  Pyroxeres: ${Math.floor(values[2] * 0.7)} ISK / Unit, ${Math.floor((values[2] * 0.7)/1.5)} ISK / m3 \n     Gneiss: ${Math.floor(values[3] * 0.7)} ISK / Unit, ${Math.floor((values[3] * 0.7)/2)} ISK / m3 \n Hemorphite: ${Math.floor(values[4] * 0.7)} ISK / Unit, ${Math.floor((values[4] * 0.7)/3)} ISK / m3 \n Hedbergite: ${Math.floor(values[5] * 0.7)} ISK / Unit, ${Math.floor((values[5] * 0.7)/3)} ISK / m3 \`\`\`

Lycan’s Guard prices (weekly max of 360k m3)
\`\`\`  Spodumain: ${Math.floor(values[0] * 0.8)} ISK / Unit, ${Math.floor((values[0] * 0.8)/3.2)} ISK / m3 \n Dark Ochre: ${Math.floor(values[1] * 0.8)} ISK / Unit, ${Math.floor((values[1] * 0.8)/1.8)} ISK / m3 \n  Pyroxeres: ${Math.floor(values[2] * 0.8)} ISK / Unit, ${Math.floor((values[2] * 0.8)/1.5)} ISK / m3 \n     Gneiss: ${Math.floor(values[3] * 0.8)} ISK / Unit, ${Math.floor((values[3] * 0.8)/2)} ISK / m3 \n Hemorphite: ${Math.floor(values[4] * 0.8)} ISK / Unit, ${Math.floor((values[4] * 0.8)/3)} ISK / m3 \n Hedbergite: ${Math.floor(values[5] * 0.8)} ISK / Unit, ${Math.floor((values[5] * 0.8)/3)} ISK / m3 \`\`\` \n \n \n`
                                );
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
            resolve(oreAvg);
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
            resolve(oreAvg);
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
            resolve(oreAvg);
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
            resolve(oreAvg);
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
            resolve(oreAvg);
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
            resolve(oreAvg);
        }).catch(console.error);
    });
}

client.login('Nzc2NDczMTczNTI4NDEyMjMw.X61Y_g.RhJ8yyx-twKQYutuikAJCDjeE_A');