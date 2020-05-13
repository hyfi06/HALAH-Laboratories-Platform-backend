const boom = require('@hapi/boom');
const Sentry = require('@sentry/node');
const { config } = require('../../config');

Sentry.init({
  dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}`,
});

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack };
  }
  return err;
}

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
