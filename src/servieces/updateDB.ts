import client from '../database'
import { NextFunction, Request, Response } from 'express'
import { tokenSecret } from '../controllers/user_mangment/userControler'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { user, premium, super_user } from '../handlers/api/tools'
export const setGroupUser = async (id: number, group_id: number) => {
  console.log(`user_id: ${id},group_id: ${group_id}`)

  const connect = await client.connect()
  const sql = `INSERT INTO USER_GROUP (user_id, group_id) VALUES ($1, $2) RETURNING *`
  const res = await connect.query(sql, [id, group_id])
  connect.release()
  //const group_name=result
  console.log(res.rows)
}
