import client from '../../database'
import bcrypt from 'bcrypt'

export type USER = {
  id?: number
  firstname: string
  lastname: string
  email: string
  password_digest: string
  roles?: string
}
export class userInfo {
  //get all users
  async index(): Promise<USER[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM Admins'
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
      const sql = 'SELECT * FROM Admins WHERE id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get user${error}`)
    }
  }
  async create(user: USER): Promise<USER> {
    try {
      const { firstname, lastname, email, password_digest } = user
      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      const salt: string = process.env.SALT_ROUNDS as string
      const hashPassword: string = bcrypt.hashSync(password_digest + pepper, parseInt(salt))
      const connect = await client.connect()
      const sql =
        'INSERT INTO Admins (firstname, lastname, email,password_digest) VALUES($1, $2, $3 ,$4) RETURNING *'
      const res = await connect.query(sql, [firstname, lastname, email, hashPassword])
      connect.release()
      //console.log( res.rows[0]);
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create user${error}`)
    }
  }
  async deleteUser(id: number): Promise<USER[]> {
    try {
      const sql = 'DELETE  FROM Admins WHERE id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delete user ${error}`)
    }
  }
  async updateadmin(
    firstname: string,
    lastname: string,
    email: string,
    password_digest: string,
    id: number
  ): Promise<USER[]> {
    try {
      const sql =
        'UPDATE Admins SET firstname = $1 ,lastname=$2 ,email=$3,password_digest=$4 WHERE id = $5 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [firstname, lastname, email, password_digest, id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not update admin ${error}`)
    }
  }
  async athuntication(email: string, password: string): Promise<USER | null> {
    try {
      const sql = 'SELECT * FROM Admins WHERE email = $1'
      const conn = await client.connect()
      const res = await conn.query(sql, [email])
      const pepper: string = process.env.BCRYPT_PASSWWORD as string
      conn.release()

      if (res.rows.length) {
        const user = res.rows[0] as USER

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user
        }
      }
      return null
    } catch (error) {
      throw new Error(`can not athunticate user ${error}`)
    }
  }
}
