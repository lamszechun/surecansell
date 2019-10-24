const express = require('express');
const db = require('../../db');
let router = express.Router();
//TODO -- SEARCH PORTION NEEDS WORK


// URL: /listing_reviews/
router.get('/', async function(request, response){
    response.redirect('/listing_reviews/');
});

//Render a listing review creation page
// POINT TO NOTE - Not Sure what to put in the parameters after the .get instead of /listing reviews.
router.get('/listing_reviews', async function(request, response){
    response.render('listing_reviews/create.ejs');
});


//SEARCH PORTION

//Search For Listing Reviews Based on User ID
router.get('/listing_reviews', async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review lr' +
        'WHERE user_id = $1,
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});


//Search For Listing Reviews Based on Listing ID
router.get('/listing_reviews', async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review ' +
        'WHERE listing_id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});

//Search For Listing Reviews Based on Review ID
router.get('/listing_reviews', async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review ' +
        'WHERE id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});


module.exports = router;