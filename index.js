const express = require('express');
const cookie_parser = require('cookie-parser');
const routes = require('./src/routes');
const db = require('./db');

// middleware to get the current user from cookies
const getCurrentUser = async function(request, response, next){
    response.locals.user = null;
    try {
        const access_token = request.cookies.access_token;
        if (access_token) {
            response.locals.user = await db.oneOrNone(
                'SELECT user_accounts.id,' +
                '       user_accounts.username ' +
                'FROM user_access_tokens ' +
                'INNER JOIN user_accounts ' +
                'ON user_access_tokens.user_id = user_accounts.id ' +
                'WHERE user_access_tokens.expires_at >= now() ' +
                '  AND user_access_tokens.value = $1',
                [access_token]
            );
        }
        next();
    }
    catch(error){
        next(error);
    }
};

const app = express();

app.set('views', '/app/src/views/');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(getCurrentUser);
app.use('/', routes);

app.listen(3000, () => console.log('Server running on port 3000...'));
