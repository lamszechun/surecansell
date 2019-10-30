const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

let router = express.Router();


// display all chat conversations that the user is in
router.get('/', signInRequired, async function(request, response){
    const user = response.locals.user;

    const data = db.any(
        'SELECT * ' +
        'FROM chat_conversations ' +
        'WHERE seller_id = $1 ' +
        '   OR buyer_id = $1',
        [user['id']]
    );
    response.render('chat/list.ejs', { conversations: data });
});


// display a single chat conversation
router.get('/:id', signInRequired, async function(request, response) {
    const chat_id = parseInt(request.params.id);
    const user = response.locals.user;

    // TODO: render chat a single chat
    response.redirect('/chat/');
});

// Redirect to default listings page as a default catch
router.get('*', async function(request, response){
    response.redirect('/listings/');
});

module.exports = router;