const express = require('express');
const homepage = require('./controllers/homepage');
let router = express.Router();

router.use('/', homepage);

module.exports = router;