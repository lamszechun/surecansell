INSERT INTO user_accounts
    (first_name, last_name, phone_number, email, username, encrypted_password)
VALUES (
        'John',
        'Smith',
        '+1 234 5678 90',
        'john.smith@gmail.com',
        'john_smith',
        '$2b$10$xiS.4vNwMnb6CrPiztOqx.sEqSIx/l6KNJx4T2IokiRRQvFqFTgDa'
);

INSERT INTO user_accounts
    (first_name, last_name, phone_number, email, username, encrypted_password)
VALUES (
        'Alex',
        'Bjorkson',
        '+2 783 4820',
        'alex.bjorkson@gmail.com',
        'alex_b',
        '$2b$10$AxoCHEKQqOttpsvZ5HbwVudp/jZVZMUuFzOMcgUo4NTcyJ9/vxXQW'
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
           'test.user@test.com',
           'test_user',
           '$2b$10$5AGvo/8gce03z6qTSZwwM.yVvFwcwEePi64.qfc4zy/lG/CXKXPeK'
       );

