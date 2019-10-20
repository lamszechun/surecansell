CREATE TABLE user_access_tokens(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '30 days',
    value CHAR(40) UNIQUE NOT NULL,
    user_id INT REFERENCES user_accounts(id) NOT NULL
);

CREATE UNIQUE INDEX token_value_idx ON user_access_tokens(value);
