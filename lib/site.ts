/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the single place to edit your personal info.
 *  Projects → data/projects.ts · Skills → data/skills.ts
 *  Socials  → data/socials.ts
 * ─────────────────────────────────────────────────────────────
 */

/** Replace with your real email. While it equals this placeholder,
 *  the email link is hidden from the site (no broken mailto). */
export const EMAIL_PLACEHOLDER = "EMAIL_PLACEHOLDER";

export const site = {
  name: "Tridibesh Samantroy",
  firstName: "Tridibesh",
  lastName: "Samantroy",
  initials: "TS",
  title: "AI Backend Engineer",
  positioning: "AI Backend Engineer · Backend Systems · Agentic AI",
  shortBio:
    "I build backend systems, AI agents, and infrastructure. Currently studying and applying system design & distributed systems fundamentals.",
  statement:
    "I build AI systems, backend infrastructure, and software that actually has to work.",
  tagline: "I don't just build interfaces. I build the systems underneath them.",
  supportingTagline: "AI systems. Backend infrastructure. Engineering problems worth solving.",

  location: "Delhi NCR · India",
  university: "GGSIPU — Guru Gobind Singh Indraprastha University",
  universityShort: "GGSIPU / IP University",
  branch: "Information Technology",
  year: "3rd year",
  graduation: "2028",
  lookingFor: "Software engineering / AI backend internships",

  email: EMAIL_PLACEHOLDER as string,
  github: "https://github.com/TridibeshSam31",
  githubUser: "TridibeshSam31",
  linkedin: "https://www.linkedin.com/in/tridibesh-samantroy",

  /** Drop your PDF at /public/resume.pdf (a placeholder ships by default). */
  resume: "/resume.pdf",

  /** Set to e.g. "/images/portrait.jpg" after adding a photo to /public/images.
   *  While null, a printed "clipping" placeholder is shown. */
  portrait: null as string | null,

  /** Your deployed URL — used for canonical + OpenGraph URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  seo: {
    title: "Tridibesh Samantroy — AI Backend Engineer",
    description:
      "Tridibesh Samantroy is an AI Backend Engineer and engineering student focused on backend systems, agentic AI, distributed systems, and developer infrastructure.",
  },
};

export const hasEmail = () => site.email !== EMAIL_PLACEHOLDER && site.email.includes("@");

/** Sections, in scroll order. Used by the top nav and the bottom console. */
export const sections = [
  { id: "index", label: "Intro", nav: "Index" },
  { id: "about", label: "Liner Notes", nav: "About" },
  { id: "philosophy", label: "Principles" },
  { id: "work", label: "Things I've Built", nav: "Work" },
  { id: "systems", label: "Under the Hood", nav: "Systems" },
  { id: "dsa", label: "Other Side of the Brain" },
  { id: "code", label: "Open Source / Code" },
  { id: "resume", label: "The Paper Trail" },
  { id: "contact", label: "Let's Build", nav: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
