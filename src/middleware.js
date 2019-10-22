const signInRequired = async function (request, response, next) {
    if(response.locals.user){
        next();
    }
    else{
        response.redirect('/sign-up/');
    }
};

module.exports = {
    signInRequired
};