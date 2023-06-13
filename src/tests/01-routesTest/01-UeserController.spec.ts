/*import superTest from 'supertest'
import client from '../../database'
import { USER, userInfo } from '../../models/user'
import app from '../../index'
const info = new userInfo()
const Request = superTest(app)
export let toket = ''
describe('User Endpoint', () => {
  const user: USER = {
    firstname: 'alaa',
    password_digest: '12345',
    lastname: 'ibrahm'
  }
  beforeAll(async () => {
    const connect = await client.connect()
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    await connect.query(sql)
    connect.release()
    const createUser = await info.create(user)
    //console.log(createUser);
    createUser.id = user.id
  })
  afterAll(async () => {
    const connect = await client.connect()
    const sql = 'DELETE FROM users'
    await connect.query(sql)
    connect.release()
  })
  describe('test auth method', () => {
    it('should return token', async () => {
      const res = await Request.post('/api/users/login').send({
        firstname: 'alaa',
        password_digest: '12345'
      })
      expect(res.status).toBe(200)
      const data = res.body.data
      const { firstname, lastname, tokenSecret } = data
      expect(firstname).toEqual(user.firstname)
      expect(lastname).toEqual(user.lastname)
      toket = tokenSecret
    })

    it('should be faild to authinticate user', async () => {
      const res = await Request.get('/api/users/login').send({
        firstname: 'alaa',
        password_digest: 'wrongPassword'
      })
      expect(res.status).toBe(404)
    })
  })
  describe('CRUD methods', () => {
    it('should create user', async () => {
      const user: USER = {
        firstname: 'user2',
        password_digest: '12345',
        lastname: 'user2LastName'
      }
      const res = await Request.post('/api/users/create').send(user)
      expect(res.status).toEqual(200)
      const data = res.body.data
      const { firstname, lastname, tokenSecret } = data
      expect(firstname).toEqual('user2')
      expect(lastname).toEqual('user2LastName')
      toket = tokenSecret
    })
    it('should show all user', async () => {
      const res = await Request.get('/api/users/showall')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('users show successed')
    })

    it('should show user by id', async () => {
      const res = await Request.get('/api/users/showById')
        .set('Authorization', `Bearer ${toket}`)
        .send({ id: '1' })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('user show successed')
    })
    it('should delete user by id', async () => {
      const res = await Request.delete('/api/users/delete')
        .set('Authorization', `Bearer ${toket}`)
        .send({ id: '1' })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('user delete successed')
    })
  })
})*/
