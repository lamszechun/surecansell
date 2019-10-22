const express = require('express');

const db = require('../../db');
const middleware = require('../middleware');

let router = express.Router();

// all URL paths are prefixed with '/my'

// Get all the listings for the currently logged in user
router.get('/listings', middleware.signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings ' +
        'WHERE lister_id = $1',
        [response.locals.user_id]
    );
    response.render('my/listings.ejs', { listings: data });
});

// Redirect to default listings page for now
router.get('*', async function(request, response){
    response.redirect('/my/listings');
});


module.exports = router;