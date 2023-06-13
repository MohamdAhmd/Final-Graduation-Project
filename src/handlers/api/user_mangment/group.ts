import { Router } from 'express'
import * as controllers from '../../../controllers/user_mangment/group'
import { check } from 'express-validator'
const routes = Router()
// admin routes
routes.get('/showall', controllers.index)
routes.get('/showById', check('id').isNumeric(), controllers.show)
routes.delete('/delete', check('id').isNumeric(), controllers.deleteGroup)
//user routes
routes.post(
  '/create',
  check('group_name')
    .notEmpty()
    .isString()
    .matches(/^[A-Za-z0-9 ]+$/),
  controllers.create
)
routes.post(
  '/updateGroup',
  [
    check('group_name')
      .notEmpty()
      .isString()
      .matches(/^[A-Za-z0-9 ]+$/),
    check('id').isNumeric()
  ],
  controllers.updateGroup
)
routes.get('/showBygroupName', controllers.showByGroupName)

export default routes
