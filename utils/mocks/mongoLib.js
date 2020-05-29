const sinon = require('sinon');
const { config } = require('../../config');

const { apiKeysMock } = require('./auth');
const { examsMock } = require('./exams');
const { resultMocks } = require('./result');
const { ordersMock } = require('./order');

const getAllStub = sinon.stub();
getAllStub
  .withArgs(config.dbCollections.apiKeys)
  .resolves(apiKeysMock);

getAllStub
  .withArgs(config.dbCollections.exams, {})
  .resolves(examsMock);

getAllStub
  .withArgs(config.dbCollections.exams, { name: '' })
  .resolves(null);


const getStub = sinon.stub();
getStub
  .withArgs(config.dbCollections.exams, examsMock[0]._id)
  .resolves(examsMock[0]);
getStub
  .withArgs(config.dbCollections.results, resultMocks[0]._id)
  .resolves(resultMocks[0]);


const createStub = sinon.stub();
createStub
  .withArgs(config.dbCollections.exams)
  .resolves(examsMock[0]._id);
createStub
  .withArgs(config.dbCollections.results)
  .resolves(resultMocks[0]._id);

const updateStub = sinon.stub();
updateStub
  .withArgs(config.dbCollections.orders)
  .resolves(ordersMock[0]._id);

class MongoLibMock {
  get(collection, id) {
    return getStub(collection, id);
  }

  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }
}

module.exports = {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  MongoLibMock,
};
