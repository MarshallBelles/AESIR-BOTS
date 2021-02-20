let mClient;
let database;
let config;

exports.setup = (eventEmitter, client, db) => {
  mClient = client;
  database = db;
  eventEmitter.on('ready', indyStart);
  eventEmitter.on('message', requestWatcher);
  eventEmitter.on('reaction', claimReactionWatcher);
}

const indyStart = async () => {
  console.log('industry start');
  // set configuration
  config = await database.query('SELECT * FROM config');
  config = config.rows[0];
  // query database for any claims
  let claims = await database.query("SELECT * FROM claims WHERE status = 'Pending'");
  claims = claims.rows;
  console.log(claims);
  // if any claims are unapproved, clear the industry admin chat and post them.
  if (claims.length > 0) {
    mClient.channels.fetch(config.hr_channel).then((channel) => {
      channel.bulkDelete(100).then(() => {
        claims.forEach(claim => {
          channel.send(`<@&791340711445921812>, <@${claim.member_id}> has claimed a donation: ${claim.id}\n \`\`\`JS\n ${JSON.stringify(claim, null, 4)} \`\`\``).then((msg) => {
            msg.react('<:yes:776488521090465804>')
                .then(() => msg.react('<:no:776488521414344815>'));
          });
        });
      });
    }).catch(console.error);
  }
  setupMinerContribution();
  setupFighterContribution();
}

const setupMinerContribution = () => {
  // clear the miner contribution channel and post the welcome message
}

const setupFighterContribution = () => {
  // clear the fighter contribution channel and post the welcome message
}

const handleIndyCommands = (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  // setup indy admin commands here
}

const handleMainChannel = async (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  switch (parts[0]) {
    case 'h':
      helpMessage(message);
    break;
    case 'help':
      helpMessage(message);
    break;
    case 'ore':
      if (parts[1]) {
        if (parts[2] != 'm3') { helpMessage(message); }
        if (!parts[3]) { helpMessage(message); }
        if (config.hangars.indludes(parts[3])) {
          // setup the contribution and post the message
        } else {
          message.channel.send(`${parts[3]} is not a valid location`);
        }
      } else {
        helpMessage(message);
      }
    break;
    case 'pi':
    break;
    case 'status':
      let member = await database.query(`SELECT * from members where member_id = ${message.member.id}`);
      if (member.rows.length > 0) {
        member = member.rows[0];

        // Our calculations are based monthly
        const date = new Date();
        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        let firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        let lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
        let claims = await database.query(`SELECT * from claims where member_id = ${message.member.id} and timestamp > ${firstDayOfMonth.getTime()} and status = 'Approved'`);
        let claimsLastMonth = await database.query(`SELECT * from claims where member_id = ${message.member.id} and timestamp between ${firstDayLastMonth.getTime()} and ${lastDayLastMonth.getTime()} and status = 'Approved'`);
        claims = claims.rows;
        claimsLastMonth = claimsLastMonth.rows;

        const packMemberOre = 1500000;
        const direwolfOre = 2500000;
        const packMember = 30;
        const direwolf = 50;

        let totalOreLastMonth = 0;
        let totalParticipationLastMonth = 0;
        let totalOreThisMonth = 0;
        let totalParticipationThisMonth = 0;

        claims.forEach(claim => {
          switch (claim.type) {
            case 'Ore':
              totalOreThisMonth += claim.amount;
            break;
            case 'Story':
              totalParticipationThisMonth += 1;
            break;
            case 'Anomaly':
              totalParticipationThisMonth += 1;
            break;
            case 'Pack':
              totalParticipationThisMonth += 1;
            break;
            case 'PI':
              totalOreThisMonth += claim.amount;
            break;
            default:
            break;
          }
        });

        claimsLastMonth.forEach(claim => {
          switch (claim.type) {
            case 'Ore':
              totalOreLastMonth += claim.amount;
            break;
            case 'Story':
              totalParticipationLastMonth += 1;
            break;
            case 'Anomaly':
              totalParticipationLastMonth += 1;
            break;
            case 'Pack':
              totalParticipationLastMonth += 1;
            break;
            case 'PI':
              totalOreLastMonth += claim.amount;
            break;
            default:
            break;
          }
        });

        // perform calculation to see if our status has changed

        let OurCurrentStatus;

        if (totalParticipationLastMonth >= direwolf || totalOreLastMonth >= direwolfOre || (totalParticipationLastMonth >= direwolf / 2 && totalOreLastMonth >= direwolfOre / 2)) {
          // we were a direwolf last month, thus we are still a direwolf.
          OurCurrentStatus = 'Dire';
        } else if (totalParticipationThisMonth >= direwolf || totalOreThisMonth >= direwolfOre || (totalParticipationThisMonth >= direwolf / 2 && totalOreThisMonth >= direwolfOre / 2)) {
          // we are a direwolf as of at latest today, thus we are a direwolf.
          OurCurrentStatus = 'Dire';
        } else if (totalParticipationLastMonth >= packMember || totalOreLastMonth >= packMemberOre || (totalParticipationLastMonth >= packMember / 2 && totalOreLastMonth >= packMemberOre / 2)) {
          // we were a pack member last month, thus we are still a pack member.
          OurCurrentStatus = 'Pack';
        } else if (totalParticipationThisMonth >= packMember || totalOreThisMonth >= packMemberOre || (totalParticipationThisMonth >= packMember / 2 && totalOreThisMonth >= packMemberOre / 2)) {
          // we are a pack member as of at least today
          OurCurrentStatus = 'Pack';
        } else {
          // we are a wolf pup.
          OurCurrentStatus = 'Pup';
        }

        member.type = OurCurrentStatus;

        let viewer = {};
        if (OurCurrentStatus = 'Dire') {
          viewer.Status = 'Direwolf'
        } else if (OurCurrentStatus = 'Pack') {
          viewer.Status = 'Pack Member'
        } else {
          viewer.Status = 'Wolf Pup'
        }

        viewer.Contributions_This_Month = totalOreThisMonth;
        viewer.Contributions_Last_Month = totalOreLastMonth;
        viewer.Corp_Events_Attended = totalParticipationThisMonth;
        viewer.Corp_Events_Last_Month = totalParticipationLastMonth;
        // tell us our status
        message.channel.send(`<@${message.member.id}>:\n\`\`\`JS\n ${JSON.stringify(viewer, null, 4)} \`\`\``);
        await database.query(`UPDATE claims SET type = '${member.type}' where member_id = ${member.member_id}`);
        // update discord tags here !!!!!!!!!!!!!!!!!!
        //
        //
      } else {
        message.channel.send(`<@${mesasge.member.id}>: You do not currently have an entry in the database. Please report a donation and try again.`);
      }
    break;
    default:
      helpMessage(message);
    break;
  }
}

const handleFighterChannel = (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
}

const requestWatcher = async (message) => {
    if (message.channel.id === config.main_channel) {
      handleMainChannel(message);
    }
    if (message.channel.id === config.fighter_channel) {
      handleFighterChannel(message);
    }
    if (message.channel.id === config.admin_channel) {
      handleIndyCommands(message);
    }
}

const helpMessage = (message) => {
  message.channel.send(`To claim contribution credit: \n \`\`\`ore [quantity] m3 [station]\`\`\`\nAvailable stations: ${config.hangars}\n\nTo view your pack status: \n \`\`\`status\`\`\`\n`);
}

const createNewClaim = async (member_id, claim_type, amount, name) => {
  let query = `INSERT INTO claims (id, member_id, claim_type, amount, timestamp, status, name) values (nextval('claim_id'), ${member_id}, '${claim_type}', ${amount}, ${Date.now()}, 'Pending', '${name}') returning *`;
  let claim = await database.query(query);
  // we are returning all fields, thus will have a row[0]
  claim = claim.rows[0];
  return claim;
}

const claimReactionWatcher = async (messageReaction, user) => {
  const { message, emoji } = messageReaction;
  if (message.channel.id === config.admin_channel) {
    
  }
}
