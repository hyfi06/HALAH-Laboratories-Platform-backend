const proxyquire = require('proxyquire');
const { configMock } = require('./config');
const { userMock, UsersServiceMock } = require('./users');
const { apiKeysMock, ApiKeysServiceMock } = require('./auth');
const testServer = require('../testServer');

function loginMock(auth) {
  const login = proxyquire('../../components/auth/routes', {
    './apiKeysService': ApiKeysServiceMock,
    '../../config': configMock,
    '../../utils/auth/strategies/basic': {
      '@noCallThru': true,
    },
  });
  proxyquire('../auth/strategies/basic', {
    '../../../components/users/usersService': UsersServiceMock,
  });
  const request = testServer(login);
  return function (done) {
    request
      .post('/api/auth/sign-in')
      .auth(userMock.email, 'test')
      .send({
        apiKeyToken: apiKeysMock[0].token,
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        auth.token = res.body.token;
        return done();
      });
  };
}

module.exports = {
  loginMock,
};