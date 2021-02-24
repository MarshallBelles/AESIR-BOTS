/* eslint-disable max-nested-callbacks */
/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
const admin = require('firebase-admin');

const serviceAccount = {
	'type': 'service_account',
	'project_id': 'ee-aesir',
	'private_key_id': 'df4e3d53275b4bd9cf6e7c4f9d47d50ccae75a72',
	'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCu4rTtZjW+05/g\nkUOpi/Qx5h//q4jqPVef09eGMQ9n47B11IK8ArDydGepaiH1FTCV8p7/vuFsnflR\n4fKSJE8Dz8ghGufGFRsWZNcCdb+DbcfsoCbSTZh122rLz9iJfNSIEhJpiv8sWeF+\nnDKiDrHiqBu0muq0xVJV54AYvl4acs99RBiDerzx9JHZ49C7Gbt7KYP/qkQvJ46T\nxOEuKGiEg/yqwBc9kpRbHYlvp7dWgpcaFHWcE4jP52BdFvVgpn64IgnUUNN5Y9D1\nQSaKdl4qOtdkz7krJSKFROC//VzTMMN5rZ+KEZqp7T7TflG4PtvvtfVmGtqehUWI\nRcCxInTDAgMBAAECggEAM6cg8gcgs6J0k5LEDcUY1E4YQF7NGwYQJdQfUXKXDsOo\noDyqelY/JfUsktSWf/kItxkIThf2I6sK8tzN1M0li0Yo4WI9d3tPW09gU8ksTei0\nRlbM8Itbjt/GDLlwRrdYXHId/w8/K73GRKtkpwm5D21AdZjV3ptzJI0x/9zmFWA7\nRY3LQgYxCD72oL7eYXwHfZw7VaJ/Nj9ETZIL6OM39F9/UiSEu33uJMPGTEOTeeF+\nUUJYNvBfC1U2LCjfEGpSS0vdDIkqgYDYhwZFqrg89VFKmcZeXLCLvh8ZsYnWqSrG\nR07Goa5CuAqDlngnV4kAIzTjZ76z+C6DR2WdwBAJ8QKBgQDjuVu3EsMIK39AG2qy\nQ+02N9OqeKFn29seioJiSwxDecgIwqAw545ywqovi5uagf8KUDHJaBPKEyIL/puY\nAV0paCD2JG0vNKv0k8x6utVANxcECpBcWn72H+nTiy6uyT+dq5lJoEjs0k4eRCjz\nwW+bNZ7rXskW6ZWpEig26JF48QKBgQDEmcblZNJoYqiR5fihnKE6xmW9rSBZ6Wv/\n7O0QysX0vAXoSUgPi+85+xZyk2Sgv68ebMF2tW3101z+R3gJGhk+ESyaqw1tXEL5\nJC2KrLIEUWUfAiBOpKLBaZHwoyXEb6rBaK22f/YTuJ4sWcYC6sNhcbMgG1rJvuo1\nhYtavpco8wKBgFiPinJ9EmoH+Hnm76yaLBNMzL1cInEwmFudRC2TwBYxszBs+D1s\noAJTYDoTUhVZfuT04RfRqPiKTlBZ2QrZZPCodUEkU23rTwBTxk7of+x0QDgrH487\nBmsTaC0D0MjarSnVRUzTz+iBtS2iFkcNsCitRruEZjHJ75EL5aXM9l4RAoGAZ3Vl\nLaJ492Wzv9N9m86JKhztvXs14xrrMqrDtmp+8eNgWHT37vZ81c5EadcWxWEaDrC8\nvnOLginQbh++E0wgrIDtMBeD4WED/YgET03CAHO0+zRrO/d3jsC3hCLW5SC+gzlK\n8Rc1r/sfgcdcZHyWhNkIooTCqhhFuBSm2QIjGfECgYEAgz/cDZCx6QZviOMIIF+x\nc2OKk/2EcXqWVlOR9PoNnaXHlsE2VrezBfvTiJ126bxOm0SSFcZpd8zEOxcwV91+\nKd5IsyH0qqaVjkbha67F6xG89Gh7uQEfldkWej6FQLAAj2J5d6Iuc5bmWYWSjkFF\nX8qArJlP5Xcg89qdCo/br2g=\n-----END PRIVATE KEY-----\n',
	'client_email': 'firebase-adminsdk-aiibb@ee-aesir.iam.gserviceaccount.com',
	'client_id': '106302809778365646124',
	'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
	'token_uri': 'https://oauth2.googleapis.com/token',
	'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
	'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-aiibb%40ee-aesir.iam.gserviceaccount.com',
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://ee-aesir.firebaseio.com',
});

let mClient;
let database;
let config;

exports.setup = (eventEmitter, client, db) => {
	mClient = client;
	database = db;
	eventEmitter.on('ready', indyStart);
	eventEmitter.on('message', requestWatcher);
	eventEmitter.on('reaction', claimReactionWatcher);
};

const indyStart = async () => {
	// set configuration
	config = await database.query('SELECT * FROM config');
	config = config.rows[0];
	setupUnapprovedClaims();
	setupMinerContribution();
	setupFighterContribution();
	setupTechLevel();
	console.log('industry start');
};

const setupUnapprovedClaims = async () => {
	let claims = await database.query('SELECT * FROM claims WHERE status = \'Pending\'');
	claims = claims.rows;
	// if any claims are unapproved, clear the industry admin chat and post them.
	if (claims.length > 0) {
		mClient.channels.fetch(config.admin_channel).then((channel) => {
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
};

const setupMinerContribution = () => {
	mClient.channels.fetch(config.main_channel).then((channel) => {
		channel.bulkDelete(100).then(() => {
			channel.send('Track your ore contributions here: ```H | Help - Expanded help menu \nPI 1500 Misaba - Claim credit for planetary materials donation (enter unit count, not m3 value) \nOre 85000.3 m3 Misaba - Claim ore contribution for credit at Misaba (enter m3 value, not units)\nStatus - Display your approved contributions and your pack status ```');
		}).catch(console.error);
	}).catch(console.error);
};

const setupFighterContribution = () => {
	mClient.channels.fetch(config.fighter_channel).then((channel) => {
		channel.bulkDelete(100).then(() => {
			channel.send('Track your fighter contributions here: ```H | Help - Expanded help menu \nDebris 200 Clarelam - Claim ship debris contribution for credit at Clarelam \nModules 20 mk5 Misaba - Claim module contribution credit at Misaba \nSuper Soft Drink @mention - Report a run of Super Soft Drink where @mention helped you run it. (additional helpers must be separated by spaces) \nStatus - Display your approved contributions and your pack status ```');
		}).catch(console.error);
	}).catch(console.error);
};

const setupTechLevel = () => {
	mClient.channels.fetch(config.tech_level_channel).then((channel) => {
		channel.bulkDelete(100).then(() => {
			channel.send('Please select your current tech level').then((msg) => {
				msg.react('<:T3T4:796136977531404339>')
					.then(() => msg.react('<:T5T6:796136977505845258>'))
					.then(() => msg.react('<:T7T8:796136977388142613>'))
					.then(() => msg.react('<:T9T10:796136977283809311>'));
			}).catch(console.error);
		}).catch(console.error);
	}).catch(console.error);
};

const handleIndyCommands = async (message) => {
	const parts = message.content.split(' ');
	switch (parts[0]) {
	case '!query':
		let query = '';
		parts.splice(0, 1);
		for (let index = 0; index < parts.length; index++) {
			if (parts.length == index) {
				// this is the last one, only append the text
				query += parts[index];
			} else {
				query += parts[index] + ' ';
			}
		}
		const response = await database.query(query).catch((err) => {
			message.channel.send(`\`\`\`JS\n ${JSON.stringify(err, null, 4)} \`\`\``); return;
		});
		message.channel.send(`\`\`\`JS\n ${JSON.stringify(response.rows, null, 4)} \`\`\``);
		break;
	case '!clear':
		await message.channel.bulkDelete(100);
		let claims = await database.query('SELECT * FROM claims WHERE status = \'Pending\'');
		claims = claims.rows;
		claims.forEach(claim => {
			message.channel.send(`<@&791340711445921812>, <@${claim.member_id}> has claimed a donation: ${claim.id}\n \`\`\`JS\n ${JSON.stringify(claim, null, 2)} \`\`\``).then((msg) => {
				msg.react('<:yes:776488521090465804>')
					.then(() => msg.react('<:no:776488521414344815>'));
			});
		});
		break;
	case '!prune':
		const date = new Date();
		const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		let del = await database.query('DELETE FROM claims WHERE timestamp < $1::numeric', [firstDayLastMonth.getTime()]);
		del = del.rows;
		message.channel.send(`${JSON.stringify(del, null, 4)}`);
		break;
	case '!merge':
		admin.firestore().collection('data/industry-bot/members').get().then(async (col) => {
			await downloadMembers(col);
			await deleteCloudMembers(col);
			await saveMembers();
			admin.firestore().collection('data/industry-bot/claims').get().then(async (col2) => {
				const validClaims = [];
				for (let index = 0; index < col.docs.length; index++) {
					const dc = col.docs[index];
					for (let index2 = 0; index2 < col2.docs.length; index2++) {
						const dc2 = col2.docs[index2];
						if (dc.id == dc2.data().member) {
							// this is a valid claim
							validClaims.push(dc2);
						}
					}
				}
				await downloadClaims(validClaims);
				await deleteCloudClaims(col2);
				await saveClaims();
			});
		});
		break;
	case '!update':
		let members = await database.query('SELECT * FROM members');
		members = members.rows;
		const views = [];
		for (let index = 0; index < members.length; index++) {
			const member = members[index];
			const view = await calculateStatus(message, message.guild.members.cache.get(member.member_id), true);
			if (view) {
				view.name = member.name;
				views.push(view);
			}
		}
		const msgs = `\`\`\`JS\n ${JSON.stringify(views, null, 2)} \`\`\``.match(/[\s\S]{1,2000}/g);
		for (let index = 0; index < msgs.length; index++) {
			const msg = msgs[index];
			message.channel.send(msg);
		}
		message.channel.send();
		break;
	default:
		break;
	}
};

const downloadMembers = async (col) => {
	for (let index = 0; index < col.docs.length; index++) {
		const membr = col.docs[index];
		const dat = membr.data();
		if (!dat.name) return;
		await database.query('INSERT INTO members (member_id, name, type, officer) VALUES ($1::numeric, $2::varchar, $3::member_type, $4::boolean) ON CONFLICT (member_id) DO NOTHING', [dat.member_id, dat.name, 'Pup', false]);
	}
};

const deleteCloudMembers = async (col) => {
	for (let index = 0; index < col.docs.length; index++) {
		const membr = col.docs[index];
		membr.ref.delete();
	}
};

const saveMembers = async () => {
	let members = await database.query('SELECT * FROM members');
	members = members.rows;
	for (let index = 0; index < members.length; index++) {
		const member = members[index];
		const id = admin.firestore().collection('data/industry-bot/members').doc().id;
		admin.firestore().doc(`data/industry-bot/members/${id}`).get().then(doc => {
			if (doc) {
				doc.ref.set(member);
			}
		});
	}
};

const downloadClaims = async (validClaims) => {
	for (let index = 0; index < validClaims.length; index++) {
		const membr = validClaims[index];
		const dat = membr.data();
		if (dat.id) {
			await database.query('INSERT INTO claims (id, member_id, type, amount, timestamp, status, name, helpers) values ($1::numeric, $2::numeric, $3::claim_type, $4::numeric, $5::numeric, $6::claim_status, $7::varchar, $8::text[]) ON CONFLICT (id) DO NOTHING', [dat.id, dat.member_id, dat.type, dat.amount, dat.timestamp, dat.status, dat.name, dat.helpers]);
		} else {
			let type;
			switch (dat.type) {
			case 0:
				// ore
				type = 'Ore';
				break;
			case 1:
				// debris
				type = 'Ore';
				break;
			case 2:
				// module
				type = 'Ore';
				break;
			case 3:
				// rig
				type = 'Ore';
				break;
			case 4:
				// isk
				type = 'Ore';
				break;
			case 5:
				// story
				type = 'Story';
				break;
			default:
				break;
			}
			let status;
			if (dat.approved) {
				status = 'Approved';
			} else if (dat.rejected) {
				status = 'Rejected';
			} else {
				status = 'Pending';
			}
			await database.query('INSERT INTO claims (id, member_id, type, amount, timestamp, status, name, helpers) values (nextval(\'claim_id\'), $1::numeric, $2::claim_type, $3::numeric, $4::numeric, $5::claim_status, $6::varchar, $7::text[]) ON CONFLICT (id) DO NOTHING', [dat.member, type, dat.amount, dat.timestamp, status, dat.name, dat.helpers]);
		}
	}
};

const deleteCloudClaims = async (col) => {
	for (let index = 0; index < col.docs.length; index++) {
		const membr = col.docs[index];
		membr.ref.delete();
	}
};

const saveClaims = async () => {
	let claims = await database.query('SELECT * FROM claims');
	claims = claims.rows;
	for (let index = 0; index < claims.length; index++) {
		const claim = claims[index];
		const id = admin.firestore().collection('data/industry-bot/claims').doc().id;
		admin.firestore().doc(`data/industry-bot/claims/${id}`).get().then(doc => {
			if (doc) {
				doc.ref.set(claim);
			}
		});
	}
};

const handleMainChannel = async (message) => {
	const parts = message.content.toLowerCase().replace(/,/g, '').split(' ');
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
				savePIclaim(message);
			} else {
				message.channel.send(`${parts[2]} is not a valid location`);
			}
		} else {
			helpMessage1(message);
		}
		break;
	case 'status':
		calculateStatus(message, message.member);
		break;
	default:
		helpMessage1(message);
		break;
	}
};

const handleFighterChannel = (message) => {
	const parts = message.content.toLowerCase().replace(/,/g, '').split(' ');
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
		calculateStatus(message, message.member);
		break;
	default:
		helpMessage2(message);
		break;
	}
};

const saveMinerClaim = async (message) => {
	const parts = message.content.toLowerCase().replace(/,/g, '').split(' ');
	let user = await database.query(`SELECT * FROM members WHERE member_id = ${message.member.id}`);
	if (user.rows.length > 0) {
		const claim = await createNewClaim(message.member.id, capitalizeFirstLetter(parts[0]), parts[1], parts[3], []);
		postClaimAdminChannel(claim);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your status.`);
	} else {
		// create user
		user = await createNewMember(message.member.id, message.member.displayName);
		const claim = await createNewClaim(message.member.id, capitalizeFirstLetter(parts[0]), parts[1], parts[3], []);
		postClaimAdminChannel(claim);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} m3 ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}! \n Please place the contribution in ${parts[3].charAt(0).toUpperCase() + parts[3].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your status.`);
	}
};

const savePIclaim = async (message) => {
	const parts = message.content.toLowerCase().replace(/,/g, '').split(' ');
	let user = await database.query(`SELECT * FROM members WHERE member_id = ${message.member.id}`);
	if (user.rows.length > 0) {
		const claim = await createNewClaim(message.member.id, 'PI', parts[1], parts[2], []);
		postClaimAdminChannel(claim);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} PI! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your status.`);
	} else {
		// create user
		user = await createNewMember(message.member.id, message.member.displayName);
		const claim = await createNewClaim(message.member.id, 'PI', parts[1], parts[2], []);
		postClaimAdminChannel(claim);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your contribution of ${parts[1]} PI! \n Please place the contribution in ${parts[2].charAt(0).toUpperCase() + parts[2].slice(1)} hangar 1 if you have not done so already. \n It can take up to a day for this contribution to reflect on your status.`);
	}
};

const saveFighterClaim = async (message) => {
	const parts = message.content.toLowerCase().replace(/,/g, '').split(' ');
	const helpers = [];
	const type = capitalizeFirstLetter(parts[0]);
	parts.splice(0, 1);
	let name = '';
	parts.forEach(part => {
		if (part.includes('<@') || part.includes('<!@') || part.includes('<@!')) {
			// This is a discord mention
			helpers.push(part.replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''));
		} else if (part.includes('@')) {
			// this is a bad mention, do nothing
		} else {
			// this is part of the story name.
			name += capitalizeFirstLetter(part);
		}
	});
	const user = await database.query(`SELECT * FROM members WHERE member_id = ${message.member.id}`);
	if (user.rows.length > 0) {
		const claim = await createNewClaim(message.member.id, type, 1, name, helpers);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your participation in ${name}\n It can take up to a day to reflect on your status.`);
		postClaimAdminChannel(claim);
	} else {
		// create the user first
		const claim = await createNewClaim(message.member.id, type, 1, name, helpers);
		message.channel.send(`Thank you <@${message.member.id}> for tracking your participation in ${name}\n It can take up to a day to reflect on your status.`);
		postClaimAdminChannel(claim);
	}
};

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
};

const helpMessage1 = (message) => {
	message.channel.send(`To claim ore contribution credit: \n \`\`\`ore [quantity] m3 [station]\`\`\`\nAvailable stations: ${config.hangars}\n\nTo view your pack status: \n \`\`\`status\`\`\`\n`);
};

const helpMessage2 = (message) => {
	message.channel.send(`Only FCs should report stories, anomalies, and pack events:\n \`\`\`Story [Story Name] @mention\`\`\`\nAdd each participating member with the @mention syntax - it must be blue to work correctly. Do not add yourself.\nAvailable stations: ${config.hangars}\n\nTo view your pack status: \n \`\`\`status\`\`\`\n`);
};

const createNewClaim = async (member_id, claim_type, amount, name, helpers) => {
	const query = `INSERT INTO claims (id, member_id, type, amount, timestamp, status, name, helpers) values (nextval('claim_id'), ${member_id}, '${claim_type}', ${amount}, ${Date.now()}, 'Pending', '${name.replace(/'/g, '')}', '{${helpers}}') returning *`;
	let claim = await database.query(query);
	// we are returning all fields, thus will have a row[0]
	claim = claim.rows[0];
	return claim;
};

const createNewMember = async (member_id, displayName) => {
	let mem = await database.query(`INSERT INTO members (member_id,name,type,officer) VALUES (${member_id},'${displayName}','Pup',False) returning *`);
	mem = mem.rows[0];
	return mem;
};

const claimReactionWatcher = async (messageReaction, user) => {
	const { message, emoji } = messageReaction;
	if (message.channel.id === config.admin_channel) {
		if(emoji.name === 'yes') {
			approveContribution(message, user);
		}
		if(emoji.name === 'no') {
			declineContribution(message, user);
		}
	}
};

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const postClaimAdminChannel = async (claim) => {
	await mClient.channels.fetch(config.admin_channel).then((channel) => {
		channel.send(`<@&791340711445921812>, <@${claim.member_id}> has claimed a donation: ${claim.id}\n \`\`\`JS\n ${JSON.stringify(claim, null, 4)} \`\`\``).then((msg) => {
			msg.react('<:yes:776488521090465804>')
				.then(() => msg.react('<:no:776488521414344815>'));
		});
	});
};

const calculateStatus = async (message, guildMember, dashboard) => {
	if (!guildMember) {return;}
	let member = await database.query(`SELECT * from members where member_id = ${guildMember.id}`).catch(console.error);
	if (member.rows.length > 0) {
		member = member.rows[0];

		// Our calculations are based monthly
		const date = new Date();
		const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
		let claims = await database.query(`SELECT * from claims where member_id = ${guildMember.id} and timestamp > ${firstDayOfMonth.getTime()} and status = 'Approved'`);
		let claimsLastMonth = await database.query(`SELECT * from claims where member_id = ${guildMember.id} and timestamp between ${firstDayLastMonth.getTime()} and ${lastDayLastMonth.getTime()} and status = 'Approved'`);
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

		// TODO
		// Include helpers arrays into the calculations
		//
		//

		claims.forEach(claim => {
			switch (claim.type) {
			case 'Ore':
				totalOreThisMonth += Number(claim.amount);
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
				totalOreThisMonth += Number(claim.amount);
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

		if (totalParticipationLastMonth >= direwolf || totalOreLastMonth >= direwolfOre) {
			// we were a direwolf last month, thus we are still a direwolf.
			OurCurrentStatus = 'Dire';
			await updateTagsSetDirewolf(guildMember);
		} else if (totalParticipationThisMonth >= direwolf || totalOreThisMonth >= direwolfOre) {
			// we are a direwolf as of at latest today, thus we are a direwolf.
			OurCurrentStatus = 'Dire';
			await updateTagsSetDirewolf(guildMember);
		} else if (totalParticipationThisMonth >= (direwolf / 2) && totalOreThisMonth >= (direwolfOre / 2)) {
			// we are a direwolf as of at latest today, thus we are a direwolf.
			OurCurrentStatus = 'Dire';
			await updateTagsSetDirewolf(guildMember);
		} else if (totalParticipationLastMonth >= packMember || totalOreLastMonth >= packMemberOre) {
			// we were a pack member last month, thus we are still a pack member.
			OurCurrentStatus = 'Pack';
			await updateTagsSetPackwolf(guildMember);
		} else if (totalParticipationThisMonth >= packMember || totalOreThisMonth >= packMemberOre) {
			// we are a pack member as of at least today
			OurCurrentStatus = 'Pack';
			await updateTagsSetPackwolf(guildMember);
		} else if (totalParticipationThisMonth >= (packMember / 2) && totalOreThisMonth >= (packMemberOre / 2)) {
			// we are a pack member as of at least today
			OurCurrentStatus = 'Pack';
			await updateTagsSetPackwolf(guildMember);
		} else {
			// we are a wolf pup.
			OurCurrentStatus = 'Pup';
			await updateTagsSetWolfpup(guildMember);
		}

		member.type = OurCurrentStatus;

		const viewer = {};
		if (OurCurrentStatus == 'Dire') {
			viewer.Status = 'Direwolf';
		} else if (OurCurrentStatus == 'Pack') {
			viewer.Status = 'Pack Wolf';
		} else {
			viewer.Status = 'Wolf Pup';
		}

		viewer.Contributions_This_Month = totalOreThisMonth;
		viewer.Contributions_Last_Month = totalOreLastMonth;
		viewer.Corp_Events_Attended = totalParticipationThisMonth;
		viewer.Corp_Events_Last_Month = totalParticipationLastMonth;
		// tell us our status
		if (dashboard) {
			// this is for the dashboard, return the results.
			return viewer;
		} else {
			message.channel.send(`<@${guildMember.id}>:\n\`\`\`JS\n ${JSON.stringify(viewer, null, 4)} \`\`\``);
		}
		await database.query(`UPDATE members SET type = '${OurCurrentStatus}' where member_id = ${guildMember.id}`);

	} else {
		if (dashboard) return;
		message.channel.send(`There is no entry in the active database for <@${guildMember.id}>.`);
	}
};

const updateTagsSetDirewolf = async (guildMember) => {
	await guildMember.roles.add('786317861982830642').catch(console.error);
	await guildMember.roles.remove('776244411742289950').catch(console.error);
	await guildMember.roles.remove('776243945285746689').catch(console.error);
	await guildMember.roles.remove('776841167123120158').catch(console.error);
};
const updateTagsSetPackwolf = async (guildMember) => {
	await guildMember.roles.remove('786317861982830642').catch(console.error);
	await guildMember.roles.add('776244411742289950').catch(console.error);
	await guildMember.roles.remove('776243945285746689').catch(console.error);
	await guildMember.roles.remove('776841167123120158').catch(console.error);
};
const updateTagsSetWolfpup = async (guildMember) => {
	await guildMember.roles.remove('786317861982830642').catch(console.error);
	await guildMember.roles.remove('776244411742289950').catch(console.error);
	await guildMember.roles.add('776243945285746689').catch(console.error);
	await guildMember.roles.remove('776841167123120158').catch(console.error);
};

const approveContribution = async (message, user) => {
	const parts = message.content.split(' ');
	message.channel.send(`<@${user.id}> has approved claim ${parts[6]}`);
	message.delete();
	await database.query('UPDATE claims SET status = \'Approved\' WHERE id = $1::numeric', [parts[6]]);
};
const declineContribution = async (message, user) => {
	const parts = message.content.split(' ');
	message.channel.send(`<@${user.id}> has rejected claim ${parts[6]}`);
	message.delete();
	await database.query('UPDATE claims SET status = \'Rejected\' WHERE id = $1::numeric', [parts[6]]);
};