const Sentry = require('@sentry/node');
const { config } = require('../../config');

Sentry.init({
  dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}`,
});

/**
 * Create a error record
 * @param {*} err error info
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
function errorRegister(err, req, res, next) {
  Sentry.captureException(err);
  next(err);
}

module.exports = {
  errorRegister,
};