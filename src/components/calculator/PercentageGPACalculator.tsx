"use client";

import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/storage";

interface PercentRow {
  id: string;
  name: string;
  percentage: number;
  credits: number;
}

function newRow(partial: Partial<PercentRow> = {}): PercentRow {
  return {
    id: partial.id ?? crypto.randomUUID(),
    name: partial.name ?? "",
    percentage: partial.percentage ?? 90,
    credits: partial.credits ?? 1,
  };
}

const STARTER: PercentRow[] = [
  newRow({ name: "Class 1", percentage: 92, credits: 1 }),
  newRow({ name: "Class 2", percentage: 87, credits: 1 }),
  newRow({ name: "Class 3", percentage: 78, credits: 1 }),
];

/**
 * Common US conversion table (10-point scale).
 * 93+ = A (4.0), 90-92 = A- (3.7), 87-89 = B+ (3.3), etc.
 */
function percentageToPoint(pct: number): { letter: string; point: number } {
  if (pct >= 93) return { letter: "A", point: 4.0 };
  if (pct >= 90) return { letter: "A-", point: 3.7 };
  if (pct >= 87) return { letter: "B+", point: 3.3 };
  if (pct >= 83) return { letter: "B", point: 3.0 };
  if (pct >= 80) return { letter: "B-", point: 2.7 };
  if (pct >= 77) return { letter: "C+", point: 2.3 };
  if (pct >= 73) return { letter: "C", point: 2.0 };
  if (pct >= 70) return { letter: "C-", point: 1.7 };
  if (pct >= 67) return { letter: "D+", point: 1.3 };
  if (pct >= 65) return { letter: "D", point: 1.0 };
  return { letter: "F", point: 0.0 };
}

export function PercentageGPACalculator({
  storageScope = "percentage",
}: {
  storageScope?: string;
}) {
  const [rows, setRows] = useState<PercentRow[]>(STARTER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadJson<PercentRow[]>(`${storageScope}.rows.v1`);
    if (stored && stored.length > 0) setRows(stored);
    setHydrated(true);
  }, [storageScope]);

  useEffect(() => {
    if (!hydrated) return;
    saveJson(`${storageScope}.rows.v1`, rows);
  }, [rows, hydrated, storageScope]);

  const result = useMemo(() => {
    let totalCredits = 0;
    let totalQp = 0;
    for (const r of rows) {
      if (!Number.isFinite(r.credits) || r.credits <= 0) continue;
      const { point } = percentageToPoint(r.percentage);
      totalCredits += r.credits;
      totalQp += point * r.credits;
    }
    if (totalCredits === 0) return { gpa: 0, totalCredits: 0 };
    return { gpa: totalQp / totalCredits, totalCredits };
  }, [rows]);

  function update(id: string, patch: Partial<PercentRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function addRow() {
    setRows((prev) => [...prev, newRow({ name: "" })]);
  }

  function reset() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all data and reset?");
      if (!ok) return;
    }
    setRows([newRow({ name: "" })]);
  }

  return (
    <div className="w-full">
      {/* Result panel */}
      <div className="glass-strong sticky top-20 z-20 mb-6 overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
            Your GPA on 4.0 scale
          </div>
          <div className="tabular mt-1 text-6xl font-bold tracking-tight sm:text-7xl">
            <span className="gradient-text">{result.gpa.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {result.totalCredits} credit{result.totalCredits === 1 ? "" : "s"} ·
            converted from percentages
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            Your classes
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {rows.length} class{rows.length === 1 ? "" : "es"}
          </span>
        </div>

        <div className="hidden grid-cols-12 gap-2 px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:grid dark:text-zinc-500">
          <div className="col-span-5">Subject</div>
          <div className="col-span-3">Percentage</div>
          <div className="col-span-2">Credits</div>
          <div className="col-span-1">Letter</div>
          <div className="col-span-1" />
        </div>

        <div className="space-y-2">
          {rows.map((r) => {
            const { letter, point } = percentageToPoint(r.percentage);
            return (
              <div
                key={r.id}
                className="grid grid-cols-12 gap-2 rounded-xl bg-white/40 p-3 transition hover:bg-white/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <div className="col-span-12 sm:col-span-5">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={r.name}
                    placeholder="e.g. Biology"
                    onChange={(e) => update(r.id, { name: e.target.value })}
                    className="glass-input w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                    Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="0"
                      max="100"
                      value={r.percentage}
                      onChange={(e) =>
                        update(r.id, {
                          percentage: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="glass-input tabular w-full rounded-lg px-3 py-2.5 pr-7 text-sm text-zinc-900 dark:text-zinc-100"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                      %
                    </span>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
                    Credits
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    value={r.credits}
                    onChange={(e) =>
                      update(r.id, { credits: parseFloat(e.target.value) || 0 })
                    }
                    className="glass-input tabular w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="col-span-3 sm:col-span-1 flex items-center justify-center sm:py-0">
                  <span className="tabular inline-flex items-center justify-center rounded-md bg-fuchsia-500/15 px-2 py-1 text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300">
                    {letter}
                    <span className="ml-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {point.toFixed(1)}
                    </span>
                  </span>
                </div>
                <div className="col-span-1 flex items-end justify-end">
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    disabled={rows.length <= 1}
                    aria-label="Remove"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-500/15 dark:hover:text-red-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
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
