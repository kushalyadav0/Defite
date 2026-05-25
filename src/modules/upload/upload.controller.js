import { sendResponse } from '../../utils/response.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

export const uploadImage = asyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new Error('No file uploaded')
    }

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