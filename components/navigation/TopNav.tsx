"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX, Menu, X, Sparkles } from "lucide-react";
import { sections, site } from "@/lib/site";
import { scrollToSection, useActiveSection } from "@/lib/useActiveSection";
import { soundEngine } from "@/lib/soundEngine";

const navItems = sections.filter((s) => "nav" in s && s.nav) as unknown as {
  id: string;
  nav: string;
}[];

function MiniEqualizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-1" : "h-1 opacity-40"}`} />
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-2" : "h-2.5 opacity-40"}`} />
      <span className={`w-[2px] rounded-full bg-amber transition-all duration-300 ${active ? "animate-eq-3" : "h-1.5 opacity-40"}`} />
    </div>
  );
}

export function TopNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position for dynamic glassmorphic morph & reading progress
  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 28);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Audio engine subscription
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
    soundEngine.playTap();
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
    soundEngine?.playTap();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "pt-2 md:pt-3" : "pt-4 md:pt-6"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 md:px-10">
          <nav
            aria-label="Primary"
            className={`relative mx-auto flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? "max-w-[1100px] rounded-full border border-cream/15 bg-ink/85 px-4 py-2 text-cream shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                : "rounded-2xl border border-transparent bg-transparent px-2 py-1 text-cream"
            }`}
          >
            {/* Reading progress laser bar (visible on scroll) */}
            {scrolled && (
              <div className="absolute inset-x-6 -bottom-[1px] h-[2px] overflow-hidden rounded-full bg-cream/10">
                <div
                  className="h-full bg-gradient-to-r from-amber via-sun to-amber transition-transform duration-100 ease-out origin-left"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>
            )}

            {/* Brand / Logo stamp */}
            <a
              href="#index"
              onClick={go("index")}
              className="group flex items-center gap-2.5 focus-visible:outline-none"
            >
              <span className="t-display grid h-9 w-9 place-items-center rounded-lg border border-amber/40 bg-ink/60 text-base text-amber shadow-[0_2px_10px_rgba(224,138,46,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-6deg] group-active:scale-95">
                {site.initials}
              </span>
              <span className="t-label leading-tight">
                <span className="block font-bold tracking-wider text-cream group-hover:text-amber transition-colors">
                  {site.firstName}
                </span>
                <span className="text-[0.58rem] text-cream/50 tracking-wider">
                  ENGINEER · V1
                </span>
              </span>
            </a>

            {/* Desktop Navigation Links with animated active indicator */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`t-label relative block rounded-full px-3.5 py-1.5 text-xs transition-colors duration-200 ${
                        isActive
                          ? "text-amber font-bold"
                          : "text-cream/75 hover:text-cream"
                      }`}
                    >
                      <span className="mr-1 text-[0.65rem] opacity-40 font-mono">0{i}</span>
                      {item.nav}

                      {/* Smooth animated active pill */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-amber/40 bg-amber/15 shadow-[0_0_12px_rgba(224,138,46,0.25)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right side: Audio toggle & status pill */}
            <div className="flex items-center gap-2.5">
              {/* Sound toggle button */}
              <button
                type="button"
                id="topnav-audio-toggle"
                onClick={toggleSound}
                className="t-label inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ink/50 px-3 py-1.5 text-[0.65rem] text-cream/90 transition-all hover:border-amber hover:text-amber active:scale-95"
                title={soundActive && !isMuted ? "Click to mute" : "Click to play ambient music"}
              >
                <MiniEqualizer active={soundActive && !isMuted} />
                {soundActive && !isMuted ? (
                  <Volume2 size={13} className="text-amber" />
                ) : (
                  <VolumeX size={13} className="opacity-50" />
                )}
                <span className="t-mono hidden sm:inline">
                  {soundActive && !isMuted ? "MUSIC" : "SOUND OFF"}
                </span>
              </button>

              {/* Status pill (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-cream/15 bg-ink/40 px-3 py-1.5 text-[0.62rem] text-cream/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="t-mono font-medium">OPEN FOR INTERNSHIPS</span>
              </div>

              {/* Mobile Menu trigger */}
              <button
                type="button"
                id="mobile-menu-button"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 bg-ink/60 text-cream transition-colors hover:border-amber hover:text-amber md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Open contents menu"
                onClick={() => {
                  soundEngine?.playTap();
                  setOpen(true);
                }}
              >
                <Menu size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Contents Menu"
            className="surface-paper grid-paper fixed inset-0 z-[70] flex flex-col justify-between p-6 md:p-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <span className="t-mono text-xs font-bold text-ink/60 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber" /> Table of Contents
              </span>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream text-ink shadow-[2px_2px_0px_#121316] transition-transform active:scale-95"
                onClick={() => {
                  soundEngine?.playTap();
                  setOpen(false);
                }}
                autoFocus
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <ol className="my-auto space-y-3 py-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="t-mono text-xs text-blue-deep font-bold">0{i}</span>
                    <span className="t-display text-4xl sm:text-5xl text-ink transition-transform duration-200 group-hover:translate-x-2 group-hover:text-amber">
                      {item.nav}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>

            <div className="border-t border-ink/15 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="t-mono inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-xs font-bold text-ink shadow-[2px_2px_0px_#121316]"
                >
                  <MiniEqualizer active={soundActive && !isMuted} />
                  {soundActive && !isMuted ? (
                    <Volume2 size={15} className="text-amber" />
                  ) : (
                    <VolumeX size={15} className="opacity-50" />
                  )}
                  <span>{soundActive && !isMuted ? "MUSIC: ACTIVE" : "MUSIC: MUTED"}</span>
                </button>

                <span className="t-mono text-[0.65rem] text-ink/60">
                  {site.graduation} · {site.universityShort}
                </span>
              </div>
              <p className="t-hand rotate-[-1deg] text-lg text-blue-deep">
                {site.supportingTagline}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
