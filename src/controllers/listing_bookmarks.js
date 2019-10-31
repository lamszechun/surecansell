const express = require('express');
const db = require('../../db');
let router = express.Router();

// TODO: Not sure if the js functions are correct

// URL: /listing_bookmarks/

// Get ALL listing bookmarks
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listing_bookmarks', []);
    response.render('listing_bookmarks/listing_bookmarks.ejs', { listing_bookmarks: data });
});



// Search Portion
// Display bookmarks based on bookmark id
router.get('/search', async function(request, response){
    const bookmark_id = parseInt(request.params.id);

    if(bookmark_id){
        const data = await db.any(
            'SELECT * FROM listing_bookmarks' +
            'WHERE id = $1,
            [response.locals.user['id']]
        );
        
        
        if(data){
            response.render('listing_bookmarks/listing_bookmarks.ejs', { listing_bookmarks: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_bookmarks/');
    }
});

// Display bookmarks based on listing id
router.get('/search', async function(request, response){
    const listing_id = parseInt(request.params.listing_id);

    if(listing_id){
        const data = await db.any(
            'SELECT * FROM listing_bookmarks' +
            'WHERE listing_id = $1,
            [response.locals.user['id']]
        );
        
        
        if(data){
            response.render('listing_bookmarks/listing_bookmarks.ejs', { listing_bookmarks: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_bookmarks/');
    }
});


// Display bookmarks based on user id
router.get('/search', async function(request, response){
    const user_id = parseInt(request.params.user_id);

    if(user_id){
        const data = await db.any(
            'SELECT * FROM listing_bookmarks' +
            'WHERE user_id = $1,
            [response.locals.user['id']]
        );
        
        
        if(data){
            response.render('listing_bookmarks/listing_bookmarks.ejs', { listing_bookmarks: data });
        }else{
            response.redirect('/500/');
        }

    }else{
        response.redirect('/listing_bookmarks/');
    }
});



// Maybe it is under listings.js?
router.post('/listing_bookmarks', async function(request, response){
    //
});


module.exports = router;