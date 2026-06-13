"use client";

import { useEffect, useMemo, useState } from "react";

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

function letterColor(letter: string): string {
  if (letter === "A" || letter === "A-") return "text-emerald-700";
  if (letter.startsWith("B")) return "text-blue-700";
  if (letter.startsWith("C")) return "text-amber-700";
  if (letter.startsWith("D")) return "text-orange-700";
  return "text-rose-700";
}

const SCOPE = "ez-grader.v1";

export function EzGrader() {
  const [total, setTotal] = useState<number>(25);
  const [wrong, setWrong] = useState<number>(3);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCOPE);
      if (raw) {
        const parsed = JSON.parse(raw) as { total: number; wrong: number };
        if (Number.isFinite(parsed.total)) setTotal(parsed.total);
        if (Number.isFinite(parsed.wrong)) setWrong(parsed.wrong);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SCOPE, JSON.stringify({ total, wrong }));
    } catch {
      // ignore
    }
  }, [total, wrong, hydrated]);

  const result = useMemo(() => {
    const t = Math.max(1, Math.floor(Number(total) || 0));
    const w = Math.min(t, Math.max(0, Math.floor(Number(wrong) || 0)));
    const right = t - w;
    const pct = (right / t) * 100;
    return { total: t, wrong: w, right, pct, letter: letterFor(pct) };
  }, [total, wrong]);

  const scale = useMemo(() => {
    const t = result.total;
    const rows: { wrong: number; right: number; pct: number; letter: string }[] = [];
    for (let w = 0; w <= Math.min(t, 50); w++) {
      const pct = ((t - w) / t) * 100;
      rows.push({ wrong: w, right: t - w, pct, letter: letterFor(pct) });
    }
    return rows;
  }, [result.total]);

  return (
    <div className="w-full">
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Grade
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-5xl font-extrabold tabular text-slate-900">
                {result.pct.toFixed(1)}%
              </span>
              <span className={`text-2xl font-bold ${letterColor(result.letter)}`}>{result.letter}</span>
            </div>
          </div>
          <div className="text-xs text-slate-600">
            <span className="font-semibold tabular">{result.right}</span> right · <span className="font-semibold tabular">{result.wrong}</span> wrong · out of <span className="font-semibold tabular">{result.total}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Number of questions</span>
          <input
            type="number"
            min={1}
            max={500}
            inputMode="numeric"
            value={total}
            onChange={(e) => setTotal(parseInt(e.target.value, 10))}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base tabular"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Number wrong</span>
          <input
            type="number"
            min={0}
            max={result.total}
            inputMode="numeric"
            value={wrong}
            onChange={(e) => setWrong(parseInt(e.target.value, 10))}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base tabular"
          />
        </label>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={result.total}
          value={result.wrong}
          onChange={(e) => setWrong(parseInt(e.target.value, 10))}
          className="w-full accent-blue-600"
          aria-label="Number wrong slider"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
          <span>0 wrong = 100%</span>
          <span>{result.total} wrong = 0%</span>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Grade chart — every possible score</h3>
        <p className="mt-1 text-xs text-slate-500">For a {result.total}-question test, all possible wrong-counts and the grade you would get.</p>
        <div className="mt-4 max-h-96 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-2 py-2 font-semibold">Wrong</th>
                <th className="px-2 py-2 font-semibold">Right</th>
                <th className="px-2 py-2 font-semibold">%</th>
                <th className="px-2 py-2 font-semibold">Grade</th>
              </tr>
            </thead>
            <tbody>
              {scale.map((row) => {
                const isActive = row.wrong === result.wrong;
                return (
                  <tr
                    key={row.wrong}
                    className={`border-b border-slate-100 ${isActive ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-2 py-1.5 tabular font-semibold">{row.wrong}</td>
                    <td className="px-2 py-1.5 tabular text-slate-600">{row.right}</td>
                    <td className="px-2 py-1.5 tabular text-slate-600">{row.pct.toFixed(1)}%</td>
                    <td className={`px-2 py-1.5 font-bold ${letterColor(row.letter)}`}>{row.letter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
