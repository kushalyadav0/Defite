import { Testimonial } from './testimonial.model.js'

export const createTestimonial = async (
  payload
) => {
  return Testimonial.create(payload)
}

export const getAllTestimonials =
  async () => {
    return Testimonial.find().sort({
      createdAt: -1,
    })
  }

export const updateTestimonial = async (
  id,
  payload
) => {
  return Testimonial.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  )
}

export const deleteTestimonial = async (
  id
) => {
  return Testimonial.findByIdAndDelete(id)
}