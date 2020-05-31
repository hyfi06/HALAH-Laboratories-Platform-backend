const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const { config } = require('../../config');

const { apiKeysMock } = require('./auth');
const { examsMock } = require('./exams');
const { resultMocks } = require('./result');
const { ordersMock } = require('./order');
const { messagesMock } = require('./messages');
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

getAllStub
  .withArgs(config.dbCollections.orders, {})
  .resolves(ordersMock);
getAllStub
  .withArgs(config.dbCollections.orders, { patientId: ObjectId(ordersMock[0].patientId) })
  .resolves([ordersMock[0]]);
getAllStub
  .withArgs(config.dbCollections.messages)
  .resolves([messagesMock[0]]);

const getStub = sinon.stub();
getStub
  .withArgs(config.dbCollections.exams, examsMock[0]._id)
  .resolves(examsMock[0]);
getStub
  .withArgs(config.dbCollections.results, resultMocks[0]._id)
  .resolves(resultMocks[0]);
getStub
  .withArgs(config.dbCollections.orders, ordersMock[0]._id)
  .resolves(ordersMock[0]);


const createStub = sinon.stub();
createStub
  .withArgs(config.dbCollections.exams)
  .resolves(examsMock[0]._id);
createStub
  .withArgs(config.dbCollections.results)
  .resolves(resultMocks[0]._id);
createStub
  .withArgs(config.dbCollections.orders)
  .resolves(ordersMock[0]._id);
createStub
  .withArgs(config.dbCollections.messages)
  .resolves(messagesMock[0]._id);


const updateStub = sinon.stub();
updateStub
  .withArgs(config.dbCollections.orders)
  .resolves(ordersMock[0]._id);

const updateManyStub = sinon.stub();
updateManyStub
  .withArgs(config.dbCollections.messages)
  .resolves(1);

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
  updateMany(collection, query, data) {
    return updateManyStub(collection, query, data);
  }
}

module.exports = {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  updateManyStub,
  MongoLibMock,
};
