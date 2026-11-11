import { api } from '../api/axios';

export const sendContactMessage = async (
  payload
) => {
  const response = await api.post(
    '/contact',
    payload
  );

  return response.data;
};