# NEST

Real estate listing portal for the Polish market. Visitors can browse and filter property listings, view them on an interactive map and save favourites. Agents get a dashboard for adding and managing their own listings.

## Features

- Listing browser with search filters (price range and other criteria)
- Interactive map view of listings
- Property detail pages with image galleries
- User accounts with email and password authentication
- Favourites saved per user
- Agent dashboard and a form for adding new listings
- Responsive layout for mobile and desktop

## Tech stack

- React 18, TypeScript, Vite
- Tailwind CSS, Radix UI components, Framer Motion
- React Router, TanStack Query
- Leaflet / React Leaflet for maps
- Supabase (PostgreSQL, authentication, storage)
- Vitest for testing, ESLint for linting

## Getting started

Requirements: Node.js 18 or newer and a Supabase project.

```bash
npm install
npm run dev
```

The development server runs on http://localhost:5173.

Create a `.env` file with the following variables:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Database migrations are located in `supabase/migrations`.

## Project structure

```
src/
  app/                 application shell: providers, routes, toast settings
  components/
    layout/            navbar, footer, nav link
    ui/                shared UI primitives
  features/
    auth/              auth context and sign-in page
    listings/          listing browser, map, details, add-listing form
    agent/             agent dashboard
    site/              home, about, contact, not-found pages
  hooks/               shared hooks
  lib/
    supabase/          Supabase client and generated types
    utils.ts           helpers
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
