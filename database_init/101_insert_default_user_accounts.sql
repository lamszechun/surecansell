-- Insert an admin account, will need an is_admin flag especially for this
-- Username: admin_user
-- Password: password!
INSERT INTO user_accounts
(first_name, last_name, phone_number, email, username, encrypted_password, is_admin)
VALUES (
           'Admin',
           'User',
           '+1234567890',
           'admin.user@surecansell.com',
           'admin_user',
           '$2b$10$5AGvo/8gce03z6qTSZwwM.yVvFwcwEePi64.qfc4zy/lG/CXKXPeK',
            TRUE
       );

-- Insert a test account for us to use for testing
-- Username: test_user
-- Password: password!
INSERT INTO user_accounts
(first_name, last_name, phone_number, email, username, encrypted_password)
VALUES (
           'Test',
           'User',
           '+1234567890',
           'test.user@surecansell.com',
           'test_user',
           '$2b$10$5AGvo/8gce03z6qTSZwwM.yVvFwcwEePi64.qfc4zy/lG/CXKXPeK'
       );


-- Insert a seller account for us to use for the demo
-- Username: seller_user
-- Password: password!
INSERT INTO user_accounts
(first_name, last_name, phone_number, email, username, encrypted_password)
VALUES (
           'Seller',
           'User',
           '+1234567890',
           'seller.user@gmail.com',
           'seller_user',
           '$2b$10$5AGvo/8gce03z6qTSZwwM.yVvFwcwEePi64.qfc4zy/lG/CXKXPeK'
       );

-- Insert a buyer account for us to use for the demo
-- Username: buyer_user
-- Password: password!
INSERT INTO user_accounts
(first_name, last_name, phone_number, email, username, encrypted_password)
VALUES (
           'Buyer',
           'User',
           '+1234567890',
           'buyer.user@gmail.com',
           'buyer_user',
           '$2b$10$5AGvo/8gce03z6qTSZwwM.yVvFwcwEePi64.qfc4zy/lG/CXKXPeK'
       );
