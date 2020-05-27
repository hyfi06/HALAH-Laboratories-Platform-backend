const MongoLib = require('../../lib/mongo');

const bcrypt = require('bcrypt');
const PasswordGenerator = require('../../lib/password');
const UsernameGenerator = require('../../lib/username');
const MailService = require('../../lib/mail');
const { config } = require('../../config');
const UserModel = require('../../utils/schema/usersSchema');
const boom = require('@hapi/boom');

const emailTemplate = require('../../utils/templates/emailTemplate');

class usersService {
  constructor() {
    this.collection = config.dbCollections.users;
    this.mongoDB = new MongoLib();
    this.generatePassword = new PasswordGenerator();
    this.UsernameGenerator = new UsernameGenerator();
    this.mailService = new MailService();
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

  async getUsers(args) {
    const query = Object.keys(args);

    const regExpId = /^[0-9]+$/;

    const search = query
      .filter((criteria) => criteria !== 'name')
      .map((criteria) => {
        if (regExpId.test(args[criteria])) {
          return { [criteria]: parseInt(args[criteria]) };
        } else if (criteria === 'isActive' && args[criteria] == 'true') {
          return { [criteria]: true };
        } else if (criteria === 'isActive' && args[criteria] == 'false') {
          return { [criteria]: false };
        } else {
          return {
            [criteria]: { $regex: new RegExp(`.*?${args[criteria]}.*?`, 'i') },
          };
        }
      });

    const where =
      search.length > 0
        ? {
          $and: search,
        }
        : {};

    const users = (await this.mongoDB.getAll(this.collection, where))
      .filter((user) => {
        if (!query.includes('name')) {
          return true;
        }
        const regExp = new RegExp(`.*?${args.name}.*?`, 'i');
        return regExp.test(`${user.lastName} ${user.name}`) || regExp.test(`${user.name} ${user.lastName}`);
      });
    return users || [];
  }

  async createUser({ user }, sendmail = true) {
    let intentsGenerateUsername = 100;
    const { firstName, lastName, documentID } = user;
    let username = this.UsernameGenerator.build(
      firstName,
      lastName,
      documentID
    );

    const checkUser = await this.mongoDB.getUsername(this.collection, username);
    if (checkUser !== null) {
      while (checkUser.username === username && intentsGenerateUsername) {
        username = this.UsernameGenerator.build(
          firstName,
          lastName,
          this.generatePassword.randomNumberStr(4, 100)
        );
        intentsGenerateUsername -= 1;
      }
      if (intentsGenerateUsername == 0) {
        throw boom.badImplementation(
          'Username cannot generate, try to create again!'
        );
      }
    }

    const passwordSecure = await this.generatePassword.generate();
    if (!this.generatePassword.isSecurity(passwordSecure))
      throw boom.badRequest('Password not secure');

    const hashedPassword = await bcrypt.hash(passwordSecure, 10);

    if (sendmail) {
      const error = await this.mailService.sendMail({
        to: user.email,
        subject: 'Welcome Halah Laboratories',
        html: emailTemplate({ name: firstName, username, passwordSecure }),
      });
      if (error) {
        throw boom.badImplementation(
          'Email cannot send, please check your email registration'
        );
      }
    }

    const createUserId = await this.mongoDB.create(
      this.collection,
      new UserModel({ ...user, password: hashedPassword, username: username })
    );

    return { createUserId, username };
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
