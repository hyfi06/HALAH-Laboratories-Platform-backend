const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');

class ApiKeysService {
  constructor() {
    this.collection = config.dbCollections.apiKeys;
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeysService;
