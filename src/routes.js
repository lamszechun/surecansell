const express = require('express');
const homepage = require('./controllers/homepage');
const listings = require('./controllers/listings');
const my = require('./controllers/my');
const seller = require('./controllers/seller');

let router = express.Router();

router.use('/', homepage);
router.use('/listings/', listings);
router.use('/my/', my);
router.use('/seller/', seller);

module.exports = router;