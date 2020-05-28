const Sentry = require('@sentry/node');
const { config } = require('../../config');

Sentry.init({
  dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}`,
});

function errorRegister(err, req, res, next) {
  Sentry.captureException(err);
  next(err);
}

module.exports = {
  errorRegister,
};