const express = require('express');

const db = require('../../db');
const { adminRequired } = require('../middleware');

let router = express.Router();


// Admin Home
router.get('/', adminRequired, async function(request, response){
    response.render('admin/home.ejs');
});


// Admin Analytics Page
router.get('/analytics', adminRequired, async function(request, response){
    response.render('admin/analytics.ejs');
});


// Admin Listings Page
router.get('/listings', adminRequired, async function(request, response){
    const data = await db.query(
        "SELECT listings.*, " +
        "       user_accounts.first_name || ' ' || user_accounts.last_name AS seller_name " +
        "FROM listings " +
        "INNER JOIN user_accounts " +
        "ON listings.lister_id = user_accounts.id " +
        "ORDER BY listings.listed_at DESC",
        []
    );
    response.render('admin/listings.ejs', { listings: data });
});


module.exports = router;