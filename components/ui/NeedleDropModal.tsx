"use client";

import { useEffect, useState } from "react";
import { soundEngine } from "@/lib/soundEngine";
import { Disc3, Play, Volume2 } from "lucide-react";

export function NeedleDropModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro during this session
    try {
      const seen = sessionStorage.getItem("ts:intro_seen");
      if (!seen) {
        setIsOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem("ts:intro_seen", "1");
    } catch {}
    setIsOpen(false);
  };

  const handleDropNeedle = () => {
    if (isDropping) return;
    setIsDropping(true);

    // Synchronously unlock audio context
    soundEngine?.unlock();
    soundEngine?.playNeedleDrop();

    // Start background lo-fi music after needle lands
    setTimeout(() => {
      soundEngine?.start();
      close();
    }, 700);
  };

  const handleEnterQuietly = () => {
    soundEngine?.unlock();
    soundEngine?.playTap();
    close();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome intro: Drop the needle"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border-2 border-amber/40 bg-[#16171a] p-6 text-cream shadow-[0_25px_70px_rgba(0,0,0,0.9)] md:p-8"
        style={{ borderRadius: "18px 8px 18px 8px" }}
      >
        {/* Subtle decorative vinyl ring background */}
        <div className="flex flex-col items-center text-center">
          {/* Vinyl Record Icon */}
          <div className="relative mb-5 grid h-24 w-24 place-items-center rounded-full border-4 border-amber/30 bg-[#0d0e11] shadow-[0_0_30px_rgba(224,138,46,0.25)]">
            <Disc3
              size={56}
              className={`text-amber transition-transform duration-700 ${
                isDropping ? "animate-spin" : ""
              }`}
            />
            <span className="absolute h-4 w-4 rounded-full border border-amber/60 bg-ink" />
          </div>

          <span className="t-mono text-[0.65rem] font-bold tracking-widest text-amber uppercase">
            Live 2026 Workbench
          </span>
          <h2 className="t-display mt-1 text-3xl md:text-4xl text-cream leading-tight">
            Tridibesh Samantroy
          </h2>
          <p className="t-serif mt-2 text-sm text-cream/70">
            Full-stack & distributed systems engineer. Best experienced with ambient soundscape on.
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex w-full flex-col gap-2.5">
            <button
              type="button"
              id="intro-drop-needle"
              onClick={handleDropNeedle}
              disabled={isDropping}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 t-mono text-xs font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_6px_20px_rgba(224,138,46,0.35)]"
            >
              <Play size={14} fill="currentColor" />
              <span>{isDropping ? "Dropping Needle..." : "DROP THE NEEDLE (SOUND ON)"}</span>
            </button>

            <button
              type="button"
              onClick={handleEnterQuietly}
              className="t-hand text-sm text-cream/50 transition-colors hover:text-amber py-1"
            >
              or enter quietly →
            </button>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[0.6rem] t-mono text-cream/40">
            <Volume2 size={11} className="text-amber" />
            <span>Procedural Web Audio · Press Esc or click to enter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
