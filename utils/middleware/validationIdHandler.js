const boom = require('@hapi/boom');

/**
 * Validation id Handler
 * @param {string} [attribute=id] attribute name as id
 * @param {string} [check=params] attribute name of req to check
 * @param {boolean} [required=true] true trow a error if not exist the attribute.
 */
function validationIdHandler(attribute = 'id', check = 'params', required = true) {
  return function (req, res, next) {
    const regExpId = /[0-9a-fA-F]{24}/;

    const id = req[check][attribute];

    if (required && !id) {
      next(boom.badRequest(`${attribute} is required`));
    }

    if (regExpId.test(id)) {
      next();
    } else {
      next(boom.badRequest(`${id} isn't a id`));
    }
  };
};

module.exports = validationIdHandler;
