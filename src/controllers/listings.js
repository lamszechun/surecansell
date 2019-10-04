const express = require('express');
const db = require('../../db');
let router = express.Router();

// URL: /listings/
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listings', []);
    response.render('listings/list.ejs', { listings: data });
});


module.exports = router;