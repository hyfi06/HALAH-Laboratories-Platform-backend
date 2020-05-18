const MongoLib = require('../../lib/mongo');
const bcrypt = require('bcrypt');
const { config } = require('../../config');
const UserModel = require('../../utils/schema/usersSchema');

class usersService {
  constructor() {
    this.collection = config.dbCollections.users;
    this.mongoDB = new MongoLib();
  }

  async getUser({ username }) {
    const [user] = await this.mongoDB.getAll(this.collection, { username });
    return user;
  }

  async getUsers({ role }) {
    const query = role && { role: { $in: role } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async createUser({ user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserId = await this.mongoDB.create(
      this.collection,
      new UserModel({ ...user, password: hashedPassword })
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
