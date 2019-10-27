const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

let router = express.Router();

//TODO -- THE ID portions are 


// Get all comments
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listing_comment', []);
    response.render('comments/create_comments.ejs', { listing_comment: data });
});

// Use the input from the form to create a new comment
router.post('/create', signInRequired, async function(request, response){
    const data = request.body;

    const commented_at = data['commented_at'];
    const comment = data['comment'];
    const user_id = data['user_id'];
    const listing_id = data['listing_id'];

    const result = await db.one(
        'INSERT INTO listing_comment' +
        '(commented_at, comment, user_id, listing_id)' +
        'VALUES($1,$2,$3,4,5)' +
        'RETURNING id',
        [commented_at, comment, user_id, listing_id, response.locals.user['id']]
    );

    response.redirect('/comments/view_comments/');
});


//Comments from a specific user_id
router.get('/:id', async function(request, response){
    const listing_id = parseInt(request.params.id);

    if(listing_id){
        const data = await db.oneOrNone('SELECT * FROM listing_comment WHERE id = $1', [listing_id]);

        if(data) {
            response.render('commentss/view_comments.ejs', { listing_comment: data });
        }
        else{
            response.redirect('/comments/');
        }
    }
    else {
        response.redirect('/comments/');
    }
});


module.exports = router;