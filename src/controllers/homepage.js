const express = require('express');
let router = express.Router();

router.get('/', function(request, response){
    response.render('homepage/home.ejs');
});

module.exports = router;