const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

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


// comment on seller - handle form input
router.post('/:id/comment', signInRequired, async function(request, response){
    const seller_id = parseInt(request.params.id);
    const commenter = response.locals.user;
    const data = await request.body;

    const comment = data['comment'];

    if(seller_id && commenter){
        const result = await db.oneOrNone(
            'INSERT INTO user_account_comments ' +
            '(body, commenter_id, user_id) ' +
            'VALUES ($1, $2, $3) ' +
            'RETURNING id',
            [comment, commenter['id'], seller_id]
        );
        response.redirect('/seller/' + seller_id + '/');
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