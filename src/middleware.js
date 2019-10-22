const db = require('../db');

const signInRequired = async function (request, response, next) {
    const access_token = request.cookies.access_token;
    if(access_token){
        const result = await db.oneOrNone(
            'SELECT user_id FROM user_access_tokens ' +
            'WHERE value = $1',
            [access_token]
        );
        if(result){
            response.locals.user_id = result['user_id'];
            next();
        }
    }
    else {
        response.redirect('/sign-up/');
    }
};

module.exports = {
    signInRequired
};