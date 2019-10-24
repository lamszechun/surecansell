CREATE TABLE listing_bookmarks(
    id SERIAL PRIMARY KEY,
    listing_id INT REFERENCES listings(id) NOT NULL,
    user_id INT REFERENCES user_accounts(id) NOT NULL,
    CONSTRAINT unique_bookmark_per_user UNIQUE (listing_id, user_id)
);