import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { FlowDiagram } from "./FlowDiagram";
import { Reveal } from "@/components/ui/Reveal";

const tones: Record<Project["tone"], { card: string; node: string; arrow: string; label: string }> = {
  amber: { card: "bg-amber text-ink", node: "bg-cream/90 text-ink border-ink", arrow: "text-ink/70", label: "text-ink/70" },
  blue: { card: "bg-blue text-ink", node: "bg-cream/90 text-ink border-ink", arrow: "text-ink/70", label: "text-ink/70" },
  yellow: { card: "bg-sun text-ink", node: "bg-cream/90 text-ink border-ink", arrow: "text-ink/70", label: "text-ink/70" },
  ink: { card: "bg-ink text-cream", node: "bg-navy text-cream border-cream/50", arrow: "text-amber", label: "text-cream/60" },
  cream: { card: "bg-cream text-ink grid-paper", node: "bg-paper text-ink border-ink", arrow: "text-ink/60", label: "text-ink/60" },
};

/** One project, presented as a printed artifact rather than a uniform card. */
export function ProjectArtifact({
  project,
  flip,
  onOpen,
}: {
  project: Project;
  flip: boolean;
  onOpen: (slug: string) => void;
}) {
  const t = tones[project.tone];
  const tilt = flip ? "md:rotate-[1.6deg]" : "md:-rotate-[1.6deg]";

  return (
    <article
      id={`project-${project.slug}`}
      aria-labelledby={`project-${project.slug}-title`}
      className="relative grid items-center gap-10 border-t-2 border-ink py-16 md:grid-cols-12 md:gap-8 md:py-24"
    >
      {/* text column */}
      <Reveal className={`relative md:col-span-6 lg:col-span-7 ${flip ? "md:order-2 md:pl-6" : "md:pr-6"}`}>
        <div className="flex items-start justify-between gap-4">
          <span className="t-display outline-text text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ink/70" aria-hidden="true">
            {project.index}
          </span>
          <span className="t-label rough mt-4 rotate-[4deg] border-2 px-4 py-2 font-bold text-blue-deep">
            {project.category}
          </span>
        </div>

        <h3 id={`project-${project.slug}-title`} className="t-display mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
          {project.title}
        </h3>
        <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-ink/80">{project.summary}</p>

        <ul className="mt-6 flex max-w-2xl flex-wrap gap-x-2 gap-y-2" aria-label="Engineering concepts">
          {project.concepts.map((c) => (
            <li key={c} className="t-mono border border-ink/30 bg-cream/60 px-2 py-1 text-[0.68rem] tracking-wide uppercase">
              {c}
            </li>
          ))}
        </ul>

        <p className="t-mono mt-6 text-[0.75rem] text-ink/60">
          <span className="text-blue-deep">stack →</span> {project.stack.join(" / ")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            id={`open-${project.slug}`}
            onClick={() => onOpen(project.slug)}
            className="t-label group inline-flex items-center gap-2 bg-ink px-5 py-3.5 font-bold text-cream transition-transform hover:-rotate-1"
          >
            Read case study
            <Maximize2 size={13} className="transition-transform group-hover:scale-110" />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label rough-box inline-flex items-center gap-2 px-4 py-3.5 hover:bg-ink hover:text-cream"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label inline-flex items-center gap-1 px-2 py-3.5 underline decoration-amber decoration-2 underline-offset-4"
            >
              Live demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </Reveal>

      {/* artifact column */}
      <Reveal delay={0.1} className={`md:col-span-6 lg:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-label={`Open ${project.title} case study`}
          className={`group relative block w-full text-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 hover:-translate-y-1.5 ${tilt}`}
        >
          {/* stacked paper behind */}
          <span aria-hidden="true" className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[2deg] bg-ink/85" />
          <span
            className={`relative block p-5 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] md:p-7 ${t.card}`}
            style={{ borderRadius: "4px 2px 6px 3px" }}
          >
            <span className="tape -top-3 left-8 -rotate-6" aria-hidden="true" />
            <span className={`t-label flex items-center justify-between text-[0.6rem] ${t.label}`}>
              <span>fig. {project.index} — system flow</span>
              <span className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                open <ArrowUpRight size={12} />
              </span>
            </span>
            <span className="mt-5 block">
              <FlowDiagram nodes={project.flow} nodeClass={t.node} arrowClass={t.arrow} animateOnGroupHover />
            </span>
          </span>
        </button>
      </Reveal>
    </article>
  );
}
