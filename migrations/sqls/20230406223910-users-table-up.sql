CREATE TABLE users (
     id SERIAL PRIMARY KEY ,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL
);

ALTER TABLE users
ADD COLUMN user_type_name varchar(20)  NOT NULL,
ADD COLUMN active int2 NULL DEFAULT 1,
ADD COLUMN created_on timestamp NULL,
ADD COLUMN created_by varchar(100) NULL,
ADD COLUMN updated_on timestamp NULL;