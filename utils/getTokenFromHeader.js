module.exports = function getTokenFromHeader(req){
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Token' ||
      authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
}
