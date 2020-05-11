const express = require('express');
const UsersService = require('./usersService');
const UserModel = require('../../utils/schema/usersSchema');
const multer = require('multer');
const csv = require('csvtojson');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);
  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    const { role } = req.query;
    try {
      const users = await usersService.getUsers({ role });
      if (users.length == 0) {
        return res.status(204).json({
          error: 'Users not exist information',
        });
      }
      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body: user } = req;
    try {
      const createUserId = await usersService.createUser({ user });
      res.status(201).json({
        data: createUserId,
        message: 'user created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId', async function (req, res, next) {
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
  });

  router.post('/csv', uploads.single('csv'), async function (req, res, next) {
    const jsonArrayUsers = await csv().fromFile(req.file.path);
    try {
      const users = jsonArrayUsers.map((user) => new UserModel(user));
      const createUsersId = await usersService.createUsers(users);
      res.status(201).json({
        data: createUsersId,
        message: 'users created from csv',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = usersApi;
