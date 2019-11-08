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
    const total_purchases = await db.one(
        "SELECT COUNT(*) AS total_count " +
        "FROM purchase_transactions",
        []
    );

    const most_expensive = await db.one(
        "SELECT MAX(price_in_cents) AS max_price " +
        "FROM listings",
        []
    );

    const each_spending = await db.query(
        "SELECT buyer_id, " +
        "       SUM(price_in_cents) AS price_sum " +
        "FROM purchase_transactions " +
        "GROUP BY 1 " +
        "ORDER BY 2 DESC",
        []
    );

    response.render(
        'admin/analytics.ejs',
        {
            total_purchases: total_purchases['total_count'],
            max_price: most_expensive['max_price'],
            spending: each_spending
        }
    );
});
//Purchase Transactions where the buyer and seller have the same last name
//SELECT p.id
//FROM purchase_transactions p, user_accounts u, user_accounts u1
//WHERE p.buyer_id = u.id AND u.last_name = u1.last_name AND p.seller_id = u1.id AND u.id < u1.id ;




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