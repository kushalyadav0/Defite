import { api } from '../api/axios';

export const getTestimonials =
  async () => {
    const response = await api.get(
      '/testimonials'
    );

    return response.data.data;
  };

export const createTestimonial =
  async (payload) => {
    const response = await api.post(
      '/testimonials',
      payload
    );

    return response.data.data;
  };

export const deleteTestimonial =
  async (id) => {
    const response = await api.delete(
      `/testimonials/${id}`
    );

    return response.data;
  };