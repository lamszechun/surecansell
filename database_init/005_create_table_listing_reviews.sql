CREATE TABLE listing_reviews(
    review_id SERIAL PRIMARY KEY,
    listing_id INT REFERENCES listings(id) NOT NULL,
    user_id INT REFERENCES user_accounts(id) NOT NULL,

    review_time TIMESTAMP NOT NULL DEFAULT NOW(),
    rating INT NOT NULL,
    review_text TEXT,
    CONSTRAINT valid_rating CHECK( rating >= 0 AND rating <= 5 )
);
