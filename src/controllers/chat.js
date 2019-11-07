const express = require('express');

const db = require('../../db');
const { signInRequired } = require('../middleware');

let router = express.Router();


// display all chat conversations that the user is in
router.get('/', signInRequired, async function(request, response){
    const data = await db.any(
        "SELECT chat_conversations.id, " +
        "       latest_message.sent_at, " +
        "       latest_message.body, " +
        "       latest_message.sender_name, " +
        "       listings.title, " +
        "       listings.description, " +
        "       listings.image_file_path " +
        "FROM chat_conversations " +
        "INNER JOIN listings " +
        "ON chat_conversations.listing_id = listings.id " +
        "LEFT JOIN LATERAL ( " +
        "    SELECT chat_messages.sent_at, " +
        "           chat_messages.body, " +
        "           user_accounts.first_name || ' ' || user_accounts.last_name as sender_name " +
        "    FROM chat_messages " +
        "    INNER JOIN user_accounts " +
        "    ON user_accounts.id = chat_messages.user_id " +
        "    WHERE conversation_id = chat_conversations.id " +
        "    ORDER BY sent_at DESC " +
        "    LIMIT 1 " +
        ") AS latest_message " +
        "ON TRUE " +
        "WHERE chat_conversations.seller_id = $1 " +
        "   OR chat_conversations.buyer_id = $1 " +
        "ORDER BY 2 DESC",
        [response.locals.user['id']]
    );
    console.log(data);
    response.render('chat/list.ejs', { chats: data });
});


// display a single chat conversation
router.get('/:id', signInRequired, async function(request, response) {
    const chat_id = parseInt(request.params.id);

    if(chat_id){
        const conversation = await db.oneOrNone(
            'SELECT * ' +
            'FROM chat_conversations ' +
            'WHERE id = $1',
            [chat_id]
        );
        if(conversation) {
            const buyer = await db.one(
                'SELECT * ' +
                'FROM user_accounts ' +
                'WHERE id = $1',
                [conversation['buyer_id']]
            );
            const seller = await db.one(
                'SELECT * ' +
                'FROM user_accounts ' +
                'WHERE id = $1',
                [conversation['seller_id']]
            );
            const listing = await db.one(
                'SELECT * ' +
                'FROM listings ' +
                'WHERE id = $1',
                [conversation['listing_id']]
            );
            const messages = await db.any(
                'SELECT * ' +
                'FROM chat_messages ' +
                'WHERE conversation_id = $1 ' +
                'ORDER BY sent_at',
                [chat_id]
            );

            response.render(
                'chat/detail.ejs',
                {
                    conversation: conversation,
                    buyer: buyer,
                    seller: seller,
                    listing: listing,
                    messages: messages
                }
            );
        }
        else{
            response.redirect('/404');
        }
    }
    else{
        response.redirect('/404/');
    }
});


// Send chat message
router.post('/:id/message', signInRequired, async function(request, response) {
    const chat_id = parseInt(request.params.id);

    if(chat_id){
        const data = await request.body;

        const message = data['message'];

        const result = await db.oneOrNone(
            'INSERT INTO chat_messages ' +
            '(body, conversation_id, user_id) ' +
            'VALUES ' +
            '($1, $2, $3)',
            [message, chat_id, response.locals.user['id']]
        );

        response.redirect('/chat/' + chat_id + '/');
    }
    else{
        response.redirect('/500/');
    }
});

module.exports = router;