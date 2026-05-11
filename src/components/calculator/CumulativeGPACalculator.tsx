"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeGpa,
  newClass,
  PRESETS,
  roundGpa,
  type ClassEntry,
  type LetterGrade,
} from "@/lib/gpa-math";
import { loadJson, saveJson } from "@/lib/storage";

const LETTERS: LetterGrade[] = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "D-",
  "F",
];

interface State {
  priorGpa: number;
  priorCredits: number;
  classes: ClassEntry[];
}

const INITIAL: State = {
  priorGpa: 3.5,
  priorCredits: 30,
  classes: [
    newClass({ name: "Class 1", grade: "A", credits: 3, level: "regular" }),
    newClass({ name: "Class 2", grade: "B+", credits: 3, level: "regular" }),
    newClass({ name: "Class 3", grade: "A-", credits: 4, level: "regular" }),
  ],
};

export function CumulativeGPACalculator({
  storageScope = "cumulative",
  semesterLabel = "this semester",
}: {
  storageScope?: string;
  semesterLabel?: string;
}) {
  const [state, setState] = useState<State>(INITIAL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadJson<State>(`${storageScope}.state.v1`);
    if (stored) setState(stored);
    setHydrated(true);
  }, [storageScope]);

  useEffect(() => {
    if (!hydrated) return;
    saveJson(`${storageScope}.state.v1`, state);
  }, [state, hydrated, storageScope]);

  const standard = PRESETS[0];

  const semesterResult = useMemo(
    () =>
      computeGpa(
        state.classes.map((c) => ({ ...c, level: "regular" })),
        standard,
      ),
    [state.classes, standard],
  );

  const semesterGpa = semesterResult.unweighted;
  const semesterCredits = semesterResult.totalCredits;

  const newCumulative = useMemo(() => {
    const totalCredits = state.priorCredits + semesterCredits;
    if (totalCredits <= 0) return 0;
    const totalQp =
      state.priorGpa * state.priorCredits +
      semesterGpa * semesterCredits;
    return totalQp / totalCredits;
  }, [state.priorGpa, state.priorCredits, semesterGpa, semesterCredits]);

  function updateClass(id: string, patch: Partial<ClassEntry>) {
    setState((prev) => ({
      ...prev,
      classes: prev.classes.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }

  function removeClass(id: string) {
    setState((prev) => ({
      ...prev,
      classes: prev.classes.filter((c) => c.id !== id),
    }));
  }

  function addRow() {
    setState((prev) => ({
      ...prev,
      classes: [
        ...prev.classes,
        newClass({ name: "", credits: 3, level: "regular" }),
      ],
    }));
  }

  function reset() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all data and reset?");
      if (!ok) return;
    }
    setState(INITIAL);
  }

  return (
    <div className="w-full">
      {/* Result panel */}
      <div className="glass-strong sticky top-20 z-20 mb-6 overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-3 sm:items-center">
          <div className="text-center sm:text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
              Prior cumulative
            </div>
            <div className="tabular mt-1 text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-200">
              {state.priorGpa.toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {state.priorCredits} credits
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {semesterLabel}
            </div>
            <div className="tabular mt-1 text-3xl font-bold tracking-tight text-cyan-700 sm:text-4xl dark:text-cyan-300">
              {roundGpa(semesterGpa).toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {semesterCredits} credits
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
              New cumulative
            </div>
            <div className="tabular mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gradient-text">
                {roundGpa(newCumulative).toFixed(2)}
              </span>
            </div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {state.priorCredits + semesterCredits} total credits
            </div>
          </div>
        </div>
      </div>

      {/* Prior GPA inputs */}
      <div className="glass mb-6 rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
          Where you are now
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="priorGpa"
              className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Current GPA
            </label>
            <input
              id="priorGpa"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              max="5"
              value={state.priorGpa}
              onChange={(e) =>
                setState((p) => ({
                  ...p,
                  priorGpa: parseFloat(e.target.value) || 0,
                }))
              }
              className="glass-input tabular w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div>
            <label
              htmlFor="priorCredits"
              className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Credits earned so far
            </label>
            <input
              id="priorCredits"
              type="number"
              inputMode="decimal"
              step="1"
              min="0"
              value={state.priorCredits}
              onChange={(e) =>
                setState((p) => ({
                  ...p,
                  priorCredits: parseFloat(e.target.value) || 0,
                }))
              }
              className="glass-input tabular w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* New classes */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            New classes ({semesterLabel})
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {state.classes.length} class{state.classes.length === 1 ? "" : "es"}
          </span>
        </div>

        <div className="hidden grid-cols-12 gap-2 px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:grid dark:text-zinc-500">
          <div className="col-span-6">Subject</div>
          <div className="col-span-2">Grade</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-1" />
        </div>

        <div className="space-y-2">
          {state.classes.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 gap-2 rounded-xl bg-white/40 p-3 transition hover:bg-white/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            >
              <div className="col-span-12 sm:col-span-6">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                  Subject
                </label>
                <input
                  type="text"
                  value={c.name}
                  placeholder="e.g. Calculus II"
                  onChange={(e) => updateClass(c.id, { name: e.target.value })}
                  className="glass-input w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div className="col-span-5 sm:col-span-2">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                  Grade
                </label>
                <select
                  value={c.grade}
                  onChange={(e) =>
                    updateClass(c.id, { grade: e.target.value as LetterGrade })
                  }
                  className="glass-input w-full rounded-lg px-2 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {LETTERS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-5 sm:col-span-3">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                  Credits
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  value={c.credits}
                  onChange={(e) =>
                    updateClass(c.id, {
                      credits: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="glass-input tabular w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div className="col-span-2 flex items-end justify-end sm:col-span-1">
                <button
                  type="button"
                  onClick={() => removeClass(c.id)}
                  disabled={state.classes.length <= 1}
                  aria-label="Remove class"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-500/15 dark:hover:text-red-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={addRow} className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add class
          </button>
          <button
            type="button"
            onClick={reset}
            className="btn-glass text-zinc-700 dark:text-zinc-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
