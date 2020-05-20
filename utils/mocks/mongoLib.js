const sinon = require('sinon');

const getAllStub = sinon.stub();
//getAllStub.withArgs(collection).resolves(mock);
//getAllStub.withArgs(collection, query).resolves(filteredMock(query));

const getStub = sinon.stub();
//getStub.withArgs(collection, mock[0]._id).resolves(mock[0]);

const createStub = sinon.stub().resolves('5ec3ecb1fc13ae15180001eb');

const updateStub = sinon.stub().resolves('5ec3ecb1fc13ae15180001f1');


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

  createMany(collection, array) { }

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