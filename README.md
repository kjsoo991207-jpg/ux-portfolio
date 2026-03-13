# UX Portfolio

A minimal, designer-friendly UX portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default route `/` shows the **Work** page so you can preview immediately.

## Tech stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Inter** font (via `next/font/google`)

## Site structure

| Route        | Description                          |
| ------------ | ------------------------------------ |
| `/`          | Work (home) — hero + project cards   |
| `/work/[slug]` | Project case study (e.g. `/work/aika`) |
| `/about`     | About — bio, skills, optional photo  |

- **Nav:** Work, About, Resume (opens PDF in new tab)
- **Footer:** Contact email, Resume link, copyright (on every page)

## Content

- **Project data:** Edit `content/projects.ts` to update the Aika project or add more projects. The Work page and project detail page both read from this file.
- **Resume link:** In `components/Nav.tsx` and `components/Footer.tsx`, set `RESUME_URL` to your PDF URL.
- **Contact email:** In `components/Footer.tsx`, set `CONTACT_EMAIL`.

## Assets

Placeholder images live in `public/images/`:

- `aika-thumb.png` — card thumbnail (replace with your own)
- `aika-hero.png` — case study hero (replace with your own)
- `placeholder-1.png`, `placeholder-2.png` — generic placeholders for process screenshots

SVG placeholders (`aika-thumb.svg`, `aika-hero.svg`, etc.) are also included so the site looks fine before you add real PNGs. When you add real images, use the `.png` paths in `content/projects.ts` and put your files in `public/images/`.

## Adding your Aika case study

When you have real copy and screenshots:

1. Update the Aika entry in `content/projects.ts` (summary, process text, results, learned).
2. Add your images to `public/images/` (e.g. `aika-hero.png`, `aika-thumb.png`, and any process screenshots).
3. Optionally extend the project type and `app/work/[slug]/page.tsx` to support multiple images per process section and captions.

Design is minimal (white background, clean typography, generous spacing) and responsive. No overbuilding — ready for you to swap in real text and screenshots.
