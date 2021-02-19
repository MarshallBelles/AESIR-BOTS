let mClient;

// Every js file in the commands directory must export a setup function to work.
exports.setup = (eventEmitter, client) => {
  mClient = client
  eventEmitter.on('ready', adminStart);
  eventEmitter.on('message', adminCommands);
}

const adminStart = () => {
  console.log('admin start');
  // perform admin functions here that need to happen when starting up.
}

const adminCommands = (msg) => {

}