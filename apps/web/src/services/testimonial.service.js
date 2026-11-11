import { api } from '../api/axios';

export const getTestimonials =
  async () => {
    const response = await api.get(
      '/testimonials'
    );

    console.log(
      'API RESPONSE:',
      response.data
    );

    return response.data.data;
  };