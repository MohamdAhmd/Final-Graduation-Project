/*import { ORDER, orderInfo } from '../../models/order'
import { PRODCUT, prodcutInfo } from '../../models/product'
import { USER, userInfo } from '../../models/user'
import superTest from 'supertest'
import { toket } from './01-UeserController.spec'
import app from '../../index'
import client from '../../database'
const Request = superTest(app)
const info = new orderInfo()
const infoP = new prodcutInfo()
const infoU = new userInfo()
describe('Endpoint Order', () => {
  const user: USER = {
    firstname: 'maged3',
    password_digest: '12345',
    lastname: 'ahamed'
  }

  const product: PRODCUT = {
    name: 'shampo3',
    price: '50',
    category: 'cleaning'
  }
  beforeAll(async () => {
    const connect = await client.connect()
    const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
    await connect.query(sql)
    connect.release()
    const createdUser = await infoU.create(user)
    user.id = createdUser.id
    const createdProduct = await infoP.create(product)
    product.id = createdProduct.id
  })
  afterAll(async () => {
    infoU.deleteUser(user.id as number)
    infoP.deleteProduct(product.id as number)
    info.deleteOrder(order.id as number)
  })
  const order = {
    id: 1,
    user_id: 3,
    status_order: 'active',
    product_id: 3,
    order_id: 1,
    quantity: 5
  }
  describe('CRUD methods', () => {
    it('should create order', async () => {
      const res = await Request.post('/api/orders/create')
        .set('Authorization', `Bearer ${toket}`)
        .send(order)
      const data = res.body.data as ORDER
      const { user_id, status_order } = data
      expect(res.status).toEqual(200)

      expect(user_id).toEqual(3)

      expect(status_order).toEqual('active')
    })
    it('should add product', async () => {
      const res = await Request.post('/api/orders/addProduct')
        .set('Authorization', `Bearer ${toket}`)
        .send(order)
      const data = res.body.data as ORDER
      const { quantity, product_id, order_id } = data
      expect(res.status).toEqual(200)

      expect(product_id).toEqual(3)

      expect(quantity).toEqual(5)

      expect(order_id).toEqual(1)
    })

    it('should show all products', async () => {
      const res = await Request.get('/api/orders/showall')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ user_id: '3' })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('orders show successed')
      expect(Object.keys(res.body.data).length).toEqual(1)
    })
    it('should show Crrunt Orde order by user_id', async () => {
      const res = await Request.get('/api/orders/showCrruntOrder')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ user_id: '3' })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('order crrunet show successed')
    })
    it('should show active Orde order by user_id', async () => {
      const res = await Request.get('/api/orders/activeOrder')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ user_id: '3' })
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('order active show successed')
      expect(Object.keys(res.body.data).length).toEqual(1)
    })

    it('should show complete  order by user_id', async () => {
      const res = await Request.get('/api/orders/completOrder')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ user_id: '3' })
      expect(res.status).toEqual(404)
      expect(res.body.status).toEqual('error')
      expect(res.body.message).toEqual(
        'not found any completed order ,yet,please create order first'
      )
    })
    it('should show update  order by user_id', async () => {
      const res = await Request.patch('/api/orders/updateStatus')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ status: 'complete', id: '1' })
      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('success')
      expect(res.body.message).toEqual('order updated successed')
    })
    it('should show delete  order by user_id', async () => {
      const res = await Request.delete('/api/orders/deletOrder')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
        .send({ orderId: '1' })
      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('success')
      expect(res.body.message).toEqual('orders deleted successed')
    })
  })
})*/
