const express = require('express');
const homepage = require('./controllers/homepage');
const listings = require('./controllers/listings');
const my = require('./controllers/my');

let router = express.Router();

router.use('/', homepage);
router.use('/listings/', listings);
router.use('/my/', my);

module.exports = router;