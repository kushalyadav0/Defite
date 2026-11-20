import { sendResponse } from '../../utils/response.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createAuditLog } from '../audit/audit.service.js'
import { saveImage } from './upload.storage.js'

export const uploadImage = asyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new Error('No file uploaded')
    }
    const { fileName, url } = await saveImage(req.file)
    await createAuditLog({
      action: 'UPLOAD',
      module: 'MEDIA',
      performedBy: req.user._id,
      metadata: {
        fileName,
      },
    })

    return sendResponse({
      res,
      message: 'Image uploaded successfully',
      data: {
        fileName,
        url,
      },
    })
  }
)