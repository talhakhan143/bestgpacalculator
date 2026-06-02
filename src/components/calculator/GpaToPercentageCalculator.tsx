"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gpa-to-pct:v1";

interface State {
  gpa: string;
  scale: "us10" | "us7" | "indian";
}

const DEFAULT: State = { gpa: "3.5", scale: "us10" };

function gpaToPercentage(gpa: number, scale: State["scale"]): { pct: number; letter: string; band: string } {
  const g = Math.max(0, Math.min(gpa, 4.33));
  if (scale === "us10") {
    if (g >= 4.0) return { pct: 95, letter: "A", band: "93–100%" };
    if (g >= 3.7) return { pct: 91, letter: "A−", band: "90–92%" };
    if (g >= 3.3) return { pct: 88, letter: "B+", band: "87–89%" };
    if (g >= 3.0) return { pct: 85, letter: "B", band: "83–86%" };
    if (g >= 2.7) return { pct: 81, letter: "B−", band: "80–82%" };
    if (g >= 2.3) return { pct: 78, letter: "C+", band: "77–79%" };
    if (g >= 2.0) return { pct: 75, letter: "C", band: "73–76%" };
    if (g >= 1.7) return { pct: 71, letter: "C−", band: "70–72%" };
    if (g >= 1.3) return { pct: 68, letter: "D+", band: "67–69%" };
    if (g >= 1.0) return { pct: 66, letter: "D", band: "65–66%" };
    return { pct: 50, letter: "F", band: "Below 65%" };
  }
  if (scale === "us7") {
    if (g >= 4.0) return { pct: 96, letter: "A", band: "93–100%" };
    if (g >= 3.7) return { pct: 90, letter: "A−", band: "90–92%" };
    if (g >= 3.3) return { pct: 87, letter: "B+", band: "86–89%" };
    if (g >= 3.0) return { pct: 83, letter: "B", band: "80–85%" };
    if (g >= 2.0) return { pct: 75, letter: "C", band: "70–79%" };
    if (g >= 1.0) return { pct: 65, letter: "D", band: "60–69%" };
    return { pct: 50, letter: "F", band: "Below 60%" };
  }
  // Indian (~9.5×) approximation
  return { pct: Math.min(100, g * 23.75), letter: "—", band: "% = CGPA × 9.5 (CBSE) or × 10" };
}

export function GpaToPercentageCalculator() {
  const [state, setState] = useState<State>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated]);

  const calc = useMemo(() => {
    const g = parseFloat(state.gpa);
    if (!Number.isFinite(g)) return null;
    return gpaToPercentage(g, state.scale);
  }, [state]);

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {calc ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Estimated percentage
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {calc.pct.toFixed(1)}%
                </span>
                <span className="text-2xl font-bold text-blue-700">{calc.letter}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">Typical band: {calc.band}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter a valid GPA between 0.0 and 4.33.</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">GPA</span>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={state.gpa}
            onChange={(e) => setState((s) => ({ ...s, gpa: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base tabular"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Conversion table</span>
          <select
            value={state.scale}
            onChange={(e) => setState((s) => ({ ...s, scale: e.target.value as State["scale"] }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="us10">US 10-point (most common)</option>
            <option value="us7">US 7-point (some prep schools)</option>
            <option value="indian">Indian CGPA → % (CBSE × 9.5)</option>
          </select>
        </label>
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Conversion is approximate. Schools use slightly different tables — check your institution&apos;s published scale for the official conversion.
      </div>
    </div>
  );
}
