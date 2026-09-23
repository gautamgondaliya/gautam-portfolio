# Gautam Gondaliya · Portfolio

Personal site for a Full Stack AI Engineer. Single page, dark, fast. Built with Next.js 16 (App Router), React 19 and Tailwind CSS.

Live: https://gautamgondaliya3.netlify.app

## What is on it

- Hero with a replayed multi-agent run log
- Proof strip (agents, RAG, scale, LeetCode rank)
- Featured AI projects with pipeline, stack, metrics and demo links
- Work projects, grouped skills, experience timeline, achievements, education
- Contact form that delivers to email and/or Telegram

## Editing content

All copy lives in `utils/data/`. Components only render what is there.

| File                | What it controls                          |
| ------------------- | ----------------------------------------- |
| `personal-data.js`  | name, title, tagline, links, summary      |
| `highlights.js`     | four stat cards under the hero            |
| `projects-data.js`  | featured and work projects                |
| `skills.js`         | grouped skill chips                       |
| `experience.js`     | timeline with bullets                     |
| `achievements.js`   | competitive programming and hackathons    |
| `educations.js`     | degrees                                   |

The terminal replay in the hero is in `app/components/homepage/hero-section/agent-terminal.jsx`.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional, only needed for the contact form
npm run dev
```

Open http://localhost:3000.

## Contact form

The form posts to `/api/contact`. Configure at least one channel in `.env.local`:

```env
EMAIL_ADDRESS=you@gmail.com
GMAIL_PASSKEY=16-char-google-app-password
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Without any channel configured the endpoint returns 503 and the form tells the visitor to email directly. Input is validated, HTML-escaped, honeypot-checked and rate-limited per instance.

## Deploy

Push to `main`. Vercel or Netlify will detect Next.js. Add the same environment variables in the host dashboard. `NEXT_PUBLIC_GTM` is optional for Google Tag Manager.
