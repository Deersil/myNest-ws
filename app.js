/* eslint-disable */
require('dotenv').load();
/* eslint-enable */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connection;
const mongoURL = process.env.DB_HOST ||'mongodb://localhost/';

// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, origin, content-type, accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});

mongoose.connect(mongoURL);
require('./models/User');
require('./models/Room');
require('./models/Hotel');
require('./config/passport');

app.use(require('./routes'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(1337, function () {
  console.log('Example app listening on port 3000!');
});