import { site } from "@/lib/site";

/** Tagline tape strip between hero and liner notes. */
export function Marquee() {
  const items = [site.tagline, site.supportingTagline];
  const row = (
    <div className="flex shrink-0 items-center">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="t-display px-8 text-[clamp(1.8rem,4vw,3.4rem)] whitespace-nowrap">{t}</span>
          <span className="text-2xl" aria-hidden="true">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="-rotate-[1.5deg] scale-[1.03] border-y-2 border-ink bg-amber py-3 text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]">
        <p className="sr-only">{site.tagline}</p>
        <div className="marquee-track flex w-max" aria-hidden="true">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
