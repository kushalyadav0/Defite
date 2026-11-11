import { api } from '../api/axios';

export const loginAdmin = async (
  payload
) => {
  const response = await api.post(
    '/auth/login',
    payload
  );

  return response.data.data;
};