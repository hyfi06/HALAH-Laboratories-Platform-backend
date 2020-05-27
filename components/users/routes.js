const express = require('express');
const passport = require('passport');
const UsersService = require('./usersService');
const multer = require('multer');
const csv = require('csvtojson');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// strategy JWT
require('../../utils/auth/strategies/jwt');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);
  const usersService = new UsersService();

  router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const user = await usersService.getUserId({ userId });

        delete user.password;

        res.status(200).json({
          data: user,
          message: 'user retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const args = req.query;
      try {
        const users = await usersService.getUsers(args);
        const fields = [
          '_id',
          'username',
          'lastName',
          'typeOfUser',
          'imageURL',
          'firstName',
          'lastName',
          'isActive',
          'documentID',
        ];
        const data = users.map((user) =>
          Object.keys(user)
            .filter((key) => fields.includes(key))
            .reduce((newUser, key) => {
              newUser[key] = user[key];
              return newUser;
            }, {})
        );

        if (users.length == 0) {
          return res.status(204).json({
            error: 'Users not exist information',
          });
        }
        res.status(200).json({
          data: data,
          message: 'users listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        const { createUserId: id, username } = await usersService.createUser({
          user,
        });

        res.status(201).json({
          data: {
            _id: id,
          },
          message: `User ${username} created`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        const updatedUser = await usersService.updateUser({
          userId,
          user,
        });

        res.status(200).json({
          data: updatedUser,
          message: 'user updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/csv',
    passport.authenticate('jwt', { session: false }),
    uploads.single('csv'),
    async function (req, res, next) {
      const jsonArrayUsers = await csv().fromFile(req.file.path);

      try {
        const users = jsonArrayUsers;
        const createUsersId = await usersService.createUsers(users);
        const usersCreated = createUsersId.filter((res) => !res.error);

        usersCreated.forEach((res) => delete res.error);

        const userWithErros = createUsersId
          .filter((res) => res.error)
          .map(
            (res) =>
              `line ${res.index + 2}: ${res.user.firstName} ${
                res.user.lastName
              }`
          )
          .join('\n ');

        res.status(201).json({
          data: usersCreated,
          message: `${usersCreated.length} users created succesfully${
            userWithErros ? `\n${userWithErros}\nusers cannot create` : ''
          }`,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = usersApi;
