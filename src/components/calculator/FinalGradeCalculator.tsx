"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "final-grade-calc:v1";

interface State {
  currentGrade: string;
  desiredGrade: string;
  finalWeight: string;
}

const DEFAULT: State = {
  currentGrade: "82",
  desiredGrade: "90",
  finalWeight: "30",
};

function feasibility(score: number): { label: string; tone: string; note: string } {
  if (score > 100) return { label: "Impossible", tone: "text-rose-700", note: "You cannot score above 100% — your desired grade is out of reach." };
  if (score >= 95) return { label: "Very tough", tone: "text-rose-700", note: "Needs a near-perfect final. Possible but unforgiving." };
  if (score >= 85) return { label: "Stretch", tone: "text-amber-700", note: "Strong effort required. Focus on the heaviest topics." };
  if (score >= 70) return { label: "Achievable", tone: "text-blue-700", note: "Realistic with normal preparation." };
  if (score >= 50) return { label: "Comfortable", tone: "text-emerald-700", note: "You're cruising — don't slack though." };
  return { label: "Already won", tone: "text-emerald-700", note: "You hit the target even if you skip the final (mathematically)." };
}

export function FinalGradeCalculator() {
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
    const cur = parseFloat(state.currentGrade);
    const desired = parseFloat(state.desiredGrade);
    const w = parseFloat(state.finalWeight);
    if (!Number.isFinite(cur) || !Number.isFinite(desired) || !Number.isFinite(w)) return null;
    if (w <= 0 || w > 100) return null;
    const wFrac = w / 100;
    const required = (desired - cur * (1 - wFrac)) / wFrac;
    return { required, feasibility: feasibility(required) };
  }, [state]);

  function update(key: keyof State, value: string) {
    setState((s) => ({ ...s, [key]: value }));
  }

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {calc ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                You need on the final
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {calc.required.toFixed(2)}%
                </span>
                <span className={`text-sm font-bold ${calc.feasibility.tone}`}>{calc.feasibility.label}</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">{calc.feasibility.note}</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter your current grade, your target grade, and the final&apos;s weight.</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Current grade (%)" hint="Your grade going into the final.">
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={state.currentGrade}
            onChange={(e) => update("currentGrade", e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm tabular"
          />
        </Field>
        <Field label="Desired final grade (%)" hint="The course grade you want.">
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={state.desiredGrade}
            onChange={(e) => update("desiredGrade", e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm tabular"
          />
        </Field>
        <Field label="Final exam weight (%)" hint="What share of your course grade the final represents (e.g. 30).">
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={state.finalWeight}
            onChange={(e) => update("finalWeight", e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm tabular"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
