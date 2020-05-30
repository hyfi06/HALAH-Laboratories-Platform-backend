const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');
const { UsersServiceMock,
  usersResponseMock,
  usersMock } = require('../utils/mocks/users');

const { configMock } = require('../utils/mocks/config');

describe('user - routes', function () {
  const route = proxyquire('../components/users/routes.js', {
    './usersService': UsersServiceMock,
    'multer': function () {
      this.diskStorage = function () {
        return {};
      };
      return {
        single: function () {
          return function (req, res, next) {
            req.file = {
              path: '',
            };
            next();
          };
        },
      };
    },
    'csvtojson': function () {
      return {
        fromFile: function () {
          return JSON.parse(JSON.stringify([usersMock[0]]));
        },
      };
    },
    '../../utils/auth/strategies/jwt': {
      '@noCallThru': true,
    },
  });

  const request = testServer(route);
  const auth = {};
  this.beforeAll((done) => {
    proxyquire('../utils/auth/strategies/jwt', {
      '../../../config/index': configMock,
      '../../../components/users/usersService': UsersServiceMock,
    });
    loginMock(auth)(done);
  });

  describe('GET /api/users/:userId', function () {
    it('should require authorization', function (done) {
      request
        .get(`/api/users/${usersMock[0]._id}`)
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/users/${usersMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with a user', function (done) {
      request
        .get(`/api/users/${usersMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          const user = JSON.parse(JSON.stringify(usersMock[0]));
          delete user.password;
          assert.deepEqual(res.body.data, user);
          return done();
        });
    });
  });

  describe('GET /api/users', function () {
    it('should require authorization', function (done) {
      request
        .get('/api/users')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get('/api/users')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with all user', function (done) {
      request
        .get('/api/users')
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, usersResponseMock);
          return done();
        });
    });
  });

  describe('POST /api/users', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/users')
        .expect(401, done);
    });

    it('should respond with status 201', function (done) {
      request
        .post('/api/users')
        .set('Authorization', 'bearer ' + auth.token)
        .set(usersMock[0])
        .expect(201, done);
    });

    it('should respond with all user', function (done) {
      request
        .post('/api/users')
        .set('Authorization', 'bearer ' + auth.token)
        .set(usersMock[0])
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, { _id: usersMock[0]._id });
          return done();
        });
    });
  });

  describe('PATCH /api/users', function () {
    it('should require authorization', function (done) {
      request
        .patch(`/api/users/${usersMock[0]._id}`)
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .patch(`/api/users/${usersMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .set(usersMock[0])
        .expect(200, done);
    });

    it('should respond with all user', function (done) {
      request
        .patch(`/api/users/${usersMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .set(usersMock[0])
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, usersMock[0]._id);
          return done();
        });
    });
  });


  describe('POST /api/users/csv', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/users/csv')
        .expect(401, done);
    });

    it('should respond with status 201', function (done) {
      request
        .post('/api/users/csv')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(201, done);
    });

    it('should respond with all user', function (done) {
      request
        .post('/api/users/csv')
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, [{ id: usersMock[0]._id, username: usersMock[0].username }]);
          return done();
        });
    });
  });
});