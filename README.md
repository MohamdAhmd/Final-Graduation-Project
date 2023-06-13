# Graduation Project : System for Analysis and Predict

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

 `npm install`

### Packages

Here are some of the few packages that were installed.

#### db-migrate
`npm install -g db-migrate`

### db-migrate-pg
`npm i db-migrate-pg`
`npm i @types/db-migrate-pg`

#### node-postgres
`npm i pg`
`npm i @types/pg`

#### bcrypt
`npm i bcrypt`
`npm i @types/bcrypt`

#### jsonwebtoken
`npm i jsonwebtoken`
`npm i @types/jsonwebtoken`

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`

- In psql run the following to create the dev and test database
    - `CREATE DATABASE store;`
    - `CREATE DATABASE store_test;`
- Connect to the databases 
    - Grant for dev database
        - `\c store`
        
    - Grant for test database
        - `\c store_test`
        

### Migrate Database
 run the command in terminal to migrate the database 
 `npx db-migrate create mythical-worlds-table --sql-file`
# for create tables
`npx db-migrate up`

# for drop tables
`npx db-migrate reset`
# for drop schema and rebuild it
    -- Recreate the schema
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;

    -- Restore default permissions
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 

## Start App
`npm run start`

-note:you must run `npx db-migrate up` to ensure tables created

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing. 

### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `npm run test` will set this variable to `testing` in the package.json. Here is the complete command.
`set ENV=test && tsc && db-migrate --env test down -c 3&&db-migrate --env test up && tsc  && jasmine`

The first command migrates all tables then the second command changes the enviroment variable `ENVI` to testing, then the jasmine is run and then after testing, the database is reset. 