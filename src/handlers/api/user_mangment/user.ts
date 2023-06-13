import { Request, Response, Router } from 'express'
import * as controllers from '../../../controllers/user_mangment/userControler'
import { verifyAdmin } from '../../../midellware/authintication'
import { check } from 'express-validator'

const routes = Router()
// admin routes
routes.get('/showall', verifyAdmin, controllers.index)
routes.get('/showById', verifyAdmin, controllers.show)
routes.delete('/delete', verifyAdmin, controllers.deleteUser)
//user routes
routes.get('/login', controllers.login)
routes.get('/signup', controllers.signup)
routes.post(
  '/signup',
  check('firstname')
    .not()
    .isEmpty()
    .withMessage('Please Enter First Name')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('First Name Cannot Contains Special Characters'),
  check('lastname')
    .notEmpty()
    .withMessage('Please Enter Last Name')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Last Name Cannot Contains Special Characters'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Format'),
  check('password_digest')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  /* .isStrongPassword()
    .withMessage('Enter Strong Password'),*/ controllers.create
)
routes.post(
  '/login',
  check('email')
    .not()
    .isEmpty()
    .withMessage('Please Enter Email')
    .isEmail()
    .withMessage('Invalid Format'),
  check('password_digest')
    .not()
    .isEmpty()
    .withMessage('Please Enter Password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  controllers.cheak
)

routes.post(
  '/update',
  [
    check('firstname')
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z0-9 ]+$/),
    check('lastname')
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z0-9 ]+$/),
    check('email').escape().notEmpty().isEmail(),
    check('password_digest').notEmpty().isStrongPassword()
  ],
  controllers.updateUser
)
routes.all('/logout', controllers.logout)
export default routes
