import * as admin from "firebase-admin";

var serviceAccount = {
    "type": "service_account",
    "project_id": "ee-aesir",
    "private_key_id": "df4e3d53275b4bd9cf6e7c4f9d47d50ccae75a72",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCu4rTtZjW+05/g\nkUOpi/Qx5h//q4jqPVef09eGMQ9n47B11IK8ArDydGepaiH1FTCV8p7/vuFsnflR\n4fKSJE8Dz8ghGufGFRsWZNcCdb+DbcfsoCbSTZh122rLz9iJfNSIEhJpiv8sWeF+\nnDKiDrHiqBu0muq0xVJV54AYvl4acs99RBiDerzx9JHZ49C7Gbt7KYP/qkQvJ46T\nxOEuKGiEg/yqwBc9kpRbHYlvp7dWgpcaFHWcE4jP52BdFvVgpn64IgnUUNN5Y9D1\nQSaKdl4qOtdkz7krJSKFROC//VzTMMN5rZ+KEZqp7T7TflG4PtvvtfVmGtqehUWI\nRcCxInTDAgMBAAECggEAM6cg8gcgs6J0k5LEDcUY1E4YQF7NGwYQJdQfUXKXDsOo\noDyqelY/JfUsktSWf/kItxkIThf2I6sK8tzN1M0li0Yo4WI9d3tPW09gU8ksTei0\nRlbM8Itbjt/GDLlwRrdYXHId/w8/K73GRKtkpwm5D21AdZjV3ptzJI0x/9zmFWA7\nRY3LQgYxCD72oL7eYXwHfZw7VaJ/Nj9ETZIL6OM39F9/UiSEu33uJMPGTEOTeeF+\nUUJYNvBfC1U2LCjfEGpSS0vdDIkqgYDYhwZFqrg89VFKmcZeXLCLvh8ZsYnWqSrG\nR07Goa5CuAqDlngnV4kAIzTjZ76z+C6DR2WdwBAJ8QKBgQDjuVu3EsMIK39AG2qy\nQ+02N9OqeKFn29seioJiSwxDecgIwqAw545ywqovi5uagf8KUDHJaBPKEyIL/puY\nAV0paCD2JG0vNKv0k8x6utVANxcECpBcWn72H+nTiy6uyT+dq5lJoEjs0k4eRCjz\nwW+bNZ7rXskW6ZWpEig26JF48QKBgQDEmcblZNJoYqiR5fihnKE6xmW9rSBZ6Wv/\n7O0QysX0vAXoSUgPi+85+xZyk2Sgv68ebMF2tW3101z+R3gJGhk+ESyaqw1tXEL5\nJC2KrLIEUWUfAiBOpKLBaZHwoyXEb6rBaK22f/YTuJ4sWcYC6sNhcbMgG1rJvuo1\nhYtavpco8wKBgFiPinJ9EmoH+Hnm76yaLBNMzL1cInEwmFudRC2TwBYxszBs+D1s\noAJTYDoTUhVZfuT04RfRqPiKTlBZ2QrZZPCodUEkU23rTwBTxk7of+x0QDgrH487\nBmsTaC0D0MjarSnVRUzTz+iBtS2iFkcNsCitRruEZjHJ75EL5aXM9l4RAoGAZ3Vl\nLaJ492Wzv9N9m86JKhztvXs14xrrMqrDtmp+8eNgWHT37vZ81c5EadcWxWEaDrC8\nvnOLginQbh++E0wgrIDtMBeD4WED/YgET03CAHO0+zRrO/d3jsC3hCLW5SC+gzlK\n8Rc1r/sfgcdcZHyWhNkIooTCqhhFuBSm2QIjGfECgYEAgz/cDZCx6QZviOMIIF+x\nc2OKk/2EcXqWVlOR9PoNnaXHlsE2VrezBfvTiJ126bxOm0SSFcZpd8zEOxcwV91+\nKd5IsyH0qqaVjkbha67F6xG89Gh7uQEfldkWej6FQLAAj2J5d6Iuc5bmWYWSjkFF\nX8qArJlP5Xcg89qdCo/br2g=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-aiibb@ee-aesir.iam.gserviceaccount.com",
    "client_id": "106302809778365646124",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-aiibb%40ee-aesir.iam.gserviceaccount.com"
  }

const numberWithCommas = (x:number):string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

admin.initializeApp({
  credential: admin.credential.cert(<any>serviceAccount),
  databaseURL: "https://ee-aesir.firebaseio.com"
});

interface ConfigurationMaster {
    main_channel: string,
    admin_channel: string,
    hr_channel: string,
    tech_level_channel: string,
    the_woods_channel: string,
    orders_channel: string,
    skills_channel: string,
    fighter_channel: string,
    hangars: string[],
    ore_holds_per_credit: number,
    dmr_per_credit: number,
    T3T4: number,
    T5T6: number,
    T7T8: number,
    T9T10: number
}

interface Member {
    officer: boolean,
    credits: number,
    pack_member: boolean,
    direwolf: boolean,
    confirmed_ore: number,
    confirmed_dmr: number,
    name?: string
}


const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const csv = require('csv-parser');
const fs = require('fs');
let confMaster: ConfigurationMaster;

class viewManager {
    allViews: viewer[];
    constructor() {
        this.allViews = [];
    }
    addView = (newView:viewer, msgContext:any): void => {
        newView.msgContext = msgContext;
        newView.discordMsgID = msgContext.id;
        this.allViews.push(newView);
    }
    getViewByDMID = async (dmid:string): Promise<any> => {
        return new Promise((res) => {
            this.allViews.forEach(view => {
                if (view.discordMsgID == dmid) {
                    return res(view);
                }
            });
        })
    }
    removeView = (dmid:string): void => {
        for (let index = 0; index < this.allViews.length; index++) {
            const element = this.allViews[index];
            if (element.discordMsgID == dmid) {
                // remove this element
                this.allViews.splice(index, 1);
            }
        }
    }

}

const VM = new viewManager();
const prices: any[] = [];

class viewer {
    discordMsgID: string;
    lastUsed: number;
    msgContext: any;
    constructor() {
        this.discordMsgID = '';
        this.lastUsed = Date.now();
    }
    getDMID = (): string => {
        return this.discordMsgID;
    }
    checkLastUsedTime = (): void => {
        let now = new Date();
        let expires = new Date(this.lastUsed + 300000);
        if (now.getTime() > expires.getTime()) {
            // this view has not been used in over 5 minutes
            this.disposeView();
        }
    }
    disposeView = (): void => {
        this.msgContext.delete();
        VM.removeView(this.discordMsgID);
    }
}

class priceViewer extends viewer {
    currentIndex:number;
    maxIndex:number;
    searchResults:any[];
    constructor() {super(); this.currentIndex = 0; this.maxIndex = 0; this.searchResults = []}
    setup = (search?:string): any => {
        this.lastUsed = Date.now();
        if (search) {
            for (let index = 0; index < prices.length; index++) {
                const element = prices[index];
                const ship:string = element.Ship.toLowerCase();
                if (ship.includes(search)) {
                    this.searchResults.push(element);
                }
            }
            if (this.searchResults.length == 0) {
                return `There were no results searching for: ${search}`;
            } else {
                this.maxIndex = this.searchResults.length;
                const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(this.searchResults[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            return msg;
            }
        } else {
            this.maxIndex = prices.length;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(prices[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            return msg;
        }
    }
    nextPage = (): any => {
        this.lastUsed = Date.now();
        if (this.searchResults.length > 0) {
            this.maxIndex = this.searchResults.length;
            if (this.currentIndex >= this.maxIndex -1) {
                return;
            }
            this.currentIndex += 1;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(this.searchResults[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        } else {
            this.maxIndex = prices.length;
            if (this.currentIndex >= this.maxIndex -1) {
                return;
            }
            this.currentIndex += 1;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(prices[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        }
        VM.removeView(this.discordMsgID);
        VM.addView(this, this.msgContext);
    }
    previousPage = (): any => {
        this.lastUsed = Date.now();
        if (this.searchResults.length > 0) {
            this.maxIndex = this.searchResults.length;
            if (this.currentIndex <= 0) {
                return;
            }
            this.currentIndex += -1;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(this.searchResults[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        } else {
            this.maxIndex = prices.length;
            if (this.currentIndex <= 0) {
                return;
            }
            this.currentIndex += -1;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(prices[this.currentIndex].Ship)
                .addFields(
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pup)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Pack)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Dire)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].Planetary)} ISK\`\`\``}
                    )
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship cost does not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        }
        VM.removeView(this.discordMsgID);
        VM.addView(this, this.msgContext);
    }
}

client.once('ready', () => {
    console.log('Ready!');
    // grab configuration from FireBase
    admin.firestore().doc('configuration/industry-bot').onSnapshot((conf) => {
        console.log('obtained new config');
        if (!conf.data()) return;
        confMaster = <ConfigurationMaster><any>conf.data();
        client.channels.fetch(confMaster.orders_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`Industry Orders Bot`);
            }).catch(console.error);
        }).catch(console.error);
    });
    // read our csv with the ship prices
    fs.createReadStream('prices.csv')
    .pipe(csv())
    .on('data', (data:any) => prices.push(data));
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    const { message, emoji } = messageReaction;
    if(user.bot)  {return;}
    if (message.author == client.user) {
        if (message.channel.id == confMaster.orders_channel) {
            if(emoji.name === "⬅️") {
                message.reactions.resolve("⬅️").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:any) => {
                    let dt = Object.assign(new priceViewer(), dat);
                    dt.previousPage();
                })
            }
            if(emoji.name === "🛒") {
                message.reactions.resolve("🛒").users.remove(user.id);
            }
            if(emoji.name === "➡️") {
                message.reactions.resolve("➡️").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:any) => {
                    let dt = Object.assign(new priceViewer(), dat);
                    dt.nextPage();
                })
            }
        }
    }
});

client.on('message', (message: any) => {
    var parts:string[] = message.content.toLowerCase().replace(/,/g, '').split(" ");
    if (message.author == client.user) {return;}
    if (message.channel.id == confMaster.orders_channel) {
        switch (parts[0]) {
            case "price":
                if (parts[1]) {
                    let searchString:string = '';
                    for (let index = 1; index < parts.length; index++) {
                        searchString += parts[index];
                        if (index != (parts.length - 1)) {
                            searchString += ' ';
                        }
                    }
                    let viewPanel:priceViewer = new priceViewer();
                    let msg = viewPanel.setup(searchString);
                    message.channel.send(msg).then((msg:any) => {
                        VM.addView(viewPanel, msg);
                        msg.react('⬅️')
                        .then(() => {msg.react('🛒')})
                        .then(() => {msg.react('➡️')})
                    }).catch(console.error);
                    message.delete({ timeout: 600000 });
                } else {
                    // get all prices
                    let viewPanel:priceViewer = new priceViewer();
                    let msg = viewPanel.setup();
                    if (typeof msg === 'string' || msg instanceof String) {

                    }
                    message.channel.send(msg).then((msg:any) => {
                        VM.addView(viewPanel, msg);
                        msg.react('⬅️')
                        .then(() => {msg.react('🛒')})
                        .then(() => {msg.react('➡️')})
                    }).catch(console.error);
                    message.delete({ timeout: 600000 });
                }
            break;
            case "cart":
            break;
            default:
                message.channel.send('I don\'t know that command. \nTry: price or cart').then((msg:any) => {msg.delete({ timeout: 600000 })});
                message.delete({ timeout: 600000 });
            break;
        }
    }
});
const cleanup = () => {
    VM.allViews.forEach(view => {
        view.checkLastUsedTime();
    });
}

setInterval(cleanup, 60000);
client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');