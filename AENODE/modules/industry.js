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
  // set configuration
  config = await database.query('SELECT * FROM config');
  config = config.rows[0];
  setupUnapprovedClaims();
  setupMinerContribution();
  setupFighterContribution();
  setupTechLevel();
  console.log('industry start');
}

const setupUnapprovedClaims = () => {
  let claims = await database.query("SELECT * FROM claims WHERE status = 'Pending'");
  claims = claims.rows;
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
}

const setupMinerContribution = () => {
  mClient.channels.fetch(confMaster.main_channel).then((channel) => {
    channel.bulkDelete(100).then(() => {
      channel.send(`Track your ore contributions here: \`\`\`H | Help - Expanded help menu \nPlanetary 1500 Misaba - Claim credit for planetary materials donation (enter unit count, not m3 value) \nSpodumain 85000.3 m3 Misaba - Claim spodumain ore contribution for credit at Misaba \nB | Balance - Display your industry system credit balance \`\`\``);
    }).catch(console.error);
  }).catch(console.error);
}

const setupFighterContribution = () => {
  mClient.channels.fetch(confMaster.fighter_channel).then((channel) => {
    channel.bulkDelete(100).then(() => {
      channel.send(`Track your fighter contributions here: \`\`\`H | Help - Expanded help menu \nDebris 200 Clarelam - Claim ship debris contribution for credit at Clarelam \nModules 20 mk5 Misaba - Claim module contribution credit at Misaba \nSuper Soft Drink @mention - Report a run of Super Soft Drink where @mention helped you run it. (additional helpers must be separated by spaces) \nB | Balance - Display your industry system credit balance \`\`\``);
    }).catch(console.error);
  }).catch(console.error);
}

const setupTechLevel = () => {
  mClient.channels.fetch(config.tech_level_channel).then((channel) => {
    channel.bulkDelete(100).then(() => {
      channel.send(`Please select your current tech level`).then((msg) => {
        msg.react('<:T3T4:796136977531404339>')
          .then(() => msg.react('<:T5T6:796136977505845258>'))
          .then(() => msg.react('<:T7T8:796136977388142613>'))
          .then(() => msg.react('<:T9T10:796136977283809311>'));
      }).catch(console.error);
    }).catch(console.error);
  }).catch(console.error);
}

const handleIndyCommands = (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  // setup indy admin commands here
  // TODO
  //
  //
  //
}

const handleMainChannel = async (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  switch (parts[0]) {
    case 'h':
      helpMessage1(message);
    break;
    case 'help':
      helpMessage1(message);
    break;
    case 'ore':
      if (parts[1]) {
        if (parts[2] != 'm3') { helpMessage1(message); }
        if (!parts[3]) { helpMessage1(message); }
        if (config.hangars.includes(parts[3])) {
          // setup the contribution and post the message
          saveMinerClaim(message);
        } else {
          message.channel.send(`${parts[3]} is not a valid location`);
        }
      } else {
        helpMessage1(message);
      }
    break;
    case 'pi':
      if (parts[1]) {
        if (config.hangars.includes(parts[2])) {
          saveMinerClaim(message);
        } else {
          message.channel.send(`${parts[2]} is not a valid location`);
        }
      } else {
        helpMessage1(message);
      }
    break;
    case 'status':
      calculateStatus(message);
    break;
    default:
      helpMessage1(message);
    break;
  }
}

const handleFighterChannel = (message) => {
  var parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  switch (parts[0]) {
    case 'story':
      if (!parts[1]) {
        helpMessage2(message);
        return;
      }
      saveFighterClaim(message);
    break;
    case 'anomaly':
      if (!parts[1]) {
        helpMessage2(message);
        return;
      }
      saveFighterClaim(message);
    break;
    case 'pack':
      if (!parts[1]) {
        helpMessage2(message);
        return;
      }
      saveFighterClaim(message);
    break;
    case 'status':
      calculateStatus(message);
    break;
    default:
      helpMessage2(message);
    break;
  }
}

const saveMinerClaim = async (message) => {
  // TODO
  //
  //
  //
}

const saveFighterClaim = async (message) => {
  let parts = message.content.toLowerCase().replace(/,/g, '').split(" ");
  let helpers = [];
  let type = capitalizeFirstLetter(parts[0]);
  parts.splice(0,1); // assigned to type, now remove it.
  let name = '';
  parts.forEach(part => {
    if (part.includes('<@') || part.includes('<!@') || part.indlues('<@!')) {
      // This is a discord mention
      helpers.push(part.replace(/</g,'').replace(/@/g,'').replace(/!/g,'').replace(/>/g,''));
    } else if (part.includes('@')) {
      // this is a bad mention, do nothing
    } else {
      // this is part of the story name.
      name += capitalizeFirstLetter(part);
    }
  });
  let user = await database.query(`SELECT * FROM members WHERE member_id = ${message.member.id}`);
  if (user.rows.length > 0) {
    let claim = await createNewClaim(message.member.id, type, 1, name, helpers);
    let claim = claim.rows[0];
    message.channel.send(`Thank you <@${message.member.id}> for tracking your participation in ${name}\n It can take up to a day to reflect on your status.`);
    postClaimAdminChannel(message);
  } else {
    // create the user first
    let member = await createNewMember(message.member.id, message.member.displayName);
    let member = member.rows[0];
    let claim = await createNewClaim(message.member.id, type, 1, name, helpers);
    let claim = claim.rows[0];
    message.channel.send(`Thank you <@${message.member.id}> for tracking your participation in ${name}\n It can take up to a day to reflect on your status.`);
    postClaimAdminChannel(message);
  }
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

const helpMessage1 = (message) => {
  message.channel.send(`To claim ore contribution credit: \n \`\`\`ore [quantity] m3 [station]\`\`\`\nAvailable stations: ${config.hangars}\n\nTo view your pack status: \n \`\`\`status\`\`\`\n`);
}

const helpMessage2 = (message) => {
  message.channel.send(`Only FCs should report stories, anomalies, and pack events:\n \`\`\`Story [Story Name] @mention\`\`\`\nAdd each participating member with the @mention syntax - it must be blue to work correctly. Do not add yourself.\nAvailable stations: ${config.hangars}\n\nTo view your pack status: \n \`\`\`status\`\`\`\n`);
}

const createNewClaim = async (member_id, claim_type, amount, name, helpers) => {
  let query = `INSERT INTO claims (id, member_id, claim_type, amount, timestamp, status, name, helpers) values (nextval('claim_id'), ${member_id}, '${claim_type}', ${amount}, ${Date.now()}, 'Pending', '${name}', [${helpers}]) returning *`;
  let claim = await database.query(query);
  // we are returning all fields, thus will have a row[0]
  claim = claim.rows[0];
  return claim;
}

const createNewMember = async (member_id, displayName) => {
  let mem = await database.query(`INSERT INTO members (member_id,name,type,officer) VALUES (${member_id},'${displayName}','Pup',False) returning *`);
  let mem = mem.rows[0];
  return mem;
}

const claimReactionWatcher = async (messageReaction, user) => {
  const { message, emoji } = messageReaction;
  if (message.channel.id === config.admin_channel) {
    // TODO
    //
    //
    //
  }
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const postClaimAdminChannel = (message) => {
  // TODO
  //
  //
  //
}

const calculateStatus = (message) => {
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
    //
  } else {
    message.channel.send(`<@${mesasge.member.id}>: You do not currently have an entry in the database. Please report a contribution and try again.`);
  }
}