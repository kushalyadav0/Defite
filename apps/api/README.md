# Defite_Backend
Backend for Defite's Website, with CMS.

## Resetting the admin login

The admin account is created once on first start from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
Changing those values later does nothing on its own. To apply them to the database, run
`npm run reset-admin` in `apps/api` on the server (inside the API container if you use Docker).
