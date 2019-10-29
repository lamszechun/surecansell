CREATE TABLE chat_conversations(
    id SERIAL PRIMARY KEY,
    listing_id INT REFERENCES listings(id) NOT NULL,
    seller_id INT REFERENCES user_accounts(id) NOT NULL,
    buyer_id INT REFERENCES user_accounts(id) NOT NULL
);
