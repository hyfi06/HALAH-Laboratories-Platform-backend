const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');
const { UsersServiceMock, patientMock } = require('../utils/mocks/users');
const { MessagesServiceMock } = require('../utils/mocks/messages');

const { configMock } = require('../utils/mocks/config');


describe('messages - routes', function () {
  const route = proxyquire('../components/messages/routes', {
    './messagesService': MessagesServiceMock,
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

  describe('GET /api/messages', function () {
    it('should require authorization', function (done) {
      request
        .get(`/api/messages?patientId=${patientMock._id}`)
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/messages?patientId=${patientMock._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });
  });

  describe('POST /api/messages', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/messages')
        .expect(401, done);
    });

    it('should respond with status 201', function (done) {
      request
        .post('/api/messages')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(201, done);
    });
  });
});