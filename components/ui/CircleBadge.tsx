type Props = {
  text: string;
  size?: number;
  className?: string;
  center?: React.ReactNode;
  spin?: boolean;
};

/** Rotating circular text badge (pure SVG + CSS). */
export function CircleBadge({ text, size = 132, className = "", center, spin = true }: Props) {
  const id = `c-${text.replace(/[^a-z]/gi, "").slice(0, 12)}`;
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 120 120" className={`absolute inset-0 h-full w-full ${spin ? "spin-slow" : ""}`}>
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="currentColor" opacity="0.0" />
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <text fill="currentColor" style={{ fontFamily: "var(--font-mono)", fontSize: 9.2, letterSpacing: 2.6 }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{center}</div>
    </div>
  );
}
