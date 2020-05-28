const { config } = require('../../config');
const configMock = {
  config: {
    defaultPath: config.defaultPath,
    authJwtSecret: 'secret',
  },
};

module.exports = {
  configMock,
};