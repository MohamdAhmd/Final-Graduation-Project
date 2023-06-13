import client from '../../database'
import bcrypt from 'bcrypt'
import { USER_groupInfo } from './user_group'

export type USER = {
  id?: number
  firstname: string
  lastname: string
  email: string
  password_digest: string
  user_type_name: string
  active?: number
  created_on: Date
  created_by: string
  updated_on: Date
}
export class userInfo {
  //get all users
  async index(): Promise<USER[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM users'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get users ${error}`)
    }
  }
  // get user by id
  async show(id: number): Promise<USER> {
    try {
      const sql = 'SELECT * FROM users WHERE id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get user${error}`)
    }
  }
  async create(user: USER): Promise<USER> {
    // console.log(user);

    try {
      const {
        firstname,
        lastname,
        email,
        password_digest,
        user_type_name,
        created_on,
        created_by,
        updated_on
      } = user
      console.log(user)

      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      const salt: string = process.env.SALT_ROUNDS as string
      const hashPassword: string = bcrypt.hashSync(password_digest + pepper, parseInt(salt))
      //console.log(user);

      const connect = await client.connect()
      const sql =
        'INSERT INTO users (firstname, lastname, email, password_digest, user_type_name, created_on, created_by, updated_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
      const res = await connect.query(sql, [
        firstname,
        lastname,
        email,
        hashPassword,
        user_type_name,
        created_on,
        created_by,
        updated_on
      ])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw `This Email Is Already Used `
    }
  }
  async deleteUser(id: number): Promise<USER[]> {
    try {
      const sql = 'DELETE  FROM users WHERE id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delet user ${error}`)
    }
  }
  async updateUser(user: USER): Promise<USER[]> {
    try {
      const {
        firstname,
        lastname,
        email,
        password_digest,
        user_type_name,
        created_on,
        created_by,
        updated_on,
        id
      } = user

      const sql =
        'UPDATE users SET firstname = $1 ,lastname=$2 ,email=$3,password_digest=$4, user_type_name=$5, created_on=$6, updated_on=$7 WHERE id = $8 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [
        firstname,
        lastname,
        email,
        password_digest,
        user_type_name,
        created_on,
        created_by,
        updated_on,
        id
      ])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not update user ${error}`)
    }
  }
  async athuntication(email: string, password: string): Promise<USER | any> {
    try {
      const sql = 'SELECT * FROM users WHERE email = $1'
      const conn = await client.connect()
      const res = await conn.query(sql, [email])
      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      conn.release()
      if (!res.rows[0]) {
        throw 'Wrong Email'
      } else {
        if (res.rows.length) {
          const user = res.rows[0] as USER
          if (bcrypt.compareSync(password + pepper, user.password_digest)) {
            return user
          } else {
            throw 'Wrong password'
          }
        }
      }
    } catch (error) {
      throw `${error}`
    }
  }
}
