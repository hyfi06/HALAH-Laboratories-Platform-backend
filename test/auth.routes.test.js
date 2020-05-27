const assert = require('assert');
const sinon = require('sinon');
const passport = require('passport');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { userMock } = require('../utils/mocks/users');

const { apiKeysMock, ApiKeysServiceMock, configMock } = require('../utils/mocks/auth');


describe('auth - routes', function () {
  const route = proxyquire('../components/auth/routes', {
    './apiKeysService': ApiKeysServiceMock,
    '../../config': configMock,
  });

  const request = testServer(route);

  this.beforeEach(() => {
    this.authenticate = sinon.stub(passport, 'authenticate')
      .callsFake((strategy, callback) => {
        if (strategy === 'basic') {
          return function (req, res, next) {
            if (!req.headers.authorization) {
              return callback(null, null);
            } else {
              return callback(null, userMock);
            }
          };
        }
      });
  });
  this.afterEach(() => {
    this.authenticate.restore();
  });


  describe('POST /api/auth/sign-in', function () {

    it('apiKeyToken should be required', function (done) {
      request
        .post('/api/auth/sign-in')
        .send({ apiKeyToken: '' })
        .expect(401, done);
    });

    it('username and password should be required', function (done) {
      request
        .post('/api/auth/sign-in')
        .send({ apiKeyToken: apiKeysMock[0].token })
        .expect(401, done);
    });

    it('should response 401 with wrong apiKey', function (done) {
      request
        .post('/api/auth/sign-in')
        .auth(userMock.email, 'test')
        .send({
          apiKeyToken: '1234567890',
        })
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('should response 200', function (done) {
      request
        .post('/api/auth/sign-in')
        .auth(userMock.email, 'test')
        .send({
          apiKeyToken: apiKeysMock[0].token,
        })
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should respond with token and user', function (done) {
      request
        .post('/api/auth/sign-in')
        .auth(userMock.email, 'test')
        .send({
          apiKeyToken: apiKeysMock[0].token,
        })
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['token', 'user']);
          assert.deepEqual(Object.keys(res.body.user), [
            'id',
            'username',
            'typeOfUser',
            'isActive',
            'imageURL',
            'firstName',
            'lastName',
            'defaultPath',
          ]);
          done();
        });
    });
  });
});