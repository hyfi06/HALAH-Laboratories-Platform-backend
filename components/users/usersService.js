const MongoLib = require('../../lib/mongo');

class usersService {
  constructor() {
    this.collection = 'usersCSV';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ role }) {
    const query = role && { role: { $in: role } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async createUsers(users) {
    const createUsersId = await this.mongoDB.createMany(this.collection, users);
    return createUsersId;
  }
}

module.exports = usersService;
