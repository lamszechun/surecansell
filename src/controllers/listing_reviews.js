const express = require('express');
const db = require('../../db');
let router = express.Router();

// URL: /listing_reviews/
router.get('/', async function(request, response){
    response.redirect('/listing_reviews/');
});

//To create a listing review
// POINT TO NOTE - Not Sure what to put in the parameters after the .get instead of /listing reviews.
router.get('/listing_reviews', async function(request, response){
    response.render('listing_reviews/create.ejs');
});


//Post listing Review. 
// POINT TO NOTE - Not sure about the review_id portion
router.post('/listing_reviews', async function(request, response){
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
        'RETURNING review_id',
        [listing_id, user_id, review_time, rating.toString()]
    );

    console.log(user_create_result);
    response.redirect('/listing_reviews/');

});

module.exports = router;