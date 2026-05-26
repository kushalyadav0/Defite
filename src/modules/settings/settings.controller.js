import {
  getSettings,
  updateSettings,
} from './settings.service.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

import { sendResponse } from '../../utils/response.js'

import { updateSettingsValidation } from './settings.validation.js'

import { createAuditLog } from '../audit/audit.service.js'

export const getSettingsController =
  asyncHandler(async (req, res) => {
    const settings = await getSettings()

    return sendResponse({
      res,
      message: 'Settings fetched',
      data: settings,
    })
  })

export const updateSettingsController =
  asyncHandler(async (req, res) => {
    const validatedData =
      updateSettingsValidation.parse(req.body)

    const settings = await updateSettings(
      validatedData
    )

    await createAuditLog({
      action: 'UPDATE',
      module: 'SETTINGS',
      performedBy: req.user._id,
    })

    return sendResponse({
      res,
      message: 'Settings updated',
      data: settings,
    })
  }
)