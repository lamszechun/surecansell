const express = require('express');
const homepage = require('./controllers/homepage');
const admin = require('./controllers/admin');
const listings = require('./controllers/listings');
const my = require('./controllers/my');
const seller = require('./controllers/seller');
const chat = require('./controllers/chat');

let router = express.Router();

router.use('/', homepage);
router.use('/admin/', admin);
router.use('/listings/', listings);
router.use('/my/', my);
router.use('/seller/', seller);
router.use('/chat/', chat);

// this is our catch all to redirect the user to the 404 page
router.get('*', async function(request, response){
    response.redirect('/404/');
});

module.exports = router;