const assert = require('assert');
const proxyquire = require('proxyquire');
const { configMock } = require('../utils/mocks/config');
const {
  MongoLibMock,
  getAllStub,
  getStub,
  createStub,
  updateStub,
  getUsernameStub,
} = require('../utils/mocks/mongoLib');

const copy = (object) => JSON.parse(JSON.stringify(object));

const { UsersServiceMock, usersMock } = require('../utils/mocks/users');

describe('user - service', function () {
  const UsersService = proxyquire('../components/users/usersService', {
    '../../lib/mail': function () {
      this.sendMail = async function () {
        return Promise.resolve();
      };
    },
    // '../../config': configMock,
    '../../lib/mongo': MongoLibMock,
  });

  const usersService = new UsersService();

  describe('when getUser method is called', async function () {
    it('should call the getAll mongoLib method', async function () {
      await usersService.getUser({ username: usersMock[0].username });
      assert.strictEqual(getAllStub.called, true);
    });
    it('should return a user', async function () {
      const result = await usersService.getUser({
        username: usersMock[0].username,
      });
      assert.deepEqual(result, usersMock[0]);
    });
  });

  describe('when getUserId method is called', async function () {
    it('should call the get mongoLib method', async function () {
      await usersService.getUserId({ userid: usersMock[0]._id });

      assert.strictEqual(getStub.called, true);
    });
    it('should return a user', async function () {
      const result = await usersService.getUserId({ userId: usersMock[0]._id });

      assert.deepEqual(result, usersMock[0]);
    });
  });

  describe('when getUsers method is called', async function () {
    it('should call the getAll mongoLib method', async function () {
      await usersService.getUsers({});
      assert.strictEqual(getAllStub.called, true);
    });
    it('should return users', async function () {
      const results = await usersService.getUsers({});
      assert.deepEqual(results, usersMock);
    });
  });

  describe('when createUser method is called', async function () {
    it('should call createUser and getUsername mongoLib method', async function () {
      await usersService.createUser({ user: copy(usersMock[0]) });
      assert.strictEqual(createStub.called, true);
      assert.strictEqual(getUsernameStub.called, true);
    });
    it('should return user', async function () {
      const result = await usersService.createUser({
        user: usersMock[0],
      });

      assert.notDeepEqual(result, {
        createUserId: usersMock[0]._id,
        username: usersMock[0].username,
      });
    });
  });

  describe('when updateUser method is called', async function () {
    it('should call updateUser mongoLib method', async function () {
      await usersService.updateUser({
        userId: usersMock[0]._id,
        user: usersMock[0],
      });
      assert.strictEqual(updateStub.called, true);
      assert.strictEqual(getStub.called, true);
    });

    it('should update user', async function () {
      const result = await usersService.updateUser({
        userId: usersMock[0]._id,
        user: usersMock[0],
      });

      assert.deepEqual(result, usersMock[0].username);
    });
  });
});
