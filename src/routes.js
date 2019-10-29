const express = require('express');
const homepage = require('./controllers/homepage');
const listings = require('./controllers/listings');
const my = require('./controllers/my');
const seller = require('./controllers/seller');
const chat = require('./controllers/chat');

let router = express.Router();

router.use('/', homepage);
router.use('/listings/', listings);
router.use('/my/', my);
router.use('/seller/', seller);
router.use('/chat/', chat);

module.exports = router;