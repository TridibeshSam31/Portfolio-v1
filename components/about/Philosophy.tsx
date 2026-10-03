import { principles } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          id="philosophy-title"
          track="03"
          kicker="Engineering philosophy"
          title={
            <>
              How I <span className="outline-text">work</span>
            </>
          }
          note="five rules, mostly learned the hard way"
        />

        <ol className="border-t border-cream/15">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              delay={i * 0.04}
              className="group relative grid grid-cols-[2.8rem_1fr] items-baseline gap-x-4 border-b border-cream/15 py-5 md:grid-cols-[5rem_1fr_minmax(0,22rem)] md:gap-x-8 md:py-6"
            >
                <span className="t-mono text-xs text-amber md:text-sm">{p.n}</span>
                <h3 className="t-display text-[clamp(1.4rem,2.8vw,2.4rem)] leading-tight text-cream transition-[transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 group-hover:text-sun">
                  {p.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-md text-[0.92rem] leading-relaxed text-paper/65 md:col-start-3 md:mt-0">
                  {p.body}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0 bg-amber/10 transition-[width] duration-500 group-hover:w-full"
                />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
