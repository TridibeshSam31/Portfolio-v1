import { site } from "@/lib/site";
import { backendTools, frontendTools, languages } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { CircleBadge } from "@/components/ui/CircleBadge";

const credits = [
  ["Name", site.name],
  ["Role", site.title],
  ["Based in", "Delhi NCR, India"],
  ["Studying", `B.Tech ${site.branch}`],
  ["University", site.universityShort],
  ["Year", `${site.year} · class of ${site.graduation}`],
  ["Looking for", site.lookingFor],
];

export function LinerNotes() {
  return (
    <section id="about" aria-labelledby="about-title" className="surface-paper relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* left: sleeve */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="t-label flex items-center gap-3 text-blue-deep">
              <span className="rough-box px-2 py-0.5">TRACK 02</span> About
            </p>
            <h2 id="about-title" className="t-display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.92]">
              Liner
              <br />
              <span className="relative inline-block">
                Notes
                <Scribble variant="circle" className="absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)]" />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="card-paper relative mt-12 -rotate-1 p-6 md:p-7">
            <span className="tape -top-3 right-10 rotate-[6deg]" aria-hidden="true" />
            <p className="t-label mb-4 text-[0.62rem] text-graphite">Credits</p>
            <dl className="t-mono space-y-2 text-[0.78rem]">
              {credits.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-dashed border-ink/20 pb-2">
                  <dt className="uppercase text-graphite">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* right: the notes */}
        <div className="relative lg:col-span-7 lg:pt-28">
          <Reveal className="ruled relative">
            <p className="t-serif text-[clamp(1.6rem,2.8vw,2.45rem)] leading-[1.2]">
              I&apos;m a third-year Information Technology student from Delhi NCR, graduating in {site.graduation}.
              My focus is <mark className="bg-sun/70 px-1 text-ink">backend engineering and AI systems</mark> — especially
              the infrastructure behind AI products.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-8 md:grid-cols-2">
            <p className="text-[1.05rem] leading-relaxed text-ink/80">
              I like understanding what happens underneath the abstraction: how requests move through a system, how data
              is persisted, how services talk to each other, how failures are recovered, how agents coordinate tools, and
              how all of it behaves under load.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-ink/80">
              Right now I&apos;m actively studying system design fundamentals (documenting notes and trade-offs in my{" "}
              <a
                href="https://github.com/TridibeshSam31/System-Design"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline decoration-amber decoration-2 underline-offset-2 hover:text-blue-deep"
              >
                System-Design repo
              </a>
              ) and distributed systems patterns, alongside building agent workflows and working through DSA — learning by building and breaking things rather than just memorizing theory.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { h: "Daily drivers", items: languages, tone: "bg-ink text-cream" },
              { h: "Backend", items: backendTools, tone: "bg-blue/30" },
              { h: "Also speaks frontend", items: frontendTools, tone: "bg-transparent" },
            ].map((g, gi) => (
              <div key={g.h} className={`rough-box p-4 ${g.tone}`} style={{ transform: `rotate(${[-1, 0.8, -0.4][gi]}deg)` }}>
                <p className="t-label text-[0.6rem] opacity-70">{g.h}</p>
                <p className="t-mono mt-2 text-[0.78rem] leading-relaxed">{g.items.join(" · ")}</p>
              </div>
            ))}
            <p className="t-hand absolute -bottom-12 right-0 rotate-[-3deg] text-2xl text-blue-deep">
              ↑ frontend is the smallest box. on purpose.
            </p>
          </Reveal>

          <div className="absolute -top-6 right-0 hidden text-blue-deep lg:block">
            <CircleBadge text="WRITTEN IN DELHI NCR · 2026 · " size={110} center={<span className="t-display text-2xl">A</span>} />
          </div>
        </div>
      </div>
    </section>
  );
}
