var AWS = require('aws-sdk');
var client = new AWS.SecretsManager({
    region: 'eu-west-1'
});

module.exports = function (secretName) {
  return new Promise((resolve, reject) => {
    client.getSecretValue({SecretId: secretName}, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
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