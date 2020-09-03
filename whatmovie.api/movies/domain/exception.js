const utils = require('../utils');

class Exception extends Error {

  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'Exception';
  }
}

module.exports = Exception;