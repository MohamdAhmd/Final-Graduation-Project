import { USER_groupInfo } from '../../models/user_mangment/user_group'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const info = new USER_groupInfo()
export const index = async (req: Request, res: Response) => {
  try {
    const groups = await info.index()

    if (!groups) {
      return res.status(404).json({
        status: 'error',
        message: 'not found any groups ,yet,please create users first'
      })
    }

    return res.json({
      status: 'success',
      message: 'users show successed',
      data: { groups }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}

//show by id
export const show = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }
    const group = await info.show(req.body.user_id)

    if (!group) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }
    return res.json({
      status: 'success',
      message: 'group show successed',
      data: { group }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }

    const newGroup = await info.create(req.body.user_id, req.body.group_id)

    return res.json({
      status: 'success',
      message: 'group created success',
      data: { ...newGroup }
    })
  } catch (error) {
    res.status(500)
    res.json((error as Error).message)
  }
}
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }
    const deleted = await info.deleteGroup(req.body.user_id)
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }

    return res.json({
      status: 'success',
      message: 'user delete successed',
      data: { deleted }
    })
  } catch (error) {
    //logger.info("Error delete group",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(200).json({ err: 'Invalid Data Passed!', errors: errors })
    }

    const updated = await info.updateGroup(req.body.id, req.body.group_name)
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'can not find this id'
      })
    }

    return res.json({
      status: 'success',
      message: 'user update successed',
      data: { updated }
    })
  } catch (error) {
    //logger.info("Error delete group",error)

    res.status(500)
    res.json((error as Error).message)
  }
}
