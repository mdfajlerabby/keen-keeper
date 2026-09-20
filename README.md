# KeenKeeper

KeenKeeper is a responsive friendship tracker for remembering meaningful
connections and staying in touch. It gives you a clear home dashboard, friend
profiles, interaction history, and simple friendship analytics.

## Technologies

- Next.js App Router
- React
- Tailwind CSS and DaisyUI
- Recharts
- Local storage for timeline check-ins

## Features

- **Friend dashboard:** Browse 12 realistic friend profiles with photos, tags,
  contact age, relationship status, and detail pages.
- **Quick check-ins:** Log Call, Text, or Video interactions from a friend
  detail page and receive an instant toast confirmation.
- **Timeline and analytics:** Review interactions by date, filter the timeline,
  and view Call/Text/Video totals in a Recharts donut chart.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run lint
npm run build
npm run start
```

## Routes

- `/` — friend dashboard
- `/timeline` — interaction history and filters
- `/stats` — friendship analytics
- `/friends/[id]` — individual friend details and quick check-ins

## Deployment

The project can be deployed to Vercel, Netlify, Cloudflare Pages, or another
Next.js-compatible hosting provider. Run `npm run build` before deployment to
verify the production build.
