"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Sliders, Volume2, VolumeX } from "lucide-react";
import { sections } from "@/lib/site";
import { scrollToSection, useActiveSection } from "@/lib/useActiveSection";
import { soundEngine } from "@/lib/soundEngine";
import { TapeStudioRack } from "./TapeStudioRack";

const TOUR_MS = 5200;

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-3.5 items-end gap-[2px] px-0.5" aria-hidden="true">
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-1" : "h-1 opacity-40"}`} />
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-2" : "h-2.5 opacity-40"}`} />
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-3" : "h-1.5 opacity-40"}`} />
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-4" : "h-2 opacity-40"}`} />
    </div>
  );
}

/**
 * Fixed bottom "console": a tape-deck style controller for the page with
 * real-time procedural lo-fi ambient audio, responsive chords per section,
 * auto-tour player, and dancing equalizer bars.
 */
export function Console() {
  const active = useActiveSection();
  const idx = Math.max(0, sections.findIndex((s) => s.id === active));
  const [touring, setTouring] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  // Subscribe to audio engine state
  useEffect(() => {
    if (!soundEngine) return;
    const unsub = soundEngine.subscribe((p) => setSoundActive(p));
    return () => {
      unsub();
    };
  }, []);

  // Update procedural ambient chord and filter as the user scrolls into different sections
  useEffect(() => {
    if (soundEngine) {
      soundEngine.setTrack(idx);
    }
  }, [idx]);

  const jump = useCallback((to: number) => {
    soundEngine?.playClick();
    const clamped = Math.min(sections.length - 1, Math.max(0, to));
    scrollToSection(sections[clamped].id);
  }, []);

  // scroll progress — written straight to the DOM, no re-renders
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // auto-tour
  useEffect(() => {
    if (!touring) return;
    const stopTour = () => setTouring(false);
    const t = window.setInterval(() => {
      if (idxRef.current >= sections.length - 1) return setTouring(false);
      jump(idxRef.current + 1);
    }, TOUR_MS);
    window.addEventListener("wheel", stopTour, { passive: true });
    window.addEventListener("touchstart", stopTour, { passive: true });
    window.addEventListener("keydown", stopTour);
    return () => {
      clearInterval(t);
      window.removeEventListener("wheel", stopTour);
      window.removeEventListener("touchstart", stopTour);
      window.removeEventListener("keydown", stopTour);
    };
  }, [touring, jump]);

  const togglePlay = () => {
    soundEngine?.playClick();
    if (!touring && !soundActive) {
      // Start both audio and auto-tour
      if (idx >= sections.length - 1) jump(0);
      setTouring(true);
      soundEngine?.start();
    } else if (touring) {
      setTouring(false);
      soundEngine?.stop();
    } else {
      // Just start/stop audio
      soundEngine?.toggle();
    }
  };

  const toggleSound = () => {
    if (!soundEngine) return;
    soundEngine.playClick();
    if (!soundActive) {
      soundEngine.start();
      setIsMuted(false);
    } else {
      const muted = soundEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  const btn =
    "grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-cream/10 focus-visible:bg-cream/10";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 md:pb-5">
      <div
        role="region"
        aria-label="Tape console audio player"
        className="pointer-events-auto relative flex h-[var(--console-h)] w-full max-w-[860px] items-center gap-2 overflow-hidden border border-cream/15 bg-ink/90 px-2 text-cream shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md md:gap-4 md:px-4"
        style={{ borderRadius: "14px 6px 14px 6px" }}
      >
        {/* progress */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-cream/10">
          <div ref={barRef} className="h-full origin-left bg-amber" style={{ transform: "scaleX(0)" }} />
        </div>

        <div className="flex items-center">
          <button type="button" id="console-prev" className={btn} aria-label="Previous section" onClick={() => jump(idx - 1)}>
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            id="console-play"
            onClick={togglePlay}
            aria-pressed={touring || soundActive}
            aria-label={touring || soundActive ? "Pause music and tour" : "Play ambient music and tour"}
            title={touring || soundActive ? "Pause" : "Play music & tour"}
            className="grid h-10 w-10 place-items-center rounded-full bg-amber text-ink transition-transform hover:scale-105 active:scale-95"
          >
            {touring || soundActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </button>
          <button type="button" id="console-next" className={btn} aria-label="Next section" onClick={() => jump(idx + 1)}>
            <SkipForward size={15} />
          </button>
        </div>

        {/* now playing */}
        <div className="min-w-0 flex-1" aria-live="polite">
          <div className="t-label flex items-center gap-2 text-[0.6rem] text-blue">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${touring || soundActive ? "bg-amber caret" : "bg-blue"}`} />
            {touring ? "Now touring" : soundActive ? "Lo-fi synth active" : "Track"} {String(idx + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
          </div>
          <div className="t-mono truncate text-xs font-bold uppercase md:text-sm">{sections[idx].label}</div>
        </div>

        {/* track ticks (desktop) */}
        <ol className="hidden items-center gap-1 lg:flex" aria-label="Sections">
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-label={`Go to ${s.label}`}
                aria-current={i === idx ? "true" : undefined}
                className="group grid h-8 w-5 place-items-center"
              >
                <span
                  className={`block w-[3px] rounded-full transition-all duration-300 ${
                    i === idx ? "h-6 bg-amber" : i < idx ? "h-3 bg-cream/60 group-hover:h-5" : "h-3 bg-cream/20 group-hover:h-5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>

        {/* Sound toggle button with animated equalizer */}
        <button
          type="button"
          id="console-sound-toggle"
          onClick={toggleSound}
          aria-label={soundActive && !isMuted ? "Mute audio soundscape" : "Play ambient lo-fi soundscape"}
          title={soundActive && !isMuted ? "Click to mute" : "Click to play ambient music"}
          className="flex items-center gap-1.5 rounded-full border border-cream/15 px-2.5 py-1 text-cream/80 transition-colors hover:border-amber hover:text-amber"
        >
          <Equalizer active={soundActive && !isMuted} />
          {soundActive && !isMuted ? <Volume2 size={13} className="text-amber" /> : <VolumeX size={13} className="opacity-50" />}
          <span className="t-mono hidden text-[0.62rem] sm:inline">
            {soundActive ? (isMuted ? "MUTED" : "MUSIC") : "SOUND"}
          </span>
        </button>

        {/* Unique Feature: TS-808 Tape Studio Rack toggle */}
        <button
          type="button"
          id="console-studio-toggle"
          onClick={() => {
            soundEngine?.playTap();
            setIsStudioOpen((prev) => !prev);
          }}
          aria-expanded={isStudioOpen}
          aria-label={isStudioOpen ? "Close Studio Rack" : "Open TS-808 Studio Rack"}
          title="Open TS-808 Synthesizer & Soundboard"
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
            isStudioOpen
              ? "border-amber bg-amber/20 text-amber font-bold"
              : "border-cream/15 text-cream/80 hover:border-amber hover:text-amber"
          }`}
        >
          <Sliders size={12} className={isStudioOpen ? "text-amber" : "opacity-60"} />
          <span className="t-mono text-[0.62rem]">STUDIO</span>
        </button>

        <span className="t-label hidden border-l border-cream/15 pl-3 text-[0.6rem] text-cream/50 md:block">
          TRIDIBESH
        </span>
      </div>

      {/* Pop-up Interactive TS-808 Tape Studio Rack */}
      <TapeStudioRack
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        activeTrackIndex={idx}
      />
    </div>
  );
}
