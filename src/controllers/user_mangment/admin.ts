import { USER, userInfo } from '../../models/user_mangment/admin'
import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { ROLE } from '../../confg/role_list'
import { LoggerService } from '../../servieces/loger'
const logger = new LoggerService('Admin.controller')

const info = new userInfo()
export const index = async (req: Request, res: Response) => {
  try {
    const users = await info.index()

    if (!users) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any users ,yet,please create users first'
      })
    }
    logger.info('return Admins List', users)
    return res.json({
      status: 'success',
      message: 'users show successed',
      data: { users }
    })
  } catch (error) {
    logger.info('Error return Admins List', error)

    res.status(500)
    res.json((error as Error).message)
  }
}

//show by id
export const show = async (req: Request, res: Response) => {
  try {
    const user = await info.show(req.body.id)

    if (!user) {
      logger.error('Error show Admin', `${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    logger.info('return Admin by id', user)

    return res.json({
      status: 'success',
      message: 'user show successed',
      data: { user }
    })
  } catch (error) {
    logger.info('Error return Admin by id', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const create = async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password_digest: req.body.password_digest,
      roles: ROLE.ADMIN
    }
    //console.log(user);

    const newUser = await info.create(user)
    //console.log(newUser);

    const tokenSecret = jwt.sign(newUser, process.env.TOKEN_SECRET_admin as Secret)
    logger.info('create Admin', user)

    return res.json({
      status: 'success',
      message: 'Admin created success',
      data: { ...newUser, tokenSecret }
    })
    //res.json(newUser)
  } catch (error) {
    logger.info('Error create Admin', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await info.deleteUser(req.body.id)
    if (!deleted) {
      logger.error('Error delete Admin', `${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    logger.info('delete Admin by id', deleted)

    return res.json({
      status: 'success',
      message: 'user delete successed',
      data: { deleted }
    })
  } catch (error) {
    logger.info('Error deleted Admin', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const cheak = async (req: Request, res: Response) => {
  try {
    const user = await info.athuntication(req.body.email, req.body.password_digest)
    // console.log(user);

    if (!user) {
      logger.error('Error SignIN Admin', `${req.body.email},${req.body.password_digest}`)

      return res.status(404).json({
        status: 'error',
        message: 'password is unvalid'
      })
    }
    const tokenSecret = jwt.sign({ user }, process.env.TOKEN_SECRET_admin as Secret)
    logger.info('signIN Admin by id', user)

    return res.json({
      status: 'success',
      message: 'user authenticated success',
      data: { ...user, tokenSecret }
    })
  } catch (error) {
    logger.info('signIN deleted Admin', error)

    res.status(500)
    res.json((error as Error).message)
  }
}
