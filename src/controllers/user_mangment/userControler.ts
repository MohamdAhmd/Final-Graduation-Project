import { USER, userInfo } from '../../models/user_mangment/user'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { dateFormat } from '../../servieces/loger'
import { LoggerService } from '../../servieces/loger'
import { prepareAudit } from '../../audit/auditService'
import { actionList } from '../../audit/auditAction'
import { setGroupUser } from '../../servieces/updateDB'
import { validationResult } from 'express-validator'
export let tokenSecret: string
const logger = new LoggerService('user.controller')

const info = new userInfo()
export const index = async (req: Request, res: Response) => {
  try {
    const users = await info.index()

    if (!users) {
      logger.info('Error return users List', users)

      return res.status(404).json({
        status: 'error',
        message: 'not found any users ,yet,please create users first'
      })
    }
    logger.info('return users List', users)
    prepareAudit(actionList.GET_USER_LIST, users, new Error(), 'postman', dateFormat())
    return res.json({
      status: 'success',
      message: 'users show successed',
      data: { users }
    })
  } catch (error) {
    logger.info('Error return users List', error)

    res.status(500)
    res.json((error as Error).message)
  }
}

//show by id
export const show = async (req: Request, res: Response) => {
  try {
    const user = await info.show(req.body.id)

    if (!user) {
      logger.error('Error show user', `${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    logger.info('return user by id', user)
    return res.json({
      status: 'success',
      message: 'user show successed',
      data: { user }
    })
  } catch (error) {
    logger.info('Error return user By Id', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
//----------------------------------------------------------------
export const login = (req: Request, res: Response) => {
  res.status(200).render('login', {
    isUser: res.locals.user
  })
}
//----------------------------------------------------------------
export const signup = (req: Request, res: Response) => {
  res.status(200).render('signup', {
    isUser: res.locals.user
  })
}

//----------------------------------------------------------------
const maxAge = 1 * 24 * 24 * 60
const createToken = (id: number | undefined) => {
  // here i create a token which contains paylod, secret, and signture
  return jwt.sign({ id }, process.env.TOKEN_SECRET as Secret, {
    expiresIn: maxAge
    // this jwt will expire in one day
  })
}

export const create = async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password_digest: req.body.password_digest,
      user_type_name: 'User',
      created_on: new Date(),
      created_by: 'admin',
      updated_on: new Date()
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err = errors
      return res.status(200).json({ err: err })
    }
    const newUser = await info.create(user)
    //tokenSecret = jwt.sign(newUser, process.env.TOKEN_SECRET as Secret)
    //const token = createToken(newUser.id)
    // here i send cookie for frontend
    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    //logger.info("create user ",newUser)
    //console.log(`newUser.id= ${newUser.id}`)

    setGroupUser(newUser.id as number, 1)
    return res.json({ newUser: newUser.id })
  } catch (errors) {
    logger.error('Error create user', errors)
    res.status(500)
    res.json({ errors })
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await info.deleteUser(req.body.id)
    if (!deleted) {
      logger.error('Error delete user ', `${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    logger.info('delete user ', deleted)

    return res.json({
      status: 'success',
      message: 'user delete successed',
      data: { deleted }
    })
  } catch (error) {
    logger.info('Error delete user', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password_digest: req.body.password_digest,
      user_type_name: 'User',
      created_on: new Date(),
      created_by: 'admin',
      updated_on: new Date()
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }
    const updated = await info.updateUser(user)
    if (!updated) {
      logger.error('Error delete user ', `${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    logger.info('delete user ', updated)

    return res.json({
      status: 'success',
      message: 'user update successed',
      data: { updated }
    })
  } catch (error) {
    logger.info('Error delete user', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const cheak = async (req: Request, res: Response, next: NextFunction) => {
  //console.log(res.locals.user);
  try {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(200).json({ err: err })
    }
    const user = await info.athuntication(req.body.email, req.body.password_digest)
    //console.log(user);
    if (!user) {
      logger.error('Login Error', `${req.body.email},${req.body.password_digest}`)
      return res.status(404).json({ err: 'Invalid Data Passed!', errors: err })
    }
    const token = createToken(user.id)
    // here i send cookie for frontend
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    //tokenSecret = jwt.sign({ user }, process.env.TOKEN_SECRET as Secret)
    logger.info('signIN user ', user)
    //return res.redirect('/profile')
    return res.json({ user: user })
  } catch (errors) {
    logger.error('Error signIN user', errors)
    res.status(500)
    res.json({ errors })
  }
}

export const logout = (_req: Request, res: Response, _next: NextFunction) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
