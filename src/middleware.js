const db = require('../db');

const signInRequired = async function (request, response, next) {
    const access_token = request.cookies.access_token;
    if(access_token){
        const user_id = await db.oneOrNone(
            'SELECT user_id FROM user_access_tokens' +
            'WHERE value = $1',
            [access_token]
        );
        if(user_id){
            response.locals.user_id = user_id;
            next();
        }
    }
    response.redirect('/sign-up/');
};

module.exports = {
    signInRequired
};