import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  BCRYPT_PASSWWORD,
  SALT_ROUNDS,
  TOKEN_SECRE
} = process.env
console.log('ENVIRONMENT IS:' + ENV)
const client = new Pool({
  port: parseInt(POSTGRES_PORT as string, 10),
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_test,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})

export default client
