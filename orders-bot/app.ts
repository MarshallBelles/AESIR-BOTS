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

class cartViewer extends viewer {
    cartContents:any[];
    usingCredits:number;
    creditBalance: number;
    userName: string;
    member: any;
    snapListener:any;
    pFee:boolean;
    constructor(username:string, member:any) {super(); this.cartContents = []; this.usingCredits = 0; this.userName = username; this.member = member; this.creditBalance = 0; this.pFee = true;}
    setup = async (): Promise<any> => {
        return new Promise((res) => {
            admin.firestore().collection(`data/industry-bot/members/${this.member.id}/cart`).get().then(col => {
                if (col.size > 0) {
                    // we have stuff to show
                    col.docs.forEach(doc => {
                        this.cartContents.push(doc);
                    });
                    const msg = new MessageEmbed()
                    .setTitle('AE13 Order Cart - ' + this.member.displayName)
                    .setColor(0xff0000)
                    .addFields({name:'Orders',value:'loading...'});
                    // setup listener here
                    this.snapListener = admin.firestore().collection(`data/industry-bot/members/${this.member.id}/cart`).onSnapshot(cols => {
                        admin.firestore().doc(`data/industry-bot/members/${this.member.id}`).get().then(doc => {
                            let dat = doc.data();
                            if (dat) {
                                this.creditBalance = dat.credits;
                                if (cols.docs.length > 0) {
                                    this.cartContents = [];
                                    cols.docs.forEach(cl => {
                                        this.cartContents.push(cl.data());
                                    });
                                    this.update();
                                } else {
                                    // remove this view
                                    VM.removeView(this.discordMsgID);
                                    this.msgContext.delete();
                                    this.cleanup();
                                }
                                // check planetary contributions to see if we get charged the fee
                                //
                                //
                                //
                                //
                                //
                                //
                            } else {
                                // uhm, how did we get here?
                                // remove this view
                                VM.removeView(this.discordMsgID);
                                this.msgContext.delete();
                                this.cleanup();
                            }
                        });
                    });
                    res(msg)
                } else {
                    res('your cart is empty.')
                }
            });
        });
    }
    update = (): void => {
        // update UI
        if (this.cartContents.length == 0) {
            // we shouldn't be here
            this.msgContext.delete();
            VM.removeView(this.discordMsgID);
            return;
        }
        let fieldsarr:any[] = [];
        let list:string = '';
        let subtotal:number = 0;
        let cval:number = 20000000;
        if(this.member.roles.cache.find((r:any) => r.name === "T5/T6")) {cval = 30000000} else
        if(this.member.roles.cache.find((r:any) => r.name === "T7/T8")) {cval = 85000000} else
        if(this.member.roles.cache.find((r:any) => r.name === "T9/T10")) {cval = 145000000}
        this.cartContents.forEach((item:any) => {
            list += `${item.Name}\n`
            if(this.member.roles.cache.find((r:any) => r.name === "Pack Wolf")) {subtotal += Number(item.T2.replace(/,/g, ''));} else
            if(this.member.roles.cache.find((r:any) => r.name === "Dire Wolf")) {subtotal += Number(item.T3.replace(/,/g, ''));} else
            if(this.member.roles.cache.find((r:any) => r.name === "Alpha Wolf")) {subtotal += Number(item.T3.replace(/,/g, ''));} else
            {subtotal += Number(item.T1.replace(/,/g, ''));}
            if(this.pFee) {subtotal += Number(item.pfee.replace(/,/g, ''));}
        });
        let creditstr;
        if ((this.usingCredits * cval) - subtotal > 0) {
            creditstr = `Using: ${this.usingCredits} of ${this.creditBalance}\nCredit Value: ${numberWithCommas(this.usingCredits * cval)}\nRemaining credit: ${numberWithCommas((this.usingCredits * cval) - subtotal)}`
        } else {
            creditstr = `Using: ${this.usingCredits} of ${this.creditBalance}\nCredit Value: ${numberWithCommas(this.usingCredits * cval)}\nAmount due: ${numberWithCommas((this.usingCredits * cval) - subtotal)}`
        }
        fieldsarr.push({name:'Credits',value:creditstr});
        fieldsarr.push({name:'Items',value:list});
        const msg = new MessageEmbed()
                .setTitle('AE13 Order Cart - ' + this.member.displayName)
                .setColor(0xff0000)
                .addFields(fieldsarr)
        this.msgContext.edit(msg).catch(console.error);
        VM.removeView(this.discordMsgID);
        VM.addView(this, this.msgContext);
    }
    increase = (): void => {
        if (this.usingCredits < this.creditBalance) this.usingCredits += 1;
        this.update();
    }
    decrease = (): void => {
        if (this.usingCredits > 0) this.usingCredits += -1;
        this.update();
    }
    cleanup = (): void => {
        this.snapListener();
        this.disposeView();
    }
    approve = (): void => {}
    cancel = (): void => {
        this.cleanup();
        admin.firestore().collection(`data/industry-bot/members/${this.member.id}/cart`).get().then(dat => {
            dat.docs.forEach(doc => {
                doc.ref.delete();
            })
        })
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
                const ship:string = element.Name.toLowerCase();
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
                .setDescription(this.searchResults[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            return msg;
            }
        } else {
            this.maxIndex = prices.length;
            const msg = new MessageEmbed()
                .setTitle('AE13 Ship Pricing')
                .setColor(0xff0000)
                .setDescription(prices[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            return msg;
        }
    }
    nextPage = (): void => {
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
                .setDescription(this.searchResults[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
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
                .setDescription(prices[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        }
        VM.removeView(this.discordMsgID);
        VM.addView(this, this.msgContext);
    }
    previousPage = (): void => {
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
                .setDescription(this.searchResults[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(this.searchResults[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
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
                .setDescription(prices[this.currentIndex].Name)
                .addFields([
                    {name:"General Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T1)} ISK\`\`\``},
                    {name:"Pack Member Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T2)} ISK\`\`\``},
                    {name:"Direwolf Price", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].T3)} ISK\`\`\``},
                    {name:"Planetary Fee", value:`\`\`\` ${numberWithCommas(prices[this.currentIndex].pfee)} ISK\`\`\``}
                ])
                    .setFooter(`Planetary fee is only charged to non-participating members\nFaction ship price may not include BP\nPage ${this.currentIndex +1} of ${this.maxIndex}`);
            this.msgContext.edit(msg);
        }
        VM.removeView(this.discordMsgID);
        VM.addView(this, this.msgContext);
    }
    AddToCart = (user:any): string => {
        this.lastUsed = Date.now();
        if (this.searchResults.length != 0) {
            admin.firestore().collection(`data/industry-bot/members/${user.id}/cart`).doc().set(this.searchResults[this.currentIndex]);
            return 'added ' + this.searchResults[this.currentIndex].Name + ' to the cart.';
        } else {
            admin.firestore().collection(`data/industry-bot/members/${user.id}/cart`).doc().set(prices[this.currentIndex]);
            return 'added ' + prices[this.currentIndex].Name + ' to the cart.';
        }
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
                channel.send(`Industry Orders Bot\n\`\`\`\nPrice <ship name> - Check internal price on a ship\nCart - View your cart contents \`\`\``);
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
                VM.getViewByDMID(message.id).then((dat:priceViewer) => {
                    dat.previousPage();
                })
            }
            if(emoji.name === "🛒") {
                message.reactions.resolve("🛒").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:priceViewer) => {
                    let retmsg: string = dat.AddToCart(user);
                    retmsg = `<@${user.id}> ` + retmsg;
                    message.channel.send(retmsg).then((msg:any) => {msg.delete({ timeout: 10000 })});
                })
            }
            if(emoji.name === "➡️") {
                message.reactions.resolve("➡️").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:priceViewer) => {
                    dat.nextPage();
                })
            }
            if(emoji.name === "⬆️") {
                message.reactions.resolve("⬆️").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:cartViewer) => {
                    dat.increase();
                })
            }
            if(emoji.name === "⬇️") {
                message.reactions.resolve("⬇️").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:cartViewer) => {
                    dat.decrease();
                })
            }
            if(emoji.name === "no") {
                message.reactions.resolve("776488521414344815").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:cartViewer) => {
                    dat.cancel();
                })
            }
            if(emoji.name === "yes") {
                message.reactions.resolve("yes").users.remove(user.id);
                VM.getViewByDMID(message.id).then((dat:cartViewer) => {
                    dat.approve();
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
                let viewPanel:cartViewer = new cartViewer(message.author.username, message.member);
                viewPanel.setup().then(dat => {
                    if (dat == 'your cart is empty.') {
                        message.channel.send(`<@${message.author.id}>, ` + dat).then((messg:any) => {messg.delete({ timeout: 15000 })});
                    } else {
                        message.channel.send(dat).then((msg:any) => {
                            VM.addView(viewPanel, msg);
                            viewPanel.update();
                            msg.react('<:yes:776488521090465804>')
                            .then(() => {msg.react('<:no:776488521414344815>')})
                            .then(() => {msg.react('⬆️')})
                            .then(() => {msg.react('⬇️')})
                        }).catch(console.error);
                    }
                    message.delete({ timeout: 600000 });
                });
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