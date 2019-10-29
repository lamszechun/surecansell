CREATE TABLE listing_comment(
    id SERIAL PRIMARY KEY,
    commented_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment VARCHAR(256) NOT NULL,
    user_id INT references user_accounts(id) NOT NULL,
    listing_id INT references listings(id) NOT NULL
);
