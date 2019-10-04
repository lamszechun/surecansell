const express = require('express');
const homepage = require('./controllers/homepage');
const listings = require('./controllers/listings');

let router = express.Router();

router.use('/', homepage);
router.use('/listings/', listings);

module.exports = router;