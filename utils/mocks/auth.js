const authMocks = [];

const apiKeyMocks = [
  {
    token: 'a389b40b4622677127fc9485bcb0aa42a5d5fecd947c48cb45e55e83e8d6b6c5e921a59e9cc33025c5769680eb98dbf7f6d89639ea713a0a397a73deecf6fafa',
    scopes: [],
  },
];

class apiKeysService {
  async getApiKey({ token }) {
    if (token == apiKeyMocks[0].token) {
      return Promise.resolve(apiKeyMocks[0]);
    } else {
      return Promise.resolve({});
    }
  }
}
module.exports = {
  authMocks,
  apiKeyMocks,
  apiKeysService,
};