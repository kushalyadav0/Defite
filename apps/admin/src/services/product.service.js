import { api } from '../api/axios';

export const getAdminProducts = async () => {
  const response = await api.get('/products/admin');
  return response.data.data;
};

export const createProduct = async (payload) => {
  const response = await api.post('/products', payload);
  return response.data.data;
};

export const updateProduct = async (id, payload) => {
  const response = await api.patch(`/products/${id}`, payload);
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
