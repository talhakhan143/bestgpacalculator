"use client";

import { useEffect, useMemo, useState } from "react";

interface AssignmentRow {
  id: string;
  name: string;
  score: number;
  outOf: number;
  weight: number;
}

function newRow(partial: Partial<AssignmentRow> = {}): AssignmentRow {
  return {
    id: partial.id ?? (typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
    name: partial.name ?? "",
    score: partial.score ?? 0,
    outOf: partial.outOf ?? 100,
    weight: partial.weight ?? 1,
  };
}

const STARTERS: Record<Mode, AssignmentRow[]> = {
  weighted: [
    newRow({ name: "Homework", score: 88, outOf: 100, weight: 20 }),
    newRow({ name: "Quizzes", score: 82, outOf: 100, weight: 15 }),
    newRow({ name: "Midterm", score: 78, outOf: 100, weight: 25 }),
    newRow({ name: "Final exam", score: 85, outOf: 100, weight: 40 }),
  ],
  simple: [
    newRow({ name: "Assignment 1", score: 88, outOf: 100, weight: 1 }),
    newRow({ name: "Assignment 2", score: 92, outOf: 100, weight: 1 }),
    newRow({ name: "Assignment 3", score: 76, outOf: 100, weight: 1 }),
  ],
  semester: [
    newRow({ name: "Homework", score: 90, outOf: 100, weight: 15 }),
    newRow({ name: "Quizzes", score: 84, outOf: 100, weight: 20 }),
    newRow({ name: "Tests", score: 80, outOf: 100, weight: 30 }),
    newRow({ name: "Projects", score: 88, outOf: 100, weight: 15 }),
    newRow({ name: "Final exam", score: 75, outOf: 100, weight: 20 }),
  ],
};

export type Mode = "weighted" | "simple" | "semester";

function letterFor(pct: number): string {
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 65) return "D";
  return "F";
}

export function GradeCalculator({ mode = "weighted", storageScope }: { mode?: Mode; storageScope?: string }) {
  const scope = storageScope ?? `grade-calc-${mode}`;
  const [rows, setRows] = useState<AssignmentRow[]>(STARTERS[mode]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${scope}.v1`);
      if (raw) {
        const parsed = JSON.parse(raw) as AssignmentRow[];
        if (Array.isArray(parsed) && parsed.length > 0) setRows(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [scope]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(`${scope}.v1`, JSON.stringify(rows));
    } catch {
      // ignore
    }
  }, [rows, hydrated, scope]);

  const result = useMemo(() => {
    let weightedSum = 0;
    let totalWeight = 0;
    let totalScore = 0;
    let totalOutOf = 0;
    for (const r of rows) {
      const score = Number(r.score);
      const outOf = Number(r.outOf);
      const weight = Number(r.weight);
      if (!Number.isFinite(score) || !Number.isFinite(outOf) || outOf <= 0) continue;
      const pct = (score / outOf) * 100;
      if (mode === "simple") {
        weightedSum += pct;
        totalWeight += 1;
      } else {
        if (!Number.isFinite(weight) || weight <= 0) continue;
        weightedSum += pct * weight;
        totalWeight += weight;
      }
      totalScore += score;
      totalOutOf += outOf;
    }
    if (totalWeight === 0) return null;
    const pct = weightedSum / totalWeight;
    return {
      pct,
      letter: letterFor(pct),
      totalScore,
      totalOutOf,
      weightSum: totalWeight,
    };
  }, [rows, mode]);

  function update(id: string, patch: Partial<AssignmentRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function add() {
    setRows((prev) => [...prev, newRow({ weight: mode === "simple" ? 1 : 10 })]);
  }

  function remove(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function reset() {
    setRows(STARTERS[mode]);
  }

  const showWeight = mode !== "simple";

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {result ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {mode === "weighted" ? "Weighted course average" : mode === "semester" ? "Semester average" : "Course average"}
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {result.pct.toFixed(2)}%
                </span>
                <span className="text-2xl font-bold text-blue-700">{result.letter}</span>
              </div>
            </div>
            <div className="text-xs text-slate-600">
              {showWeight ? (
                <>Weight total: <span className="font-semibold tabular">{result.weightSum.toFixed(0)}</span>{result.weightSum !== 100 && mode === "weighted" ? " (should sum to 100)" : ""}</>
              ) : (
                <>Items: <span className="font-semibold tabular">{rows.length}</span></>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Enter at least one assignment with a valid score and {showWeight ? "weight" : "max"}.</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-2 py-2 font-semibold">Assignment / Category</th>
              <th className="px-2 py-2 font-semibold">Score</th>
              <th className="px-2 py-2 font-semibold">Out of</th>
              {showWeight && <th className="px-2 py-2 font-semibold">Weight {mode === "weighted" ? "(%)" : ""}</th>}
              <th className="px-2 py-2 font-semibold">%</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const pct = r.outOf > 0 ? (r.score / r.outOf) * 100 : 0;
              return (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={r.name}
                      onChange={(e) => update(r.id, { name: e.target.value })}
                      placeholder="e.g. Midterm"
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      value={r.score}
                      onChange={(e) => update(r.id, { score: parseFloat(e.target.value) })}
                      className="w-20 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm tabular"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      value={r.outOf}
                      onChange={(e) => update(r.id, { outOf: parseFloat(e.target.value) })}
                      className="w-20 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm tabular"
                    />
                  </td>
                  {showWeight && (
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        value={r.weight}
                        onChange={(e) => update(r.id, { weight: parseFloat(e.target.value) })}
                        className="w-20 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm tabular"
                      />
                    </td>
                  )}
                  <td className="px-2 py-2 tabular text-slate-600">{pct.toFixed(1)}%</td>
                  <td className="px-2 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
                      aria-label={`Remove ${r.name || "row"}`}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add row
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
