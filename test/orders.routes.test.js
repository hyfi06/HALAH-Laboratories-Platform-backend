const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');

const { OrderServiceMock, ordersMock } = require('../utils/mocks/order');
const { ExamsServiceMock, examsMock } = require('../utils/mocks/exams');
const { UsersServiceMock, patientMock, doctorMock } = require('../utils/mocks/users');
const { ResultsServiceMock } = require('../utils/mocks/result');

const { configMock } = require('../utils/mocks/config');

describe('orders - routes', function () {
  const route = proxyquire('../components/orders/routes', {
    './ordersService': OrderServiceMock,
    '../exams/examsService': ExamsServiceMock,
    '../users/usersService': UsersServiceMock,
    '../results/resultsService': ResultsServiceMock,
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

  describe('POST /api/orders', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/orders')
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .post('/api/orders')
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .post('/api/orders')
        .set('Authorization', 'bearer ' + auth.token)
        .send({
          'patientId': patientMock._id,
          'doctorId': doctorMock._id,
          'examTypeId': examsMock[0]._id,
        })
        .expect(201, done);
    });

    it('should respond with a id', function (done) {
      request
        .post('/api/orders')
        .set('Authorization', 'bearer ' + auth.token)
        .send({
          'patientId': patientMock._id,
          'doctorId': doctorMock._id,
          'examTypeId': examsMock[0]._id,
        })
        .end((err, res) => {
          if (err) return done();
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, ordersMock[0]._id);
          return done();
        });
    });
  });

  describe('GET /api/orders/:orderId', function () {
    it('should require authorization', function (done) {
      request
        .get(`/api/orders/${ordersMock[0]._id}`)
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .get(`/api/orders/${ordersMock[0]._id}`)
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/orders/${ordersMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });
  });

  describe('GET /api/orders', function () {
    it('should require authorization', function (done) {
      request
        .get('/api/orders')
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .get('/api/orders')
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/orders?patient=${patientMock._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/orders?username=${patientMock.username}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });
  });
});
