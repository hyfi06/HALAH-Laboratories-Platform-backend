const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');
const { UsersServiceMock,
  bacteriologistMock } = require('../utils/mocks/users');

const { OrderServiceMock, ordersMock } = require('../utils/mocks/order');
const { ExamsServiceMock } = require('../utils/mocks/exams');

const { configMock } = require('../utils/mocks/config');


const { ResultsServiceMock, resultMocks, getResultMock } = require('../utils/mocks/result');


describe('results - routes', function () {
  const route = proxyquire('../components/results/routes', {
    './resultsService': ResultsServiceMock,
    '../orders/ordersService': OrderServiceMock,
    '../exams/examsService': ExamsServiceMock,
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

  describe('POST /api/results', function () {
    it('should require authorization', function (done) {
      request
        .post('/api/results')
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .post('/api/results')
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .post('/api/results')
        .set('Authorization', 'bearer ' + auth.token)
        .send({
          'orderId': ordersMock[0]._id,
          'bacteriologistId': bacteriologistMock._id,
        })
        .expect(201, done);
    });

    it('should respond with id of new result', function (done) {
      request
        .post('/api/results')
        .set('Authorization', 'bearer ' + auth.token)
        .send({
          'orderId': ordersMock[0]._id,
          'bacteriologistId': bacteriologistMock._id,
        })
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, resultMocks[0]._id);
          done();
        });
    });
  });


  describe('GET /api/results/:resultId', function () {
    it('should require authorization', function (done) {
      request
        .get(`/api/results/${resultMocks[0]._id}`)
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .get(`/api/results/${resultMocks[0]._id}`)
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });


    it('should respond with status 200', function (done) {
      request
        .get(`/api/results/${resultMocks[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with result details', function (done) {
      request
        .get(`/api/results/${resultMocks[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, getResultMock);
          return done();
        });
    });
  });
});