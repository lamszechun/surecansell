CREATE TABLE chat_message(
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    conversation_id INT REFERENCES chat_conversations(id) NOT NULL,
    user_id INT REFERENCES user_accounts(id) NOT NULL
)
-- TODO: add constraint that user must be either the buyer or seller in the chat conversation