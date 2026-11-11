import {
  getPublicProducts,
  getAllProductsForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.service.js'
import {
  createProductValidation,
  updateProductValidation,
} from './product.validation.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { sendResponse } from '../../utils/response.js'
import { ApiError } from '../../utils/ApiError.js'

export const getProductsController = asyncHandler(async (req, res) => {
  const products = await getPublicProducts()
  return sendResponse({ res, message: 'Products fetched successfully', data: products })
})

export const getAdminProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProductsForAdmin()
  return sendResponse({ res, message: 'Products fetched successfully', data: products })
})

export const createProductController = asyncHandler(async (req, res) => {
  const data = createProductValidation.parse(req.body)
  const product = await createProduct(data)
  return sendResponse({ res, statusCode: 201, message: 'Product created successfully', data: product })
})

export const updateProductController = asyncHandler(async (req, res) => {
  const data = updateProductValidation.parse(req.body)
  const product = await updateProduct(req.params.id, data)
  if (!product) throw new ApiError(404, 'Product not found')
  return sendResponse({ res, message: 'Product updated successfully', data: product })
})

export const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.id)
  return sendResponse({ res, message: 'Product deleted successfully' })
})
