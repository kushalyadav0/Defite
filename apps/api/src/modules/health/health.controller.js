import { getHealthStatus } from './health.service.js'
import { sendResponse } from '../../utils/response.js'

export const healthCheck = (req, res) => {
  const data = getHealthStatus()
  return sendResponse({
    res,
    message: 'Server is healthy',
    data,
  })
}