const express = require('express');

const db = require('../../db');
const middleware = require('../middleware');

let router = express.Router();

// all URL paths are prefixed with '/listings'

// Get all our listings
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listings', []);
    response.render('listings/list.ejs', { listings: data });
});

// Render our Listings Creation page
router.get('/create', middleware.signInRequired, async function(request, response){
    response.render('listings/create.ejs');
});

// Use the input from the form to create a new listing
router.post('/create', middleware.signInRequired, async function(request, response){
    const data = request.body;

    const title = data['title'];
    const description = data['description'];
    const price_in_cents = parseInt(data['price_in_dollars'])*100 + (parseInt(data['price_in_cents']) || 0);
    const condition = data['condition'];

    const result = await db.one(
        'INSERT INTO listings' +
        '(title, description, price_in_cents, condition, lister_id)' +
        'VALUES($1,$2,$3,$4,$5)' +
        'RETURNING id',
        [title, description, price_in_cents, condition, response.locals.user_id]
    );

    response.redirect('/my/listings/');
});


module.exports = router;