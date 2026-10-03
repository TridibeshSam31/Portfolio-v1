import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { getSocials } from "@/data/socials";
import { Reveal } from "@/components/ui/Reveal";
import { Scribble } from "@/components/ui/Scribble";

export function Contact() {
  const socials = getSocials();
  const year = new Date().getFullYear();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink pt-24 md:pt-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <p className="t-label flex items-center gap-3 text-blue">
            <span className="rough-box px-2 py-0.5">TRACK 09</span> Contact
          </p>
          <h2 id="contact-title" className="t-display mt-6 text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.95] text-cream">
            Let&apos;s build
            <br />
            <span className="relative inline-block text-amber">
              something
              <Scribble variant="underline" className="absolute -bottom-2 left-0 h-5 w-full md:-bottom-4" color="var(--color-cream)" />
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="t-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug text-paper">
              I&apos;m interested in backend engineering, AI infrastructure, distributed systems, and challenging
              engineering problems.
            </p>
            <p className="t-hand mt-5 rotate-[-1.5deg] text-2xl text-sun">
              currently looking for internships — say hi →
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-cream/20">
              {socials.map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    id={`contact-${s.label.toLowerCase()}`}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-cream/20 py-5 transition-colors hover:text-amber"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="t-mono text-xs text-blue">0{i + 1}</span>
                      <span className="t-display text-4xl text-cream transition-transform duration-500 group-hover:translate-x-2 group-hover:text-amber md:text-5xl">
                        {s.label}
                      </span>
                    </span>
                    <span className="t-mono hidden truncate text-xs text-paper/50 sm:block">{s.handle}</span>
                    <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1440px] flex-col gap-3 border-t border-cream/10 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="t-label text-[0.6rem] text-paper/40">
          © {year} {site.name} · {site.location}
        </p>
        <p className="t-label text-[0.6rem] text-paper/40">Designed &amp; built by hand · Next.js · no templates</p>
      </footer>
    </section>
  );
}
