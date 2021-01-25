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
const axios = require('axios');
let confMaster: ConfigurationMaster;

client.once('ready', () => {
    console.log('Ready!');
    // grab configuration from FireBase
    admin.firestore().doc('configuration/industry-bot').onSnapshot((conf) => {
        console.log('obtained new config');
        if (!conf.data()) return;
        confMaster = <ConfigurationMaster><any>conf.data();
        client.channels.fetch(confMaster.fighter_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`Track your fighter contributions here: \`\`\`H | Help - Expanded help menu \nDebris 200 Clarelam - Claim ship debris contribution for credit at Clarelam \nModules 20 mk5 Misaba - Claim module contribution credit at Misaba \nSuper Soft Drink @mention - Report a run of Super Soft Drink where @mention helped you run it. (additional helpers must be separated by spaces) \nB | Balance - Display your industry system credit balance \`\`\``);
            }).catch(console.error);
        }).catch(console.error);
    });
});

client.on('message', (message: any) => {
    var parts = message.content.toLowerCase().replace(/,/g, '').replace(/'/g, '').split(" ");
    if (message.channel.id == confMaster.fighter_channel) {
        switch (parts[0]) {
            case "track": return;
            case "h":
                message.channel.send(`To claim fighter contribution credit for the Aesir industry system: \n If you want to donate ship debris for credit, type in the word Debris and the amount like so: \n \`\`\`Debris 200 Misaba\`\`\` \n You can also do the same as above for any modules or rigs that you contribute: \n \`\`\`Modules 30 mk7 Misaba\`\`\` \n If you want to review your industry balance, type in B or Balance: \n \`\`\`B \`\`\` \n `);
            break;
            case "help":
                message.channel.send(`To claim fighter contribution credit for the Aesir industry system: \n If you want to donate ship debris for credit, type in the word Debris and the amount like so: \n \`\`\`Debris 200 Misaba\`\`\` \n You can also do the same as above for any modules or rigs that you contribute: \n \`\`\`Modules 30 mk7 Misaba\`\`\` \n If you want to review your industry balance, type in B or Balance: \n \`\`\`B \`\`\` \n `);
            break;
            case "debris":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    let multiplier = 1.0;
                    if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                    {multiplier = 0.33}
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} ${parts[0]}! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.debris, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2], parts[1]);
                } else {
                    message.channel.send(`${parts[2]} is not a valid location.`)
                }
            break;
            case "modules":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                let multiplier = 1;
                switch (parts[2]) {
                    case "mk3":
                        if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                        {multiplier = 0.0}
                    break;
                    case "mk5":
                        if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                        if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {} else
                        if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 0.66} else
                        {multiplier = 0.1}
                    break;
                    case "mk7":
                        if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                        if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {multiplier = 1.33} else
                        if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {} else
                        {multiplier = 0.2}
                    break;
                    case "mk9":
                        if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {multiplier = 1.66} else
                        if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 1.33} else
                        {}
                    break;
                    case "c":
                    break;
                    case "story":
                    break;
                    case "faction":
                    break;
                    default:
                        message.channel.send(` Proper Usage: \`\`\`\n Modules [amount] [type] [location] \`\`\`\n Valid Types: mk5, mk7, mk9, C, story, faction \n Valid locations: ${confMaster.hangars}`);
                        {message.delete({ timeout: 300000 });return;}
                    }
                    if (confMaster.hangars.includes(parts[3])) {
                        message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} ${parts[2]} ${parts[0]}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                        saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.module, (parts[2] + ' ' + parts[0]), parts[3], parts[1]);
                    } else {
                        message.channel.send(` Please try again. \n Proper Usage: \`\`\`\n Modules [amount] [type] [location] \`\`\`\n Valid Types: mk5, mk7, mk9, C, story, faction \n Valid locations: ${confMaster.hangars}`);
                }
            break;
            case "rigs":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    let multiplier = 0.2;
                    if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {multiplier = 0.5} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 0.1} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")) {multiplier = 0}
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} ${parts[0]}! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2], parts[1]);
                } else {
                    message.channel.send(`${parts[2]} is not a valid location.`)
                }
            break;
            case "blueprints":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    let multiplier = 0.5;
                    if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {multiplier = 0.2} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 0.1} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")) {multiplier = 0}
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} ${parts[0]}! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2], parts[1]);
                } else {
                    message.channel.send(`${parts[2]} is not a valid location.`)
                }
            break;
            case "datacores":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    let multiplier = 1;
                    if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {multiplier = 20} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {multiplier = 13} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 6} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")) {multiplier = 3}
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} ${parts[0]}! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2], parts[1]);
                } else {
                    message.channel.send(`${parts[2]} is not a valid location.`)
                }
            break;
            case "faction":
                if (!parts[1]) {message.delete({ timeout: 300000 });return;}
                if (confMaster.hangars.includes(parts[2])) {
                    let multiplier = 1;
                    if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")) {} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {multiplier = 30} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {multiplier = 15} else
                    if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")) {multiplier = 6}
                    message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} Faction Debris! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.`);
                    saveContribution((<number>parts[1] * multiplier), message.member.id, donationType.rig, "Faction Debris", parts[2], parts[1]);
                } else {
                    message.channel.send(`${parts[2]} is not a valid location.`)
                }
            break;
            case "spark":
                if (parts[1] == 'of' && parts[2] == 'rebellion') {
                    storyMission(message, 36, 8, 1, 8, getHelpers(message, 3), 'Spark Of Rebellion');
                }
            break;
            case "super":
                if (parts[1] == 'soft' && parts[2] == 'drink') {
                    storyMission(message, 36, 8, 1, 8, getHelpers(message, 3), 'Super Soft Drink');
                }
            break;
            case "for":
                if (parts[1] == 'patriotism') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'For Patriotism');
                }
            break;
            case "for":
                if (parts[1] == 'freedom') {
                    storyMission(message, 36, 8, 1, 8, getHelpers(message, 2), 'For Freedom');
                }
            break;
            case "true":
                if (parts[1] == 'divine' && parts[2] == 'trial') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 3), 'True Divine Trial');
                }
            break;
            case "divine":
                if (parts[1] == 'redemption') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Divine Redemption');
                }
            break;
            case "modern":
                if (parts[1] == 'world') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Modern World');
                }
            break;
            case "business":
                if (parts[1] == 'magnate') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Business Magnate');
                }
            break;
            case "mega":
                if (parts[1] == 'corporation') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Mega Corporation');
                }
            break;
            case "a":
                if (parts[1] == 'soldiers' && parts[2] == 'way') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 3), 'A Soldiers Way');
                }
            break;
            case "matar":
                if (parts[1] == 'reborn') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Matar Reborn');
                }
            break;
            case "disaster":
                if (parts[1] == 'relief') {
                    storyMission(message, 69, 18, 6, 10, getHelpers(message, 2), 'Disaster Relief');
                }
            break;
            case "friends":
                if (parts[1] == 'by' && parts[2] == 'blood') {
                    storyMission(message, 375, 120, 63, 18, getHelpers(message, 3), 'Friends By Blood');
                }
            break;
            case "sweet":
                if (parts[1] == 'poison') {
                    storyMission(message, 375, 120, 63, 18, getHelpers(message, 2), 'Sweet Poison');
                }
            break;
            case "bad":
                if (parts[1] == 'hare' && parts[2] == 'day') {
                    storyMission(message, 375, 120, 63, 18, getHelpers(message, 3), 'Bad Hare Day');
                }
            break;
            case "angel":
                if (parts[1] == 'or' && parts[2] == 'devil') {
                    storyMission(message, 375, 120, 63, 18, getHelpers(message, 3), 'Angel Or Devil');
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

const getHelpers = (message:any, startingIndex:number):string[] => {
    var parts = message.content.toLowerCase().replace(/,/g, '').replace(/'/g, '').split(" ");
    let helpers:string[] = [];
    for (let index = startingIndex; index < parts.length; index++) {
        const element = parts[index];
        helpers.push(element);
    }
    return helpers;
}

const storyMission = (message:any, t1:number, t2:number, t3:number, h:number, helpers:string[], name:string) => {
    if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")) {
        saveContribution(t1, message.member.id, donationType.story, name, 'N/A', 1, helpers, h);
        message.channel.send(`Thank you <@${message.member.id}> for tracking your story mission run of ${name}! You and any helpers should receive fighter credit within a day.`);
    } else
    if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")) {
        saveContribution(t2, message.member.id, donationType.story, name, 'N/A', 1, helpers, h);
        message.channel.send(`Thank you <@${message.member.id}> for tracking your story mission run of ${name}! You and any helpers should receive fighter credit within a day.`);
    } else
    if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")) {
        saveContribution(t3, message.member.id, donationType.story, name, 'N/A', 1, helpers, h);
        message.channel.send(`Thank you <@${message.member.id}> for tracking your story mission run of ${name}! You and any helpers should receive fighter credit within a day.`);
    }
}

const grantHelperCredit = (helper: string, credit:number): Promise<any> => {
    const hlp = helper.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '');
    return admin.firestore().doc(`data/industry-bot/members/${hlp}`).get().then(doc => {
        if (!doc.exists) {
            let mem = <Member>{credits: 0, officer: false, pack_member: false, direwolf: false, confirmed_dmr: credit, confirmed_ore: 0};
            // this is a new user that is getting credit
            admin.firestore().doc(`data/industry-bot/members/${hlp}`).set(mem).catch(console.error);
        } else {
            // existing user is getting the credit
            let mem = <Member>doc.data();
            mem.confirmed_dmr += credit;
            doc.ref.set(mem).catch(console.error);
        }
    })
}

const checkBalance = (member:string, message:any) => {
    admin.firestore().doc(`data/industry-bot/members/${member}`).get().then(doc => {
        if (!doc.exists) {
            message.channel.send(`<@${member}>, you have not participated in the industry program. Please track your contributions and then try again.`)
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
                                // we have more than 0 helpers.
                                const credit = cl.helper_credit / cl.helpers.length;
                                cl.helpers.forEach((hlpr:string) => {
                                    process_arr.push(grantHelperCredit(hlpr, credit));
                                });
                            }
                        }
                    });
                    let mem = <Member>doc.data();
                    if (mem) {
                        mem.confirmed_ore += totalOre;
                        mem.confirmed_dmr += totalDMR;
                        if(message.member.roles.cache.find((r:any) => r.name === "T3/T4")){
                            //4000 ore hold
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 6000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 6000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T5/T6")){
                            //6000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 9000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 9000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T7/T8")){
                            //9000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 26500)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 26500);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else
                        if(message.member.roles.cache.find((r:any) => r.name === "T9/T10")){
                            //25000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 42000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 42000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        } else {
                            // admin that a role is not assigned
                        }
                        if (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                            while (mem.confirmed_dmr > confMaster.dmr_per_credit) {
                                // add to credits
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
client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');