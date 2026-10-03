import Image from "next/image";
import { site } from "@/lib/site";

/** The portrait, treated as a printed photo taped into a notebook.
 *  Falls back to a halftone "print" until site.portrait is set. */
export function PortraitClipping({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative bg-cream p-2.5 pb-9 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] ${className}`}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" aria-hidden="true" />
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(max-width: 768px) 60vw, 240px"
            className="object-cover grayscale-[35%] contrast-[1.05]"
            priority
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden bg-blue/40" role="img" aria-label={`${site.name} — portrait placeholder`}>
            <div className="halftone absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_50%_40%,#000_30%,transparent_72%)]" />
            <span className="t-display relative text-[6.5rem] leading-none text-ink/85">{site.initials}</span>
            <span className="t-label absolute bottom-2 left-2 text-[0.55rem] text-ink/70">PHOTO · PENDING PRINT</span>
          </div>
        )}
      </div>
      <figcaption className="t-hand absolute inset-x-0 bottom-1.5 text-center text-xl text-ink/80">
        fig. 1 — the engineer
      </figcaption>
    </figure>
  );
}
