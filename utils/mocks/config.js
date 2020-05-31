const { config } = require('../../config');
const configMock = {
  config: {
    defaultPath: config.defaultPath,
    authJwtSecret: 'secret',
    sendEmail: true,
    dbCollections: config.dbCollections,
  },
};

module.exports = {
  configMock,
};
