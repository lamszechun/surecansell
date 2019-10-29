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
        [response.locals.user['id']]
    );
    response.render('my/listings.ejs', { listings: data });
});

// Redirect to default listings page for now
router.get('*', async function(request, response){
    response.redirect('/my/listings');
});


// LISTING REVIEWS PORTION

// TODO -- reviews portion not sure about the DB queries

//Post listing Review -- NOT SURE about the id portion

router.post('/listing_reviews', middleware.signInRequired, async function(request, response){
    const data = await request.body;

    const listing_id = data['listing_id'];
    const user_id = data['user_id'];
    const review_time = data['review_time'];
    const rating = data['rating'];
    const review_text = data['review_text'];

    const user_create_result = await db.one(
        'INSERT INTO listing_reviews' +
        '(listing_id, user_id, review_time, rating, review_text)' +
        'VALUES(01,02,03:00,4,$5)' +
        'RETURNING id',
        [listing_id, user_id, review_time, rating.toString()]
    );

    console.log(user_create_result);
    response.redirect('/listing_reviews/');

});

// Get all the reviews WRITTEN BY the logged in user.
router.get('/listing_reviews', middleware.signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review ' +
        'WHERE user_id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});


// Get all the reviews ABOUT the logged in user
router.get('/listing_reviews', middleware.signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review, listings ' +
        'WHERE listings_review.listing_id = listings.id ' +
        'AND listings.lister_id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});


// Redirect to listings review page
router.get('*', async function(request, response){
    response.redirect('/listing_reviews/listing_reviews.ejs');
});





module.exports = router;