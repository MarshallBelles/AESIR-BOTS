const Discord = require('discord.js');
const client = new Discord.Client();
import { Emoji } from "discord.js";
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
    skills_channel: string,
    hangars: string[],
    ore_holds_per_credit: number,
    dmr_per_credit: number,
    T3T4: number,
    T5T6: number,
    T7T8: number,
    T9T10: number
}

let confMaster: ConfigurationMaster;

client.once('ready', () => {
    console.log('Ready!');
    // grab configuration from Firestore
    admin.firestore().doc('configuration/industry-bot').onSnapshot((conf) => {
        console.log('obtained new config');
        if (!conf.data()) return;
        confMaster = <ConfigurationMaster><any>conf.data();
        client.channels.fetch(confMaster.the_woods_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`Thanks for checking out our humble Discord. \n \n If you are joining our corporation, be sure to review the corp rules page once your application is approved. \n \n if you are here for diplomatic reasons, then welcome. \n \n Please select an option below to continue. \n \n 🤝 = Diplomacy \n 🐺 = join the wolf pack`).then((msg:any) => {
                    msg.react('🤝').then(() => msg.react('🐺'));
                })
            }).catch(console.error);
        }).catch(console.error);
        client.channels.fetch(confMaster.hr_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.guild.roles.resolve('776841167123120158').members.forEach((mem:any) => {
                    channel.send(`<@&796749710681178132>, <@${mem.id}> has joined the server and is interested in joining Aesir. React YES to accept, or NO to reject and boot from the server.`).then((msg:any) => {
                        msg.react('<:yes:776488521090465804>')
                        .then(() => msg.react('<:no:776488521414344815>'));
                    })
                });
            }).catch(console.error);
        }).catch(console.error);
    });
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (parts[0] == '!wp') {
        if (parts[1] == 'clear'&& message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.bulkDelete(100);
        } else {
            message.channel.send('<:direwolf:776488702468685854>');
        }
    }
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    const { message, emoji } = messageReaction;
    if (user.bot) return;
    if (message.channel.id == confMaster.the_woods_channel) {
        if(emoji.name === "🐺") {
            message.guild.member(user).roles.add('776841167123120158').catch(console.error);
            message.channel.send(`Welcome <@${user.id}>! Please see <#780453159544815689>`).then((msg:any) => {msg.delete({ timeout: 300000 })}).then(() => {message.reactions.resolve("🐺").users.remove(user.id);});
            client.channels.fetch(confMaster.hr_channel).then((channel:any) => {
                channel.send(`<@&796749710681178132>, <@${user.id}> has joined the server and is interested in joining Aesir. React YES to accept, or NO to reject and boot from the server.`).then((msg:any) => {
                    msg.react('<:yes:776488521090465804>')
                    .then(() => msg.react('<:no:776488521414344815>'));
                });
            }).catch(console.error);

        }
        if(emoji.name === "🤝") {
            message.guild.member(user).roles.add('776841070419247104').catch(console.error);
            message.channel.send(`Welcome <@${user.id}>! Please see <#780453159544815689>`).then((msg:any) => {msg.delete({ timeout: 300000 })}).then(() => {message.reactions.resolve("🤝").users.remove(user.id);});
        }
    }
    if (message.channel.id == confMaster.hr_channel) {
        var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
        if (parts[0] === "<@&796749710681178132>") {
            const refMem = parts[1].replace(/</g, '').replace(/@/g, '').replace(/&/g, '').replace(/>/g, '').replace(/!/g, '');
            if (emoji.name === "yes") {
                // allow member in
                if (message.guild.member(refMem)) {
                    message.guild.member(refMem).roles.set(['776243945285746689']).catch(console.error);
                    message.channel.send(`<@${user.id}> has accepted <@${refMem}> into the corp!`);
                } else {
                    message.channel.send('That user has left the server.').then((msg:any) => {msg.delete({timeout:50000})});
                }
                message.delete();
            }
            if (emoji.name === "no") {
                // kick member
                if (message.guild.member(refMem)) {
                    message.guild.member(refMem).kick();
                    message.channel.send(`<@${user.id}> has kicked <@${refMem}>!`);
                    message.delete();
                }
                } else {
                    message.channel.send('That user has left the server.').then((msg:any) => {msg.delete({timeout:50000})});
                }
        }
    }
});


client.login('Nzc2NTI5NDM5MTYwNzk1MTY1.X62NZQ.s90oWkajTJo2PLRk8HwksK7JaK8');