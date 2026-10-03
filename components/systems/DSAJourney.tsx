import { dsaTopics } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";
import { AlgorithmSonifier } from "./AlgorithmSonifier";

/** DSA as a transit route — stations, no fake progress. */
export function DSAJourney() {
  return (
    <section id="dsa" aria-labelledby="dsa-title" className="surface-cream grid-paper relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-label flex items-center gap-3 text-blue-deep">
              <span className="rough-box px-2 py-0.5">TRACK 06</span> Algorithms
            </p>
            <h2 id="dsa-title" className="t-display mt-5 text-[clamp(2rem,4.2vw,3.6rem)] leading-[0.95]">
              The other side
              <br />
              of the brain
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="t-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug">
              Systems thinking is one half. The other is sitting with a problem until the right structure shows up.
              I&apos;m actively building my algorithmic problem-solving — one topic at a time.
            </p>
            <p className="t-hand mt-4 rotate-[-1.5deg] text-2xl text-blue-deep">
              no progress bars here — just the route i&apos;m on.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mt-16 md:mt-20">
          <div className="t-label mb-6 inline-flex items-center gap-2 bg-ink px-3 py-1.5 text-cream">
            <span className="h-2 w-2 rounded-full bg-amber" /> Current DSA journey
          </div>

          {/* desktop: horizontal route */}
          <ol className="relative hidden grid-cols-9 md:grid" aria-label="DSA topics">
            <span aria-hidden="true" className="absolute top-[11px] right-[5%] left-[5%] h-[5px] rounded-full bg-blue-deep" />
            {dsaTopics.map((t, i) => (
              <li key={t} className="group relative flex flex-col items-center text-center">
                <span className="relative z-10 grid h-[27px] w-[27px] place-items-center rounded-full border-[5px] border-blue-deep bg-cream transition-transform duration-300 group-hover:scale-125">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className={`t-mono mt-4 text-[0.72rem] font-bold uppercase ${i % 2 ? "md:mt-12" : ""}`}>{t}</span>
                <span className="t-mono mt-1 text-[0.6rem] text-graphite">stop {String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>

          {/* mobile: vertical route */}
          <ol className="relative ml-3 space-y-5 border-l-[5px] border-blue-deep pl-7 md:hidden" aria-label="DSA topics">
            {dsaTopics.map((t, i) => (
              <li key={t} className="relative">
                <span aria-hidden="true" className="absolute top-1/2 -left-[44px] h-[23px] w-[23px] -translate-y-1/2 rounded-full border-[5px] border-blue-deep bg-cream" />
                <span className="t-mono text-[0.6rem] text-graphite">stop {String(i + 1).padStart(2, "0")}</span>
                <span className="t-display block text-3xl">{t}</span>
              </li>
            ))}
          </ol>

          <div className="pointer-events-none absolute -top-10 right-0 hidden w-48 text-right lg:block">
            <span className="t-hand block rotate-[-4deg] text-2xl text-amber">the line keeps going</span>
            <Scribble variant="arrow-down" className="ml-auto h-16 w-8 rotate-[-30deg]" />
          </div>
        </Reveal>

        {/* Unique Feature: Interactive Algorithm Sonifier */}
        <Reveal delay={0.25}>
          <AlgorithmSonifier />
        </Reveal>
      </div>
    </section>
  );
}
