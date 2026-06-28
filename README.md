# MBSA Gators — Monroeville Baseball & Softball Association

Production-ready React home page for the MBSA Gators youth sports organization, backed by Firebase Firestore.

**Live site:** [mbsa-cbbf8.web.app](https://mbsa-cbbf8.web.app/)  
**Firebase project:** `mbsa-cbbf8`

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3
- React Router v6
- Firebase (Firestore, Auth, Storage)
- Framer Motion, lucide-react

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in Firebase config from Firebase Console → Project Settings → Web app
npm run dev
```

## Firebase Setup

1. Create a web app in [Firebase Console](https://console.firebase.google.com/u/1/project/mbsa-cbbf8/overview)
2. Copy config values into `.env.local`
3. Deploy Firestore rules and indexes:

```bash
firebase deploy --only firestore
```

4. Seed initial data (requires admin auth or temporarily relaxed write rules):

```bash
npm run seed
```

## Deploy to Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## Project Structure

```
src/
  lib/           Firebase init, types, hooks, defaults
  components/
    layout/      AnnouncementBar, Navbar, Footer
    sections/    Hero, QuickLinks, Mission, Tournaments, Gallery, Sponsors
    ui/          Buttons, TournamentCard, SponsorLogo
  pages/         Home
scripts/
  seed.ts        Firestore seed data
```

## Brand

- **Colors:** Navy `#0D1B2A`, Gold `#F4C430`, Cream `#F5F0E8`
- **Fonts:** Oswald (headings) + Nunito Sans (body)
- **Logo:** `public/MBSA-logo-vector.svg`
