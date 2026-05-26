import { AuditLog } from './audit.model.js'

export const createAuditLog = async ({
  action,
  module,
  performedBy,
  metadata = {},
}) => {
  return AuditLog.create({
    action,
    module,
    performedBy,
    metadata,
  })
}