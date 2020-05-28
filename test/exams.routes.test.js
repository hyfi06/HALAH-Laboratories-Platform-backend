const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');

const { loginMock } = require('../utils/mocks/login');
const { UsersServiceMock } = require('../utils/mocks/users');
const { configMock } = require('../utils/mocks/config');

const { examsMock,
  ExamsServiceMock,
  getExamsMock,
  getExamMock } = require('../utils/mocks/exams');

describe('exams - routes', function () {
  const route = proxyquire('../components/exams/routes', {
    './examsService': ExamsServiceMock,
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

  describe('GET api/exams', function () {
    it('should require authorization', function (done) {
      request
        .get('/api/exams')
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .get('/api/exams')
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get('/api/exams')
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with exams', function (done) {
      request
        .get('/api/exams')
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, getExamsMock);
          done();
        });
    });

    it('should respond with filter exams by name', function (done) {
      request
        .get(`/api/exams?name=${examsMock[0].name}`)
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, [getExamsMock[0]]);
          done();
        });
    });

    it('should respond with filter exams by name', function (done) {
      request
        .get(`/api/exams?name=${examsMock[0].shortName}`)
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, [getExamsMock[0]]);
          done();
        });
    });
  });


  describe('GET api/exams/:examId', function () {
    it('should require authorization', function (done) {
      request
        .get(`/api/exams/${examsMock[0]._id}`)
        .expect(401, done);
    });

    it('should require bearer token', function (done) {
      request
        .get(`/api/exams/${examsMock[0]._id}`)
        .set('Authorization', 'bearer ' + '')
        .expect(401, done);
    });

    it('should respond with status 200', function (done) {
      request
        .get(`/api/exams/${examsMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .expect(200, done);
    });

    it('should respond with exams', function (done) {
      request
        .get(`/api/exams/${examsMock[0]._id}`)
        .set('Authorization', 'bearer ' + auth.token)
        .end((err, res) => {
          if (err) return done(err);
          assert.deepEqual(Object.keys(res.body), ['data', 'message']);
          assert.deepEqual(res.body.data, getExamMock);
          done();
        });
    });

  });
});
