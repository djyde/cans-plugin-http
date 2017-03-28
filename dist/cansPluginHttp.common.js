'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

var NAMESPACE = 'http';

exports.http = function (config) {
  return {
    namespace: NAMESPACE,
    observable: function (app) { return config ? axios.create(config) : axios; }
  }
};
