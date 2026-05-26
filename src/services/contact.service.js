import { api } from '../api/axios';

export const getContacts = async () => {
  const response = await api.get('/contact');

  return response.data.data;
};