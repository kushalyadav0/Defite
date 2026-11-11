import {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from './testimonial.service.js'

import {
  createTestimonialValidation,
  updateTestimonialValidation,
} from './testimonial.validation.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

import { sendResponse } from '../../utils/response.js'

export const createTestimonialController =
  asyncHandler(async (req, res) => {
    const validatedData =
      createTestimonialValidation.parse(
        req.body
      )

    const testimonial =
      await createTestimonial(validatedData)

    return sendResponse({
      res,
      statusCode: 201,
      message:
        'Testimonial created successfully',
      data: testimonial,
    })
  })

export const getTestimonialsController =
  asyncHandler(async (req, res) => {
    const testimonials =
      await getAllTestimonials()

    return sendResponse({
      res,
      message:
        'Testimonials fetched successfully',
      data: testimonials,
    })
  })

export const updateTestimonialController =
  asyncHandler(async (req, res) => {
    const validatedData =
      updateTestimonialValidation.parse(
        req.body
      )

    const testimonial =
      await updateTestimonial(
        req.params.id,
        validatedData
      )

    return sendResponse({
      res,
      message:
        'Testimonial updated successfully',
      data: testimonial,
    })
  })

export const deleteTestimonialController =
  asyncHandler(async (req, res) => {
    await deleteTestimonial(req.params.id)

    return sendResponse({
      res,
      message:
        'Testimonial deleted successfully',
    })
  })