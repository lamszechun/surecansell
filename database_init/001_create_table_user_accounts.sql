CREATE TABLE user_accounts(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(32),
    email VARCHAR(255),
    username VARCHAR(255),
    encrypted_password VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
);
