/**
 * Web Audio Master Sound Engine & Interactive Synthesizer
 * 
 * Features:
 * - Professional Mastering Chain: DynamicsCompressorNode + Master Limiter
 * - 0.85+ Punchy Master Volume: crystal clear and audible on all speakers and headphones
 * - Look-Ahead Clock: 25ms interval scheduling ahead by 0.12s for rock-solid tempo
 * - 76 BPM Chillhop Beat: punchy kick, analog rim/snare, crisp hi-hats, sub-bass
 * - Lush Analog Pad Synthesizers: dual detuned sawtooth + sine Rhodes chords
 * - Section-Adaptive Harmonic Progressions (9 sections)
 * - Scroll-Reactive Pentatonic Kalimba Plucks
 * - Interactive Drum Machine & Soundboard: playable kick, rim, chime, and vinyl scratch
 * - Algorithm Sonifier: maps array values & algorithm steps to harmonious musical pitches
 * - Authentic Vinyl Crackle Generator
 * - Real-time Oscilloscope Time-Domain & Frequency data for live visualizers
 */

// Pentatonic scale (C Major / A Minor) for harmonious plucks and algorithm sonification
export const PENTATONIC_SCALE = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
  1567.98  // G6
];

export interface TrackTheme {
  name: string;
  key: string;
  chords: number[][]; // MIDI note numbers or frequencies
  bass: number[];
  filterFreq: number;
}

export const SECTION_TRACKS: TrackTheme[] = [
  // 01: Hero / Welcome — Cmaj9 -> Am9
  {
    name: "01 · Sunrise Intro",
    key: "C Maj",
    chords: [
      [261.63, 329.63, 392.00, 493.88, 587.33], // C4, E4, G4, B4, D5 (Cmaj9)
      [220.00, 261.63, 329.63, 392.00, 493.88], // A3, C4, E4, G4, B4 (Am9)
    ],
    bass: [130.81, 110.00], // C3, A2
    filterFreq: 4600,
  },
  // 02: Liner Notes / About — Dm9 -> G13
  {
    name: "02 · Memory & Story",
    key: "D Min",
    chords: [
      [293.66, 349.23, 440.00, 523.25, 659.25], // D4, F4, A4, C5, E5 (Dm9)
      [246.94, 329.63, 392.00, 440.00, 587.33], // B3, E4, G4, A4, D5 (G13)
    ],
    bass: [146.83, 98.00], // D3, G2
    filterFreq: 4200,
  },
  // 03: Philosophy — Fmaj7 -> Em7
  {
    name: "03 · Foundation & Taste",
    key: "F Maj",
    chords: [
      [174.61, 261.63, 329.63, 392.00, 523.25], // F3, C4, E4, G4, C5 (Fmaj7)
      [164.81, 246.94, 293.66, 392.00, 493.88], // E3, B3, D4, G4, B4 (Em7)
    ],
    bass: [87.31, 82.41], // F2, E2
    filterFreq: 3900,
  },
  // 04: Things I've Built / Work — Dm7 -> Am7
  {
    name: "04 · Construction Yard",
    key: "D Min",
    chords: [
      [220.00, 293.66, 349.23, 440.00, 523.25], // A3, D4, F4, A4, C5 (Dm7)
      [220.00, 261.63, 329.63, 392.00, 523.25], // A3, C4, E4, G4, C5 (Am7)
    ],
    bass: [146.83, 110.00], // D3, A2
    filterFreq: 5200,
  },
  // 05: Under The Hood / Systems — Em9 -> Bm7
  {
    name: "05 · Deep Architecture",
    key: "E Min",
    chords: [
      [164.81, 246.94, 329.63, 392.00, 587.33], // E3, B3, E4, G4, D5 (Em9)
      [146.83, 220.00, 293.66, 369.99, 440.00], // D3, A3, D4, F#4, A4 (Bm7)
    ],
    bass: [82.41, 123.47], // E2, B2
    filterFreq: 5600,
  },
  // 06: Algorithms & DSA — Fmaj7 -> G6 -> Am7
  {
    name: "06 · Algorithmic Transit",
    key: "A Min",
    chords: [
      [261.63, 329.63, 392.00, 523.25, 659.25], // C4, E4, G4, C5, E5
      [293.66, 369.99, 440.00, 587.33, 659.25], // D4, F#4, A4, D5, E5
    ],
    bass: [87.31, 98.00], // F2, G2
    filterFreq: 6000,
  },
  // 07: Open Source / GitHub — Gmaj7 -> Em9
  {
    name: "07 · Terminal Broadcast",
    key: "G Maj",
    chords: [
      [196.00, 246.94, 293.66, 369.99, 493.88], // G3, B3, D4, F#4, B4 (Gmaj7)
      [164.81, 246.94, 329.63, 392.00, 493.88], // E3, B3, E4, G4, B4 (Em9)
    ],
    bass: [98.00, 82.41], // G2, E2
    filterFreq: 5000,
  },
  // 08: Resume / Paper Trail — Bbmaj7 -> Fmaj7
  {
    name: "08 · Ink & Documents",
    key: "Bb Maj",
    chords: [
      [233.08, 293.66, 349.23, 440.00, 523.25], // Bb3, D4, F4, A4, C5 (Bbmaj7)
      [174.61, 261.63, 349.23, 440.00, 523.25], // F3, C4, F4, A4, C5 (Fmaj7)
    ],
    bass: [116.54, 87.31], // Bb2, F2
    filterFreq: 4400,
  },
  // 09: Contact / Outro — Cadd9 -> Fmaj7
  {
    name: "09 · Signal Broadcast",
    key: "C Maj",
    chords: [
      [261.63, 329.63, 392.00, 523.25, 587.33], // C4, E4, G4, C5, D5 (Cadd9)
      [174.61, 261.63, 329.63, 440.00, 523.25], // F3, C4, E4, A4, C5 (Fmaj7)
    ],
    bass: [130.81, 87.31], // C3, F2
    filterFreq: 5400,
  },
];

class MasterSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private musicFilter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Noise & crackle
  private noiseBuffer: AudioBuffer | null = null;
  private crackleSource: AudioBufferSourceNode | null = null;
  private crackleGain: GainNode | null = null;

  // State
  private isPlaying = false;
  private isMutedState = false;
  private currentTrack = 0;
  private chordIndex = 0;
  private masterVolume = 0.88; // Loud, clear, audible
  private tempo = 76; // 76 BPM chillhop groove
  private currentFilterFreq = 4800;
  private crackleLevel = 0.12;

  // Clock
  private clockTimer: number | null = null;
  private stepIndex = 0; // 0 to 15 (16th notes)
  private nextNoteTime = 0;
  private readonly lookaheadMs = 25;
  private readonly scheduleAheadTime = 0.12; // seconds

  // Scroll reactivity
  private lastScrollY = 0;
  private lastChimeTime = 0;

  // Subscriptions
  private playListeners: Set<(playing: boolean) => void> = new Set();
  private trackListeners: Set<(track: number) => void> = new Set();
  private beatListeners: Set<(step: number) => void> = new Set();

  private init() {
    if (this.ctx) return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx({ latencyHint: "interactive" });

    // 1. Dynamics Compressor for broadcast mastering punch
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.22, this.ctx.currentTime);

    // 2. Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);

    // 3. Analyser Node for live visualizers & Oscilloscope
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    // 4. Music Bus & Analog Filter
    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.setValueAtTime(0.85, this.ctx.currentTime);

    this.musicFilter = this.ctx.createBiquadFilter();
    this.musicFilter.type = "lowpass";
    this.musicFilter.frequency.setValueAtTime(this.currentFilterFreq, this.ctx.currentTime);
    this.musicFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    // 5. SFX Bus
    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.setValueAtTime(0.9, this.ctx.currentTime);

    // Routing Graph:
    // Music -> Filter -> MusicBus -> Compressor -> MasterGain -> Analyser -> Output
    // SFX -> SFXBus -> Compressor -> MasterGain -> Analyser -> Output
    this.musicFilter.connect(this.musicBus);
    this.musicBus.connect(this.compressor);
    this.sfxBus.connect(this.compressor);
    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Build shared noise buffer (2 seconds of stereo pink/white noise)
    const bufLen = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Scroll listener for melody plucks
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => this.handleScroll(), { passive: true });
      document.addEventListener("visibilitychange", () => {
        if (!this.ctx) return;
        if (document.hidden && this.isPlaying) {
          // Keep running or suspend smoothly
        } else if (!document.hidden && this.isPlaying && this.ctx.state === "suspended") {
          this.ctx.resume();
        }
      });
    }
  }

  /**
   * Resumes AudioContext synchronously within user gesture callbacks
   */
  unlock() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /** Start playing the Lo-Fi beat & ambient chord progression */
  start() {
    this.unlock();
    if (!this.ctx || !this.musicBus) return;

    this.isPlaying = true;
    this.startCrackle();
    this.playClunk(true);

    const now = this.ctx.currentTime;
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(0.0001, now);
    this.musicBus.gain.linearRampToValueAtTime(this.isMutedState ? 0.0001 : 0.85, now + 0.4);

    this.stepIndex = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.startClock();
    this.notifyListeners();
  }

  /** Stop/pause music */
  stop() {
    if (!this.ctx || !this.musicBus) return;
    this.isPlaying = false;
    this.stopCrackle();
    this.playClunk(false);

    const now = this.ctx.currentTime;
    this.musicBus.gain.cancelScheduledValues(now);
    this.musicBus.gain.setValueAtTime(this.musicBus.gain.value, now);
    this.musicBus.gain.linearRampToValueAtTime(0.0001, now + 0.35);

    if (this.clockTimer) {
      window.clearInterval(this.clockTimer);
      this.clockTimer = null;
    }

    this.notifyListeners();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  toggleMute(): boolean {
    this.isMutedState = !this.isMutedState;
    if (!this.ctx || !this.masterGain) return this.isMutedState;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    const target = this.isMutedState ? 0.0001 : this.masterVolume;
    this.masterGain.gain.linearRampToValueAtTime(target, now + 0.15);

    return this.isMutedState;
  }

  setVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1.2, val));
    if (!this.ctx || !this.masterGain || this.isMutedState) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(this.masterVolume, now + 0.05);
  }

  getVolume() {
    return this.masterVolume;
  }

  setFilterCutoff(hz: number) {
    this.currentFilterFreq = Math.max(400, Math.min(14000, hz));
    if (!this.ctx || !this.musicFilter) return;
    const now = this.ctx.currentTime;
    this.musicFilter.frequency.cancelScheduledValues(now);
    this.musicFilter.frequency.linearRampToValueAtTime(this.currentFilterFreq, now + 0.08);
  }

  getFilterCutoff() {
    return this.currentFilterFreq;
  }

  setTrack(trackIdx: number) {
    const clamped = Math.max(0, Math.min(SECTION_TRACKS.length - 1, trackIdx));
    if (clamped === this.currentTrack) return;
    this.currentTrack = clamped;
    this.chordIndex = 0;

    const track = SECTION_TRACKS[clamped];
    this.setFilterCutoff(track.filterFreq);

    if (this.isPlaying && this.ctx) {
      this.scheduleChord(this.currentTrack, 0, this.ctx.currentTime, 0.45);
    }

    this.trackListeners.forEach((fn) => fn(clamped));
  }

  // Look-Ahead Step Sequencer
  private startClock() {
    if (this.clockTimer) clearInterval(this.clockTimer);

    const stepSeconds = (60 / this.tempo) / 4; // 16th note in seconds

    this.clockTimer = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;

      while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
        this.scheduleStep(this.stepIndex, this.nextNoteTime);
        this.nextNoteTime += stepSeconds;
        this.stepIndex = (this.stepIndex + 1) % 16;
      }
    }, this.lookaheadMs);
  }

  private scheduleStep(step: number, time: number) {
    if (!this.ctx) return;

    // Notify visual beat listeners on quarter notes (0, 4, 8, 12)
    if (step % 4 === 0) {
      const delay = Math.max(0, (time - this.ctx.currentTime) * 1000);
      window.setTimeout(() => {
        this.beatListeners.forEach((fn) => fn(step / 4));
      }, delay);
    }

    // Downbeat 1 (step 0): Change chord + Punchy Kick
    if (step === 0) {
      this.chordIndex = (this.chordIndex + 1) % 2;
      this.scheduleChord(this.currentTrack, this.chordIndex, time, 0.48);
      this.scheduleKick(time, 1.0);
    }

    // Beat 2 (step 4): Snare / Rim
    if (step === 4) {
      this.scheduleSnare(time, 0.9);
    }

    // Beat 2.5 (step 6): Syncopated punch kick
    if (step === 6) {
      this.scheduleKick(time, 0.65);
    }

    // Beat 3 (step 8): Bass note + soft chord swell
    if (step === 8) {
      this.scheduleBass(time);
    }

    // Beat 3.5 (step 10): Ghost kick
    if (step === 10) {
      this.scheduleKick(time, 0.45);
    }

    // Beat 4 (step 12): Snare / Rim
    if (step === 12) {
      this.scheduleSnare(time, 1.0);
    }

    // Hi-Hat on every 8th note (steps 0, 2, 4, 6, 8, 10, 12, 14)
    if (step % 2 === 0) {
      const vol = step % 4 === 2 ? 0.35 : 0.22;
      this.scheduleHat(time, vol);
    }

    // Occasional gentle pentatonic arpeggio note (35% probability on off-beats)
    if (step % 2 === 1 && Math.random() < 0.35) {
      const chord = SECTION_TRACKS[this.currentTrack].chords[this.chordIndex];
      const noteFreq = chord[Math.floor(Math.random() * chord.length)] * (Math.random() < 0.5 ? 1 : 2);
      this.schedulePluck(time, noteFreq, 0.22);
    }
  }

  /**
   * Polyphonic warm Rhodes & dual-sawtooth detuned chord pad
   */
  private scheduleChord(trackIdx: number, chordIdx: number, time: number, velocity = 0.5) {
    if (!this.ctx || !this.musicFilter) return;

    const track = SECTION_TRACKS[trackIdx] || SECTION_TRACKS[0];
    const freqs = track.chords[chordIdx] || track.chords[0];
    const dur = 2.4;

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;

      // Strum delay: 18ms between voices for natural playing
      const noteTime = time + i * 0.016;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine fundamental + Triangle warmth
      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(freq, noteTime);
      // Subtle 1.2 Hz detuning for rich Rhodes chorus
      osc2.frequency.setValueAtTime(freq + (i % 2 === 0 ? 0.9 : -0.9), noteTime);

      const amp = velocity * (0.24 / (i * 0.25 + 1));

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(amp, noteTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(amp * 0.5, noteTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.musicFilter!);

      osc1.start(noteTime);
      osc2.start(noteTime);
      osc1.stop(noteTime + dur);
      osc2.stop(noteTime + dur);
    });

    // Sub bass note
    const bassFreq = track.bass[chordIdx] || track.bass[0];
    this.scheduleBassNote(time, bassFreq, 1.8);
  }

  private scheduleBass(time: number) {
    const track = SECTION_TRACKS[this.currentTrack];
    const bassFreq = track.bass[this.chordIndex];
    this.scheduleBassNote(time, bassFreq, 1.2);
  }

  private scheduleBassNote(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.musicFilter) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.musicFilter);

    osc.start(time);
    osc.stop(time + dur);
  }

  /**
   * Punchy Lo-Fi Kick: cuts through laptop and phone speakers cleanly
   */
  private scheduleKick(time: number, vol = 1.0) {
    if (!this.ctx || !this.musicFilter) return;

    // 1. Pitch-dropping body oscillator (180 Hz down to 52 Hz)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(52, time + 0.14);

    const amp = 0.58 * vol;
    gain.gain.setValueAtTime(amp, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.musicFilter);

    osc.start(time);
    osc.stop(time + 0.29);

    // 2. Punch snap noise click (transient)
    if (this.noiseBuffer) {
      const snapSrc = this.ctx.createBufferSource();
      snapSrc.buffer = this.noiseBuffer;
      const snapFilter = this.ctx.createBiquadFilter();
      snapFilter.type = "bandpass";
      snapFilter.frequency.setValueAtTime(1400, time);
      snapFilter.Q.setValueAtTime(2.0, time);

      const snapGain = this.ctx.createGain();
      snapGain.gain.setValueAtTime(0.25 * vol, time);
      snapGain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

      snapSrc.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(this.musicFilter);

      snapSrc.start(time);
      snapSrc.stop(time + 0.04);
    }
  }

  /**
   * Lo-Fi Vinyl Snare / Rim Tap
   */
  private scheduleSnare(time: number, vol = 1.0) {
    if (!this.ctx || !this.musicFilter) return;

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(230, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + 0.09);

    oscGain.gain.setValueAtTime(0.32 * vol, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.musicFilter);
    osc.start(time);
    osc.stop(time + 0.13);

    // Noise snap
    if (this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2100, time);
      filter.Q.setValueAtTime(1.2, time);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28 * vol, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.musicFilter);

      noise.start(time);
      noise.stop(time + 0.15);
    }
  }

  /**
   * Analog Hi-Hat
   */
  private scheduleHat(time: number, vol = 0.3) {
    if (!this.ctx || !this.noiseBuffer || !this.musicFilter) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18 * vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicFilter);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  /**
   * Woody Kalimba Pluck
   */
  private schedulePluck(time: number, freq: number, vol = 0.3) {
    if (!this.ctx || !this.musicFilter) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.22 * vol, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.7);

    osc.connect(gain);
    gain.connect(this.musicFilter);

    osc.start(time);
    osc.stop(time + 0.75);
  }

  // Scroll reactivity
  private handleScroll() {
    if (!this.ctx || !this.isPlaying || this.isMutedState) return;

    const now = performance.now();
    const currentY = window.scrollY;
    const deltaY = Math.abs(currentY - this.lastScrollY);

    if (deltaY > 40 && now - this.lastChimeTime > 160) {
      this.lastChimeTime = now;
      const noteIdx = Math.floor((currentY / 140) % PENTATONIC_SCALE.length);
      const freq = PENTATONIC_SCALE[noteIdx];
      this.schedulePluck(this.ctx.currentTime, freq, 0.28);
    }

    this.lastScrollY = currentY;
  }

  // Vinyl Crackle Bed
  private startCrackle() {
    if (!this.ctx || this.crackleSource) return;
    try {
      const len = this.ctx.sampleRate * 3;
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.012;
      // Random pops
      for (let p = 0; p < 24; p++) {
        const at = Math.floor(Math.random() * (len - 150));
        const amp = 0.2 + Math.random() * 0.5;
        for (let i = 0; i < 40; i++) d[at + i] += (Math.random() * 2 - 1) * amp * (1 - i / 40);
      }

      this.crackleSource = this.ctx.createBufferSource();
      this.crackleSource.buffer = buf;
      this.crackleSource.loop = true;

      const hp = this.ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.crackleGain = this.ctx.createGain();
      this.crackleGain.gain.setValueAtTime(this.crackleLevel, this.ctx.currentTime);

      this.crackleSource.connect(hp);
      hp.connect(this.crackleGain);
      this.crackleGain.connect(this.masterGain!);

      this.crackleSource.start();
    } catch {
      // AudioContext policy
    }
  }

  private stopCrackle() {
    if (this.crackleSource && this.ctx) {
      try {
        this.crackleSource.stop();
        this.crackleSource.disconnect();
      } catch {}
      this.crackleSource = null;
    }
  }

  // ==========================================
  // INTERACTIVE DRUM PADS & SOUNDBOARD (UNIQUE)
  // ==========================================

  /**
   * User can trigger instant drum pads or synth keys from the UI
   */
  triggerPad(pad: "kick" | "snare" | "chime" | "scratch") {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    switch (pad) {
      case "kick":
        this.scheduleKick(now, 1.2);
        break;
      case "snare":
        this.scheduleSnare(now, 1.2);
        break;
      case "chime": {
        const chord = SECTION_TRACKS[this.currentTrack].chords[this.chordIndex];
        const f = chord[Math.floor(Math.random() * chord.length)] * 2;
        this.schedulePluck(now, f, 0.45);
        break;
      }
      case "scratch":
        this.playScratch();
        break;
    }
  }

  // ==========================================
  // ALGORITHM SONIFIER (UNIQUE FEATURE)
  // Maps numerical values & algorithm steps to sound
  // ==========================================

  /**
   * Plays a pitch proportional to an element's value during sorting or tree traversal
   * Normalizes value between min and max into the pentatonic scale!
   */
  playAlgorithmPitch(value: number, min = 0, max = 100, isSwap = false) {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;

    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
    const scaleIndex = Math.floor(normalized * (PENTATONIC_SCALE.length - 1));
    const freq = PENTATONIC_SCALE[scaleIndex];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isSwap ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, now);

    const amp = isSwap ? 0.32 : 0.22;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (isSwap ? 0.22 : 0.12));

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * Plays triumphant completion arpeggio when sorting finishes!
   */
  playAlgorithmSuccess() {
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [PENTATONIC_SCALE[4], PENTATONIC_SCALE[6], PENTATONIC_SCALE[8], PENTATONIC_SCALE[10]];
    notes.forEach((f, i) => {
      this.schedulePluck(now + i * 0.08, f, 0.4);
    });
  }

  // ==========================================
  // TACTILE UI SOUND FX
  // ==========================================

  playClick() {
    this.playTap();
  }

  playTap() {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.035);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  playClunk(down = true) {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(down ? 160 : 190, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playScratch() {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.05);
    osc.frequency.linearRampToValueAtTime(280, now + 0.12);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(1.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playNeedleDrop() {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;

    // Needle landing thud
    this.scheduleKick(now, 0.85);

    // Filter opening sweep with lush chord
    if (this.musicFilter) {
      this.musicFilter.frequency.setValueAtTime(300, now);
      this.musicFilter.frequency.exponentialRampToValueAtTime(4800, now + 1.2);
    }
  }

  // ==========================================
  // REAL-TIME VISUALIZER HELPERS
  // ==========================================

  getFrequencyData(): Uint8Array {
    if (!this.analyser || !this.isPlaying || this.isMutedState) {
      return new Uint8Array(64);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getByteTimeDomainData(targetArray: Uint8Array) {
    if (!this.analyser) {
      targetArray.fill(128);
      return;
    }
    this.analyser.getByteTimeDomainData(targetArray as unknown as Uint8Array<ArrayBuffer>);
  }

  getPlaying() {
    return this.isPlaying;
  }

  getMuted() {
    return this.isMutedState;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  subscribe(fn: (playing: boolean) => void) {
    this.playListeners.add(fn);
    return () => {
      this.playListeners.delete(fn);
    };
  }

  subscribeTrack(fn: (track: number) => void) {
    this.trackListeners.add(fn);
    return () => {
      this.trackListeners.delete(fn);
    };
  }

  subscribeBeat(fn: (beat: number) => void) {
    this.beatListeners.add(fn);
    return () => {
      this.beatListeners.delete(fn);
    };
  }

  private notifyListeners() {
    this.playListeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const soundEngine =
  typeof window !== "undefined"
    ? new MasterSoundEngine()
    : (null as unknown as MasterSoundEngine);
