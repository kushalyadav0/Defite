import {
  createCMSPage,
  getAllCMSPages,
  getCMSPageBySlug,
  updateCMSPage,
  deleteCMSPage,
} from './cms.service.js'

import {
  createCMSValidation,
  updateCMSValidation,
} from './cms.validation.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

import { sendResponse } from '../../utils/response.js'

import { createAuditLog } from '../audit/audit.service.js'

export const createPage = asyncHandler(
  async (req, res) => {
    const validatedData =
      createCMSValidation.parse(req.body)

    const page = await createCMSPage(
      validatedData
    )
    await createAuditLog({
      action: 'CREATE',
      module: 'CMS',
      performedBy: req.user._id,

      metadata: {
        slug: page.slug,
      },
    })

    return sendResponse({
      res,
      statusCode: 201,
      message: 'CMS page created',
      data: page,
    })
  }
)

export const getAllPages = asyncHandler(
  async (req, res) => {
    const pages = await getAllCMSPages()

    return sendResponse({
      res,
      message: 'CMS pages fetched',
      data: pages,
    })
  }
)

export const getPageBySlug = asyncHandler(
  async (req, res) => {
    const page = await getCMSPageBySlug(
      req.params.slug
    )

    return sendResponse({
      res,
      message: 'CMS page fetched',
      data: page,
    })
  }
)

export const updatePage = asyncHandler(
  async (req, res) => {
    const validatedData =
      updateCMSValidation.parse(req.body)

    const page = await updateCMSPage(
      req.params.slug,
      validatedData
    )
    await createAuditLog({
      action: 'UPDATE',
      module: 'CMS',
      performedBy: req.user._id,

      metadata: {
        slug: page.slug,
      },
    })

    return sendResponse({
      res,
      message: 'CMS page updated',
      data: page,
    })
  }
)

export const deletePage = asyncHandler(
  async (req, res) => {
    await deleteCMSPage(req.params.slug)
    await createAuditLog({
      action: 'DELETE',
      module: 'CMS',
      performedBy: req.user._id,

      metadata: {
        slug: req.params.slug,
      },
    })

    return sendResponse({
      res,
      message: 'CMS page deleted',
    })
  }
)