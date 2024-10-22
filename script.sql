CREATE TABLE budget (
    id SERIAL PRIMARY KEY,
    amount money NOT NULL
);
CREATE TABLE envelopes (
    id SERIAL PRIMARY KEY,
    name varchar(15) NOT NULL,
    amount money NOT NULL CHECK (amount::numeric >=0::numeric),
    budget_id integer REFERENCES budget(id) 
);
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    date date,
    amount money NOT NULL,
    recipient varchar(100),
    envelope_id integer REFERENCES envelopes(id) 
);

INSERT INTO budget (amount) VALUES (
    2000.00
);

INSERT INTO envelopes (name, amount, budget_id) VALUES (
    'Groceries',
    500.00,
    1
);

INSERT INTO transactions (date, amount, recipient, envelope_id) VALUES (
    '05-22-2024',
    50.00,
    'Whole Foods Inc.',
    1
);