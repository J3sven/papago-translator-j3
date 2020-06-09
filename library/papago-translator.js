var _requestPromise = require('request-promise');

var client = {};

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _constants = require('./constants');

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var papagoURI = 'https://openapi.naver.com/v1/papago/n2mt';

exports.init = function (obj) {
  client.apiKeyId = obj.apiKeyId;
  client.apiKey = obj.apiKey;
  return client;
};

client.parseXHTMLString = function (text) {
  return text.replace(/\\u000a/gi, '\n')
    .replace(/\\/g, '')
    .replace(/"/g, '');
};

client.translate = function (text, clientid, secretkey, source, target) {

  // var source = 'ko';
  // var target = 'en';

  
  return new Promise(function (resolve, reject) {
    console.log('translating continued');
    var _this = this;
    if (!Object.prototype.hasOwnProperty.call(_constants.languages, source) || !Object.prototype.hasOwnProperty.call(_constants.languages, target)) {
      reject(new Error('This languages is not supported'));
    }
    var options = {
      method: 'POST',
      uri: papagoURI,
      form: {
        text: text,
        source: source,
        target: target
      },
      headers: {
        'X-Naver-Client-Id': clientid,
        'X-Naver-Client-Secret': secretkey,
        'Content-Type': _constants.contentType
      },
      json: true
    };
    (0, _requestPromise2.default)(options).then(function (body) {
      var result = (0, _response2.default)(body);
      console.log(result);
      resolve(result);
    }).catch(function (err) {
      console.log('oh no');
      var result = (0, _response2.default)(err.error);
      reject(result);
    });
  });
};

