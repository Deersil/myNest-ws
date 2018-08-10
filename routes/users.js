const mongoose = require('mongoose');
const decodeJWT = require('../utils/decodeJWT');
const getTokenFromHeader = require('../utils/getTokenFromHeader');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const token = require('../utils/tokenChecker');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.sendStatus(401);
  }
  const decoded = decodeJWT(token) || {};
  if (!decoded || (id !== decoded.id)) {
    return res.sendStatus(401);
  }
  User.findById(id)
    .then((user) => {
      if (!user){
        return res.sendStatus(401);
      }

      return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

router.put('/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.sendStatus(401);
  }
  const decoded = decodeJWT(token) || {};
  if (!decoded || (id !== decoded.id)) {
    return res.sendStatus(401);
  }
  const {
    username,
    email,
    firstName,
    image,
    password,
  } = req.body;

  User.findById(id).then((user) => {
    if (!user){
      return res.sendStatus(401);
    }
    if (typeof username !== 'undefined'){
      user.username = username;
    }
    if (typeof email !== 'undefined'){
      user.email = email;
    }
    if (typeof firstName !== 'undefined'){
      user.firstName = firstName;
    }
    if(typeof image !== 'undefined'){
      user.image = image;
    }
    if(typeof password !== 'undefined'){
      user.setPassword(password);
    }

    return user.save()
      .then(
        () => res.json({
          user: user.toAuthJSON(),
        })
      );
  }).catch(next);
});

router.post('/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email){
    return res.status(422)
      .json({
        errors: {
          email: 'can\'t be blank',
        },
      });
  }
  if (!password){
    return res.status(422)
      .json({
        errors: {
          password: 'can\'t be blank',
        },
      });
  }
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err){ 
      return next(err); 
    }
    if (user){
      user.token = user.generateJWT();
      return res.json({
        user: user.toAuthJSON(),
      });
    } else {
      return res
        .status(422).json(info);
    }
  })(req, res, next);
});

router.post('/sign-up', (req, res, next) => {
  const user = new User();
  const { 
    username,
    email,
    firstName,
    lastName,
    password,
  } = req.body;
  user.username = username;
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.setPassword(password);
  user.save()
    .then(
      () => res.json({
        user: user.toAuthJSON()
      })
    )
    .catch(next);
});

module.exports = router;