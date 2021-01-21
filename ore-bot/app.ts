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

interface Claim {
    amount: number,
    approved: boolean,
    member: string,
    rejected: boolean,
    type: donationType,
    name: string,
    location: string,
    credited: boolean,
    timestamp: number,
    helpers?: string[],
    helper_credit?: number
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

enum donationType {
    ore,
    debris,
    module,
    rig,
    isk,
    story
}

const Discord = require('discord.js');
const client = new Discord.Client();
const Table = require('table')
const Tbl = Table.table;

let confMaster: ConfigurationMaster;

client.once('ready', () => {
    console.log('Ready!');
    admin.firestore().doc('configuration/industry-bot').onSnapshot((conf) => {
        console.log('obtained new config');
        if (!conf.data()) return;
        confMaster = <ConfigurationMaster><any>conf.data();
        client.channels.fetch(confMaster.main_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`Track your ore contributions here: \`\`\`H | Help - Expanded help menu \nPlanetary 1500 Misaba - Claim credit for planetary materials donation (enter unit count, not m3 value) \nSpodumain 85000.3 m3 Misaba - Claim spodumain ore contribution for credit at Misaba \nB | Balance - Display your industry system credit balance \`\`\``);
            }).catch(console.error);
        }).catch(console.error);
        client.channels.fetch(confMaster.tech_level_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`Please select your current tech level`).then((msg:any) => {
                    msg.react('<:T3T4:796136977531404339>')
                        .then(() => msg.react('<:T5T6:796136977505845258>'))
                        .then(() => msg.react('<:T7T8:796136977388142613>'))
                        .then(() => msg.react('<:T9T10:796136977283809311>'));
                }).catch(console.error);
            }).catch(console.error);
        }).catch(console.error);
        client.channels.fetch(confMaster.admin_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                admin.firestore().collection('data/industry-bot/claims').where('approved','==',false).where('rejected','==',false).get().then(clms => {
                    clms.docs.forEach(doc => {
                        const tmp = <Claim>doc.data()
                        if (tmp) {
                            const displayData:any = {};
                            displayData.type = tmp.name;
                            displayData.amount = tmp.amount;
                            displayData.location = tmp.location;
                            if (tmp.type == donationType.story) {
                                displayData.helpers = tmp.helpers;
                            }
                            displayData.location = tmp.location;
                            if (tmp.type == donationType.story) {
                                displayData.helpers = tmp.helpers;
                                channel.send(`<@&791340711445921812>, <@${tmp.member}> has claimed a donation: ${doc.id} \n \`\`\`JS\n ${JSON.stringify(displayData, null, 4)} \`\`\` \nHelpers: ${tmp.helpers}\nEnsure each helper shows separately in the JSON above.`).then((msg:any) => {
                                    msg.react('<:yes:776488521090465804>')
                                        .then(() => msg.react('<:no:776488521414344815>'));
                                });
                            } else {
                                channel.send(`<@&791340711445921812>, <@${tmp.member}> has claimed a donation: ${doc.id} \n \`\`\`JS\n ${JSON.stringify(displayData, null, 4)} \`\`\``).then((msg:any) => {
                                    msg.react('<:yes:776488521090465804>')
                                        .then(() => msg.react('<:no:776488521414344815>'));
                                });
                            }
                        }
                    });
                }).catch(console.error);
            }).catch(console.error);
        }).catch(console.error);
    });
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    const { message, emoji } = messageReaction;
    if(user.bot)  {return;}
    if (message.author == client.user) {
        if (message.channel.id == confMaster.admin_channel) {
            if(emoji.name === "yes") {
                approveContribution(message, user);
            }
            if(emoji.name === "no") {
                declineContribution(message, user);
            }
        }
        if (message.channel.id === confMaster.tech_level_channel) {
            if(emoji.name == "T3T4") {
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {message.channel.send(`<@${user.id}> you are already tagged with T3/T4`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {message.channel.send(`<@${user.id}> you are already tagged T5/T6, you cannot be moved to T3/T4`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {message.channel.send(`<@${user.id}> you are currently tagged T7/T8, you cannot be moved to T3/T4`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {message.channel.send(`<@${user.id}> you are currently tagged T9/T10, you cannot be moved to T3/T4`)} else
                {message.channel.send(`<@${user.id}> you are now tagged T3/T4`);message.guild.member(user).roles.add('796127725000851476');}
            }
            if(emoji.name == "T5T6") {
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {message.channel.send(`<@${user.id}> you are now tagged with T5/T6`);message.guild.member(user).roles.remove('796127725000851476');message.guild.member(user).roles.add('796127791467986956');upgradeIndustryCredits('T3T4','T5T6')} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {message.channel.send(`<@${user.id}> you are already tagged T5/T6`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {message.channel.send(`<@${user.id}> you are already tagged with T7/T8, you cannot be moved to T5/T6`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {message.channel.send(`<@${user.id}> you are already tagged with T9/T10, you cannot be moved to T5/T6`)} else
                {message.channel.send(`<@${user.id}> you are now tagged T5/T6`);message.guild.member(user).roles.add('796127791467986956');}
            }
            if(emoji.name == "T7T8") {
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {message.channel.send(`<@${user.id}> you cannot be tagged with T7/T8 as you are currently T3/T4. Upgrade to T5/T6 first.`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {message.channel.send(`<@${user.id}> you are now tagged T7/T8`);message.guild.member(user).roles.remove('796127791467986956');message.guild.member(user).roles.add('796127835328610325');upgradeIndustryCredits('T5T6','T7T8')} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {message.channel.send(`<@${user.id}> You are already tagged with T7/T8`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {message.channel.send(`<@${user.id}> you are already tagged with T9/T10, you cannot be moved to T7/T8`)} else
                {message.channel.send(`<@${user.id}> you are now tagged T7/T8`);message.guild.member(user).roles.add('796127835328610325');}
            }
            if(emoji.name == "T9T10") {
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {message.channel.send(`<@${user.id}> you cannot be tagged with T9/T10 as you are currently T3/T4. Upgrade to T5/T6 first.`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {message.channel.send(`<@${user.id}> you cannot be tagged with T9/T10 as you are currently T5/T6. Upgrade to T7/T8 first.`)} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {message.channel.send(`<@${user.id}> You are now tagged T9/T10`);message.guild.member(user).roles.remove('796127835328610325');message.guild.member(user).roles.add('796127898024673320');upgradeIndustryCredits('T7T8','T9T10')} else
                if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {message.channel.send(`<@${user.id}> you are already tagged with T9/T10`)} else
                {message.channel.send(`<@${user.id}> you are now tagged T9/T10`);message.guild.member(user).roles.add('796127898024673320');}
            }
        }
    }
});

client.on('message', async (message: any) => {
    var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
    if (message.channel.id === confMaster.admin_channel) {
        switch (parts[0]) {
            case "!admin":
                switch (parts[1]) {
                    case "update":
                        message.channel.send('Please allow up to 5 minutes for dashboard calculation');
                        message.guild.members.cache.array().forEach((guildMem:any) => {
                            admin.firestore().doc(`data/industry-bot/members/${guildMem.id}`).get().then((doc) => {
                                if (doc.exists) {
                                    admin.firestore().collection('data/industry-bot/claims').where('member', '==', guildMem.id).where('approved','==',true).where('credited','==',false).get().then(clms => {
                                        if(clms.docs.length > 0) {
                                            let process_arr = [];
                                            let totalOre = 0;
                                            let totalDMR = 0;
                                            clms.docs.forEach(clm => {
                                                let cl = <Claim>clm.data();
                                                if (cl.type == donationType.ore) {
                                                    totalOre += cl.amount;
                                                    cl.credited = true;
                                                    process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                                                } else if (cl.type == donationType.isk) {
                                                    cl.credited = true;
                                                    process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                                                } else {
                                                    totalDMR += cl.amount;
                                                    cl.credited = true;
                                                    process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                                                }
                                                if (cl.helpers && cl.helper_credit) {
                                                    if (cl.helpers.length > 0) {
                                                        const credit = cl.helper_credit / cl.helpers.length;
                                                        cl.helpers.forEach((hlpr:string) => {
                                                            grantHelperCredit(hlpr, credit);
                                                        });
                                                    }
                                                }
                                            });
                                            let mem = <Member>doc.data();
                                            if (mem) {
                                                mem.confirmed_ore += totalOre;
                                                mem.confirmed_dmr += totalDMR;
                                                if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")){
                                                    while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 6000)) {
                                                        mem.credits += 1;
                                                        mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 6000);
                                                        mem.confirmed_ore = Math.round(mem.confirmed_ore);
                                                    }
                                                } else
                                                if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")){
                                                    while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 9000)) {
                                                        mem.credits += 1;
                                                        mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 9000);
                                                        mem.confirmed_ore = Math.round(mem.confirmed_ore);
                                                    }
                                                } else
                                                if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")){
                                                    while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 26500)) {
                                                        mem.credits += 1;
                                                        mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 26500);
                                                        mem.confirmed_ore = Math.round(mem.confirmed_ore);
                                                    }
                                                } else
                                                if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")){
                                                    while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 42000)) {
                                                        mem.credits += 1;
                                                        mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 42000);
                                                        mem.confirmed_ore = Math.round(mem.confirmed_ore);
                                                    }
                                                } else {
                                                    // notify admin that a role is not assigned
                                                }
                                                if (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                                                    while (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                                                        mem.credits += 1;
                                                        mem.confirmed_dmr -= confMaster.dmr_per_credit;
                                                        mem.confirmed_dmr = Math.round(mem.confirmed_dmr);
                                                    }
                                                }
                                                mem.name = guildMem.displayName;
                                                process_arr.push(doc.ref.set(mem));
                                            }
                                            Promise.all(process_arr).catch(console.error);
                                        }
                                    }).catch(console.error);
                                }
                            });
                        })
                    break;
                    case "purge":
                        admin.firestore().collection(`data/industry-bot/members`).where('credits', '==', 0).where('confirmed_ore', '==', 0).where('confirmed_dmr', '==', 0).get().then(docs => {
                            docs.forEach(doc => {
                                doc.ref.delete();
                            })
                        });
                    break;
                    case "grant":
                        if (parts[2] == "credit") {
                            if (parts[3] && parts[4]) {
                                let userNum = parts[4].replace(/</g,'').replace(/>/g,'').replace(/@/g,'').replace(/!/g,'').replace(/ /g,'');
                                admin.firestore().doc(`data/industry-bot/members/${userNum}`).get().then((doc) => {
                                    let mem = doc.data();
                                    if (mem) {
                                        mem.credits += parseInt(parts[3]);
                                        doc.ref.set(mem);
                                    } else {
                                        const member:Member = <Member>{credits: parseInt(parts[3]), officer: false, pack_member: false, direwolf: false, confirmed_dmr: 0, confirmed_ore: 0};
                                        doc.ref.set(member);
                                    }
                                });
                            }
                        }
                    break;
                    case "credits":
                        admin.firestore().collection('data/industry-bot/members').where('credits', '>=', 1).get().then(mems => {
                            // prepare dashboard table
                            let table:Array<any> = [];
                            
                            mems.docs.forEach((mem) => {
                                const memb = <Member>mem.data();
                                let status: string;
                                if (memb.officer) {
                                    status = 'Officer';
                                } else if (memb.direwolf) {
                                    status = 'Direwolf';
                                } else if (memb.pack_member) {
                                    status = 'Pack Member';
                                } else {
                                    status = 'Wolf Pup'
                                }
                                const user = message.guild.members.cache.get(mem.id);
                                let TL = '';
                                if(user) {
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {TL = '3/4'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {TL = '5/6'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {TL = '7/8'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {TL = '9/10'} 
                                    table.push([user.displayName, memb.credits, Math.round(memb.confirmed_dmr), Math.round(memb.confirmed_ore), TL, status]);
                                }
                            });
                            const count = Math.ceil(table.length / 10); // number of iterations
                            for (let index = 0; index < count; index++) {
                                let msg = table.splice(0, 10);
                                msg.unshift(['Name', 'Credits', 'FP', 'Ore', 'TL', 'Status']);
                                message.channel.send(`\`\`\`asciidoc\n${Tbl(msg)}\`\`\``);
                            }
                        });
                    break;
                    case "dashboard":
                        admin.firestore().collection('data/industry-bot/members').get().then(mems => {
                            // prepare dashboard table
                            let table:Array<any> = [];
                            
                            mems.docs.forEach((mem) => {
                                const memb = <Member>mem.data();
                                let status: string;
                                if (memb.officer) {
                                    status = 'Officer';
                                } else if (memb.direwolf) {
                                    status = 'Direwolf';
                                } else if (memb.pack_member) {
                                    status = 'Pack Member';
                                } else {
                                    status = 'Wolf Pup'
                                }
                                const user = message.guild.members.cache.get(mem.id);
                                let TL = '';
                                if(user) {
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T3/T4")) {TL = '3/4'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T5/T6")) {TL = '5/6'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T7/T8")) {TL = '7/8'} else
                                    if(message.guild.member(user).roles.cache.find((r:any) => r.name === "T9/T10")) {TL = '9/10'} 
                                    table.push([user.displayName, memb.credits, Math.round(memb.confirmed_dmr), Math.round(memb.confirmed_ore), TL, status]);
                                }
                            });
                            const count = Math.ceil(table.length / 10); // number of iterations
                            for (let index = 0; index < count; index++) {
                                let msg = table.splice(0, 10);
                                msg.unshift(['Name', 'Credits', 'FP', 'Ore', 'TL', 'Status']);
                                message.channel.send(`\`\`\`asciidoc\n${Tbl(msg)}\`\`\``);
                            }
                        });
                    break;
                    default:
                        message.channel.send('usage: \n * !admin update - update dashboard \n * !admin grant credit [number] @mention - grant @mention [number] credits \n * !admin credits - show just members who have industry credit\n * !admin dashboard - show all members, their industry balances, and their pack status. ')
                    break;
                }
            break;
            default:
            break;
        }
    }
});

client.on('message', (message: any) => {
    var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
    if (message.channel.id == confMaster.main_channel) {
        switch (parts[0]) {
            case "track": return;
            case "h":
                message.channel.send(`To claim ore contribution credit for the Aesir industry system: \n \`\`\`[ore] [quantity] m3 [station]\`\`\`\n In example, if you want to donate m3 of Dark Ochre at Clarelam, you would type the following in this channel: \n \`\`\`Dark Ochre 75000 m3 Clarelam\`\`\`\n If you want to review your industry balance, type in B or Balance: \n \`\`\`B \`\`\` `);
            break;
            case "help":
                message.channel.send(`To claim ore contribution credit for the Aesir industry system: \n \`\`\`[ore] [quantity] m3 [station]\`\`\`\n In example, if you want to donate m3 of Dark Ochre at Clarelam, you would type the following in this channel: \n \`\`\`Dark Ochre 75000 m3 Clarelam\`\`\`\n If you want to review your industry balance, type in B or Balance: \n \`\`\`B \`\`\` `);
            break;
            case "veldspar":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for submitting ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already.\n \nPlease note that ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} does not count towards industry credit.`);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "scordite":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for submitting ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n \nPlease note that ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} does not count towards industry credit.`);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "plagioclase":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for submitting ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n \nPlease note that ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} does not count towards industry credit.`);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "omber":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for submitting ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n \nPlease note that ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} does not count towards industry credit.`);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "kernite":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for submitting ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n \nPlease note that ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} does not count towards industry credit.`);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "dark":
                if (parts[1] != 'ochre') {message.delete({ timeout: 300000 });return;}
                if (parts[3] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[4]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[4])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[2]} m3 of Dark Ochre! \n Please place the contribution in ${parts[4].charAt(0).toUpperCase() + parts[4].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[2], message.member.id, donationType.ore, "Dark Ochre", parts[4]);
                } else {
                    message.channel.send(`${parts[4]} is not a valid location.`)
                }
            break;
            case "pyroxeres":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "spodumain":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "jaspet":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "hemorphite":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "hedbergite":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "gneiss":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "crokite":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "bistot":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "arkonor":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "mercoxit":
                if (parts[2] != 'm3') {message.delete({ timeout: 300000 });return;}
                if (!parts[3]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 of ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "planetary":
                if (!parts[2]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} planetary materials! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution(<number>parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                } else {
                    message.channel.send(`${parts[3]} is not a valid location.`)
                }
            break;
            case "b":
                checkBalance(message.member.id, message);
            break;
            case "balance":
                checkBalance(message.member.id, message);
            break;
            default:
            break;
        }
        message.delete({ timeout: 300000 });
    }
});

const saveContribution = (credit_amt:any, member:string, type:donationType, name?:string, location?:string, amount?:any, helpers?:string[], helperCredit?:number) => {
    let claim:any;
    if (helperCredit && helpers) {
        claim = {amount:parseFloat(credit_amt), member, type, name, location, approved: false, rejected: false, credited: false, timestamp: Date.now(), helpers, helper_credit: helperCredit};
    } else {
        claim = {amount:parseFloat(credit_amt), member, type, name, location, approved: false, rejected: false, credited: false, timestamp: Date.now()};
    }
    const id = admin.firestore().collection('data/industry-bot/claims').doc().id;
    admin.firestore().doc(`data/industry-bot/claims/${id}`).set(claim).then(() => {
        client.channels.fetch(confMaster.admin_channel).then((channel:any) => {
            const displayData:any = {};
            displayData.type = claim.name;
            if (amount) {
                displayData.amount = amount;
            } else {
                displayData.amount = claim.amount;
            }
            displayData.location = claim.location;
            if (type == donationType.story) {
                displayData.helpers = helpers;
                channel.send(`<@&791340711445921812>, <@${member}> has claimed a donation: ${id} \n \`\`\`JS\n ${JSON.stringify(displayData, null, 4)} \`\`\` \nHelpers: ${helpers}\nEnsure each helper shows separately in the JSON above.`).then((msg:any) => {
                    msg.react('<:yes:776488521090465804>')
                        .then(() => msg.react('<:no:776488521414344815>'));
                });
            } else {
                channel.send(`<@&791340711445921812>, <@${member}> has claimed a donation: ${id} \n \`\`\`JS\n ${JSON.stringify(displayData, null, 4)} \`\`\``).then((msg:any) => {
                    msg.react('<:yes:776488521090465804>')
                        .then(() => msg.react('<:no:776488521414344815>'));
                });
            }
        }).catch(console.error);
    }).catch(console.error);
    admin.firestore().doc(`data/industry-bot/members/${member}`).get().then(doc => {
        if (!doc.exists) {
            const member:Member = <Member>{credits: 0, officer: false, pack_member: false, direwolf: false, confirmed_dmr: 0, confirmed_ore: 0};
            doc.ref.set(member).catch(console.error);
        }
    }).catch(console.error);
}

const grantHelperCredit = (helper: string, credit:number): Promise<any> => {
    const hlp = helper.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '');
    return admin.firestore().doc(`data/industry-bot/members/${hlp}`).get().then(doc => {
        if (!doc.exists) {
            let mem = <Member>{credits: 0, officer: false, pack_member: false, direwolf: false, confirmed_dmr: credit, confirmed_ore: 0};
            admin.firestore().doc(`data/industry-bot/members/${hlp}`).set(mem).catch(console.error);
        } else {
            let mem = <Member>doc.data();
            mem.confirmed_dmr += credit;
            doc.ref.set(mem).catch(console.error);
        }
    })
}

const checkBalance = (member:string, message:any) => {
    admin.firestore().doc(`data/industry-bot/members/${member}`).get().then(doc => {
        if (!doc.exists) {
            message.channel.send(`<@${member}>, your current industry balance is 0 credit(s) \n \`\`\` Confirmed Ore: 0 m3 \n Fighter Points: 0 \`\`\``);
        } else {
            admin.firestore().collection('data/industry-bot/claims').where('member', '==', member).where('approved','==',true).where('credited','==',false).get().then(clms => {
                if(clms.docs.length > 0) {
                    let process_arr = [];
                    let totalOre = 0;
                    let totalDMR = 0;
                    clms.docs.forEach(clm => {
                        let cl = <Claim>clm.data();
                        if (cl.type == donationType.ore) {
                            totalOre += cl.amount;
                            cl.credited = true;
                            process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                        } else if (cl.type == donationType.isk) {
                            cl.credited = true;
                            process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                        } else {
                            totalDMR += cl.amount;
                            cl.credited = true;
                            process_arr.push(admin.firestore().doc(`data/industry-bot/claims/${clm.id}`).set(cl));
                        }
                        if (cl.helpers && cl.helper_credit) {
                            if (cl.helpers.length > 0) {
                                const credit = cl.helper_credit / cl.helpers.length;
                                cl.helpers.forEach((hlpr:string) => {
                                    grantHelperCredit(hlpr, credit);
                                });
                            }
                        }
                    });
                    let mem = <Member>doc.data();
                    if (mem) {
                        mem.confirmed_ore += totalOre;
                        mem.confirmed_dmr += totalDMR;
                        if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")){
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 6000)) {
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 6000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")){
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 9000)) {
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 9000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")){
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 26500)) {
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 26500);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")){
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 42000)) {
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 42000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else {
                            // admin that a role is not assigned
                        }
                        if (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                            while (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                                mem.credits += 1;
                                mem.confirmed_dmr -= confMaster.dmr_per_credit;
                                mem.confirmed_dmr = Math.round(mem.confirmed_dmr);
                            }
                        }
                        process_arr.push(doc.ref.set(mem));
                    }
                    Promise.all(process_arr).then(returnDat => {
                        admin.firestore().doc(`data/industry-bot/members/${doc.id}`).get().then(doc2 => {
                            const dat2 = <Member>doc2.data();
                            if (dat2) {
                                message.channel.send(`<@${member}>, your current industry balance is ${dat2.credits} credit(s) \n \`\`\` Confirmed Ore: ${dat2.confirmed_ore} m3 \n Fighter Points: ${Math.round(dat2.confirmed_dmr)} \`\`\``);
                            }
                        });
                    }).catch(console.error);
                } else {
                    const dat = doc.data();
                    if (dat) {
                        message.channel.send(`<@${member}>, your current industry balance is ${dat.credits} credit(s) \n \`\`\` Confirmed Ore: ${dat.confirmed_ore} m3 \n Fighter Points: ${Math.round(dat.confirmed_dmr)} \`\`\``);
                    }
                }
            }).catch(console.error);
        }
    });
}

const approveContribution = (message:any, user:any) => {
    var parts = message.content.split(" ");
    admin.firestore().doc(`data/industry-bot/claims/${parts[6]}`).get().then((doc:any) => {
        let approved = doc.data();
        if (approved) {
            approved.approved = true;
            doc.ref.set(approved).catch(console.error);
            message.channel.send(`<@${user.id}> has approved a claim`);
            message.delete();
        }
    }).catch(console.error);
}
const declineContribution = (message:any, user:any) => {
    var parts = message.content.split(" ");
    admin.firestore().doc(`data/industry-bot/claims/${parts[6]}`).get().then((doc:any) => {
        let newDoc = doc.data();
        if (newDoc) {
            newDoc.rejected = true;
            doc.ref.set(newDoc).catch(console.error);
            message.channel.send(`<@${user.id}> has declined a claim`);
            message.delete();
        }
    })
}
const upgradeIndustryCredits = (currentTier:string, nextTier:string) => {}
client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');