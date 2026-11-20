import multer from 'multer'

// Files are kept in memory and saved by the upload controller, either to
// Vercel Blob (when BLOB_READ_WRITE_TOKEN is set) or to src/uploads on disk.
// Vercel's filesystem is read-only, so disk storage only works on a server.
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})
