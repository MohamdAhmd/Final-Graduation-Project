import client from '../../database'

export type ROLE = {
  id?: number
  role_name: string
}
export class ROLEInfo {
  async index(): Promise<ROLE[]> {
    try {
      const connect = await client.connect()
      const sql = 'SELECT * FROM app_role'
      const res = await connect.query(sql)
      connect.release()
      return res.rows
    } catch (error) {
      throw new Error(`can not get roles ${error}`)
    }
  }
  // get user by id
  async show(role_id: number): Promise<ROLE> {
    try {
      const sql = 'SELECT * FROM app_role WHERE role_id = $1'
      const connect = await client.connect()
      const res = await connect.query(sql, [role_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not get this group${error}`)
    }
  }
  async create(role_name: string): Promise<ROLE> {
    // console.log(user);

    try {
      //console.log(user);

      //console.log(group_name);

      const connect = await client.connect()
      const sql = 'INSERT INTO app_role (role_name) VALUES($1) RETURNING *'
      const res = await connect.query(sql, [role_name])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not create role${error}`)
    }
  }
  async deleteRole(role_id: number): Promise<ROLE[]> {
    try {
      const sql = 'DELETE  FROM app_role WHERE role_id = $1 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [role_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not delet role ${error}`)
    }
  }

  async updateRole(role_id: number, role_name: String): Promise<ROLE[]> {
    try {
      const sql = 'UPDATE app_role SET role_name = $1 WHERE id = $2 RETURNING *'
      const connect = await client.connect()
      const res = await connect.query(sql, [role_name, role_id])
      connect.release()
      return res.rows[0]
    } catch (error) {
      throw new Error(`can not update role ${error}`)
    }
  }
}
