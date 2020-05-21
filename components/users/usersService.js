const MongoLib = require('../../lib/mongo');
const bcrypt = require('bcrypt');
const PasswordGenerator = require('../../lib/password');
const UsernameGenerator = require('../../lib/username');
const { config } = require('../../config');
const UserModel = require('../../utils/schema/usersSchema');
const boom = require('@hapi/boom');

class usersService {
  constructor() {
    this.collection = config.dbCollections.users;
    this.mongoDB = new MongoLib();
    this.generatePassword = new PasswordGenerator();
    this.UsernameGenerator = new UsernameGenerator();
  }

  async getUser({ username }) {
    const query = username && {
      $or: [{ username: username }, { email: username }],
    };
    const [user] = await this.mongoDB.getAll(this.collection, query);
    return user;
  }

  async getUserId({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user || {};
  }

  async getUsers({ role }) {
    const query = role && { role: { $in: role } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async createUser({ user }) {
    const { firstName, lastName, documentID } = user;

    const username = this.UsernameGenerator.build(
      firstName,
      lastName,
      documentID
    );

    const passwordSecure = await this.generatePassword.generate();
    if (!this.generatePassword.isSecurity(passwordSecure))
      throw boom.badRequest('Password not secure');

    const hashedPassword = await bcrypt.hash(passwordSecure, 10);
    const createUserId = await this.mongoDB.create(
      this.collection,
      new UserModel({ ...user, password: hashedPassword })
    );
    return createUserId, username;
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

    const { username } = await this.getUserId({ userId });

    return updateUserId, username;
  }
}

module.exports = usersService;
