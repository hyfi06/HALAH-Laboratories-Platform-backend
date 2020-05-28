const assert = require('assert');
const asyncThrows = require('../lib/asyncThrows');
const proxyquire = require('proxyquire');

const { MongoLibMock, getStub, getAllStub, createStub } = require('../utils/mocks/mongoLib');

const { examsMock } = require('../utils/mocks/exams');


describe('exams - service', function () {
  const ExamsService = proxyquire('../components/exams/examsService', {
    '../../lib/mongo': MongoLibMock,
  });
  const examsService = new ExamsService();

  describe('when getExam method is called', async function () {
    it('should call the get MongoLib method', async function () {
      await examsService.getExam(examsMock[0]._id);
      assert.strictEqual(getStub.called, true);
    });

    it('should return a exam', async function () {
      const result = await examsService.getExam(examsMock[0]._id);
      assert.deepEqual(result, examsMock[0]);
    });

    it('should throw error if not found id', async function () {
      await asyncThrows(async () => await examsService.getExam());
    });
  });


  describe('when getExam method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await examsService.getExams({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return all exams', async function () {
      const result = await examsService.getExams({});
      assert.deepEqual(result, examsMock);
    });

    it('should throw error, if there is not exams', async function () {
      await asyncThrows(async () => await examsService.getExams({ name: '' }));
    });
  });


  describe('when call createExam method is called', async function () {
    it('should call create mongoLib method', async function () {
      await examsService.createExam(examsMock[0]);
      assert.strictEqual(createStub.called, true);
    });
  });
});