const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

let router = express.Router();


// Get all the listings that the user has bookmarked
router.get('/bookmarks', signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT listings.*, ' +
        '       listing_bookmarks.bookmarked_at ' +
        'FROM listing_bookmarks ' +
        'INNER JOIN listings ' +
        'ON listings.id = listing_bookmarks.listing_id ' +
        'WHERE user_id = $1 ' +
        'ORDER BY bookmarked_at DESC',
        [response.locals.user['id']]
    );
    response.render('my/bookmarks.ejs', { bookmarks: data });
});


// Remove bookmark
router.post('/bookmarks/:id/remove', signInRequired, async function(request, response){
    const bookmark_id = parseInt(request.params.id);

    if(bookmark_id){
        const data = await db.none(
            'DELETE FROM listing_bookmarks ' +
            'WHERE id = $1',
            [bookmark_id]
        );
        response.redirect('/my/bookmarks/');
    }
    else{
        response.redirect('/my/bookmarks/');
    }
});


// Get all the listings for the currently logged in user
router.get('/listings', signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings ' +
        'WHERE lister_id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listings.ejs', { listings: data });
});

// Purchase History
router.get('/purchases', signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT purchase_transactions.id AS transaction_id, ' +
        '       purchase_transactions.price_in_cents, ' +
        '       purchase_transactions.purchased_at, ' +
        '       purchase_transactions.seller_id, ' +
        '       listings.title, ' +
        '       listings.image_file_path ' +
        'FROM purchase_transactions ' +
        'INNER JOIN listings ' +
        'ON listings.id = purchase_transactions.listing_id ' +
        'WHERE purchase_transactions.buyer_id = $1 ' +
        'ORDER BY purchase_transactions.purchased_at DESC',
        [response.locals.user['id']]
    );
    response.render('my/purchases.ejs', { purchases: data });
});

// Single Purchase
router.get('/purchases/:id', signInRequired, async function(request, response){
    const purchase_id = parseInt(request.params.id);
    const buy_success_message = request.cookies.message;
    let message = null;
    if(buy_success_message){
        message = buy_success_message;
        response.clearCookie('message');
    }

    if(purchase_id){
        const data = await db.oneOrNone(
            'SELECT purchase_transactions.id AS transaction_id, ' +
            '       purchase_transactions.price_in_cents, ' +
            '       purchase_transactions.purchased_at, ' +
            '       purchase_transactions.seller_id, ' +
            '       listings.title, ' +
            '       listings.image_file_path ' +
            'FROM purchase_transactions ' +
            'INNER JOIN listings ' +
            'ON listings.id = purchase_transactions.listing_id ' +
            'WHERE purchase_transactions.id = $1' +
            '  AND purchase_transactions.buyer_id = $2',
            [purchase_id, response.locals.user['id']]
        );
        if(data){
            response.render('my/purchases_detail.ejs', { purchase: data, message: message });
        }
        else{
            response.redirect('/my/purchases/');
        }
    }
    else{
        response.redirect('/my/purchases/');
    }
});


// LISTING REVIEWS PORTION

// TODO -- reviews portion not sure about the DB queries

//Post listing Review -- NOT SURE about the id portion

router.post('/listing_reviews', signInRequired, async function(request, response){
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
router.get('/listing_reviews', signInRequired, async function(request, response){
    const data = await db.any(
        'SELECT * FROM listings_review ' +
        'WHERE user_id = $1',
        [response.locals.user['id']]
    );
    response.render('my/listing_reviews.ejs', { listing_reviews: data });
});


// Get all the reviews ABOUT the logged in user
router.get('/listing_reviews', signInRequired, async function(request, response){
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