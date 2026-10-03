import { Download, Eye } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { CircleBadge } from "@/components/ui/CircleBadge";

/** Resume as a physical document. The page preview is abstract on purpose —
 *  the real content lives in /public/resume.pdf. */
export function PaperTrail() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="surface-paper relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="t-label flex items-center gap-3 text-blue-deep">
            <span className="rough-box px-2 py-0.5">TRACK 08</span> Resume
          </p>
          <h2 id="resume-title" className="t-display mt-5 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.92]">
            The paper
            <br />
            trail
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/75">
            Everything above, condensed to one page — education, projects and skills, for when you need the PDF.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={site.resume}
              id="resume-download"
              download="Tridibesh-Samantroy-Resume.pdf"
              className="t-label inline-flex items-center gap-2 bg-ink px-6 py-4 font-bold text-cream transition-transform hover:-rotate-1"
            >
              <Download size={15} /> Download resume
            </a>
            <a
              href={site.resume}
              id="resume-view"
              target="_blank"
              rel="noopener"
              className="t-label rough-box inline-flex items-center gap-2 px-6 py-4 font-bold hover:bg-ink hover:text-cream"
            >
              <Eye size={15} /> View resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8">
          <a href={site.resume} target="_blank" rel="noopener" aria-label="Open resume PDF" className="group relative block">
            {/* sheets behind */}
            <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-3 rotate-[5deg] bg-bone shadow-lg" />
            <span aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-1 rotate-[2deg] bg-cream shadow-md" />
            {/* front sheet */}
            <span className="card-paper relative block aspect-[1/1.32] -rotate-2 p-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-0 md:p-9">
              {/* paperclip */}
              <svg aria-hidden="true" viewBox="0 0 40 90" className="absolute -top-7 right-10 h-20 w-9 text-graphite" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M28 30 V 70 a 10 10 0 0 1 -20 0 V 18 a 7 7 0 0 1 14 0 V 64 a 3 3 0 0 1 -6 0 V 28" />
              </svg>
              <span className="t-display block text-4xl">{site.name}</span>
              <span className="t-label mt-1 block text-[0.6rem] text-blue-deep">{site.positioning}</span>
              <span className="mt-6 block h-px bg-ink/30" />
              {[["w-1/3", 3], ["w-1/4", 4], ["w-2/5", 3], ["w-1/3", 2]].map(([w, lines], gi) => (
                <span key={gi} className="mt-5 block" aria-hidden="true">
                  <span className={`block h-2.5 ${w} bg-ink/70`} />
                  {Array.from({ length: lines as number }).map((_, li) => (
                    <span key={li} className="mt-2 block h-1.5 bg-ink/15" style={{ width: `${92 - li * 9}%` }} />
                  ))}
                </span>
              ))}
              <span className="absolute right-6 bottom-6 text-amber">
                <CircleBadge text="OPEN THE PDF · OPEN THE PDF · " size={96} spin={false} center={<Eye size={20} />} />
              </span>
            </span>
          </a>
          <p className="t-hand mt-10 rotate-[-2deg] text-center text-2xl text-blue-deep">one page. no fluff.</p>
        </Reveal>
      </div>
    </section>
  );
}
