const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');
const { UsersServiceMock } = require('../utils/mocks/users');
const { ordersMock } = require('../utils/mocks/order');

const { configMock } = require('../utils/mocks/config');
const { PDFServiceMock } = require('../utils/mocks/pdf');

describe('results - routes', function () {
  const route = proxyquire('../components/pdfs/routes', {
    './pdfsService': PDFServiceMock,
    '@hyfi06/html2pdf': function (req, res, next) {
      res.html2pdf = async function () {
        res.sendStatus(200);
      };
      next();
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

  describe('POST /api/pdfs', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/pdfs')
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .post('/api/pdfs')
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .post('/api/pdfs')
        .set('Authorization', 'bearer ' + auth.token)
        .send({
          orderIds: [ordersMock[0]._id],
        })
        .expect(200, done);
    });
  });
});