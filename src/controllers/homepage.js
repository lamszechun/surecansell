const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const db = require('../../db');

let router = express.Router();

// Homepage
router.get('/', function(request, response){
    response.redirect('/listings/');
});

// Sign Up - Render the page with the form
router.get('/sign-up', async function(request, response){
    response.render('homepage/sign_up.ejs');
});

// Sign Up - After submitting the form
router.post('/sign-up', async function (request, response) {
    const data = await request.body;

    const first_name = data['first_name'];
    const last_name = data['last_name'];
    const phone_number = data['phone_number'];
    const email = data['email'];
    const username = data['username'];
    const password = data['password'];

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const user_create_result = await db.one(
        'INSERT INTO user_accounts' +
        '(first_name, last_name, phone_number, email, username, encrypted_password)' +
        'VALUES($1,$2,$3,$4,$5,$6)' +
        'RETURNING id',
        [first_name, last_name, phone_number, email, username, hashed_password.toString()]
    );

    console.log(user_create_result);
    response.redirect('/sign-up/');
});

module.exports = router;