# Defite_Backend
Backend for Defite's Website, with CMS.

## Resetting the admin login

The admin account is created once on first start from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
Changing those values later does nothing on its own. To apply them to the database, run
`npm run reset-admin` in `apps/api` on the server (inside the API container if you use Docker).

## Running on Vercel (api.defite.in)

The Vercel project `defite-api` (Root Directory `apps/api`) serves `src/app.js`.
MongoDB connects on the first request and the admin/product seeders run once per instance.

Environment variables the project needs (Production and Preview):

| Name | What it is |
|---|---|
| `MONGO_URI` | MongoDB connection string reachable from the internet (e.g. MongoDB Atlas, with network access allowing Vercel) |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Long random strings |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The admin login created on first start |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when a Vercel Blob store is connected; needed for image uploads |
| `CORS_ORIGINS` | Optional extra allowed origins, comma-separated |

The website and admin read the API address from `VITE_API_URL`, defaulting to `https://api.defite.in`.
