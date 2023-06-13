import { Router } from 'express'
//tools
import { BlackBox, getBlackBox } from '../../controllers/tools/BlackBox'
import { getExpect, Expect } from '../../controllers/tools/Expect'
import {
  FuzzyTrend1,
  FuzzyTrend2,
  FuzzyTrend3,
  getFuzzyTrend
} from '../../controllers/tools/FuzzyTrend'
import { GoldenPattern } from '../../controllers/tools/GoldenPattern'
import { Trend } from '../../controllers/tools/Trend'
//middelware
import { getSalesRate, postSalesRate } from '../../controllers/tools/salesRate'
import { check } from 'express-validator'
import { verifyUser } from '../../midellware/authintication'
import { verifyRole } from '../../midellware/authintication'
//roles
export const user = 'user'
export const premium = 'premium'
export const super_user = 'super_user'

const routes = Router()
routes.get('/blackbox', verifyUser, verifyRole(user), getBlackBox)

routes.post(
  '/BlackBox',
  verifyUser,
  verifyRole(user),
  [
    check('min_price').escape().notEmpty().isNumeric(),
    check('max_price').escape().notEmpty().isNumeric(),
    check('review_score').notEmpty().isNumeric(),
    check('product_category_name')
      .notEmpty()
      .isString()
      .matches(/^[A-Za-z0-9 ]+$/)
  ],
  BlackBox
)
routes.get('/Expect', verifyUser, verifyRole(premium), getExpect)
routes.post('/expect', verifyUser, verifyRole(premium), Expect)

routes.get('/FuzzyTrend', verifyUser, verifyRole(super_user), getFuzzyTrend)
routes.post(
  '/FuzzyTrend1',
  verifyUser,
  verifyRole(super_user),
  [
    check('order_approved_at_start').notEmpty().isDate(),
    check('order_approved_at_End').notEmpty().isDate()
  ],
  FuzzyTrend1
)
routes.post(
  '/FuzzyTrend2',
  verifyUser,
  verifyRole(super_user),
  [
    check('order_approved_at_star').notEmpty().isDate(),
    check('order_approved_at_End').notEmpty().isDate()
  ],
  FuzzyTrend2
)
routes.post(
  '/FuzzyTrend3',
  verifyUser,
  verifyRole(super_user),
  [
    check('order_approved_at_star').notEmpty().isDate(),
    check('order_approved_at_End').notEmpty().isDate(),
    check('product_category_name')
      .notEmpty()
      .isString()
      .matches(/^[A-Za-z0-9 ]+$/)
  ],
  FuzzyTrend3
)

routes.post('/GoldenPattern',  verifyUser, verifyRole(super_user), GoldenPattern)
routes.post('/Trend',  verifyUser, verifyRole(premium), Trend)

routes.get('/salesrate', verifyUser, verifyRole(premium), getSalesRate)
routes.post('/salesrate',/*verifyUser, verifyRole(premium),*/ postSalesRate)

routes.use('/', (req, res) => {
  res.send(
    '<a href="/BlackBox">BlackBox link</a><br><a href="/Expect">expect link</a><br><a href="/FuzzyTrend1">fuzzyTrend1 link</a><br><a href="/FuzzyTrend2">fuzzyTrend2 link</a><br><a href="/FuzzyTrend3">fuzzyTrend3 link</a><br><a href="/GoldenPattern">goldenPattren link</a><br><a href="/Trend">trend link</a>'
  )
})

export default routes
