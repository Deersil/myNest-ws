const secret = require('../config').secret;
const jwt = require('jsonwebtoken');

module.exports = function decodeJWT(token) {
  return jwt.verify(token, secret);
}