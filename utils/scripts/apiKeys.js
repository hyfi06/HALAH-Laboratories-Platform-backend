// DEBUG=app:* node scripts/mongo/seedApiKeys.js
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../../lib/mongo');

const apiKeys = [
  {
    token: generateRandomToken(),
  },
  {
    token: generateRandomToken(),
  },
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create('apiKeys', apiKey);
    });

    await Promise.all(promises);
    debug((`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
}

seedApiKeys();
