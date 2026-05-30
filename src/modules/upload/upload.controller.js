import { sendResponse } from '../../utils/response.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createAuditLog } from '../audit/audit.service.js'

export const uploadImage = asyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new Error('No file uploaded')
    }
    await createAuditLog({
      action: 'UPLOAD',
      module: 'MEDIA',
      performedBy: req.user._id,
      metadata: {
        fileName: req.file.filename,
      },
    })

    return sendResponse({
      res,
      message: 'Image uploaded successfully',
      data: {
        fileName: req.file.filename,
        url: `/uploads/${req.file.filename}`,
      },
    })
  }
)