import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://defite.cloud/api/v1',
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(
    'admin_token'
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});