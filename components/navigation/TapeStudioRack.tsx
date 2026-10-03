"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { soundEngine, SECTION_TRACKS } from "@/lib/soundEngine";
import { Disc3, Sliders, Volume2, Sparkles, X } from "lucide-react";

interface TapeStudioRackProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrackIndex: number;
}

export function TapeStudioRack({ isOpen, onClose, activeTrackIndex }: TapeStudioRackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(88); // 88% default
  const [filterCutoff, setFilterCutoff] = useState(4800);
  const [activePad, setActivePad] = useState<string | null>(null);
  const [reelAngle, setReelAngle] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Sync with audio engine state
  useEffect(() => {
    if (!soundEngine) return;
    setIsPlaying(soundEngine.getPlaying());
    setVolume(Math.round(soundEngine.getVolume() * 100));
    setFilterCutoff(soundEngine.getFilterCutoff());

    const unsub = soundEngine.subscribe((p) => setIsPlaying(p));
    return () => {
      unsub();
    };
  }, []);

  // Keyboard shortcut listener for drum pads (1, 2, 3, 4)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "1") trigger("kick");
      if (e.key === "2") trigger("snare");
      if (e.key === "3") trigger("chime");
      if (e.key === "4") trigger("scratch");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const trigger = useCallback((pad: "kick" | "snare" | "chime" | "scratch") => {
    if (!soundEngine) return;
    setActivePad(pad);
    soundEngine.triggerPad(pad);
    setTimeout(() => setActivePad(null), 140);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    soundEngine?.setVolume(val / 100);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setFilterCutoff(val);
    soundEngine?.setFilterCutoff(val);
  };

  // Live CRT Oscilloscope Canvas Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const timeData = new Uint8Array(256);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);

      // Rotate reels if playing
      if (soundEngine?.getPlaying()) {
        setReelAngle((prev) => (prev + 2.5) % 360);
      }

      soundEngine?.getByteTimeDomainData(timeData);

      const width = canvas.width;
      const height = canvas.height;

      // Dark CRT backdrop with slight phosphor persistence
      ctx.fillStyle = "rgba(18, 20, 24, 0.35)";
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope Grid Lines
      ctx.strokeStyle = "rgba(224, 138, 46, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 24) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 18) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Waveform line
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = soundEngine?.getPlaying() ? "#E08A2E" : "#4A70A9";
      ctx.shadowBlur = 8;
      ctx.shadowColor = soundEngine?.getPlaying() ? "rgba(224, 138, 46, 0.6)" : "rgba(74, 112, 169, 0.4)";

      ctx.beginPath();
      const sliceWidth = width / timeData.length;
      let x = 0;

      for (let i = 0; i < timeData.length; i++) {
        const v = timeData[i] / 128.0; // 0 to 2, centered at 1
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="TS-808 Tape Synth Rack & Audio Studio"
      className="pointer-events-auto absolute bottom-[calc(var(--console-h)+12px)] inset-x-3 mx-auto w-full max-w-[860px] overflow-hidden rounded-[14px] border border-amber/30 bg-[#16171a]/95 p-4 text-cream shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300 md:p-6"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-cream/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-amber/20 text-amber">
            <Sliders size={16} />
          </span>
          <div>
            <h3 className="t-mono text-xs font-bold uppercase tracking-wider text-amber">
              TS-808 Tape Studio & Soundboard
            </h3>
            <p className="t-label text-[0.62rem] text-cream/60">
              Interactive analog rack · Live Web Audio DSP · {SECTION_TRACKS[activeTrackIndex]?.name || "Intro"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Tape Rack"
          className="grid h-8 w-8 place-items-center rounded-full border border-cream/10 text-cream/60 transition-colors hover:border-amber hover:text-amber"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Studio Body: Grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        {/* Left: CRT Oscilloscope & Reels */}
        <div className="flex flex-col gap-2 rounded-lg border border-cream/10 bg-[#0d0e11] p-3 lg:col-span-6">
          <div className="flex items-center justify-between text-[0.65rem] text-cream/50">
            <span className="t-mono flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "bg-amber animate-pulse" : "bg-blue"}`} />
              CRT OSCILLOSCOPE
            </span>
            <span className="t-mono">{isPlaying ? "48 kHz · 76 BPM" : "STANDBY"}</span>
          </div>

          {/* Canvas Waveform */}
          <div className="relative aspect-[2.6/1] w-full overflow-hidden rounded border border-cream/10 bg-black">
            <canvas ref={canvasRef} width={420} height={160} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)]" />
          </div>

          {/* Dual Tape Reels */}
          <div className="flex items-center justify-center gap-6 pt-1">
            <div className="flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-full border border-amber/40 bg-ink text-amber transition-transform"
                style={{ transform: `rotate(${reelAngle}deg)` }}
              >
                <Disc3 size={18} />
              </div>
              <span className="t-mono text-[0.6rem] text-cream/40">FEED</span>
            </div>
            <div className="h-[2px] w-14 bg-gradient-to-r from-amber/40 via-blue/40 to-amber/40" />
            <div className="flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-full border border-amber/40 bg-ink text-amber transition-transform"
                style={{ transform: `rotate(${reelAngle * 1.1}deg)` }}
              >
                <Disc3 size={18} />
              </div>
              <span className="t-mono text-[0.6rem] text-cream/40">TAKEUP</span>
            </div>
          </div>
        </div>

        {/* Right: 4 Playable Pads & Rotary Sliders */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-6">
          {/* 4 Interactive Drum / SFX Pads */}
          <div>
            <div className="mb-2 flex items-center justify-between text-[0.65rem] text-cream/60">
              <span className="t-mono font-bold uppercase text-amber flex items-center gap-1">
                <Sparkles size={11} /> Playable Soundboard Pads
              </span>
              <span className="t-mono text-[0.6rem] opacity-60">Keys [1, 2, 3, 4]</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "kick" as const, key: "1", label: "808 Kick", color: "hover:border-amber hover:text-amber" },
                { id: "snare" as const, key: "2", label: "Rim Snap", color: "hover:border-blue hover:text-blue" },
                { id: "chime" as const, key: "3", label: "Chime Arp", color: "hover:border-amber hover:text-amber" },
                { id: "scratch" as const, key: "4", label: "DJ Scratch", color: "hover:border-cream hover:text-cream" },
              ].map((pad) => (
                <button
                  key={pad.id}
                  type="button"
                  onClick={() => trigger(pad.id)}
                  className={`group relative flex flex-col items-center justify-center rounded-lg border p-2.5 transition-all duration-150 active:scale-95 ${
                    activePad === pad.id
                      ? "border-amber bg-amber/25 text-amber scale-95 shadow-[0_0_15px_rgba(224,138,46,0.4)]"
                      : "border-cream/15 bg-ink/70 text-cream/80 hover:bg-cream/5"
                  } ${pad.color}`}
                >
                  <span className="t-mono absolute top-1.5 left-2 text-[0.55rem] opacity-50 font-bold">
                    [{pad.key}]
                  </span>
                  <span className="t-mono mt-2 text-xs font-bold">{pad.label}</span>
                  <span className="t-mono text-[0.55rem] opacity-40 uppercase">TAP</span>
                </button>
              ))}
            </div>
          </div>

          {/* Master Sound Controls */}
          <div className="space-y-3 rounded-lg border border-cream/10 bg-ink/50 p-3">
            {/* Master Volume */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="t-mono flex items-center gap-1.5 text-cream/70">
                  <Volume2 size={13} className="text-amber" /> Master Volume
                </span>
                <span className="t-mono font-bold text-amber">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={volume}
                onChange={handleVolumeChange}
                className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-cream/20 accent-amber"
              />
            </div>

            {/* Analog Lowpass Filter */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="t-mono flex items-center gap-1.5 text-cream/70">
                  Tape Cutoff Filter
                </span>
                <span className="t-mono font-bold text-blue">{filterCutoff} Hz</span>
              </div>
              <input
                type="range"
                min="600"
                max="12000"
                step="100"
                value={filterCutoff}
                onChange={handleFilterChange}
                className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-cream/20 accent-blue"
              />
            </div>
          </div>

          {/* Track Presets */}
          <div className="flex items-center justify-between border-t border-cream/10 pt-2 text-[0.62rem] text-cream/50">
            <span className="t-mono">PRESET: {SECTION_TRACKS[activeTrackIndex]?.key || "C Maj"}</span>
            <span className="t-mono text-amber">100% Client Web Audio · Zero Buffering</span>
          </div>
        </div>
      </div>
    </div>
  );
}
