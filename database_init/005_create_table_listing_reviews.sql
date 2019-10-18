CREATE TABLE listing_reviews(
    id SERIAL PRIMARY KEY,
    reviewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    rating INT NOT NULL,
    message TEXT,
    CONSTRAINT valid_rating CHECK( rating >= 0 AND rating <= 5 )
);
