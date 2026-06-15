"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "class" | "percent";
type DegreeClass = "1st" | "2:1" | "2:2" | "3rd" | "pass" | "fail";

const CLASS_LABEL: Record<DegreeClass, string> = {
  "1st": "First-class Honours (1st)",
  "2:1": "Upper Second (2:1)",
  "2:2": "Lower Second (2:2)",
  "3rd": "Third-class (3rd)",
  pass: "Ordinary / Pass degree",
  fail: "Fail",
};

const CLASS_TO_GPA: Record<DegreeClass, number> = {
  "1st": 4.0,
  "2:1": 3.7,
  "2:2": 3.0,
  "3rd": 2.0,
  pass: 1.0,
  fail: 0.0,
};

const CLASS_TO_PERCENT: Record<DegreeClass, string> = {
  "1st": "70%+",
  "2:1": "60–69%",
  "2:2": "50–59%",
  "3rd": "40–49%",
  pass: "35–39%",
  fail: "below 35%",
};

const CLASS_TO_LETTER: Record<DegreeClass, string> = {
  "1st": "A",
  "2:1": "A−",
  "2:2": "B",
  "3rd": "C",
  pass: "D",
  fail: "F",
};

function percentToClass(p: number): DegreeClass {
  if (p >= 70) return "1st";
  if (p >= 60) return "2:1";
  if (p >= 50) return "2:2";
  if (p >= 40) return "3rd";
  if (p >= 35) return "pass";
  return "fail";
}

function percentToGpa(p: number): number {
  // Continuous mapping inside each band (WES-style linear-anchor)
  if (p >= 70) return 4.0;
  if (p >= 60) return 3.0 + ((p - 60) / 10) * 0.7;
  if (p >= 50) return 2.0 + ((p - 50) / 10) * 1.0;
  if (p >= 40) return 1.0 + ((p - 40) / 10) * 1.0;
  if (p >= 35) return ((p - 35) / 5) * 1.0;
  return 0.0;
}

const STORAGE_KEY = "uk-grade-to-gpa.v1";
interface State {
  mode: Mode;
  cls: DegreeClass;
  percent: string;
}
const DEFAULT: State = { mode: "class", cls: "2:1", percent: "65" };

export function UkGradeToGpaConverter() {
  const [state, setState] = useState<State>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        if (parsed && parsed.mode) setState({ ...DEFAULT, ...parsed });
      }
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

  const result = useMemo(() => {
    if (state.mode === "class") {
      const gpa = CLASS_TO_GPA[state.cls];
      return {
        gpa,
        cls: state.cls,
        letter: CLASS_TO_LETTER[state.cls],
        band: CLASS_TO_PERCENT[state.cls],
      };
    }
    const p = parseFloat(state.percent);
    if (!isFinite(p) || p < 0 || p > 100) return null;
    const cls = percentToClass(p);
    return {
      gpa: percentToGpa(p),
      cls,
      letter: CLASS_TO_LETTER[cls],
      band: CLASS_TO_PERCENT[cls],
    };
  }, [state]);

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {result ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                US GPA (4.0 scale) equivalent
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {result.gpa.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-blue-700">
                  {CLASS_LABEL[result.cls]}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-600">
                US letter: <span className="font-semibold">{result.letter}</span>
                {" · "}UK mark band: <span className="font-semibold">{result.band}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter a percentage from 0 to 100.</div>
        )}
      </div>

      <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setState((s) => ({ ...s, mode: "class" }))}
          className={`rounded-full px-4 py-1.5 transition ${
            state.mode === "class" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Degree class
        </button>
        <button
          type="button"
          onClick={() => setState((s) => ({ ...s, mode: "percent" }))}
          className={`rounded-full px-4 py-1.5 transition ${
            state.mode === "percent" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          UK percentage / module mark
        </button>
      </div>

      {state.mode === "class" ? (
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
            Your UK degree classification
          </label>
          <select
            value={state.cls}
            onChange={(e) => setState((s) => ({ ...s, cls: e.target.value as DegreeClass }))}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium"
          >
            <option value="1st">{CLASS_LABEL["1st"]} — 70%+</option>
            <option value="2:1">{CLASS_LABEL["2:1"]} — 60–69%</option>
            <option value="2:2">{CLASS_LABEL["2:2"]} — 50–59%</option>
            <option value="3rd">{CLASS_LABEL["3rd"]} — 40–49%</option>
            <option value="pass">{CLASS_LABEL.pass} — 35–39%</option>
            <option value="fail">{CLASS_LABEL.fail} — &lt;35%</option>
          </select>
        </div>
      ) : (
        <div>
          <label className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
            UK percentage or module average (0–100)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.1"
            inputMode="decimal"
            value={state.percent}
            onChange={(e) => setState((s) => ({ ...s, percent: e.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium tabular"
          />
          <p className="mt-2 text-xs text-slate-500">
            Use your overall UK degree average or a module mark. The converter assumes the standard UK university honours boundaries.
          </p>
        </div>
      )}

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          UK degree class → US GPA reference (WES standard)
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Used by WES, ECE, and most US grad-school admissions offices for UK transcript evaluation.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-2 py-2 font-semibold">UK class</th>
                <th className="px-2 py-2 font-semibold">UK mark</th>
                <th className="px-2 py-2 font-semibold">US letter</th>
                <th className="px-2 py-2 font-semibold">US GPA</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(CLASS_TO_GPA) as DegreeClass[]).map((c) => (
                <tr key={c} className="border-b border-slate-100">
                  <td className="px-2 py-2 font-semibold text-slate-900">{CLASS_LABEL[c]}</td>
                  <td className="px-2 py-2 tabular text-slate-700">{CLASS_TO_PERCENT[c]}</td>
                  <td className="px-2 py-2 font-semibold text-slate-700">{CLASS_TO_LETTER[c]}</td>
                  <td className="px-2 py-2 tabular font-semibold text-blue-700">
                    {CLASS_TO_GPA[c].toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong className="font-bold">Important:</strong> US grad schools that ask for a GPA from a UK transcript usually want a credential evaluation from WES or ECE. This calculator gives a quick estimate using their standard scale; the official report may differ if your university uses non-standard boundaries (e.g. Oxbridge subjects with First at 65%+).
      </div>
    </div>
  );
}
