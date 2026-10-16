# utkarsh-gupta-portfolio

Personal portfolio + resume site for Utkarsh Gupta. Live at **[hi-utkarsh.vercel.app](https://hi-utkarsh.vercel.app)**.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Deployed on Vercel.

---

## What's here

**Public (`/`)** — single-page portfolio with hero + photo, stats, about, experience timeline, projects, skills, education, contact.

**Private (`/drafts`)** — password-gated tools for personal use:

- `/drafts/scanner` — paste a job description, get a resume match score, gaps, and tailoring suggestions (OpenAI `gpt-4o-mini`).
- `/drafts/cover-letter` — paste a job description, get a tailored cover letter in your voice.

The gate uses a client-side password stored in `app/drafts/_gate.tsx`. Not secure for anything sensitive — it keeps casual visitors out of unfinished pages.

---

## Local dev

```bash
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

To use the `/drafts` tools locally, add an OpenAI key:

```bash
cp .env.local.example .env.local
# edit .env.local and paste your real OPENAI_API_KEY
```

Restart the dev server after adding the key.

---

## Deployment

- **Hosting**: Vercel project `utkarsh-gupta` under `ug4672s-projects`.
- **Auto-deploy**: every push to `main` on this repo triggers a production build.
- **Custom alias**: `hi-utkarsh.vercel.app` → latest deployment.
- **Env var**: `OPENAI_API_KEY` is set in Vercel project settings (not committed).

Manual deploy from CLI:

```bash
vercel --prod --yes
```

---

## File layout

```
app/
  page.tsx                  — public homepage
  layout.tsx                — root layout, fonts, metadata
  globals.css               — Tailwind + theme tokens (warm palette)
  data/
    resume.ts               — structured resume content (edit here when roles change)
  drafts/
    _gate.tsx               — shared password-gate component
    page.tsx                — private tools hub
    scanner/page.tsx        — JD → resume score + gaps + tailoring
    cover-letter/page.tsx   — JD → tailored cover letter
  api/
    scan/route.ts           — POST { jd } → structured analysis JSON
    cover-letter/route.ts   — POST { jd } → cover letter JSON
public/
  utkarsh.jpg               — profile photo
```

---

## Updating content

- **Resume / experience changes** → edit `app/data/resume.ts` (used by both AI tools) **and** the hard-coded `experience` array in `app/page.tsx` (used by the public page).
- **Projects, skills, stats** → edit the arrays at the top of `app/page.tsx`.
- **Design tokens (colors, fonts)** → `app/globals.css` and `app/layout.tsx`.

---

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Cache Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Type**: Instrument Serif + Inter (via `next/font`)
- **AI**: OpenAI `gpt-4o-mini` for JD extraction, scoring, and cover letter generation
- **Hosting**: Vercel
