/* Replace with your SQL commands */
CREATE TABLE Admins (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_digest VARCHAR NOT NULL
);