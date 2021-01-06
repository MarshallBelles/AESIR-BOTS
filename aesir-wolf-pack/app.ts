const Discord = require('discord.js');
const client = new Discord.Client();
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
    tech_level_channel: string,
    skills_channel: string,
    hangars: string[],
    ore_holds_per_credit: number,
    dmr_per_credit: number,
    T3T4: number,
    T5T6: number,
    T7T8: number,
    T9T10: number
}

client.once('ready', () => {
	console.log('Ready!');
});

var slightlyOffensiveNames = [
    'you magnificent potato!',
    'you sly dog!',
    'you phat mamma jamma!',
    'you elvis impersonator you!',
    'you strut like a rooster!',
    'bring on the pain!',
    'took you long enough!'
]

const random = ():number => { return Math.floor(Math.random() * slightlyOffensiveNames.length) };

client.on('guildMemberAdd', (member: any) => {
    client.channels.fetch('776559380970995712')
        .then((channel:any) => {
            channel.send(`Welcome <@${member.id}>, ${slightlyOffensiveNames[random()]} \n \n Thanks for checking out our humble Discord. \n \n If you are joining our corporation, be sure to review the corp rules page once your application is approved. \n \n if you are here for diplomatic reasons, then welcome. \n \n Please select an option below to continue. \n \n 🤝 = Diplomacy \n 🐺 = join the wolf pack`)
            .then((msg:any) => {
                client.channels.fetch('776943538633965638').then((channel:any) => {
                    /* channel.bulkDelete(100).then(() => {
                        channel.send(`If you’re a Omega Clone looking to earn some serious isk, Aesir has you covered! \n \n We will provide you a safe place to mine valuable ores, and pay you well for what you mine. \n This means no more cheap ore, no more constant hauling to market, no more worry over pirates. \n \n Depending on the size of your Venture, each cargo-hold-full could earn you well over 2.0M ISK! \n How much ISK you can make in 2 weeks is up to you! \n \n When you accept this program, Aesir will:\n ::  Provide access to System Level 6 ores. \n ::  Protect you from pirates. \n ::  Replace your Venture if it is destroyed.\n ::  Purchase the ore that you mine \n \n Feel free to stop by <#776560170095607828> to chat, howl at the moon, and hear the latest rumors.\n When your ready to sell your ore head to <#776280849288921129> to see our rates for ore. \n \n Before moving forward, please adjust your discord tag to include the type of Venture you fly.  (VT, V1, V2, or V3) \n \n React to this message with: <:yes:776488521090465804> if you agree with the <#776943478416080978> and accept the offer. \n`);
                    }).catch(console.error); */
                }).catch(console.error);
                msg.delete({ timeout: 600000 }).catch(console.error);
              })
        })
        .catch(console.error);
});

client.on('message', (message: any) => {
    var parts = message.content.split(" ");
    if (message.author == client.user) {
        if (parts[0] == 'Welcome') {
            // This is one of our welcome messages above
            message.react('🤝')
            .then(() => message.react('<:miner:776567439701704714>'))
            .then(() => message.react('🐺'));
        }
    }
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
    if(user.bot)  return;
    const { message, emoji } = messageReaction;
    
    if(emoji.name === "🐺") {
        message.guild.member(user).roles.set(['776841167123120158']).catch(console.error);
    }
    if(emoji.name === "miner") {
        message.guild.member(user).roles.set(['776840866492842004']).catch(console.error);
    }
    if(emoji.name === "🤝") {
        message.guild.member(user).roles.set(['776841070419247104']).catch(console.error);
    }
});

client.login('Nzc2NTI5NDM5MTYwNzk1MTY1.X62NZQ.s90oWkajTJo2PLRk8HwksK7JaK8');