# Tridibesh Samantroy — Portfolio

An engineer's digital notebook. Next.js 15 · TypeScript · Tailwind v4 · Motion.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Edit your info (no component digging)

| What | Where |
| --- | --- |
| Name, title, bio, email, GitHub, LinkedIn, resume path, portrait, site URL | `lib/site.ts` |
| Projects + case studies + architecture flows | `data/projects.ts` |
| Principles, Under-the-Hood cards, DSA topics, tool lists | `data/skills.ts` |
| Contact links, selected repos | `data/socials.ts` |

### To-do before deploying
- **Email:** set `email` in `lib/site.ts` (the link stays hidden while it equals `EMAIL_PLACEHOLDER`).
- **Resume:** replace `public/resume.pdf` (a placeholder ships so links never 404).
- **Photo:** add `public/images/portrait.jpg` and set `portrait: "/images/portrait.jpg"`.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` (canonical + OpenGraph URLs).

## Notes
- GitHub repo metadata is fetched live from the public GitHub API (cached 24h); the contribution chart is rendered from public data by ghchart.rshah.org. Nothing is hard-coded or invented.
- All animations use transforms/opacity and respect `prefers-reduced-motion`.
- The ▶ button in the bottom console runs a guided tour of the page; any scroll/keypress stops it.
