CREATE TABLE user_accounts(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE listings(
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    lister_id INTEGER REFERENCES user_accounts(id) NOT NULL
);
