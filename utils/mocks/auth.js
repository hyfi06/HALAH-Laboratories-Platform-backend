const apiKeysMock = [
  {
    _id: '5ecea6e2fc13ae04570000ac',
    token: 'a389b40b4622677127fc9485bcb0aa42a5d5fecd947c48cb45e55e83e8d6b6c5e921a59e9cc33025c5769680eb98dbf7f6d89639ea713a0a397a73deecf6fafa',
    scopes: [],
  },
];

class ApiKeysServiceMock {
  async getApiKey({ token }) {
    if (token == apiKeysMock[0].token) {
      return Promise.resolve(apiKeysMock[0]);
    } else {
      return Promise.resolve(null);
    }
  }
}

module.exports = {
  apiKeysMock,
  ApiKeysServiceMock,
};