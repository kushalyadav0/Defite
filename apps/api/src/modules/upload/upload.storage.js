import fs from 'fs/promises'
import path from 'path'
import { put } from '@vercel/blob'

const uniqueName = (originalName) =>
  `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(originalName)}`

// Saves an uploaded image and returns { fileName, url }.
// With BLOB_READ_WRITE_TOKEN (Vercel Blob) the url is a full https link;
// otherwise the file goes to src/uploads and the url is /uploads/<name>.
export const saveImage = async (file) => {
  const fileName = uniqueName(file.originalname)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${fileName}`, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    })
    return { fileName, url: blob.url }
  }

  if (process.env.VERCEL) {
    const error = new Error(
      'Image uploads need a Vercel Blob store connected to this project'
    )
    error.statusCode = 503
    throw error
  }

  const dir = path.join(process.cwd(), 'src/uploads')
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, fileName), file.buffer)
  return { fileName, url: `/uploads/${fileName}` }
}
