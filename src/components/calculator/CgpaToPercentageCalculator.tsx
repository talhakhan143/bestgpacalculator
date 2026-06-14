"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cgpa-to-pct:v1";

type Scale =
  | "cbse"
  | "anna"
  | "vtu"
  | "mumbai"
  | "gtu"
  | "generic10"
  | "us4";

interface State {
  cgpa: string;
  scale: Scale;
}

const DEFAULT: State = { cgpa: "8.5", scale: "cbse" };

interface ConversionResult {
  pct: number;
  formula: string;
  note: string;
}

function cgpaToPercentage(cgpa: number, scale: Scale): ConversionResult {
  const c = Math.max(0, cgpa);
  switch (scale) {
    case "cbse":
      return {
        pct: Math.min(100, c * 9.5),
        formula: "% = CGPA × 9.5",
        note: "CBSE board (India). Official Class X & XII conversion since 2011.",
      };
    case "anna":
      return {
        pct: Math.min(100, Math.max(0, (c - 0.5) * 10)),
        formula: "% = (CGPA − 0.5) × 10",
        note: "Anna University (Chennai) — most Tamil Nadu engineering colleges.",
      };
    case "vtu":
      return {
        pct: Math.min(100, Math.max(0, (c - 0.75) * 10)),
        formula: "% = (CGPA − 0.75) × 10",
        note: "Visvesvaraya Technological University (Karnataka). Older formula was CGPA × 10.",
      };
    case "mumbai":
      return {
        pct: Math.min(100, c * 7.1 + 11),
        formula: "% = (CGPA × 7.1) + 11",
        note: "University of Mumbai — Engineering. Note: arts/commerce uses CGPA × 10.",
      };
    case "gtu":
      return {
        pct: Math.min(100, Math.max(0, c * 10 - 5)),
        formula: "% = (CGPA × 10) − 5",
        note: "Gujarat Technological University.",
      };
    case "generic10":
      return {
        pct: Math.min(100, c * 10),
        formula: "% = CGPA × 10",
        note: "Generic 10-point scale fallback. Some Pakistani and Bangladeshi universities use this.",
      };
    case "us4": {
      const g = Math.min(c, 4.33);
      let pct = 50;
      if (g >= 4.0) pct = 95;
      else if (g >= 3.7) pct = 91;
      else if (g >= 3.3) pct = 88;
      else if (g >= 3.0) pct = 85;
      else if (g >= 2.7) pct = 81;
      else if (g >= 2.3) pct = 78;
      else if (g >= 2.0) pct = 75;
      else if (g >= 1.7) pct = 71;
      else if (g >= 1.3) pct = 68;
      else if (g >= 1.0) pct = 66;
      return {
        pct,
        formula: "Band lookup (US 10-point letter scale)",
        note: "Use if your CGPA is on the US 4.0 scale, not the Indian 10-point scale.",
      };
    }
  }
}

function classLabel(pct: number, scale: Scale): string {
  if (scale === "us4") {
    if (pct >= 93) return "A — Distinction";
    if (pct >= 90) return "A− — High first class";
    if (pct >= 80) return "B — First class";
    if (pct >= 70) return "C — Second class";
    if (pct >= 65) return "D — Passing";
    return "F — Failing";
  }
  if (pct >= 75) return "First class with Distinction";
  if (pct >= 60) return "First class";
  if (pct >= 50) return "Second class";
  if (pct >= 40) return "Passing class";
  return "Failing";
}

export function CgpaToPercentageCalculator() {
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
    const c = parseFloat(state.cgpa);
    if (!Number.isFinite(c)) return null;
    return cgpaToPercentage(c, state.scale);
  }, [state]);

  const max = state.scale === "us4" ? 4.33 : 10;

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {calc ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Equivalent percentage
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {calc.pct.toFixed(2)}%
                </span>
                <span className="text-base font-semibold text-blue-700">{classLabel(calc.pct, state.scale)}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">Formula: <span className="font-mono">{calc.formula}</span></p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter your CGPA (0.0 – {max}).</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">CGPA</span>
          <input
            type="number"
            step="0.01"
            min="0"
            max={max}
            inputMode="decimal"
            value={state.cgpa}
            onChange={(e) => setState((s) => ({ ...s, cgpa: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base tabular"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">University / scale</span>
          <select
            value={state.scale}
            onChange={(e) => setState((s) => ({ ...s, scale: e.target.value as Scale }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="cbse">CBSE (India) — × 9.5</option>
            <option value="anna">Anna University — (CGPA − 0.5) × 10</option>
            <option value="vtu">VTU (Karnataka) — (CGPA − 0.75) × 10</option>
            <option value="mumbai">Mumbai University (Engg) — × 7.1 + 11</option>
            <option value="gtu">GTU (Gujarat) — × 10 − 5</option>
            <option value="generic10">Generic 10-point — × 10</option>
            <option value="us4">US 4.0 scale (band lookup)</option>
          </select>
        </label>
      </div>

      {calc && (
        <p className="mt-4 rounded-md bg-blue-50 px-4 py-3 text-xs text-blue-900">
          <strong>Note:</strong> {calc.note}
        </p>
      )}

      <div className="mt-6 text-xs text-slate-500">
        Conversion is institution-specific. The formulas above are the ones each university officially publishes — but
        always double-check your university&apos;s convocation/registrar page for the version applied to your transcript.
      </div>
    </div>
  );
}
