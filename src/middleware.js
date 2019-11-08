const adminRequired = async function(request, response, next){
    if(response.locals.user && response.locals.user['is_admin']){
        next();
    }
    else{
        response.redirect('/404/');
    }
};

const signInRequired = async function (request, response, next) {
    if(response.locals.user){
        next();
    }
    else{
        response.redirect('/login/');
    }
};

module.exports = {
    adminRequired,
    signInRequired
};