const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

let router = express.Router();

// all URL paths are prefixed with '/listings'

// Get all our listings
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listings', []);
    response.render('listings/list.ejs', { listings: data });
});

// Render our Listings Creation page
router.get('/create', signInRequired, async function(request, response){
    response.render('listings/create.ejs');
});

// Use the input from the form to create a new listing
router.post('/create', signInRequired, async function(request, response){
    const data = request.body;

    const title = data['title'];
    const description = data['description'];
    const price_in_cents = parseInt(data['price_in_dollars'])*100 + (parseInt(data['price_in_cents']) || 0);
    const condition = data['condition'];

    const result = await db.one(
        'INSERT INTO listings ' +
        '(title, description, price_in_cents, condition, lister_id) ' +
        'VALUES($1,$2,$3,$4,$5) ' +
        'RETURNING id',
        [title, description, price_in_cents, condition, response.locals.user['id']]
    );

    response.redirect('/my/listings/');
});

// Render a detailed view of a listing
router.get('/:id', async function(request, response){
    const listing_id = parseInt(request.params.id);

    if(listing_id){
        const data = await db.oneOrNone(
            'SELECT * FROM listings where id = $1',
            [listing_id]
        );

        if(data) {
            response.render('listings/detail.ejs', { listing: data });
        }
        else{
            response.redirect('/listings/');
        }
    }
    else {
        response.redirect('/listings/');
    }
});


// Bookmark Listing
router.post('/:id/bookmark', async function(request, response){
    const listing_id = parseInt(request.params.id);

    if(listing_id){
        // TODO: db query to add an entry to listing_bookmarks
        console.log('bookmark added');
    }
    else {
        response.redirect('/listings/');
    }
});


// Buy Listing - Handle the purchase transaction
router.post('/:id/buy', signInRequired, async function(request, response){
    const listing_id = parseInt(request.params.id);
    const buyer = response.locals.user;

    if(listing_id && buyer){
        const listing = await db.oneOrNone(
            'SELECT price_in_cents, lister_id ' +
            'FROM listings ' +
            'WHERE id = $1',
            [listing_id]
        );
        if(listing) {
            const data = await db.oneOrNone(
                'INSERT INTO purchase_transactions ' +
                '(price_in_cents, listing_id, seller_id, buyer_id) ' +
                'VALUES($1, $2, $3, $4) ' +
                'RETURNING id',
                [listing.price_in_cents, listing_id, listing.lister_id, response.locals.user['id']]
            );
            response.cookie('message', 'Purchase Successful!');
            response.redirect('/my/purchases/' + data['id'] + '/');
        }
        else{
            response.redirect('/500/');
        }
    }
    else{
        response.redirect('/listings/');
    }
});


module.exports = router;