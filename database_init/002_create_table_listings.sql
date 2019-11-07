CREATE TABLE listings(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_in_cents BIGINT NOT NULL DEFAULT 0,
    condition VARCHAR(255) NOT NULL DEFAULT 'new',
    image_file_path TEXT,
    listed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    lister_id INT REFERENCES user_accounts(id) NOT NULL,
    CONSTRAINT valid_price CHECK( price_in_cents >= 0 ),
    CONSTRAINT valid_conditions CHECK( condition = 'new' OR
                                       condition = 'used' )
);

CREATE INDEX listings_title_lowercase_idx ON listings(lower(title));
