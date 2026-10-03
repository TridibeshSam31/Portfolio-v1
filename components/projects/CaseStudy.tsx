"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { FlowDiagram } from "./FlowDiagram";

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink/20 pt-5">
      <h3 className="t-label flex items-center gap-3 text-blue-deep">
        <span className="t-mono text-amber">{n}</span> {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((d) => (
        <li key={d} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink/80">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-amber" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cs = project.caseStudy;

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        aria-label="Close case study"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/80 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="surface-paper relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] md:max-h-[90vh]"
        style={{ borderRadius: "10px 4px 10px 4px" }}
        initial={{ y: "100%", rotate: 3, opacity: 0.6 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        exit={{ y: "100%", rotate: -2, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* header bar */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-ink px-5 py-3 text-cream md:px-8">
          <span className="t-label text-[0.62rem] text-blue">
            Case study · {project.index} / {project.category}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="t-label inline-flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-cream/10"
          >
            Close <X size={14} />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pt-8 pb-12 md:px-10 md:pt-10">
          <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="t-hand -rotate-1 text-2xl text-blue-deep">artifact № {project.index}</p>
              <h2 id="case-title" className="t-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight">
                {project.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink/80">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label inline-flex items-center gap-2 bg-ink px-4 py-3 font-bold text-cream hover:-rotate-1"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label rough-box inline-flex items-center gap-2 px-4 py-3 hover:bg-ink hover:text-cream"
                >
                  Live demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </header>

          {/* architecture diagram */}
          <div className="card-paper relative mt-10 rotate-[-0.6deg] p-5 md:p-7">
            <span className="tape -top-3 right-12 rotate-3" aria-hidden="true" />
            <p className="t-label mb-4 text-[0.62rem] text-graphite">fig. {project.index} — architecture</p>
            <FlowDiagram nodes={project.flow} orientation="horizontal" />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Block n="01" title="The problem">
              <p className="text-[0.98rem] leading-relaxed text-ink/80">{cs.problem}</p>
            </Block>
            <Block n="02" title="Why I built it">
              <p className="text-[0.98rem] leading-relaxed text-ink/80">{cs.why}</p>
            </Block>
            <div className="md:col-span-2">
              <Block n="03" title="Architecture">
                <p className="t-serif max-w-3xl text-[1.3rem] leading-snug">{cs.architecture}</p>
              </Block>
            </div>
            <Block n="04" title="Engineering decisions">
              <List items={cs.decisions} />
            </Block>
            <Block n="05" title="Challenges">
              <List items={cs.challenges} />
            </Block>
            <Block n="06" title="Technologies">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="t-mono bg-ink px-2.5 py-1 text-[0.7rem] text-cream uppercase">
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.concepts.map((s) => (
                  <li key={s} className="t-mono border border-ink/30 px-2 py-1 text-[0.66rem] uppercase">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
            <Block n="07" title="What I learned">
              <List items={cs.learned} />
            </Block>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
