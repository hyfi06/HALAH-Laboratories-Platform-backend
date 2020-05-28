const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../components/users/usersService');

passport.use(
  new BasicStrategy(async function (username, password, cb) {
    const userService = new UsersService();

    try {
      const user = await userService.getUser({ username });

      if (!user) {
        return cb(
          boom.unauthorized('Please verify username or password'),
          false
        );
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(
          boom.unauthorized('Please verify username or password'),
          false
        );
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
