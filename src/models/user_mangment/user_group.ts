import client from '../../database'
import { GROUP } from './group'

export type USER_group = {
  user_group_id?: number
  user_id: number
  group_id: number
}
export class USER_groupInfo {
  async index(): Promise<USER_group[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM USER_GROUP'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get USER_GROUPS ${error}`)
    }
  }
  // get user by id
  async show(user_id: number): Promise<USER_group> {
    try {
      const sql = 'SELECT * FROM USER_GROUP WHERE user_id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [user_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get this USER_GROUP${error}`)
    }
  }
  async create(user_id: number, group_id: number): Promise<USER_group> {
    // console.log(user);

    try {
      //console.log(user);

      //console.log(group_name);

      const connect = await client.connect()
      const sql = 'INSERT INTO USER_GROUP (user_id,group_id) VALUES($1,$2) RETURNING *'
      const res = await connect.query(sql, [user_id, group_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create USER_GROUP${error}`)
    }
  }
  async deleteGroup(user_id: number): Promise<USER_group[]> {
    try {
      const sql = 'DELETE  FROM USER_GROUP WHERE user_id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [user_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delet group ${error}`)
    }
  }
  async updateGroup(user_id: number, group_id: GROUP): Promise<USER_group> {
    try {
      console.log('group_id' + group_id)

      const sql = 'UPDATE USER_GROUP SET group_id = $1 WHERE user_id = $2 '
      const connect = await client.connect()
      const res = await connect.query(sql, [group_id, user_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not update group ${error}`)
    }
  }
}
