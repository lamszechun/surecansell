const express = require('express');

const db = require('../../db');
const middleware = require('../middleware');

let router = express.Router();


// seller - display a single seller
router.get('/:id', async function(request, response){
    const seller_id = parseInt(request.params.id);

    if(seller_id){
        const result = await db.oneOrNone(
            'SELECT * ' +
            'FROM user_accounts ' +
            'WHERE id = $1',
            [seller_id]
        );
        if(result){
            const listings = await db.any(
                'SELECT * ' +
                'FROM listings ' +
                'WHERE lister_id = $1',
                [seller_id]
            );
            response.render('seller/detail.ejs', { seller: result, listings: listings });
        }
        else{
            response.redirect('/listings/');
        }
    }
    else{
        response.redirect('/listings/');
    }
});


// Redirect to default listings page for now
router.get('*', async function(request, response){
    response.redirect('/listings');
});


module.exports = router;