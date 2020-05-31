const boom = require('@hapi/boom');

/**
 * Generate a response 404
 * @param {*} _ request
 * @param {*} res response
 */
function notFoundHandler(_,res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;