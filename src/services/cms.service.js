import { api } from '../api/axios';

export const getHomepageCMS =
  async () => {
    const response = await api.get(
      '/cms/homepage'
    );

    return response.data.data;
  };

export const updateHomepageCMS =
  async (payload) => {
    const response = await api.patch(
      '/cms/homepage',
      payload
    );

    return response.data.data;
  };