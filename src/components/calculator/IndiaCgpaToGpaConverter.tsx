"use client";

import { useEffect, useMemo, useState } from "react";

type Scale = "cbse" | "anna" | "vtu" | "mumbai" | "gtu" | "generic10";

const SCALE_LABEL: Record<Scale, string> = {
  cbse: "CBSE / generic 10-point",
  anna: "Anna University (TN)",
  vtu: "VTU (Karnataka)",
  mumbai: "Mumbai University (Engg)",
  gtu: "Gujarat Technological University",
  generic10: "Generic 10-point fallback",
};

const SCALE_NOTE: Record<Scale, string> = {
  cbse: "CBSE Class X/XII. Official since 2011.",
  anna: "Most Tamil Nadu engineering colleges.",
  vtu: "Karnataka engineering / older formula was CGPA × 10.",
  mumbai: "Engineering specifically. Arts/commerce uses CGPA × 10.",
  gtu: "Gujarat engineering universities.",
  generic10: "Some Pakistani / Bangladeshi unis use this.",
};

function cgpaToPercent(cgpa: number, scale: Scale): number {
  const c = Math.max(0, cgpa);
  switch (scale) {
    case "cbse":
      return Math.min(100, c * 9.5);
    case "anna":
      return Math.min(100, Math.max(0, (c - 0.5) * 10));
    case "vtu":
      return Math.min(100, Math.max(0, (c - 0.75) * 10));
    case "mumbai":
      return Math.min(100, c * 7.1 + 11);
    case "gtu":
      return Math.min(100, Math.max(0, c * 10 - 5));
    case "generic10":
      return Math.min(100, c * 10);
  }
}

function percentToUsGpa(pct: number): number {
  if (pct >= 85) return 4.0;
  if (pct >= 80) return 3.7;
  if (pct >= 75) return 3.3;
  if (pct >= 70) return 3.0;
  if (pct >= 65) return 2.7;
  if (pct >= 60) return 2.3;
  if (pct >= 55) return 2.0;
  if (pct >= 50) return 1.7;
  if (pct >= 45) return 1.3;
  if (pct >= 40) return 1.0;
  return 0.0;
}

function classLabel(pct: number): string {
  if (pct >= 75) return "First class with Distinction";
  if (pct >= 60) return "First class";
  if (pct >= 50) return "Second class";
  if (pct >= 40) return "Passing class";
  return "Failing";
}

const STORAGE_KEY = "india-cgpa-to-gpa.v1";
interface State {
  cgpa: string;
  scale: Scale;
}
const DEFAULT: State = { cgpa: "8.5", scale: "cbse" };

export function IndiaCgpaToGpaConverter() {
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
    if (!Number.isFinite(c) || c < 0 || c > 10) return null;
    const pct = cgpaToPercent(c, state.scale);
    const gpa = percentToUsGpa(pct);
    return { pct, gpa, cls: classLabel(pct) };
  }, [state]);

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {calc ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                US GPA (4.0 scale) equivalent
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {calc.gpa.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-blue-700">{calc.cls}</span>
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Equivalent percentage:{" "}
                <span className="font-semibold tabular">{calc.pct.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter a CGPA between 0 and 10.</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            CGPA (0.0 – 10.0)
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            inputMode="decimal"
            value={state.cgpa}
            onChange={(e) => setState((s) => ({ ...s, cgpa: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base tabular"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            University / scale
          </span>
          <select
            value={state.scale}
            onChange={(e) => setState((s) => ({ ...s, scale: e.target.value as Scale }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="cbse">CBSE / generic — × 9.5</option>
            <option value="anna">Anna University — (CGPA − 0.5) × 10</option>
            <option value="vtu">VTU — (CGPA − 0.75) × 10</option>
            <option value="mumbai">Mumbai (Engg) — × 7.1 + 11</option>
            <option value="gtu">GTU — × 10 − 5</option>
            <option value="generic10">Generic 10-point — × 10</option>
          </select>
        </label>
      </div>

      {calc && (
        <p className="mt-4 rounded-md bg-blue-50 px-4 py-3 text-xs text-blue-900">
          <strong>Note:</strong> {SCALE_NOTE[state.scale]}
        </p>
      )}

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          India CGPA → US GPA reference (WES standard band)
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          The CGPA → percentage step uses your university formula, then WES&apos;s percentage → US 4.0
          GPA band-lookup. This matches the conversion most US graduate admissions offices apply.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-2 py-2 font-semibold">Indian %</th>
                <th className="px-2 py-2 font-semibold">CBSE CGPA (÷9.5)</th>
                <th className="px-2 py-2 font-semibold">US GPA</th>
                <th className="px-2 py-2 font-semibold">Indian class</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {[
                ["85%+", "8.95+", "4.00", "Distinction"],
                ["80–84%", "8.42–8.94", "3.70", "Distinction"],
                ["75–79%", "7.89–8.41", "3.30", "First w/ Distinction"],
                ["70–74%", "7.37–7.88", "3.00", "First class"],
                ["65–69%", "6.84–7.36", "2.70", "First class"],
                ["60–64%", "6.32–6.83", "2.30", "First class"],
                ["55–59%", "5.79–6.31", "2.00", "Second class"],
                ["50–54%", "5.26–5.78", "1.70", "Second class"],
                ["45–49%", "4.74–5.25", "1.30", "Passing"],
                ["40–44%", "4.21–4.73", "1.00", "Passing"],
                ["<40%", "<4.21", "0.00", "Failing"],
              ].map(([pct, cgpa, gpa, cls]) => (
                <tr key={pct} className="border-b border-slate-100">
                  <td className="px-2 py-2 font-semibold text-slate-900">{pct}</td>
                  <td className="px-2 py-2 text-slate-700">{cgpa}</td>
                  <td className="px-2 py-2 font-semibold text-blue-700">{gpa}</td>
                  <td className="px-2 py-2 text-slate-700">{cls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong className="font-bold">Important:</strong> US grad schools usually require a WES
        (World Education Services) or ECE course-by-course report for an Indian transcript. This
        calculator gives the same conversion WES applies. Your official report may include a per-course
        breakdown the application form requests.
      </div>
    </div>
  );
}
