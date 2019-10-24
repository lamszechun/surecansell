const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');

const db = require('../../db');
const middleware = require('../middleware');

let router = express.Router();

const createToken = async function(user_id){
    const token = crypto.randomBytes(20).toString('hex');

    const result = await db.one(
        'INSERT INTO user_access_tokens' +
        '(value, user_id)' +
        'VALUES($1,$2)' +
        'RETURNING id',
        [token, user_id]
    );
    return token;
};


// Homepage
router.get('/', function(request, response){
    response.redirect('/listings/');
});


// Login - render page
router.get('/login', async function(request, response){
    if(response.locals.user){
        response.redirect('/my/listings/');
    }

    response.render('homepage/login.ejs');
});


// Login - handle form input
router.post('/login', async function(request, response){
    if(response.locals.user){
        response.redirect('/my/listings/');
    }

    const data = await request.body;

    const username = data['username'];
    const password = data['password'];

    const result = await db.oneOrNone(
        'SELECT id, encrypted_password ' +
        'FROM user_accounts ' +
        'WHERE username = $1',
        [username]
    );

    if(result){
        const is_correct_password = await bcrypt.compare(password, result['encrypted_password']);

        if(is_correct_password){
            const token = await createToken(result['id']);

            response.cookie('access_token', token);
            response.redirect('/my/listings/');
        }
    }

    response.redirect('/listings/');
});


// Logout - handle logout & then redirect
router.get('/logout', async function(request, response){
    response.clearCookie('access_token');
    response.redirect('/listings/');
});


// Sign Up - Render the page with the form
router.get('/sign-up', async function(request, response){
    if(response.locals.user){
        response.redirect('/listings/');
    }

    response.render('homepage/sign_up.ejs');
});


// Sign Up - handle form input
router.post('/sign-up', async function (request, response) {
    if(response.locals.user){
        response.redirect('/listings/');
    }

    const data = await request.body;

    const first_name = data['first_name'];
    const last_name = data['last_name'];
    const phone_number = data['phone_number'];
    const email = data['email'];
    const username = data['username'];
    const password = data['password'];

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const result = await db.one(
        'INSERT INTO user_accounts' +
        '(first_name, last_name, phone_number, email, username, encrypted_password)' +
        'VALUES($1,$2,$3,$4,$5,$6)' +
        'RETURNING id',
        [first_name, last_name, phone_number, email, username, hashed_password.toString()]
    );
    const token = await createToken(result['id']);

    response.cookie('access_token', token);
    response.redirect('/listings/');
});


module.exports = router;