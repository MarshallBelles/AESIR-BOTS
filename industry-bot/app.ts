import { join } from "path";
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
    main_channel: string;
    admin_channel: string;
}

const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
let confMaster: ConfigurationMaster;

client.once('ready', () => {
    console.log('Ready!');
    // grab configuration from FireBase
    admin.firestore().doc('configuration/industry-bot').get().then(conf => {
        if (!conf) return;
        confMaster = <ConfigurationMaster><any>conf.data();        
        client.channels.fetch(confMaster.main_channel).then((channel:any) => {
            channel.bulkDelete(100).then(() => {
                channel.send(`industry bot works!`);
            }).catch(console.error);
        }).catch(console.error);
    }).catch(console.error);
});

client.on('messageReactionAdd', (messageReaction:any, user:any) => {
    const { message, emoji } = messageReaction;
    if(user.bot)  return;
    if (message.author == client.user) {
        if (message.channel.id == confMaster.main_channel) {
            if(emoji.name === "yes") {
            }
            if(emoji.name === "no") {
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

client.login('NzkwODA1MjM0OTI1NDM2OTY4.X-F8xA.qOIAk7mOEjVtg0kjZpE5xbvbP1Q');