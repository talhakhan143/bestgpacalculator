"use client";

import { useEffect, useState } from "react";

type ApScore = 1 | 2 | 3 | 4 | 5;

interface ApExam {
  id: string;
  name: string;
  score: ApScore;
}

const STORAGE_KEY = "ap-score-calc:v1";

const SCORE_LABEL: Record<ApScore, string> = {
  5: "Extremely well qualified",
  4: "Well qualified",
  3: "Qualified",
  2: "Possibly qualified",
  1: "No recommendation",
};

const TYPICAL_CREDITS: Record<ApScore, number> = {
  5: 4,
  4: 3,
  3: 3,
  2: 0,
  1: 0,
};

const COMMON_AP_EXAMS = [
  "AP Calculus AB",
  "AP Calculus BC",
  "AP Statistics",
  "AP Biology",
  "AP Chemistry",
  "AP Physics 1",
  "AP Physics C: Mechanics",
  "AP English Language",
  "AP English Literature",
  "AP US History",
  "AP World History",
  "AP US Government",
  "AP Macroeconomics",
  "AP Microeconomics",
  "AP Psychology",
  "AP Computer Science A",
  "AP Computer Science Principles",
  "AP Spanish Language",
  "AP Environmental Science",
  "AP Human Geography",
];

let counter = 0;
function genId() {
  counter += 1;
  return `ap-${Date.now()}-${counter}`;
}

function newExam(seed?: Partial<ApExam>): ApExam {
  return {
    id: genId(),
    name: seed?.name ?? "",
    score: seed?.score ?? 4,
  };
}

export function ApScoreCalculator() {
  const [exams, setExams] = useState<ApExam[]>([
    newExam({ name: "AP Calculus AB", score: 4 }),
    newExam({ name: "AP US History", score: 5 }),
    newExam({ name: "AP English Language", score: 3 }),
  ]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ApExam[];
        if (Array.isArray(parsed) && parsed.length) setExams(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
    } catch {
      // ignore
    }
  }, [exams, hydrated]);

  function update(id: string, patch: Partial<ApExam>) {
    setExams((arr) => arr.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function add() {
    setExams((arr) => [...arr, newExam()]);
  }

  function remove(id: string) {
    setExams((arr) => (arr.length > 1 ? arr.filter((e) => e.id !== id) : arr));
  }

  function reset() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all AP exams?");
      if (!ok) return;
    }
    setExams([newExam()]);
  }

  const passingExams = exams.filter((e) => e.score >= 3);
  const totalCredits = exams.reduce((sum, e) => sum + TYPICAL_CREDITS[e.score], 0);
  const avgScore =
    exams.length > 0
      ? exams.reduce((sum, e) => sum + e.score, 0) / exams.length
      : 0;
  const collegeBoost = passingExams.length * 1.0;
  const semestersSaved = Math.round((totalCredits / 15) * 10) / 10;

  return (
    <div className="w-full">
      {/* Result panel */}
      <div className="glass-strong sticky top-20 z-20 mb-6 rounded-3xl p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <ResultBlock
            label="Likely college credits"
            value={totalCredits.toString()}
            sub={`From ${passingExams.length} of ${exams.length} exam${exams.length === 1 ? "" : "s"}`}
            primary
          />
          <ResultBlock
            label="Avg score"
            value={avgScore.toFixed(1)}
            sub={avgScore >= 4 ? "Competitive range" : avgScore >= 3 ? "Passing range" : "Below passing"}
          />
          <ResultBlock
            label="Semesters saved"
            value={`~${semestersSaved}`}
            sub={`At 15 credits/semester`}
          />
        </div>
        <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <strong>+{collegeBoost.toFixed(1)} weighted GPA boost</strong> —
          on the standard +1.0 AP scale, every AP class you take adds 1.0 to that class&apos;s grade point.
        </div>
      </div>

      {/* Exams */}
      <div className="glass overflow-hidden rounded-3xl p-5 sm:p-7">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Your AP exams
          </span>
          <span className="text-xs text-slate-500">{exams.length} exam{exams.length === 1 ? "" : "s"}</span>
        </div>

        <div className="space-y-3">
          {exams.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 sm:grid-cols-[1fr_120px_120px_auto] sm:gap-4"
            >
              <input
                type="text"
                value={e.name}
                list="ap-exam-list"
                onChange={(ev) => update(e.id, { name: ev.target.value })}
                placeholder="AP exam name"
                className="glass-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
              />
              <select
                value={e.score}
                onChange={(ev) => update(e.id, { score: Number(ev.target.value) as ApScore })}
                className="glass-input rounded-lg px-3 py-2 text-sm text-slate-900"
                aria-label="AP exam score"
              >
                {[5, 4, 3, 2, 1].map((s) => (
                  <option key={s} value={s}>
                    Score {s}
                  </option>
                ))}
              </select>
              <span className="hidden text-xs text-slate-500 sm:block">
                {TYPICAL_CREDITS[e.score]} credits
              </span>
              <button
                type="button"
                onClick={() => remove(e.id)}
                aria-label={`Remove ${e.name || "exam"}`}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                disabled={exams.length <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <datalist id="ap-exam-list">
          {COMMON_AP_EXAMS.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>

        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={add} className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add exam
          </button>
          <button type="button" onClick={reset} className="btn-glass">
            Reset
          </button>
        </div>
      </div>

      {/* Score guide */}
      <div className="glass mt-6 overflow-hidden rounded-3xl">
        <div className="px-5 py-4 sm:px-7">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-700">
            AP score guide
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
              <tr>
                <th className="px-5 py-3 font-semibold">Score</th>
                <th className="px-5 py-3 font-semibold">Meaning</th>
                <th className="px-5 py-3 font-semibold">Typical credits</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">College accepted by</th>
              </tr>
            </thead>
            <tbody>
              {([5, 4, 3, 2, 1] as ApScore[]).map((s) => (
                <tr key={s} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-3 font-bold text-slate-900">{s}</td>
                  <td className="px-5 py-3 text-slate-700">{SCORE_LABEL[s]}</td>
                  <td className="tabular px-5 py-3 font-semibold text-blue-700">
                    {TYPICAL_CREDITS[s]}
                  </td>
                  <td className="hidden px-5 py-3 text-slate-600 sm:table-cell">
                    {s >= 5
                      ? "Most universities (incl. Ivy League with restrictions)"
                      : s === 4
                        ? "Most state universities, many private"
                        : s === 3
                          ? "Most public state universities"
                          : "Rarely accepted for credit"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResultBlock({
  label,
  value,
  sub,
  primary = false,
}: {
  label: string;
  value: string;
  sub?: string;
  primary?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
        {label}
      </div>
      <div className={`tabular mt-1 text-4xl font-bold tracking-tight sm:text-5xl ${primary ? "text-blue-600" : "text-slate-900"}`}>
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
