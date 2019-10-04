const express = require('express');
const homepage = require('./controllers/homepage');
let router = express.Router();

router.use('/', homepage);

// sample commit just to show git
module.exports = router;