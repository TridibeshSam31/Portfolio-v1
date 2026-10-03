import { Reveal } from "./Reveal";

type Props = {
  track: string;
  kicker: string;
  title: React.ReactNode;
  note?: string;
  tone?: "dark" | "light";
  id?: string;
};

/** Poster-style section heading: track number, kicker, giant title, handwritten aside. */
export function SectionHeader({ track, kicker, title, note, tone = "dark", id }: Props) {
  const muted = tone === "dark" ? "text-blue" : "text-blue-deep";
  return (
    <Reveal className="relative mb-12 md:mb-20">
      <div className={`t-label flex items-center gap-3 ${muted}`}>
        <span className="rough-box px-2 py-0.5">TRACK {track}</span>
        <span className="h-px w-10 bg-current opacity-50" />
        <span>{kicker}</span>
      </div>
      <h2 id={id} className="t-display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.92]">
        {title}
      </h2>
      {note && (
        <p className="t-hand mt-2 rotate-[-2deg] text-2xl text-amber md:absolute md:right-0 md:bottom-4 md:mt-0 md:max-w-[16rem] md:text-right md:text-3xl">
          {note}
        </p>
      )}
    </Reveal>
  );
}
