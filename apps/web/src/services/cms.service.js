import { api } from '../api/axios'

export const getHomepageCMS = async () => {
  const response = await api.get('/cms/homepage')

  return response.data.data
}