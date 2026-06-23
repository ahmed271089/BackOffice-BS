# Best Solving — Backoffice (Admin)

Responsive admin dashboard. React + Vite + TypeScript + Tailwind, same dark/violet design
system as the mobile app.

## What's built
- **Dashboard** — platform stats, moderation queue preview, category health bars, platform
  load chart (recharts), leaderboard preview
- **Moderation Queue** — full list of reported posts/comments, approve/remove actions
- **User Management** — search, suspend/ban/reactivate; responsive table on desktop that
  collapses to cards on mobile
- **Categories** — list + delete (create form not wired up yet)
- **Leaderboard** — full ranked contributor list
- **Login** — admin/moderator sign-in (UI only)
- **Layout** — sidebar on desktop, slide-over drawer + hamburger on mobile

All data is mocked in `src/data/mockData.ts`. Every spot that needs a real API call is
marked `// TODO` — they map directly to the endpoints already built in the `backend` repo
(e.g. `PATCH /api/users/:id/suspend`, `PATCH /api/admin/reports/:id`, `DELETE /api/categories/:id`).

## Not yet built
- Real authentication/route guarding (currently anyone can hit `/` without logging in —
  add a route guard once `POST /api/auth/login` is wired up and checks `role === 'ADMIN'`)
- Create-category form
- Audit log / activity history

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Resize the window or open dev tools' device toolbar to
see the sidebar collapse into the mobile drawer below the `md` breakpoint (768px).

## Connecting to the backend

Same pattern as the mobile app — point requests at the NestJS backend:

```ts
const API_URL = 'http://localhost:3000/api';
```

Swap each `// TODO` for a `fetch` call with the admin's JWT in the `Authorization` header.
