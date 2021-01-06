"use strict";
exports.__esModule = true;
var admin = require("firebase-admin");
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
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ee-aesir.firebaseio.com"
});
var donationType;
(function (donationType) {
    donationType[donationType["ore"] = 0] = "ore";
    donationType[donationType["debris"] = 1] = "debris";
    donationType[donationType["module"] = 2] = "module";
    donationType[donationType["rig"] = 3] = "rig";
    donationType[donationType["isk"] = 4] = "isk";
})(donationType || (donationType = {}));
var Discord = require('discord.js');
var client = new Discord.Client();
var axios = require('axios');
var confMaster;
client.once('ready', function () {
    console.log('Ready!');
    // grab configuration from FireBase
    admin.firestore().doc('configuration/industry-bot').onSnapshot(function (conf) {
        console.log('obtained new config');
        if (!conf.data())
            return;
        confMaster = conf.data();
        client.channels.fetch(confMaster.main_channel).then(function (channel) {
            channel.bulkDelete(100).then(function () {
                channel.send("Example commands: ```H | Help - Expanded help menu \nSpodumain 85000.3 m3 Misaba - Claim spodumain ore contribution for credit at Misaba \nDebris 200 Clarelam - Claim ship debris contribution for credit at Clarelam \nModules 20 mk5 Misaba - Claim module contribution credit at Misaba \nISK 20,000,000 - Claim 20M isk donation to corp wallet\nB | Balance - Display your industry system credit balance \nOrders Queue - view current order queue \nInsurance - provides instructions ```");
            })["catch"](console.error);
        })["catch"](console.error);
        client.channels.fetch(confMaster.tech_level_channel).then(function (channel) {
            channel.bulkDelete(100).then(function () {
                channel.send("Please select your current tech level").then(function (msg) {
                    msg.react('<:T3T4:796136977531404339>')
                        .then(function () { return msg.react('<:T5T6:796136977505845258>'); })
                        .then(function () { return msg.react('<:T7T8:796136977388142613>'); })
                        .then(function () { return msg.react('<:T9T10:796136977283809311>'); });
                })["catch"](console.error);
            })["catch"](console.error);
        })["catch"](console.error);
        client.channels.fetch(confMaster.admin_channel).then(function (channel) {
            channel.bulkDelete(100).then(function () {
                admin.firestore().collection('data/industry-bot/claims').where('approved', '==', false).where('rejected', '==', false).get().then(function (clms) {
                    // these claims were not processed before restarting the server
                    clms.docs.forEach(function (doc) {
                        var tmp = doc.data();
                        if (tmp) {
                            var displayData = {};
                            displayData.type = tmp.name;
                            displayData.amount = tmp.amount;
                            displayData.location = tmp.location;
                            channel.send("<@&791340711445921812>, <@" + tmp.member + "> has claimed a donation: " + doc.id + " \n ```JS\n " + JSON.stringify(displayData, null, 4) + " ```").then(function (msg) {
                                msg.react('<:yes:776488521090465804>')
                                    .then(function () { return msg.react('<:no:776488521414344815>'); });
                            })["catch"](console.error);
                        }
                    });
                })["catch"](console.error);
            })["catch"](console.error);
        })["catch"](console.error);
    });
});
client.on('messageReactionAdd', function (messageReaction, user) {
    var message = messageReaction.message, emoji = messageReaction.emoji;
    if (user.bot) {
        return;
    }
    if (message.author == client.user) {
        if (message.channel.id == confMaster.admin_channel) {
            if (emoji.name === "yes") {
                approveContribution(message, user);
            }
            if (emoji.name === "no") {
                declineContribution(message, user);
            }
        }
        if (message.channel.id == confMaster.tech_level_channel) {
            if (emoji.name == "T3T4") {
                if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T3/T4"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged with T3/T4");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T5/T6"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged T5/T6, you cannot be moved to T3/T4");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T7/T8"; })) {
                    message.channel.send("<@" + user.id + "> you are currently tagged T7/T8, you cannot be moved to T3/T4");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T9/T10"; })) {
                    message.channel.send("<@" + user.id + "> you are currently tagged T9/T10, you cannot be moved to T3/T4");
                }
                else {
                    message.channel.send("<@" + user.id + "> you are now tagged T3/T4");
                    message.guild.member(user).roles.add('796127725000851476');
                }
            }
            if (emoji.name == "T5T6") {
                if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T3/T4"; })) {
                    message.channel.send("<@" + user.id + "> you are now tagged with T5/T6");
                    message.guild.member(user).roles.remove('796127725000851476');
                    message.guild.member(user).roles.add('796127791467986956');
                    upgradeIndustryCredits('T3T4', 'T5T6');
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T5/T6"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged T5/T6");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T7/T8"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged with T7/T8, you cannot be moved to T5/T6");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T9/T10"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged with T9/T10, you cannot be moved to T5/T6");
                }
                else {
                    message.channel.send("<@" + user.id + "> you are now tagged T5/T6");
                    message.guild.member(user).roles.add('796127791467986956');
                }
            }
            if (emoji.name == "T7T8") {
                if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T3/T4"; })) {
                    message.channel.send("<@" + user.id + "> you cannot be tagged with T7/T8 as you are currently T3/T4. Upgrade to T5/T6 first.");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T5/T6"; })) {
                    message.channel.send("<@" + user.id + "> you are now tagged T7/T8");
                    message.guild.member(user).roles.remove('796127791467986956');
                    message.guild.member(user).roles.add('796127835328610325');
                    upgradeIndustryCredits('T5T6', 'T7T8');
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T7/T8"; })) {
                    message.channel.send("<@" + user.id + "> You are already tagged with T7/T8");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T9/T10"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged with T9/T10, you cannot be moved to T7/T8");
                }
                else {
                    message.channel.send("<@" + user.id + "> you are now tagged T7/T8");
                    message.guild.member(user).roles.add('796127835328610325');
                }
            }
            if (emoji.name == "T9T10") {
                if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T3/T4"; })) {
                    message.channel.send("<@" + user.id + "> you cannot be tagged with T9/T10 as you are currently T3/T4. Upgrade to T5/T6 first.");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T5/T6"; })) {
                    message.channel.send("<@" + user.id + "> you cannot be tagged with T9/T10 as you are currently T5/T6. Upgrade to T7/T8 first.");
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T7/T8"; })) {
                    message.channel.send("<@" + user.id + "> You are now tagged T9/T10");
                    message.guild.member(user).roles.remove('796127835328610325');
                    message.guild.member(user).roles.add('796127898024673320');
                    upgradeIndustryCredits('T7T8', 'T9T10');
                }
                else if (message.guild.member(user).roles.cache.find(function (r) { return r.name === "T9/T10"; })) {
                    message.channel.send("<@" + user.id + "> you are already tagged with T9/T10");
                }
                else {
                    message.channel.send("<@" + user.id + "> you are now tagged T9/T10");
                    message.guild.member(user).roles.add('796127898024673320');
                }
            }
        }
    }
});
client.on('message', function (message) {
    var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
    if (message.channel.id == confMaster.admin_channel) {
        switch (parts[0]) {
            case "!admin":
                switch (parts[1]) {
                    case "new":
                        if (parts[2] == "month") {
                            // For each member, check donations over the past week 
                            // if officer, apply 2 credits.
                            // prune system tables
                            message.channel.send('Not implemented yet');
                        }
                        break;
                    case "grant":
                        if (parts[2] == "credit") {
                            if (parts[3] && parts[4]) {
                                var userNum = parts[4].replace(/</g, '').replace(/>/g, '').replace(/@/g, '').replace(/!/g, '').replace(/ /g, '');
                                admin.firestore().doc("data/industry-bot/members/" + userNum).get().then(function (doc) {
                                    var mem = doc.data();
                                    if (mem) {
                                        mem.credits += parseInt(parts[3]);
                                        doc.ref.set(mem);
                                    }
                                    else {
                                        var member = { credits: parseInt(parts[3]), officer: false, pack_member: false, direwolf: false, confirmed_dmr: 0, confirmed_ore: 0 };
                                        doc.ref.set(member);
                                    }
                                });
                            }
                        }
                        break;
                    case "dashboard":
                        admin.firestore().collection('data/industry-bot/members').get().then(function (mems) {
                            mems.docs.forEach(function (mem) {
                                checkBalance(mem.id, message);
                            });
                        });
                        break;
                    default:
                        message.channel.send('usage: \n * !admin new month - execute monthly \n * !admin grant credit [number] @mention - grant @mention [number] credits \n * !admin dashboard - show all members, their industry balances, and their pack status.');
                        break;
                }
                break;
            default:
                break;
        }
    }
});
client.on('message', function (message) {
    var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
    if (message.channel.id == confMaster.main_channel) {
        switch (parts[0]) {
            case "example": return;
            case "h":
                message.channel.send("To claim ore contribution credit for the Aesir industry system: \n ```[ore] [quantity] m3 [station]```\n In example, if you want to donate m3 of Dark Ochre at Clarelam, you would type the following in this channel: \n ```Dark Ochre 75000 m3 Clarelam```\n If you want to donate ship debris for credit, type in the word Debris and the amount like so: \n ```Debris 200 Misaba``` \n You can also do the same as above for any modules or rigs that you contribute: \n ```Modules 30 mk7 Misaba``` \n To track a donation of ISK to the corp wallet, type in ISK [amount] like so: \n ``` ISK 10,500,000 ``` \n If you want to review your industry balance, type in B or Balance: \n ```B ``` \n Type in Orders for the orders help dialogue: \n ```Orders ``` \n Type in Insurance for the insurance help dialogue: ```Insurance ``` \n ");
                break;
            case "help":
                message.channel.send("To claim ore contribution credit for the Aesir industry system: \n ```[ore] [quantity] m3 [station]```\n In example, if you want to donate 75000 m3 of Dark Ochre at Clarelam, you would type the following in this channel: \n ```Dark Ochre 75000 m3 Clarelam```\n If you want to donate ship debris for credit, type in the word Debris and the amount like so: \n ```Debris 200 Misaba``` \n You can also do the same as above for any modules or rigs that you contribute: \n ```Modules 30 mk7 Misaba``` \n To track a donation of ISK to the corp wallet, type in ISK [amount] like so: \n ``` ISK 10,500,000 ``` \n If you want to review your industry balance, type in B or Balance: \n ```B ``` \n Type in Orders for the orders help dialogue: \n ```Orders ``` \n Type in Insurance for the insurance help dialogue: ```Insurance ``` \n ");
                break;
            case "veldspar":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for submitting " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already.\n \nPlease note that " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + " does not count towards industry credit.");
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "scordite":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for submitting " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n \nPlease note that " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + " does not count towards industry credit.");
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "plagioclase":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for submitting " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n \nPlease note that " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + " does not count towards industry credit.");
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "omber":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for submitting " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n \nPlease note that " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + " does not count towards industry credit.");
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "kernite":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for submitting " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n \nPlease note that " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + " does not count towards industry credit.");
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "dark":
                if (parts[1] != 'ochre') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (parts[3] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[4]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[4])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[2] + " m3 of Dark Ochre! \n Please place the contribution in " + (parts[4].charAt(0).toUpperCase() + parts[4].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[2], message.member.id, donationType.ore, "Dark Ochre", parts[4]);
                }
                else {
                    message.channel.send(parts[4] + " is not a valid location.");
                }
                break;
            case "pyroxeres":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "spodumain":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "jaspet":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "hemorphite":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "hedbergite":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "gneiss":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "crokite":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "bistot":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "arkonor":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "mercoxit":
                if (parts[2] != 'm3') {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (!parts[3]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " m3 of " + (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)) + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[3]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "planetary":
                if (!parts[2]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " planetary materials! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution(parts[1], message.member.id, donationType.ore, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                }
                else {
                    message.channel.send(parts[3] + " is not a valid location.");
                }
                break;
            case "debris":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " " + parts[0] + "! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * 0.15), message.member.id, donationType.debris, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                }
                else {
                    message.channel.send(parts[2] + " is not a valid location.");
                }
                break;
            case "modules":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                var multiplier = 1;
                switch (parts[2]) {
                    case "mk3":
                        if (message.member.roles.cache.find(function (r) { return r.name === "T3/T4"; })) { }
                        else {
                            multiplier = 0.1;
                        }
                        break;
                    case "mk5":
                        if (message.member.roles.cache.find(function (r) { return r.name === "T3/T4"; })) { }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T5/T6"; })) { }
                        else {
                            multiplier = 0.1;
                        }
                        break;
                    case "mk7":
                        if (message.member.roles.cache.find(function (r) { return r.name === "T3/T4"; })) { }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T5/T6"; })) { }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T7/T8"; })) { }
                        else {
                            multiplier = 0.2;
                        }
                        break;
                    case "mk9":
                        break;
                    case "c":
                        break;
                    case "story":
                        break;
                    case "faction":
                        break;
                    default:
                        message.channel.send(" Proper Usage: ```\n Modules [amount] [type] [location] ```\n Valid Types: mk5, mk7, mk9, C, story, faction \n Valid locations: " + confMaster.hangars);
                        {
                            message["delete"]({ timeout: 300000 });
                            return;
                        }
                }
                if (confMaster.hangars.includes(parts[3])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " " + parts[2] + " " + parts[0] + "! \n Please place the contribution in " + (parts[3].charAt(0).toUpperCase() + parts[3].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * multiplier), message.member.id, donationType.module, (parts[2] + ' ' + parts[0]), parts[3]);
                }
                else {
                    message.channel.send(" Please try again. \n Proper Usage: ```\n Modules [amount] [type] [location] ```\n Valid Types: mk5, mk7, mk9, C, story, faction \n Valid locations: " + confMaster.hangars);
                }
                break;
            case "rigs":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " " + parts[0] + "! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * 2), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                }
                else {
                    message.channel.send(parts[2] + " is not a valid location.");
                }
                break;
            case "blueprints":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " " + parts[0] + "! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * 3), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                }
                else {
                    message.channel.send(parts[2] + " is not a valid location.");
                }
                break;
            case "datacores":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " " + parts[0] + "! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * 4), message.member.id, donationType.rig, (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)), parts[2]);
                }
                else {
                    message.channel.send(parts[2] + " is not a valid location.");
                }
                break;
            case "faction":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                if (confMaster.hangars.includes(parts[2])) {
                    message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " Faction Debris! \n Please place the contribution in " + (parts[2].charAt(0).toUpperCase() + parts[2].slice(1)) + " hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your balance.");
                    saveContribution((parts[1] * 2), message.member.id, donationType.rig, "Faction Debris", parts[2]);
                }
                else {
                    message.channel.send(parts[2] + " is not a valid location.");
                }
                break;
            case "isk":
                if (!parts[1]) {
                    message["delete"]({ timeout: 300000 });
                    return;
                }
                message.channel.send("Thank you <@" + message.member.id + "> for tracking your contribution of " + parts[1] + " ISK! \n");
                saveContribution(parts[1], message.member.id, donationType.isk, "ISK", "Wallet");
                break;
            case "orders":
                message.channel.send("Not implemented.");
                break;
            case "insurance":
                message.channel.send("Not implemented.");
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
        message["delete"]({ timeout: 300000 });
    }
});
var saveContribution = function (amt, member, type, name, location) {
    var claim = { amount: parseFloat(amt), member: member, type: type, name: name, location: location, approved: false, rejected: false, credited: false, timestamp: Date.now() };
    var id = admin.firestore().collection('data/industry-bot/claims').doc().id;
    admin.firestore().doc("data/industry-bot/claims/" + id).set(claim).then(function () {
        client.channels.fetch(confMaster.admin_channel).then(function (channel) {
            var displayData = {};
            displayData.type = claim.name;
            displayData.amount = claim.amount;
            displayData.location = claim.location;
            channel.send("<@&791340711445921812>, <@" + member + "> has claimed a donation: " + id + " \n ```JS\n " + JSON.stringify(displayData, null, 4) + " ```").then(function (msg) {
                msg.react('<:yes:776488521090465804>')
                    .then(function () { return msg.react('<:no:776488521414344815>'); });
            });
        })["catch"](console.error);
    })["catch"](console.error);
    admin.firestore().doc("data/industry-bot/members/" + member).get().then(function (doc) {
        if (!doc.exists) {
            var member_1 = { credits: 0, officer: false, pack_member: false, direwolf: false, confirmed_dmr: 0, confirmed_ore: 0 };
            doc.ref.set(member_1)["catch"](console.error);
        }
    })["catch"](console.error);
};
var checkBalance = function (member, message) {
    admin.firestore().doc("data/industry-bot/members/" + member).get().then(function (doc) {
        if (!doc.exists) {
            message.channel.send("<@" + member + ">, you have not participated in the industry program. Please track your contributions and then try again.");
        }
        else {
            admin.firestore().collection('data/industry-bot/claims').where('member', '==', member).where('approved', '==', true).where('credited', '==', false).get().then(function (clms) {
                if (clms.docs.length > 0) {
                    var process_arr_1 = [];
                    var totalOre_1 = 0;
                    var totalDMR_1 = 0;
                    clms.docs.forEach(function (clm) {
                        var cl = clm.data();
                        if (cl.type == donationType.ore) {
                            totalOre_1 += cl.amount;
                            cl.credited = true;
                            process_arr_1.push(admin.firestore().doc("data/industry-bot/claims/" + clm.id).set(cl));
                        }
                        else if (cl.type == donationType.isk) {
                            cl.credited = true;
                            process_arr_1.push(admin.firestore().doc("data/industry-bot/claims/" + clm.id).set(cl));
                        }
                        else {
                            totalDMR_1 += cl.amount;
                            cl.credited = true;
                            process_arr_1.push(admin.firestore().doc("data/industry-bot/claims/" + clm.id).set(cl));
                        }
                    });
                    var mem = doc.data();
                    if (mem) {
                        mem.confirmed_ore += totalOre_1;
                        mem.confirmed_dmr += totalDMR_1;
                        if (message.member.roles.cache.find(function (r) { return r.name === "T3/T4"; })) {
                            //4000 ore hold
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 6000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 6000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T5/T6"; })) {
                            //6000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 9000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 9000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T7/T8"; })) {
                            //9000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 26500)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 26500);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        }
                        else if (message.member.roles.cache.find(function (r) { return r.name === "T9/T10"; })) {
                            //25000
                            while (mem.confirmed_ore > (confMaster.ore_holds_per_credit * 42000)) {
                                // add to credits
                                mem.credits += 1;
                                mem.confirmed_ore -= (confMaster.ore_holds_per_credit * 42000);
                                mem.confirmed_ore = Math.round(mem.confirmed_ore);
                            }
                        }
                        else {
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
                        process_arr_1.push(doc.ref.set(mem));
                    }
                    Promise.all(process_arr_1).then(function (returnDat) {
                        admin.firestore().doc("data/industry-bot/members/" + doc.id).get().then(function (doc2) {
                            var dat2 = doc2.data();
                            if (dat2) {
                                message.channel.send("<@" + member + ">, your current industry balance is " + dat2.credits + " credit(s) \n ``` Confirmed Ore: " + dat2.confirmed_ore + " m3 \n Fighter Points: " + dat2.confirmed_dmr + " ```");
                            }
                        });
                    })["catch"](console.error);
                }
                else {
                    var dat = doc.data();
                    if (dat) {
                        message.channel.send("<@" + member + ">, your current industry balance is " + dat.credits + " credit(s) \n ``` Confirmed Ore: " + dat.confirmed_ore + " m3 \n Fighter Points: " + dat.confirmed_dmr + " ```");
                        // TODO: tell user how much more ore / dmr they need until their next credit
                    }
                }
            })["catch"](console.error);
        }
    });
};
var approveContribution = function (message, user) {
    var parts = message.content.split(" ");
    admin.firestore().doc("data/industry-bot/claims/" + parts[6]).get().then(function (doc) {
        var approved = doc.data();
        if (approved) {
            approved.approved = true;
            doc.ref.set(approved)["catch"](console.error);
            message.channel.send("<@" + user.id + "> has approved a claim");
            message["delete"]();
        }
    })["catch"](console.error);
};
var declineContribution = function (message, user) {
    var parts = message.content.split(" ");
    admin.firestore().doc("data/industry-bot/claims/" + parts[6]).get().then(function (doc) {
        var newDoc = doc.data();
        if (newDoc) {
            newDoc.rejected = true;
            doc.ref.set(newDoc)["catch"](console.error);
            message.channel.send("<@" + user.id + "> has declined a claim");
            message["delete"]();
        }
    });
};
var upgradeIndustryCredits = function (currentTier, nextTier) { };
client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');
