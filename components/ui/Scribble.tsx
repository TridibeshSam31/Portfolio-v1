"use client";

import { useEffect, useRef, useState } from "react";

/** Hand-drawn SVG marks that "draw on" when scrolled into view. */
export function Scribble({
  variant = "underline",
  className = "",
  color = "var(--color-amber)",
}: {
  variant?: "underline" | "circle" | "arrow" | "arrow-down";
  className?: string;
  color?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const common = {
    ref,
    className: `scribble pointer-events-none ${drawn ? "drawn" : ""} ${className}`,
    fill: "none",
    stroke: color,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (variant === "circle")
    return (
      <svg viewBox="0 0 220 90" preserveAspectRatio="none" {...common}>
        <path d="M120 8 C 50 4, 8 22, 10 46 C 12 74, 80 86, 140 80 C 196 74, 214 52, 206 32 C 196 10, 140 4, 90 12" />
      </svg>
    );
  if (variant === "arrow")
    return (
      <svg viewBox="0 0 120 60" {...common}>
        <path d="M6 48 C 30 14, 70 6, 104 22" />
        <path d="M92 10 L 106 23 L 88 30" />
      </svg>
    );
  if (variant === "arrow-down")
    return (
      <svg viewBox="0 0 60 110" {...common}>
        <path d="M30 6 C 14 30, 46 56, 28 96" />
        <path d="M16 84 L 28 98 L 40 82" />
      </svg>
    );
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" {...common}>
      <path d="M4 14 C 60 4, 120 18, 180 9 S 270 6, 296 12" />
    </svg>
  );
}
