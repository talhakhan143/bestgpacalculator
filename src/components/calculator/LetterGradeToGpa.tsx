"use client";

import { useEffect, useMemo, useState } from "react";
import { LETTER_TO_POINT, type LetterGrade } from "@/lib/gpa-math";

interface CourseRow {
  id: string;
  name: string;
  grade: LetterGrade;
  credits: number;
}

const LETTERS: LetterGrade[] = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

function newRow(partial: Partial<CourseRow> = {}): CourseRow {
  return {
    id: partial.id ?? (typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
    name: partial.name ?? "",
    grade: partial.grade ?? "A",
    credits: partial.credits ?? 3,
  };
}

const STARTERS: CourseRow[] = [
  newRow({ name: "English", grade: "A", credits: 3 }),
  newRow({ name: "Calculus", grade: "B+", credits: 4 }),
  newRow({ name: "Chemistry", grade: "A-", credits: 4 }),
  newRow({ name: "History", grade: "B", credits: 3 }),
];

const SCOPE = "letter-to-gpa.v1";

function gpaLabel(gpa: number): string {
  if (gpa >= 3.85) return "A average";
  if (gpa >= 3.5) return "A− / B+ average";
  if (gpa >= 3.0) return "B average";
  if (gpa >= 2.5) return "B− / C+ average";
  if (gpa >= 2.0) return "C average";
  if (gpa >= 1.0) return "D average";
  return "Failing";
}

export function LetterGradeToGpa({ useCredits = true }: { useCredits?: boolean }) {
  const [rows, setRows] = useState<CourseRow[]>(STARTERS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCOPE);
      if (raw) {
        const parsed = JSON.parse(raw) as CourseRow[];
        if (Array.isArray(parsed) && parsed.length > 0) setRows(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SCOPE, JSON.stringify(rows));
    } catch {
      // ignore
    }
  }, [rows, hydrated]);

  const result = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    for (const r of rows) {
      const points = LETTER_TO_POINT[r.grade];
      const credits = useCredits ? Math.max(0, Number(r.credits) || 0) : 1;
      if (credits <= 0) continue;
      totalPoints += points * credits;
      totalCredits += credits;
    }
    if (totalCredits === 0) return null;
    return {
      gpa: totalPoints / totalCredits,
      totalCredits,
      totalPoints,
      count: rows.length,
    };
  }, [rows, useCredits]);

  function update(id: string, patch: Partial<CourseRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function add() {
    setRows((prev) => [...prev, newRow()]);
  }

  function remove(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function reset() {
    setRows(STARTERS);
  }

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        {result ? (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Unweighted GPA (4.0 scale)
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold tabular text-slate-900">
                  {result.gpa.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-blue-700">{gpaLabel(result.gpa)}</span>
              </div>
            </div>
            <div className="text-xs text-slate-600">
              Courses: <span className="font-semibold tabular">{result.count}</span>
              {useCredits && (
                <>
                  {" · "}Credits: <span className="font-semibold tabular">{result.totalCredits.toFixed(0)}</span>
                  {" · "}Quality points: <span className="font-semibold tabular">{result.totalPoints.toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Add at least one course with a letter grade{useCredits ? " and credit hours" : ""}.</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-2 py-2 font-semibold">Course name</th>
              <th className="px-2 py-2 font-semibold">Letter</th>
              <th className="px-2 py-2 font-semibold">Points</th>
              {useCredits && <th className="px-2 py-2 font-semibold">Credits</th>}
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const points = LETTER_TO_POINT[r.grade];
              return (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={r.name}
                      onChange={(e) => update(r.id, { name: e.target.value })}
                      placeholder="e.g. Biology"
                      className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <select
                      value={r.grade}
                      onChange={(e) => update(r.id, { grade: e.target.value as LetterGrade })}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm tabular"
                    >
                      {LETTERS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-2 tabular font-semibold text-slate-700">{points.toFixed(1)}</td>
                  {useCredits && (
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        inputMode="decimal"
                        value={r.credits}
                        onChange={(e) => update(r.id, { credits: parseFloat(e.target.value) })}
                        className="w-20 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm tabular"
                      />
                    </td>
                  )}
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
          + Add course
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Letter → GPA point conversion</h3>
        <p className="mt-1 text-xs text-slate-500">Standard unweighted 4.0 scale used by most US high schools and colleges.</p>
        <div className="mt-4 grid grid-cols-2 gap-1 text-sm sm:grid-cols-4">
          {LETTERS.map((l) => (
            <div key={l} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-1.5">
              <span className="font-bold text-slate-900">{l}</span>
              <span className="tabular text-slate-600">{LETTER_TO_POINT[l].toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
