CREATE TABLE purchase_transactions (
    id BIGSERIAL PRIMARY KEY,
    price_in_cents INT NOT NULL,
    purchased_at TIMESTAMP NOT NULL DEFAULT NOW(),
    listing_id INT REFERENCES listings(id) NOT NULL,
    seller_id INT REFERENCES user_accounts(id) NOT NULL,
    buyer_id INT REFERENCES user_accounts(id) NOT NULL
);
