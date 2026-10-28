# Interactive Next.js Microsite

A Next.js and React web experience built around a sequence of interactive story screens, animated transitions, decorative components, and responsive presentation.

## Main implementation areas

- `app/page.tsx` — client-side story state and screen transitions.
- `app/components/` — reusable animated scene, celebration, decoration, and interaction components.
- `app/globals.css` — site-wide visual styling.
- `supabase/` — database migrations and functions.
- `.env.example` — environment-variable names for optional Supabase and email integrations.

## Tech stack

- Next.js
- React and TypeScript
- Framer Motion for transitions and animation
- Tailwind CSS
- Supabase integration files
- Resend-related email configuration variables

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build and start a production version:

```bash
npm run build
npm run start
```

## Environment configuration

Copy `.env.example` to `.env.local` and set the variables needed for the integrations you use:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or the public anon key supported by your project)
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`
- `ALLOWED_ORIGINS`

Never expose `SUPABASE_SERVICE_ROLE_KEY` or mail-provider secrets to the browser or commit real credentials. Confirm Supabase Row Level Security and server-side authorization before deploying features that touch user data.
