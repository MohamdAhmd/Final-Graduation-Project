import client from '../../database'

export type GROUP = {
  id?: number
  group_name: string
}
export class GROUPInfo {
  async index(): Promise<GROUP[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM app_group'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get groups ${error}`)
    }
  }
  // get user by id
  async show(group_id: number): Promise<GROUP> {
    try {
      const sql = 'SELECT * FROM app_group WHERE group_id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [group_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get this group${error}`)
    }
  }
  async showByName(group_name: string): Promise<GROUP> {
    try {
      const sql = 'SELECT group_id FROM app_group WHERE group_name = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [group_name])
      connect.release()
      return res.rows[0].group_id
    } catch (error) {
      throw new Error(`can not get this group${error}`)
    }
  }
  async create(group_name: string): Promise<GROUP> {
    // console.log(user);

    try {
      //console.log(user);

      //console.log(group_name);

      const connect = await client.connect()
      const sql = 'INSERT INTO app_group (group_name) VALUES($1) RETURNING *'
      const res = await connect.query(sql, [group_name])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create group${error}`)
    }
  }
  async deleteGroup(group_id: number): Promise<GROUP[]> {
    try {
      const sql = 'DELETE  FROM app_group WHERE group_id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [group_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delet group ${error}`)
    }
  }
  async updateGroup(group_id: number, group_name: String): Promise<GROUP[]> {
    try {
      const sql = 'UPDATE app_group SET group_name = $1 WHERE group_id = $2 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [group_id, group_name])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not update group ${error}`)
    }
  }
}
