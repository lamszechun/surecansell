CREATE TABLE listing_comment(
    id SERIAL PRIMARY KEY,
    commented_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment VARCHAR(256) NOT NULL,
    listing_id INT references listing(id) NOT NULL,
    lister_id INT REFERENCES user_accounts(id) NOT NULL
);
