// https://aws.amazon.com/developers/getting-started/nodejs/

var AWS = require('aws-sdk');
var client = new AWS.SecretsManager({
    region: 'eu-west-1'
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

module.exports = function (secretName) {
  return new Promise((resolve, reject) => {
    client.getSecretValue({SecretId: secretName}, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
          resolve(data.SecretString);
        } else {
          let buff = new Buffer(data.SecretBinary, 'base64');
          const decodedBinarySecret = buff.toString('ascii');
          resolve(decodedBinarySecret);
        }
      }
    });
  });  
}