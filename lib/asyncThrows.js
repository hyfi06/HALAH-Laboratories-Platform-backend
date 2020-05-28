const assert = require('assert');

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