import { ROLE, ROLEInfo } from '../../models/user_mangment/role'
import { Request, Response } from 'express'
import { dateFormat } from '../../servieces/loger'
import { LoggerService } from '../../servieces/loger'
import { prepareAudit } from '../../audit/auditService'
import { actionList } from '../../audit/auditAction'

//const logger = new LoggerService('user.controller');

const info = new ROLEInfo()
export const index = async (req: Request, res: Response) => {
  try {
    const roles = await info.index()

    if (!roles) {
      //logger.info("Error return groups List",groups)

      return res.status(404).json({
        status: 'error',
        message: 'not found any roles ,yet,please create users first'
      })
    }
    //logger.info("return users List",users)
    //prepareAudit(actionList.GET_USER_LIST,users,new Error,"postman",dateFormat())
    return res.json({
      status: 'success',
      message: 'users show successed',
      data: { roles }
    })
  } catch (error) {
    //logger.info("Error return roles List",error)

    res.status(500)
    res.json((error as Error).message)
  }
}

//show by id
export const show = async (req: Request, res: Response) => {
  try {
    const role = await info.show(req.body.id)

    if (!role) {
      //logger.error("Error show user",`${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    //logger.info("return user by id",group)
    return res.json({
      status: 'success',
      message: 'group show successed',
      data: { role }
    })
  } catch (error) {
    //logger.info("Error return group By Id",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const create = async (req: Request, res: Response) => {
  try {
    const newrole = await info.create(req.body.role_name)

    // logger.info("create group ",newGroup)

    return res.json({
      status: 'success',
      message: 'role created success',
      data: { ...newrole }
    })
    //res.json(newUser)
  } catch (error) {
    // logger.info("Error create newGroup",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await info.deleteRole(req.body.id)
    if (!deleted) {
      //logger.error("Error Group user ",`${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    // logger.info("delete group ",deleted)

    return res.json({
      status: 'success',
      message: 'role delete successed',
      data: { deleted }
    })
  } catch (error) {
    //logger.info("Error delete group",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const updateRole = async (req: Request, res: Response) => {
  try {
    const updated = await info.updateRole(req.body.id, req.body.role_name)
    if (!updated) {
      //logger.error("Error Group user ",`${req.body.id}`)

      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    // logger.info("delete group ",deleted)

    return res.json({
      status: 'success',
      message: 'role delete successed',
      data: { updated }
    })
  } catch (error) {
    //logger.info("Error delete group",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
