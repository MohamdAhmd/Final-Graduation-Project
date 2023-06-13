import client from '../database'
import { queriesBlackBox } from './queriesTool/blackBox'
import { querysFuzzyTrend } from './queriesTool/fuzzyTrend'

export type PRODCUT = {
  product_id?: string
  order_approved_at_start?: string
  order_approved_at_End?: string
  price?: string
  min_price?: string
  max_price?: string
  review_score?: string
  product_category_name?: string
}
export class tools {
  async BlackBox(product: PRODCUT): Promise<PRODCUT> {
    try {
      const min_price = product.min_price
      const max_price = product.max_price
      const review_score = product.review_score
      const product_category_name = product.product_category_name

      const connect = await client.connect()
      const sql = queriesBlackBox.BLACK_BOX_QUERY
      const res = await connect.query(sql, [
        min_price,
        max_price,
        review_score,
        product_category_name
      ])
      connect.release()
      console.log(product);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(res.rows)

      return res.rows[0]
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }
  async FuzzyTrend1(product: PRODCUT): Promise<PRODCUT[]> {
    try {
      const { order_approved_at_start, order_approved_at_End } = product
      console.log('order_approved_at=' + order_approved_at_start)
      console.log('order_approved_at=' + order_approved_at_End)

      const connect = await client.connect()
      const sql = querysFuzzyTrend.FUZZY_TREND1_QUERY
      const res = await connect.query(sql, [order_approved_at_start, order_approved_at_End])
      //console.log(res);

      connect.release()
      return res.rows
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }

  async FuzzyTrend2(product: PRODCUT): Promise<PRODCUT[]> {
    try {
      const { order_approved_at_start, order_approved_at_End } = product
      console.log('order_approved_at_start=' + order_approved_at_start)
      console.log('order_approved_at_End=' + order_approved_at_End)

      const connect = await client.connect()
      const sql = querysFuzzyTrend.FUZZY_TREND2_QUERY
      const res = await connect.query(sql, [order_approved_at_start, order_approved_at_End])
      //console.log(res);

      connect.release()
      return res.rows
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }

  async FuzzyTrend3(product: PRODCUT): Promise<PRODCUT> {
    try {
      const { order_approved_at_start, order_approved_at_End, product_category_name } = product
      console.log('order_approved_at_start=' + order_approved_at_start)
      console.log('order_approved_at_End=' + order_approved_at_End)

      const connect = await client.connect()
      const sql = querysFuzzyTrend.FUZZY_TREND3_QUERY
      const res = await connect.query(sql, [
        order_approved_at_start,
        order_approved_at_End,
        product_category_name
      ])
      //console.log(res);

      connect.release()
      return res.rows[0]
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }

  async Trend(product: PRODCUT): Promise<PRODCUT> {
    try {
      const { price, review_score, product_category_name } = product
      console.log('price=' + price)
      console.log('review_score=' + review_score)
      console.log('product_category_name=' + product_category_name)

      const connect = await client.connect()
      const sql = ``
      const res = await connect.query(sql, [price, review_score, product_category_name])
      //console.log(res);

      connect.release()
      return res.rows[0]
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }
  async Expect(product: PRODCUT): Promise<PRODCUT> {
    try {
      const { price, review_score, product_category_name } = product
      console.log('price=' + price)
      console.log('review_score=' + review_score)
      console.log('product_category_name=' + product_category_name)

      const connect = await client.connect()
      const sql = ``
      const res = await connect.query(sql, [price, review_score, product_category_name])
      //console.log(res);

      connect.release()
      return res.rows[0]
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }

  async GoldenPattern(product: PRODCUT): Promise<PRODCUT> {
    try {
      const { price, review_score, product_category_name } = product
      console.log('price=' + price)
      console.log('review_score=' + review_score)
      console.log('product_category_name=' + product_category_name)

      const connect = await client.connect()
      const sql = ``
      const res = await connect.query(sql, [price, review_score, product_category_name])
      //console.log(res);

      connect.release()
      return res.rows[0]
    } catch (error) {
      console.log('error=>>' + error)

      throw new Error(`can not predict prodcut${error}`)
    }
  }
}
