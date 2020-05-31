const { config } = require('../../config');
const configMock = {
  config: {
    defaultPath: config.defaultPath,
    authJwtSecret: 'secret',
    sendEmail: true,
    dbcollections: config.dbCollections,
  },
};

module.exports = {
  configMock,
};
