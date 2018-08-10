const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/hotels', require('./hotels'));

module.exports = router;