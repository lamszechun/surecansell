const express = require('express');
const db = require('../../db');
let router = express.Router();

// URL: /listing_reviews/
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listing_reviews', []);
    response.render('listing_reviews/listing_reviews.ejs', { listing_reviews: data });
});


router.get('/create', async function(request, response){
    response.render('listing_reviews/create.ejs');
});

router.post('/create', async function(request, response){
    const data = request.body;
    console.log(data);
    response.redirect('/listing_reviews/');
});

module.exports = router;