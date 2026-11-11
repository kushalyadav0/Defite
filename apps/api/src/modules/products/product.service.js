import { Product } from './product.model.js'

const PUBLIC_FIELDS = '-superadminUrl -__v'

export const getPublicProducts = () =>
  Product.find({ isPublished: true })
    .select(PUBLIC_FIELDS)
    .sort({ order: 1, createdAt: 1 })

export const getAllProductsForAdmin = () =>
  Product.find().sort({ order: 1, createdAt: 1 })

export const createProduct = (payload) => Product.create(payload)

export const updateProduct = (id, payload) =>
  Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

export const deleteProduct = (id) => Product.findByIdAndDelete(id)
