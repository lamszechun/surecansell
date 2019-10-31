const express = require('express');
const db = require('../../db');
let router = express.Router();
//TODO -- Not sure about the search portion


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

    const user_id = parseInt(request.params.user_id);

    if(user_id){
        const data = await db.any(
            'SELECT * FROM listings_review' +
            'WHERE user_id = $1,
            [response.locals.user['id']]
        );
        
        
        if(data){
            response.render('my/listing_reviews.ejs', { listing_reviews: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_reviews/');
    }
    
});


//Search For Listing Reviews Based on Listing ID
router.get('/listing_reviews', async function(request, response){
    const listing_id = parseInt(request.params.listing_id);

    if(listing_id){
        const data = await db.any(
            'SELECT * FROM listings_review ' +
            'WHERE listing_id = $1',
            [response.locals.user['id']]
        );
        
        if(data){
            response.render('listing_reviews/listing_reviews.ejs', { listing_reviews: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_reviews/');
    }
    
});

//Search For Listing Reviews Based on Review ID
router.get('/listing_reviews', async function(request, response){
    const review_id = parseInt(request.params.id);

    if(review_id){
        const data = await db.any(
            'SELECT * FROM listings_review ' +
            'WHERE id = $1',
            [response.locals.user['id']]
        );
        
        if(data){
            response.render('my/listing_reviews.ejs', { listing_reviews: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_reviews/');
    }
    
});


//Search For Listing Reviews Based on Review Time
router.get('/listing_reviews', async function(request, response){
    const review_time = parseInt(request.params.review_time);

    if(review_time){
        const data = await db.any(
            'SELECT * FROM listings_review ' +
            'WHERE review_time = 01:00',
            [response.locals.user['id']]
        );
        
        if(data){
            response.render('my/listing_reviews.ejs', { listing_reviews: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_reviews/');
    }
    
});



module.exports = router;