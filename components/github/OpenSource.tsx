import { ArrowUpRight, Github } from "lucide-react";
import { site } from "@/lib/site";
import { selectedRepos } from "@/data/socials";
import { getRepoMeta } from "@/lib/github";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : null;

export async function OpenSource() {
  const meta = await getRepoMeta();

  return (
    <section id="code" aria-labelledby="code-title" className="relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          id="code-title"
          track="07"
          kicker="github.com/TridibeshSam31"
          title={
            <>
              Open source
              <br />
              <span className="outline-text">/ code</span>
            </>
          }
          note="everything here is public. go read it."
        />

        {/* real contribution chart, rendered by a third-party service from public data */}
        <Reveal className="mb-14 border border-cream/15 bg-navy/60 p-5 md:p-7">
          <div className="t-label mb-4 flex flex-wrap items-center justify-between gap-2 text-[0.62rem] text-blue">
            <span>Public contribution graph — live from GitHub</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cream hover:text-amber">
              <Github size={13} /> @{site.githubUser} <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/ef9b3a/${site.githubUser}`}
              alt={`GitHub contribution chart for ${site.githubUser}`}
              loading="lazy"
              decoding="async"
              width={720}
              height={112}
              className="h-auto min-w-[640px] w-full rounded-sm bg-cream p-3"
            />
          </div>
        </Reveal>

        <ul className="grid gap-px overflow-hidden border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-3">
          {selectedRepos.map((r, i) => {
            const m = meta[r.name.toLowerCase()];
            const updated = fmt(m?.updated ?? null);
            return (
              <Reveal as="li" key={r.name} delay={i * 0.05} className="bg-ink">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-navy md:p-7"
                >
                  <div>
                    <div className="t-label flex items-center justify-between text-[0.6rem] text-blue">
                      <span>repo / {String(i + 1).padStart(2, "0")}</span>
                      <ArrowUpRight size={16} className="text-cream/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
                    </div>
                    <h3 className="t-mono mt-4 text-lg font-bold break-all text-cream group-hover:text-amber md:text-xl">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-paper/60">{m?.description || r.blurb}</p>
                  </div>
                  <div className="t-mono flex items-center gap-4 text-[0.68rem] text-paper/50">
                    {m?.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber" />
                        {m.language}
                      </span>
                    )}
                    {updated && <span>pushed {updated}</span>}
                    {!m && <span>view on github</span>}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
