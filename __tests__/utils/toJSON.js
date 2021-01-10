const assert = require('assert');
const toJSON = require('../../utils/toJSON');

module.exports = () => {
  const someMessage = { message: 'message' };
  try {
    assert.strictEqual(
      toJSON(someMessage),
      JSON.stringify(someMessage)
    );
    console.log('utils > toJSON.js Test passed.');
  } catch (error) {
    console.error('utils > toJSON.js Test Failed.');
  }
};
