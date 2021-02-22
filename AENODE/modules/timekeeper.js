let mClient;
let database;
let config;

exports.setup = (eventEmitter, client, db) => {
  mClient = client;
  database = db;
  eventEmitter.on('ready', tk_start);
}

const tk_start = () => {
  // perform setup
  config = await database.query('SELECT * FROM config');
  config = config.rows[0];
  console.log('time keeper started');
}