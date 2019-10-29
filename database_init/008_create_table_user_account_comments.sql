CREATE TABLE user_account_comments(
    id SERIAL PRIMARY KEY,
    body TEXT,
    commenter_id INT REFERENCES user_accounts(id) NOT NULL,
    user_id INT REFERENCES user_accounts(id) NOT NULL
)