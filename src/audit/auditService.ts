import events from 'events'
import { Audit, audit } from '../models/audit/audit'
import client from '../database'
import { USER } from '../models/user_mangment/user'

import { queryList } from '../models/audit/queryAudit'

var emitter = new events.EventEmitter()

const auditEvent = 'audit'
emitter.on(auditEvent, async function (audit: audit) {
  // steps of actions - save into db
  console.log('Audit Event Emitter - Audit : ' + JSON.stringify(audit))
  try {
    let values = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.error,
      audit.auditBy,
      audit.auditOn
    ]
    let auditQuery = queryList.AUDIT_QUERY
    const connect = await client.connect()
    const res = await connect.query(auditQuery, [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.error,
      audit.auditBy,
      audit.auditOn
    ])
    console.log(res.rows[0])

    connect.release()
  } catch (error) {
    console.log('Audit Event Emitter - error : ' + error)
  }
})

export const prepareAudit = function (
  auditAction: string,
  data: USER[],
  error: Error,
  auditBy: string,
  auditOn: string
) {
  let status = 200
  if (!error == null) status = 500
  console.log('error=> ' + error)

  let auditObj = new Audit(auditAction, data, status, error, auditBy, auditOn)
  console.log('data=>' + data)

  emitter.emit(auditEvent, auditObj)
}
