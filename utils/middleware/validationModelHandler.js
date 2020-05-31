const boom = require('@hapi/boom');

/**
 * Validation data with a model
 * @param {object} data
 * @param {mongoose.model} Model 
 */
async function validationHandler(data, Model) {
  const model = new Model(data);
  try {
    await model.validate();
  } catch (error) {
    throw boom.badRequest(error); 
  }
}

module.exports = validationHandler;