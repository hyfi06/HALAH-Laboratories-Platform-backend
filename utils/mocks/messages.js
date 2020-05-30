const messagesMock = [
  { '_id': '5ed2e3affc13ae311e000000', 'patientId': '5ec5ce16fc13ae1506000064', 'messageText': 'donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh', 'createdAt': '2020-04-16T21:40:16Z', 'updatedAt': '2020-03-13T13:36:07Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e000002', 'patientId': '5ed2e3affc13ae311e000003', 'messageText': 'vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a', 'createdAt': '2019-11-12T10:13:31Z', 'updatedAt': '2019-07-20T17:00:28Z', 'read': true },
  { '_id': '5ed2e3affc13ae311e000004', 'patientId': '5ed2e3affc13ae311e000005', 'messageText': 'justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate', 'createdAt': '2019-10-22T19:59:13Z', 'updatedAt': '2019-11-19T02:33:38Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e000006', 'patientId': '5ed2e3affc13ae311e000007', 'messageText': 'nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy', 'createdAt': '2019-07-10T06:34:09Z', 'updatedAt': '2019-06-20T20:50:29Z', 'read': true },
  { '_id': '5ed2e3affc13ae311e000008', 'patientId': '5ed2e3affc13ae311e000009', 'messageText': 'eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum', 'createdAt': '2019-10-31T02:37:50Z', 'updatedAt': '2020-03-22T09:53:48Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e00000a', 'patientId': '5ed2e3affc13ae311e00000b', 'messageText': 'volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc', 'createdAt': '2020-01-13T13:02:57Z', 'updatedAt': '2019-11-20T14:08:37Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e00000c', 'patientId': '5ed2e3affc13ae311e00000d', 'messageText': 'orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi', 'createdAt': '2020-03-05T14:56:47Z', 'updatedAt': '2019-07-28T19:27:53Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e00000e', 'patientId': '5ed2e3affc13ae311e00000f', 'messageText': 'tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut', 'createdAt': '2019-11-19T02:45:06Z', 'updatedAt': '2019-07-10T16:37:03Z', 'read': false },
  { '_id': '5ed2e3affc13ae311e000010', 'patientId': '5ed2e3affc13ae311e000011', 'messageText': 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu', 'createdAt': '2020-01-28T20:55:26Z', 'updatedAt': '2019-10-24T23:42:44Z', 'read': true },
  { '_id': '5ed2e3affc13ae311e000012', 'patientId': '5ed2e3affc13ae311e000013', 'messageText': 'sapien non mi integer ac neque duis bibendum morbi non quam nec', 'createdAt': '2019-06-02T01:50:31Z', 'updatedAt': '2020-02-17T03:45:27Z', 'read': false },
];

const copy = (object) => JSON.parse(JSON.stringify(object));

class MessagesServiceMock {
  async createMessages(message) {
    if (message) {
      return Promise.resolve(copy(messagesMock[0]._id));
    }
    return Promise.reject();
  }
  async getMessages(patientId) {
    if (patientId) {
      return Promise.resolve(copy(messagesMock.filter((message) => message.patientId == patientId)));
    }
    return Promise.reject();
  }
}


module.exports = {
  MessagesServiceMock,
};