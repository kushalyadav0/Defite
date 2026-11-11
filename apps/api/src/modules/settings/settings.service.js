import { Settings } from './settings.model.js'

export const getSettings = async () => {
  let settings = await Settings.findOne()

  if (!settings) {
    settings = await Settings.create({})
  }

  return settings
}

export const updateSettings = async (
  payload
) => {
  let settings = await Settings.findOne()

  if (!settings) {
    settings = await Settings.create(payload)
  } else {
    settings = await Settings.findByIdAndUpdate(
      settings._id,
      payload,
      {
        new: true,
      }
    )
  }

  return settings
}