const express = require('express');
const db = require('../../db');
let router = express.Router();

// URL: /listing_bookmarks/
router.get('/', async function(request, response){
    const data = await db.query('SELECT * FROM listing_bookmarks', []);
    response.render();
});


router.get('/listing_bookmarks', async function(request, response){
    
});

router.post('/listing_bookmarks', async function(request, response){
    //
});


module.exports = router;