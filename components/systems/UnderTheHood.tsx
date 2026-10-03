import { systemsCards } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const look = [
  { card: "bg-cream text-ink", rot: "-rotate-[1.2deg]", off: "" },
  { card: "bg-blue text-ink", rot: "rotate-[1deg]", off: "lg:mt-16" },
  { card: "bg-paper text-ink", rot: "-rotate-[0.6deg]", off: "lg:mt-6" },
  { card: "bg-amber text-ink", rot: "rotate-[1.4deg]", off: "lg:-mt-6" },
  { card: "bg-cream text-ink", rot: "-rotate-[1deg]", off: "lg:mt-8" },
];

export function UnderTheHood() {
  return (
    <section id="systems" aria-labelledby="systems-title" className="surface-navy relative overflow-hidden py-24 md:py-36">
      {/* blueprint lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#6f8fc4_1px,transparent_1px),linear-gradient(90deg,#6f8fc4_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          id="systems-title"
          track="05"
          kicker="Technical depth"
          title={
            <>
              Under the
              <br />
              <span className="text-amber">hood</span>
            </>
          }
          note="frameworks change. these don't."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {systemsCards.map((c, i) => {
            const l = look[i % look.length];
            return (
              <Reveal key={c.key} delay={i * 0.06} className={l.off}>
                <article
                  className={`group relative h-full p-6 shadow-[0_24px_40px_-22px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 hover:-translate-y-2 md:p-7 ${l.card} ${l.rot}`}
                  style={{ borderRadius: "3px 6px 3px 8px" }}
                >
                  <span aria-hidden="true" className="absolute top-0 bottom-0 left-10 w-px bg-[#c0504d]/40" />
                  <header className="flex items-start justify-between pl-6">
                    <div>
                      <span className="t-mono text-xs opacity-60">{c.code}</span>
                      <h3 className="t-display mt-1 text-[2.4rem] leading-[0.9]">{c.title}</h3>
                    </div>
                    <span className="t-hand mt-1 max-w-[8rem] rotate-[4deg] text-right text-lg leading-tight opacity-75">
                      {c.note}
                    </span>
                  </header>
                  <ul className="ruled t-mono mt-6 pl-6 text-[0.82rem] leading-[32px]">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span aria-hidden="true" className="opacity-50 transition-transform group-hover:translate-x-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {"link" in c && Boolean(c.link) && (
                    <div className="mt-4 border-t border-ink/15 pt-3 pl-6">
                      <a
                        href={c.link as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-mono inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-blue-deep hover:text-ink underline decoration-amber underline-offset-4"
                      >
                        {"linkLabel" in c ? (c.linkLabel as string) : "Study repo ↗"}
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}

          {/* terminal note */}
          <Reveal delay={0.3} className="lg:mt-2">
            <div className="h-full border border-cream/20 bg-ink p-6 font-mono text-[0.8rem] leading-relaxed text-paper/80 md:p-7">
              <p className="t-label mb-4 text-[0.6rem] text-blue">~/notes/how-i-learn.sh</p>
              <p>
                <span className="text-amber">$</span> build something real
              </p>
              <p>
                <span className="text-amber">$</span> break it under load
              </p>
              <p>
                <span className="text-amber">$</span> read the logs
              </p>
              <p>
                <span className="text-amber">$</span> EXPLAIN ANALYZE the slow part
              </p>
              <p>
                <span className="text-amber">$</span> fix it, write down why
              </p>
              <p className="mt-3 text-blue">
                <span className="text-amber">$</span> repeat<span className="caret">▍</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
