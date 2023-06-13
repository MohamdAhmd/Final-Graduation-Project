import { USER } from '../user_mangment/user'

export type audit = {
  status: number
  auditAction: string
  data: USER[] | USER
  error: Error
  auditBy: string
  auditOn: string
}
export class Audit {
  auditAction
  data
  status
  error
  auditBy
  auditOn
  constructor(
    auditAction: string,
    data: USER[],
    status: number,
    error: Error,
    auditBy: string,
    auditOn: string
  ) {
    this.auditAction = auditAction
    this.data = data
    this.status = status
    this.error = error
    this.auditBy = auditBy
    this.auditOn = auditOn
  }
}
