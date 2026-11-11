import { CMS } from './cms.model.js'

import { ApiError } from '../../utils/ApiError.js'

export const createCMSPage = async (payload) => {
  const existingPage = await CMS.findOne({
    slug: payload.slug,
  })

  if (existingPage) {
    throw new ApiError(400, 'Page already exists')
  }

  return CMS.create(payload)
}

export const getAllCMSPages = async () => {
  return CMS.find().sort({ createdAt: -1 })
}

export const getCMSPageBySlug = async (slug) => {
  const page = await CMS.findOne({
    slug,
    isPublished: true,
  })

  if (!page) {
    throw new ApiError(404, 'Page not found')
  }

  return page
}

export const updateCMSPage = async (
  slug,
  payload
) => {
  const page = await CMS.findOneAndUpdate(
    { slug },
    payload,
    {
      new: true,
    }
  )

  if (!page) {
    throw new ApiError(404, 'Page not found')
  }

  return page
}

export const deleteCMSPage = async (slug) => {
  const page = await CMS.findOneAndDelete({
    slug,
  })

  if (!page) {
    throw new ApiError(404, 'Page not found')
  }

  return page
}