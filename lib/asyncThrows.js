const assert = require('assert');

/**
 * Test throws of async function
 * @param {Function} fn function to test
 * @param {string} error error param for assert
 * @param {string} message message param for assert
 */
const asyncThrows = async function (fn, error, message) {
  let f = () => { };
  try {
    await fn();
  } catch (err) {
    f = () => { throw err };
  }
  assert(f, error, message);
};

module.exports = asyncThrows;