const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock,
  getAllStub,
  createStub,
  updateManyStub } = require('../utils/mocks/mongoLib');

const { patientMock } = require('../utils/mocks/users');
const { messagesMock } = require('../utils/mocks/messages');

describe('message - service', function () {
  const MessagesService = proxyquire('../components/messages/messagesService', {
    '../../lib/mongo': MongoLibMock,
  });

  const messagesService = new MessagesService();


  describe('when createMessages method is called', async function () {
    it('should call the create mongoLib methods', async function () {
      await messagesService.createMessages(messagesMock[0]);
      assert.strictEqual(createStub.called, true);
    });

    it('should return a id', async function () {
      const messages = await messagesService.createMessages(messagesMock[0]);
      assert.deepEqual(messages, messagesMock[0]._id);
    });
  });

  describe('when getMessages method is called', async function () {
    it('should call the getAll and updateManyStub mongoLib methods', async function () {
      await messagesService.getMessages(patientMock._id);
      assert.strictEqual(getAllStub.called, true);
      assert.strictEqual(updateManyStub.called, true);
    });

    it('should return a messages', async function () {
      const messages = await messagesService.getMessages(patientMock._id);
      assert.deepEqual(messages, [messagesMock[0]]);
    });
  });
});