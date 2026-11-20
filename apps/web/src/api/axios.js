import axios from 'axios'

// Where the Defite API lives. Override with VITE_API_URL (e.g. for local dev).
export const API_ORIGIN = (
  import.meta.env.VITE_API_URL || 'https://api.defite.in'
).replace(/\/$/, '')

// Turns a stored image path ("/uploads/x.png") into a full URL. Full links
// (such as Vercel Blob URLs) are returned unchanged.
export const assetUrl = (url) => {
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`
}

export const api = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
})