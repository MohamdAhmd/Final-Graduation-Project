/*import superTest from 'supertest'
import client from '../../database'
import { PRODCUT, prodcutInfo } from '../../models/product'
import app from '../../index'
import { toket } from './01-UeserController.spec'
const info = new prodcutInfo()
const Request = superTest(app)
describe('Product Endpoint', () => {
  const product: PRODCUT = {
    name: 'shampo',
    price: '75',
    category: 'cleaning'
  }
  beforeAll(async () => {
    const connect = await client.connect()
    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
    await connect.query(sql)
    connect.release()
    const createProduct = await info.create(product)
    createProduct.id = product.id
  })
  afterAll(async () => {
    const connect = await client.connect()
    const sql = 'DELETE FROM products'
    await connect.query(sql)
    connect.release()
  })
  describe('CRUD methods', () => {
    it('should create product', async () => {
      const product2: PRODCUT = {
        name: 'banana',
        price: '10',
        category: 'fruites'
      }
      const res = await Request.post('/api/products/create')
        .set('Authorization', `Bearer ${toket}`)
        .send(product2)
      expect(res.status).toEqual(200)
      const data = res.body.data as PRODCUT
      const { name, price, category } = data
      expect(name).toEqual('banana')
      expect(price).toEqual('10')
      expect(category).toEqual('fruites')
    })
    it('should show all products', async () => {
      const res = await Request.get('/api/products/showall')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${toket}`)
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('products show successed')
      expect(Object.keys(res.body.data).length).toEqual(2)
    })

    it('should show product by id', async () => {
      const res = await Request.get('/api/products/showById')
        .set('Authorization', `Bearer ${toket}`)
        .send({ id: '1' })
      //console.log(data);
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('product show successed')
    })
    it('should show product by Category', async () => {
      const res = await Request.put('/api/products/productsOfCategory')
        .set('Authorization', `Bearer ${toket}`)
        .send({ category: 'cleaning' })
      //console.log(data);
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('products show successed')
    })
    it('should delete user by id', async () => {
      const res = await Request.delete('/api/products/delete')
        .set('Authorization', `Bearer ${toket}`)
        .send({ id: '1' })
      //console.log(data);
      expect(res.status).toEqual(200)
      expect(res.body.message).toEqual('product delete successed')
    })
  })
})*/
