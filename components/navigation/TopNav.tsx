"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { sections, site } from "@/lib/site";
import { scrollToSection, useActiveSection } from "@/lib/useActiveSection";
import { soundEngine } from "@/lib/soundEngine";

const navItems = sections.filter((s) => "nav" in s && s.nav) as unknown as {
  id: string;
  nav: string;
}[];

export function TopNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!soundEngine) return;
    const unsub = soundEngine.subscribe((p) => {
      setSoundActive(p);
      setIsMuted(soundEngine.getMuted());
    });
    return () => {
      unsub();
    };
  }, []);

  const toggleSound = () => {
    if (!soundEngine) return;
    soundEngine.playClick();
    if (!soundActive) {
      soundEngine.start();
      setIsMuted(false);
    } else {
      const m = soundEngine.toggleMute();
      setIsMuted(m);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-cream mix-blend-difference">
        <nav aria-label="Primary" className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#index" onClick={go("index")} className="group flex items-center gap-3">
            <span className="t-display rough grid h-10 w-10 place-items-center text-lg transition-transform duration-500 group-hover:rotate-[-12deg]">
              {site.initials}
            </span>
            <span className="t-label hidden leading-tight sm:block">
              {site.firstName}
              <br />
              <span className="opacity-60">notebook / v1</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="t-label relative block px-3 py-2"
                  >
                    <span className="mr-1 opacity-50">0{i}</span>
                    {item.nav}
                    {isActive && (
                      <motion.span
                        layoutId="nav-mark"
                        className="absolute inset-x-2 -bottom-0.5 h-[2px] bg-current"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              id="topnav-audio-toggle"
              onClick={toggleSound}
              className="t-label inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1 text-[0.62rem] transition-colors hover:border-amber hover:text-amber"
              title={soundActive && !isMuted ? "Click to mute" : "Click to play ambient music"}
            >
              {soundActive && !isMuted ? <Volume2 size={12} className="text-amber" /> : <VolumeX size={12} className="opacity-50" />}
              <span>{soundActive && !isMuted ? "LO-FI SOUND [ON]" : "MUSIC [OFF]"}</span>
            </button>

            <span className="t-label flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-current" />
              Open to internships
            </span>
          </div>

          <button
            type="button"
            id="mobile-menu-button"
            className="t-label rough-box px-3 py-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="surface-paper grid-paper fixed inset-0 z-[70] flex flex-col px-6 pt-5 pb-28"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="t-label">Contents</span>
              <button
                type="button"
                className="t-label rough-box px-3 py-2"
                onClick={() => setOpen(false)}
                autoFocus
              >
                Close
              </button>
            </div>
            <ol className="mt-10 flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <a href={`#${item.id}`} onClick={go(item.id)} className="flex items-baseline gap-4">
                    <span className="t-mono text-sm text-blue-deep">0{i}</span>
                    <span className="t-display text-6xl">{item.nav}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
            <div className="mt-8 flex items-center justify-between border-t border-ink/20 pt-4">
              <button
                type="button"
                onClick={toggleSound}
                className="t-label inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-xs"
              >
                {soundActive && !isMuted ? <Volume2 size={14} className="text-amber" /> : <VolumeX size={14} className="opacity-50" />}
                <span>{soundActive && !isMuted ? "Ambient Audio: ON" : "Ambient Audio: OFF"}</span>
              </button>
            </div>
            <p className="t-hand mt-4 rotate-[-2deg] text-2xl text-blue-deep">{site.supportingTagline}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
