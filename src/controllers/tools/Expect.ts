/* eslint-disable no-unused-labels */
import { Request, Response } from 'express'
import fetch from 'node-fetch'
export const getExpect = (req: Request, res: Response) => {
  res.render('ExpectationTool', {
    isUser: res.locals.user
  })
}

export const Expect = async (req: Request, res: Response) => {
  try {
    const url = 'http://localhost:5000/expect'
    const data = req.body
    console.log(data)
    const customHeaders = {
      'Content-Type': 'application/json'
    }
    await fetch(url, {
      method: 'POST',
      headers: customHeaders,
      body: JSON.stringify({
        product_id: Number(data.product_id),
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
