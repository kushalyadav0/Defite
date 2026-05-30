import {
  createContactMessage,
  getAllContactMessages,
} from './contact.service.js'
import { createContactValidation } from './contact.validation.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { sendResponse } from '../../utils/response.js'

export const createContact =
  asyncHandler(async (req, res) => {
    const validatedData =
      createContactValidation.parse(req.body)

    const message =
      await createContactMessage(
        validatedData
      )

    return sendResponse({
      res,
      statusCode: 201,
      message: 'Message sent successfully',
      data: message,
    })
  })

export const getAllContacts =
  asyncHandler(async (req, res) => {
    const messages =
      await getAllContactMessages()

    return sendResponse({
      res,
      message: 'Contact messages fetched',
      data: messages,
    })
  })