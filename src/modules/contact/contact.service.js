import { Contact } from './contact.model.js'

export const createContactMessage = async (
  payload
) => {
  return Contact.create(payload)
}

export const getAllContactMessages =
  async () => {
    return Contact.find().sort({
      createdAt: -1,
    })
  }