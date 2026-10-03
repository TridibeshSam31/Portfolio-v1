"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { site } from "@/lib/site";
import { heroStickers } from "@/data/skills";
import { scrollToSection } from "@/lib/useActiveSection";
import { CircleBadge } from "@/components/ui/CircleBadge";
import { Scribble } from "@/components/ui/Scribble";
import { PortraitClipping } from "./PortraitClipping";

const ease = [0.22, 1, 0.36, 1] as const;

/** Floating sticker positions on desktop — placed cleanly in outer margins, away from text and card. */
const desktopStickers = [
  { label: "AI AGENTS", top: "10%", right: "4%", r: -4, tone: "bg-amber text-ink" },
  { label: "BACKEND", top: "20%", right: "1%", r: 4, tone: "bg-cream text-ink" },
  { label: "SYSTEM DESIGN FUNDAMENTALS", top: "34%", right: "44%", r: -3, tone: "bg-blue text-ink" },
  { label: "POSTGRES", top: "68%", right: "38%", r: 4, tone: "bg-sun text-ink" },
  { label: "REDIS", top: "60%", right: "2%", r: -4, tone: "bg-cream text-ink" },
  { label: "WEBSOCKETS", top: "72%", right: "3%", r: 3, tone: "bg-amber text-ink shadow-[2px_2px_0px_#121316]" },
  { label: "DIST. FUNDAMENTALS", top: "86%", right: "20%", r: 5, tone: "bg-blue-deep text-cream" },
  { label: "DSA", top: "93%", right: "35%", r: 3, tone: "bg-cream text-ink" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="index"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink pt-20 pb-16 md:pt-24 md:pb-20"
    >
      {/* faint blueprint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#6f8fc4_1px,transparent_1px),linear-gradient(90deg,#6f8fc4_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      {/* floating stickers — placed strictly on the right half, avoiding the name */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {desktopStickers.map((p, i) => (
          <span
            key={p.label}
            className="absolute"
            style={{ top: p.top, right: p.right }}
          >
            <span
              className={`sticker floaty block ${p.tone}`}
              style={{ ["--r" as string]: `${p.r}deg`, animationDelay: `${i * -0.9}s` }}
            >
              {p.label}
            </span>
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {/* meta row */}
        <div className="t-label flex flex-wrap items-center justify-between gap-3 text-blue">
          <span>{site.location}</span>
          <span className="hidden md:inline">— {site.positioning} —</span>
          <span>Engineering · {site.graduation}</span>
        </div>

        {/* 2-column hero composition */}
        <div className="relative mt-8 grid items-start gap-10 md:mt-10 lg:grid-cols-12 lg:gap-8">
          {/* left column: name, title badge, statement, bio, CTAs */}
          <div className="lg:col-span-7">
            {/* tasteful, balanced poster typography */}
            <h1
              id="hero-title"
              className="t-display text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.94] text-cream"
            >
              <span className="block">{site.firstName}</span>
              <span className="block text-paper/85">{site.lastName}</span>
              <span className="sr-only"> — {site.title}</span>
            </h1>

            <div className="mt-6">
              <span className="t-mono inline-flex items-center gap-2.5 bg-cream px-3 py-1.5 text-xs font-bold tracking-[0.18em] text-ink uppercase">
                <span className="h-2 w-2 bg-amber" />
                {site.title}
              </span>
            </div>

            <div>
              <p className="t-hand relative mt-6 max-w-xl text-[clamp(1.35rem,2.2vw,1.85rem)] text-paper">
                {site.statement}
                <Scribble variant="underline" className="absolute -bottom-2.5 left-0 h-3.5 w-2/3" />
              </p>

              <p className="mt-7 max-w-lg text-[0.98rem] leading-relaxed text-paper/75">
                {site.shortBio}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  id="hero-cta-work"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("work");
                  }}
                  className="t-label group inline-flex items-center gap-2 bg-amber px-5 py-3 font-bold text-ink transition-transform hover:-rotate-1"
                >
                  See the work
                  <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href={site.resume}
                  id="hero-cta-resume"
                  target="_blank"
                  rel="noopener"
                  className="t-label rough-box inline-flex items-center gap-2 px-5 py-3 text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  <FileText size={14} /> Resume
                </a>
                <a
                  href={site.github}
                  id="hero-cta-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label inline-flex items-center gap-1 px-3 py-3 text-cream/80 underline decoration-amber decoration-2 underline-offset-4 hover:text-cream"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* right column: editorial notebook card */}
          <motion.div
            className="relative lg:col-span-5 lg:pl-6"
            style={{ y: cardY }}
          >
            <div
              className="card-paper relative mx-auto max-w-md rotate-[1.5deg] p-5 md:p-6 transition-transform hover:rotate-0"
              style={{ borderRadius: "3px 6px 2px 8px" }}
            >
              <div className="t-label flex items-center justify-between text-[0.6rem] text-graphite">
                <span>File № 00 / Intro</span>
                <span>IT · {site.graduation}</span>
              </div>
              <div className="mt-4 flex gap-4">
                <PortraitClipping className="w-[45%] shrink-0 -rotate-2" />
                <div className="flex min-w-0 flex-col justify-between">
                  <div>
                    <p className="t-label text-[0.6rem] text-blue-deep">Currently</p>
                    <p className="t-serif mt-1 text-lg leading-tight italic text-ink/90">
                      building backend systems and exploring agentic AI.
                    </p>
                  </div>
                  <dl className="t-mono mt-4 space-y-1.5 text-[0.68rem] uppercase">
                    <div className="flex justify-between gap-2 border-b border-ink/15 pb-1">
                      <dt className="text-graphite">Uni</dt>
                      <dd className="text-right font-bold">GGSIPU</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-b border-ink/15 pb-1">
                      <dt className="text-graphite">Grad</dt>
                      <dd className="font-bold">{site.graduation}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-graphite">Seeking</dt>
                      <dd className="text-right font-bold">Internships</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <p className="t-hand mt-5 -rotate-1 text-xl text-blue-deep">
                backend · agents · systems fundamentals
              </p>
            </div>

            <span className="t-hand absolute -top-8 right-6 hidden rotate-[-4deg] text-xl text-sun lg:block">
              hi, that&apos;s me ↓
            </span>
          </motion.div>
        </div>

        {/* stickers — mobile flow below card */}
        <ul aria-label="Focus areas" className="mt-10 flex flex-wrap gap-2 lg:hidden">
          {heroStickers.map((s, i) => (
            <li
              key={s}
              className="sticker bg-cream text-ink text-[0.65rem] py-1.5 px-2.5"
              style={{ transform: `rotate(${[-2, 3, -1, 2, -3, 1, -2, 2][i % 8]}deg)` }}
            >
              {s}
            </li>
          ))}
        </ul>

        {/* badge + scroll cue */}
        <div className="relative mt-12 flex items-end justify-between border-t border-cream/10 pt-6 md:mt-16">
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="text-blue transition-colors hover:text-amber"
            aria-label="Scroll to liner notes"
          >
            <CircleBadge
              text="AI SYSTEMS · BACKEND · INFRASTRUCTURE · "
              size={110}
              center={<ArrowDown size={20} />}
            />
          </button>
          <p className="t-label max-w-[14rem] text-right text-[0.62rem] leading-relaxed text-paper/50">
            Side A — systems
            <br />
            Side B — agents
            <br />
            Press ▶ below for a guided tour
          </p>
        </div>
      </div>
    </section>
  );
}
