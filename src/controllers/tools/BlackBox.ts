import { PRODCUT, tools } from '../../models/tools'
import { Request, Response } from 'express'
import { LoggerService } from '../../servieces/loger'
import { validationResult } from 'express-validator'
import { log } from 'console'
const logger = new LoggerService('user.controller')
const info = new tools()
export const getBlackBox = (req: Request, res: Response) => {
  res.render('blackbox', {
    isUser: res.locals.user
  })
  //res.send("jcdiuhdufhvu");
  //console.log("hfvkvjcmfjcj");
  
}
export const BlackBox = async (req: Request, res: Response) => {
  try {
    const product: PRODCUT = {
      min_price: req.body.min_price,
      max_price: req.body.max_price,
      review_score: req.body.review_score,
      product_category_name: req.body.product_category_name
    }
    console.log('userID from BlackBoxTool=>>>>>>>>' + res.locals.user.id)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }
//    console.log(product)

    const BlackBox = await info.BlackBox(product)
    if (!BlackBox) {
      logger.error("can't apply BlackBox Tool for this product", `${product}`)
      return res.status(404).json({
        status: 'error',
        message: 'can not apply BlackBox Tool for this product'
      })
    }
    logger.info('Apply Black Box Tool', BlackBox)
    return res.json({
      status: 'success',
      message: 'prediction successed',
      data: { ...BlackBox }
    })
  } catch (err) {
    logger.info('Error Applying BlackBox TOol', err)

    res.status(500)
    res.json(err)
  }
}
