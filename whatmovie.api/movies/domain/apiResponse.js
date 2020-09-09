const utils = require('../utils');

class ApiResponse {
  constructor(code, body, headers, isBase64Encoded) {
    this.isBase64Encoded = utils.hasValue(isBase64Encoded) ? isBase64Encoded : 200;
    this.statusCode = utils.hasValue(code) ? code : 200;
    this.headers = utils.hasValue(headers) ? headers : {};
    this.headers["Access-Control-Allow-Headers"]=  "Content-Type";
    this.headers["Access-Control-Allow-Origin"]= "*";
    this.headers["Access-Control-Allow-Methods"]= "OPTIONS,POST,GET,PUT,DELETE";
    this.body = body;
  }
}

module.exports = ApiResponse;