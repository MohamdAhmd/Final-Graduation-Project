import { PRODCUT, tools } from '../../models/tools'
import { Request, Response } from 'express'
const info = new tools()
export const Trend = async (req: Request, res: Response) => {
  try {
    const product: PRODCUT = {
      price: req.body.price,
      review_score: req.body.review_score,
      product_category_name: req.body.product_category_name
    }

    const Trend = await info.Trend(product)

    return res.json({
      status: 'success',
      message: 'Trending successed',
      data: { ...Trend }
    })
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}
