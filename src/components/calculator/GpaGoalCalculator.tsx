"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gpa-goal-calc:v1";

interface State {
  currentGpa: string;
  creditsCompleted: string;
  targetGpa: string;
  upcomingCredits: string;
}

const DEFAULT: State = {
  currentGpa: "3.40",
  creditsCompleted: "60",
  targetGpa: "3.60",
  upcomingCredits: "15",
};

const GPA_TIERS: { label: string; min: number; tone: string }[] = [
  { label: "A average", min: 3.85, tone: "text-emerald-700" },
  { label: "A-/B+ average", min: 3.5, tone: "text-emerald-700" },
  { label: "B+/B average", min: 3.2, tone: "text-blue-700" },
  { label: "B average", min: 3.0, tone: "text-blue-700" },
  { label: "B-/C+ average", min: 2.7, tone: "text-amber-700" },
  { label: "C average", min: 2.0, tone: "text-amber-700" },
  { label: "Below C average", min: 0, tone: "text-rose-700" },
];

function tierFor(gpa: number) {
  return GPA_TIERS.find((t) => gpa >= t.min) ?? GPA_TIERS[GPA_TIERS.length - 1];
}

export function GpaGoalCalculator() {
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
    const cur = parseFloat(state.currentGpa);
    const credits = parseFloat(state.creditsCompleted);
    const target = parseFloat(state.targetGpa);
    const upcoming = parseFloat(state.upcomingCredits);

    if (
      Number.isNaN(cur) || Number.isNaN(credits) || Number.isNaN(target) || Number.isNaN(upcoming) ||
      credits < 0 || upcoming <= 0 || cur < 0 || target < 0
    ) {
      return null;
    }

    const totalCreditsAfter = credits + upcoming;
    const requiredQualityPoints = target * totalCreditsAfter;
    const currentQualityPoints = cur * credits;
    const neededFromUpcoming = requiredQualityPoints - currentQualityPoints;
    const requiredAvg = neededFromUpcoming / upcoming;

    let feasibility: "easy" | "tight" | "stretch" | "impossible" = "easy";
    if (requiredAvg > 4.0) feasibility = "impossible";
    else if (requiredAvg > 3.7) feasibility = "stretch";
    else if (requiredAvg > 3.0) feasibility = "tight";
    else feasibility = "easy";

    return {
      requiredAvg,
      totalCreditsAfter,
      feasibility,
    };
  }, [state]);

  function update(key: keyof State, value: string) {
    setState((s) => ({ ...s, [key]: value }));
  }

  const tier = calc ? tierFor(calc.requiredAvg) : null;

  return (
    <div className="w-full">
      {/* Result panel */}
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {calc ? (
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Required GPA next term
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <span className="tabular text-5xl font-bold tracking-tight text-blue-600 sm:text-6xl">
                {Math.max(0, calc.requiredAvg).toFixed(2)}
              </span>
              {tier && (
                <span className={`text-sm font-semibold ${tier.tone}`}>
                  {tier.label}
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <FactBlock label="Across" value={`${state.upcomingCredits} cr`} />
              <FactBlock label="Total after" value={`${calc.totalCreditsAfter} cr`} />
              <FactBlock label="Feasibility" value={feasibilityLabel(calc.feasibility)} tone={feasibilityTone(calc.feasibility)} />
            </div>

            {calc.feasibility === "impossible" && (
              <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-900">
                <strong>Not reachable in one term.</strong> Even straight A&apos;s ({(4.0).toFixed(2)}) won&apos;t lift your average that high. Spread the goal across more credits.
              </div>
            )}
            {calc.feasibility === "stretch" && (
              <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <strong>Stretch goal.</strong> You&apos;ll need close to straight A&apos;s. Build a study plan and consider a lighter course load.
              </div>
            )}
            {calc.feasibility === "tight" && (
              <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
                <strong>Reachable with focus.</strong> A consistent {tier?.label.toLowerCase()} performance gets you there.
              </div>
            )}
            {calc.feasibility === "easy" && (
              <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <strong>On track.</strong> A modest performance keeps you above target.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-slate-500">
            Enter all four values to see your required GPA.
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="glass rounded-3xl p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Current GPA"
            hint="On the 4.0 scale"
            value={state.currentGpa}
            onChange={(v) => update("currentGpa", v)}
            type="number"
            step="0.01"
            min="0"
            max="5"
          />
          <Field
            label="Credits completed"
            hint="So far"
            value={state.creditsCompleted}
            onChange={(v) => update("creditsCompleted", v)}
            type="number"
            step="1"
            min="0"
          />
          <Field
            label="Target GPA"
            hint="What you want"
            value={state.targetGpa}
            onChange={(v) => update("targetGpa", v)}
            type="number"
            step="0.01"
            min="0"
            max="5"
          />
          <Field
            label="Upcoming credits"
            hint="Next term load"
            value={state.upcomingCredits}
            onChange={(v) => update("upcomingCredits", v)}
            type="number"
            step="1"
            min="1"
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={() => setState(DEFAULT)} className="btn-glass">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function feasibilityLabel(f: "easy" | "tight" | "stretch" | "impossible") {
  return f === "easy" ? "On track" : f === "tight" ? "Reachable" : f === "stretch" ? "Stretch" : "Impossible";
}

function feasibilityTone(f: "easy" | "tight" | "stretch" | "impossible") {
  return f === "easy" ? "text-emerald-700" : f === "tight" ? "text-blue-700" : f === "stretch" ? "text-amber-700" : "text-rose-700";
}

function FactBlock({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
      <div className={`mt-0.5 text-sm font-bold ${tone ?? "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  ...rest
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
        {label}
      </span>
      {hint && (
        <span className="ml-2 text-[11px] font-medium text-slate-400">
          {hint}
        </span>
      )}
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass-input mt-2 block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-slate-900"
      />
    </label>
  );
}
