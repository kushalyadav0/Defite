import { api } from '../api/axios';

export const getProjects = async () => {
  const response = await api.get('/projects');

  return response.data.data;
};

export const createProject = async (
  payload
) => {
  const response = await api.post(
    '/projects',
    payload
  );

  return response.data.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
};