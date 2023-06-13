import { Request, Response } from 'express'
import fetch from 'node-fetch'
export const getSalesRate = (req: Request, res: Response) => {
  res.render('SalesRate', {
    isUser: res.locals.user
  })
}

export const postSalesRate = async (req: Request, res: Response) => {
  try {
    const url = 'http://localhost:5000/salesRate'
    const data = req.body
    const customHeaders = { 'Content-Type': 'application/json' }
    await fetch(url, {
      method: 'POST',
      headers: customHeaders,
      body: JSON.stringify({
        order_item_id: Number(data.order_item_id),
        quarters: Number(data.quarters),
        week: Number(data.week),
        price: Number(data.price),
        payment_value: Number(data.payment_value),
        review_score: Number(data.review_score)
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        res.json(data)
      })
  } catch (error) {
    console.log(error)
  }
}
