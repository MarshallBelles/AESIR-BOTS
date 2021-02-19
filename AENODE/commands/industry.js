let mClient;

// Every js file in the commands directory must export a setup function to work.
exports.setup = (eventEmitter, client) => {
  mClient = client
  eventEmitter.on('ready', indyStart);
  eventEmitter.on('message', handleIndyCommands);
}

const indyStart = () => {
  console.log('industry start');
  // query database for any claims
  // if any claims are unapproved, clear the industry admin chat and post them.
}

const setupMinerContribution = () => {
  // clear the miner contribution channel and post the welcome message
}

const setupFighterContribution = () => {
  // clear the fither contribution channel and post the welcome message
}

const handleIndyCommands = (msg) => {
  //
}