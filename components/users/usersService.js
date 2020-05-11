const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');
const UserModel = require('../../utils/schema/usersSchema');

class usersService {
  constructor() {
    this.collection = config.dbCollections.users;
    this.mongoDB = new MongoLib();
  }

  async getUsers({ role }) {
    const query = role && { role: { $in: role } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async createUser({ user }) {
    const createUserId = await this.mongoDB.create(
      this.collection,
      new UserModel(user)
    );
    return createUserId;
  }

  async createUsers(users) {
    const createUsersId = await this.mongoDB.createMany(this.collection, users);
    return createUsersId;
  }

  async updateUser({ userId, user }) {
    const updateUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );

    return updateUserId;
  }
}

module.exports = usersService;
