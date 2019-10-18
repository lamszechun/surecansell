const express = require('express');
const db = require('../../db');
let router = express.Router();

// URL: /listings/
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listings', []);
    response.render('listings/list.ejs', { listings: data });
});

router.get('/create', async function(request, response){
    response.render('listings/create.ejs');
});

router.post('/create', async function(request, response){
    const data = request.body;
    console.log(data);
    response.redirect('/listings/');
});


module.exports = router;