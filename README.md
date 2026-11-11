# Defite

One repository for the Defite website, admin panel and API.

| Folder | What it is | Deploy setting |
|---|---|---|
| `apps/web` | Public website (Vite + React), on Vercel at defite.in | The root `vercel.json` builds `apps/web`, so the Vercel project needs no setting change |
| `apps/admin` | Admin panel (Vite + React) | A separate Vercel project with Root Directory `apps/admin` (its `vercel.json` sends every route to the app) |
| `apps/api` | API (Express + MongoDB), served at `defite.cloud/api/v1` | Build the Docker image from `apps/api` |

Each app keeps its own `package.json` and lockfile, so hosting only needs its base directory pointed at the folder above. The full git history of the old `Defite_Admin` and `Defite_Backend` repos is preserved under `apps/admin` and `apps/api`.

## Products

Defite's products (Verso, Nivao, Arvok, Rivao, Teraa, LeadGen) are stored by the API (`/api/v1/products`) and managed from the admin panel's **Products** page: app link, demo link, superadmin link (admin only, never public), status and copy. On first start the API inserts any missing default product; it never overwrites edits. The website falls back to `apps/web/src/data/products.js` if the API is unreachable.

## Google Analytics

The GA4 tag (`G-2W61LHC54W`) lives in `apps/web/index.html`. `npm run build` in `apps/web` checks it against the pinned copy in `apps/web/scripts/ga-snippet.html` before and after building and fails if it changed. Do not edit either without the site owner's approval.
