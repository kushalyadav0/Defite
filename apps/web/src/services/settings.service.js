import { api } from '../api/axios'

export const getSettings = async () => {
  const response = await api.get('/settings')

  return response.data.data
}