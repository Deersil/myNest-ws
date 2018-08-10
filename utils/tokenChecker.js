const jwt = require('express-jwt');
const secret = require('../config').secret;
const getTokenFromHeader = require('./getTokenFromHeader');

var token = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = token;