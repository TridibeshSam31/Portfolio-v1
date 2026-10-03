"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectArtifact } from "./ProjectArtifact";
import { CaseStudy } from "./CaseStudy";
import { soundEngine } from "@/lib/soundEngine";

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const handleOpen = (slug: string) => {
    soundEngine?.playClick();
    setOpen(slug);
  };
  const close = useCallback(() => {
    soundEngine?.playClick();
    setOpen(null);
  }, []);
  const current = projects.find((p) => p.slug === open);

  return (
    <section id="work" aria-labelledby="work-title" className="surface-paper relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          id="work-title"
          track="04"
          kicker="Selected work"
          tone="light"
          title={
            <>
              Things I&apos;ve
              <br />
              built
            </>
          }
          note="click any artifact to open the case study"
        />

        {/* tracklist — the 10-second recruiter view */}
        <Reveal className="mb-10 md:mb-16">
          <p className="t-label mb-3 text-[0.62rem] text-graphite">Tracklist</p>
          <ol className="border-t-2 border-ink">
            {projects.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => handleOpen(p.slug)}
                  className="group grid w-full grid-cols-[2.2rem_1fr_auto] items-baseline gap-3 border-b border-ink/20 py-3 text-left transition-colors hover:bg-ink hover:text-cream md:grid-cols-[3rem_1.2fr_1fr_1.4fr] md:px-2"
                >
                  <span className="t-mono text-xs text-amber">{p.index}</span>
                  <span className="t-display text-2xl md:text-3xl">{p.title}</span>
                  <span className="t-label text-[0.62rem] opacity-70">{p.category}</span>
                  <span className="t-mono hidden truncate text-[0.7rem] opacity-60 md:block">{p.stack.slice(0, 4).join(" · ")}</span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        <div>
          {projects.map((p, i) => (
            <ProjectArtifact key={p.slug} project={p} flip={i % 2 === 1} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>{current && <CaseStudy key={current.slug} project={current} onClose={close} />}</AnimatePresence>
    </section>
  );
}
