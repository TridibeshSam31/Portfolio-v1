"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { soundEngine } from "@/lib/soundEngine";
import { Play, RotateCcw, Sparkles, Volume2, FastForward } from "lucide-react";

const INITIAL_ARRAY = [44, 18, 92, 31, 75, 12, 63, 88, 26, 53, 9, 81];

export function AlgorithmSonifier() {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [speed, setSpeed] = useState<number>(1); // 1x, 2x, 4x

  const stopSignalRef = useRef(false);

  // Clean stop on unmount
  useEffect(() => {
    return () => {
      stopSignalRef.current = true;
    };
  }, []);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms / speed));
  };

  const shuffle = () => {
    stopSignalRef.current = true;
    setIsSorting(false);
    setIsSorted(false);
    setActiveIndices([]);
    setPivotIndex(null);
    setStats({ comparisons: 0, swaps: 0 });

    const shuffled = [...INITIAL_ARRAY].sort(() => Math.random() - 0.5);
    setArray(shuffled);
    soundEngine?.triggerPad("scratch");
  };

  const runQuickSort = useCallback(async () => {
    if (isSorting) return;
    setIsSorting(true);
    setIsSorted(false);
    stopSignalRef.current = false;
    soundEngine?.unlock();

    const arr = [...array];
    let comps = 0;
    let swaps = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      setPivotIndex(high);
      soundEngine?.playAlgorithmPitch(pivot, 5, 100, false);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (stopSignalRef.current) return -1;

        comps++;
        setStats({ comparisons: comps, swaps });
        setActiveIndices([j, high]);
        soundEngine?.playAlgorithmPitch(arr[j], 5, 100, false);
        await sleep(140);

        if (arr[j] < pivot) {
          i++;
          // swap arr[i] and arr[j]
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swaps++;
          setStats({ comparisons: comps, swaps });
          setArray([...arr]);
          soundEngine?.playAlgorithmPitch(arr[i], 5, 100, true);
          await sleep(120);
        }
      }

      // swap arr[i + 1] and arr[high]
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      swaps++;
      setStats({ comparisons: comps, swaps });
      setArray([...arr]);
      soundEngine?.playAlgorithmPitch(arr[i + 1], 5, 100, true);
      await sleep(130);

      return i + 1;
    };

    const qs = async (low: number, high: number) => {
      if (low < high) {
        if (stopSignalRef.current) return;
        const pi = await partition(low, high);
        if (pi === -1) return;
        await qs(low, pi - 1);
        await qs(pi + 1, high);
      }
    };

    await qs(0, arr.length - 1);

    if (!stopSignalRef.current) {
      setActiveIndices([]);
      setPivotIndex(null);
      setIsSorting(false);
      setIsSorted(true);

      // Play victorious finish sweep
      soundEngine?.playAlgorithmSuccess();
    }
  }, [array, isSorting, speed]);

  const cycleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
    soundEngine?.playTap();
  };

  return (
    <div className="mt-12 rounded-xl border-2 border-ink bg-cream p-5 shadow-[5px_5px_0px_0px_#121316] md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber px-2 py-0.5 t-mono text-[0.65rem] font-bold text-ink uppercase">
              Interactive Lab
            </span>
            <span className="t-mono text-xs font-bold text-blue-deep flex items-center gap-1">
              <Volume2 size={13} /> Algorithm Sonifier (AudioSort)
            </span>
          </div>
          <h3 className="t-display mt-1 text-2xl md:text-3xl">
            Where data structures make music
          </h3>
          <p className="t-serif text-sm text-graphite">
            Every comparison & swap generates a pentatonic frequency proportional to its value. Watch disharmony resolve into a scale.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runQuickSort}
            disabled={isSorting || isSorted}
            className="flex items-center gap-1.5 rounded-lg border-2 border-ink bg-amber px-4 py-2 t-mono text-xs font-bold text-ink shadow-[2px_2px_0px_0px_#121316] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Play size={14} fill="currentColor" />
            {isSorting ? "Sorting..." : "Sort & Sonify (QuickSort)"}
          </button>

          <button
            type="button"
            onClick={shuffle}
            disabled={isSorting}
            className="flex items-center gap-1.5 rounded-lg border-2 border-ink bg-paper px-3 py-2 t-mono text-xs font-bold text-ink shadow-[2px_2px_0px_0px_#121316] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <RotateCcw size={13} /> Shuffle
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            className="flex items-center gap-1 rounded-lg border-2 border-ink bg-cream px-2.5 py-2 t-mono text-xs font-bold text-ink shadow-[2px_2px_0px_0px_#121316] hover:bg-cream/80"
          >
            <FastForward size={13} /> {speed}x Speed
          </button>
        </div>
      </div>

      {/* Array Bars Visualization */}
      <div className="relative mt-8 flex h-48 items-end justify-between gap-1.5 rounded-lg border border-ink/20 bg-paper/60 p-4 pb-2 md:gap-3">
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isPivot = pivotIndex === idx;
          const heightPercent = Math.max(12, val);

          return (
            <div key={idx} className="relative flex flex-1 flex-col items-center justify-end h-full">
              {/* Value label */}
              <span
                className={`t-mono mb-1 text-[0.65rem] font-bold transition-colors ${
                  isPivot
                    ? "text-blue-deep font-extrabold scale-110"
                    : isActive
                    ? "text-amber font-extrabold scale-110"
                    : "text-ink/60"
                }`}
              >
                {val}
              </span>

              {/* Bar */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t transition-all duration-150 border-2 border-ink ${
                  isPivot
                    ? "bg-blue-deep shadow-[0_0_12px_rgba(74,112,169,0.7)]"
                    : isActive
                    ? "bg-amber shadow-[0_0_12px_rgba(224,138,46,0.7)]"
                    : isSorted
                    ? "bg-[#659b5e]"
                    : "bg-cream"
                }`}
              />

              {/* Index marker */}
              <span className="t-mono mt-1 text-[0.55rem] text-ink/40">
                {idx}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live Algorithm telemetry footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs t-mono text-ink/75">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded bg-amber border border-ink" /> Compare
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded bg-blue-deep border border-ink" /> Pivot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded bg-[#659b5e] border border-ink" /> Sorted
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span>Comparisons: <strong>{stats.comparisons}</strong></span>
          <span>Swaps: <strong>{stats.swaps}</strong></span>
          {isSorted && (
            <span className="inline-flex items-center gap-1 text-[#4e8048] font-bold">
              <Sparkles size={13} /> O(N log N) Harmonized!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
