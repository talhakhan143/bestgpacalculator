"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PRESETS,
  computeGpa,
  newClass,
  roundGpa,
  type ClassEntry,
  type CourseLevel,
  type LetterGrade,
  type WeightPreset,
} from "@/lib/gpa-math";
import {
  loadClasses,
  loadPresetId,
  saveClasses,
  savePresetId,
} from "@/lib/storage";

const LETTERS: LetterGrade[] = [
  "A+", "A", "A-",
  "B+", "B", "B-",
  "C+", "C", "C-",
  "D+", "D", "D-",
  "F",
];

const LEVELS: { value: CourseLevel; label: string; tone: string }[] = [
  { value: "regular", label: "Regular", tone: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300" },
  { value: "honors", label: "Honors", tone: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300" },
  { value: "ap", label: "AP", tone: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300" },
  { value: "ib", label: "IB", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  { value: "dual", label: "Dual", tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
];

const DEFAULT_STARTER: ClassEntry[] = [
  newClass({ name: "English Lit", grade: "A", credits: 1, level: "regular" }),
  newClass({ name: "AP Calculus BC", grade: "A-", credits: 1, level: "ap" }),
  newClass({ name: "Honors Chemistry", grade: "B+", credits: 1, level: "honors" }),
  newClass({ name: "US History", grade: "A", credits: 1, level: "regular" }),
];

export interface WeightedGPACalculatorProps {
  /** Show level dropdown per row (Regular/Honors/AP/IB/Dual). Default true. */
  showLevels?: boolean;
  /** Show school weighting scale selector. Default true. */
  showPresets?: boolean;
  /** Show credits column. Default true. If false all classes are weighted equally. */
  showCredits?: boolean;
  /** Force every class to this level when computing (overrides per-row level). */
  forcedLevel?: CourseLevel;
  /** Force preset id when computing (overrides selector). */
  forcedPresetId?: string;
  /** localStorage scope — different pages can share or isolate state. Default "default". */
  storageScope?: string;
  /** Override starter classes (default: 4 rows for HS demo). */
  starterClasses?: ClassEntry[];
  /** Custom heading for the result panel. */
  resultLabel?: { weighted?: string; unweighted?: string };
  /** Hide the unweighted result entirely (for unweighted-only pages). */
  hideUnweighted?: boolean;
  /** Default credits for new classes (default 1). */
  defaultCredits?: number;
}

export function WeightedGPACalculator({
  showLevels = true,
  showPresets = true,
  showCredits = true,
  forcedLevel,
  forcedPresetId,
  storageScope = "default",
  starterClasses = DEFAULT_STARTER,
  resultLabel,
  hideUnweighted = false,
  defaultCredits = 1,
}: WeightedGPACalculatorProps = {}) {
  const [classes, setClasses] = useState<ClassEntry[]>(starterClasses);
  const [presetId, setPresetId] = useState<string>(
    forcedPresetId ?? "standard",
  );
  const [hydrated, setHydrated] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    // Try URL hash first (shareable link), then fall back to localStorage
    let restoredFromHash = false;
    if (typeof window !== "undefined" && window.location.hash.startsWith("#s=")) {
      try {
        const encoded = window.location.hash.slice(3);
        const decoded = JSON.parse(
          decodeURIComponent(escape(atob(decodeURIComponent(encoded))))
        ) as { classes?: ClassEntry[]; presetId?: string };
        if (Array.isArray(decoded.classes) && decoded.classes.length) {
          setClasses(decoded.classes);
          restoredFromHash = true;
        }
        if (
          !forcedPresetId &&
          decoded.presetId &&
          PRESETS.some((p) => p.id === decoded.presetId)
        ) {
          setPresetId(decoded.presetId);
        }
      } catch {
        // Bad hash — ignore
      }
    }
    if (!restoredFromHash) {
      const stored = loadClasses(storageScope);
      if (stored && stored.length > 0) setClasses(stored);
      if (!forcedPresetId) {
        const storedPreset = loadPresetId(storageScope);
        if (storedPreset && PRESETS.some((p) => p.id === storedPreset)) {
          setPresetId(storedPreset);
        }
      }
    }
    setHydrated(true);
  }, [storageScope, forcedPresetId]);

  async function shareLink() {
    if (typeof window === "undefined") return;
    try {
      const payload = JSON.stringify({ classes, presetId: activePresetId });
      const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(payload))));
      const url = `${window.location.origin}${window.location.pathname}#s=${encoded}`;
      if (navigator.share) {
        try {
          await navigator.share({ url, title: "My GPA", text: "My GPA calc" });
          return;
        } catch {
          // user cancelled — fall back to clipboard
        }
      }
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // ignore
    }
  }

  function printReport() {
    if (typeof window === "undefined") return;
    window.print();
  }

  useEffect(() => {
    if (!hydrated) return;
    saveClasses(storageScope, classes);
  }, [classes, hydrated, storageScope]);

  useEffect(() => {
    if (!hydrated || forcedPresetId) return;
    savePresetId(storageScope, presetId);
  }, [presetId, hydrated, storageScope, forcedPresetId]);

  const activePresetId = forcedPresetId ?? presetId;
  const preset: WeightPreset =
    PRESETS.find((p) => p.id === activePresetId) ?? PRESETS[0];

  // Apply forcedLevel + showCredits=false transformations during compute.
  const effectiveClasses = useMemo(
    () =>
      classes.map((c) => ({
        ...c,
        level: forcedLevel ?? c.level,
        credits: showCredits ? c.credits : 1,
      })),
    [classes, forcedLevel, showCredits],
  );

  const result = useMemo(
    () => computeGpa(effectiveClasses, preset),
    [effectiveClasses, preset],
  );
  const delta = result.weighted - result.unweighted;
  const showWeightedDistinct = !hideUnweighted && delta > 0.005;

  function update(id: string, patch: Partial<ClassEntry>) {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  function remove(id: string) {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  }

  function addRow() {
    setClasses((prev) => [
      ...prev,
      newClass({
        name: "",
        credits: defaultCredits,
        level: forcedLevel ?? "regular",
      }),
    ]);
  }

  function reset() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all classes and reset?");
      if (!ok) return;
    }
    setClasses([
      newClass({ name: "", credits: defaultCredits, level: forcedLevel ?? "regular" }),
    ]);
  }

  const weightedLabel = resultLabel?.weighted ?? "Weighted";
  const unweightedLabel = resultLabel?.unweighted ?? "Unweighted";

  return (
    <div className="w-full">
      {/* Result panel */}
      <div className="glass-strong sticky top-20 z-20 mb-6 overflow-hidden rounded-3xl p-6 sm:p-8">
        {hideUnweighted ? (
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
              {weightedLabel} GPA
            </div>
            <div className="tabular mt-1 text-6xl font-bold tracking-tight sm:text-7xl">
              <span className="gradient-text">
                {roundGpa(result.weighted).toFixed(2)}
              </span>
            </div>
            <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              {result.totalCredits} credit{result.totalCredits === 1 ? "" : "s"}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
                {weightedLabel}
              </div>
              <div className="tabular mt-1 text-5xl font-bold tracking-tight sm:text-6xl">
                <span className="gradient-text">
                  {roundGpa(result.weighted).toFixed(2)}
                </span>
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                On {preset.label.split(" ")[0].toLowerCase()} scale
              </div>
            </div>

            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-indigo-300/50 to-transparent sm:block" />

            <div className="sm:text-right">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                {unweightedLabel}
              </div>
              <div className="tabular mt-1 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {roundGpa(result.unweighted).toFixed(2)}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600 sm:justify-end dark:text-zinc-400">
                <span>{result.totalCredits} credit{result.totalCredits === 1 ? "" : "s"}</span>
                {showWeightedDistinct && (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-700 dark:text-emerald-300">
                    +{delta.toFixed(2)} boost
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset selector */}
      {showPresets && !forcedPresetId && (
        <div className="glass mb-6 rounded-2xl p-5">
          <label
            htmlFor="preset"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
          >
            School weighting scale
          </label>
          <select
            id="preset"
            value={presetId}
            onChange={(e) => setPresetId(e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {preset.description}
          </p>
        </div>
      )}

      {/* Class list */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
            Your classes
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {classes.length} class{classes.length === 1 ? "" : "es"}
          </span>
        </div>

        {/* Desktop column headers */}
        <DesktopHeader
          showLevels={showLevels}
          showCredits={showCredits}
        />

        <div className="space-y-2">
          {classes.map((cls) => (
            <ClassRow
              key={cls.id}
              entry={cls}
              onChange={(patch) => update(cls.id, patch)}
              onRemove={() => remove(cls.id)}
              canRemove={classes.length > 1}
              showLevels={showLevels}
              showCredits={showCredits}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addRow}
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add class
          </button>
          <button
            type="button"
            onClick={reset}
            className="btn-glass text-slate-700"
          >
            Reset
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={shareLink}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-700 hover:ring-blue-200"
              aria-label="Share calculator link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
              {shareStatus === "copied" ? "Copied!" : "Share"}
            </button>
            <button
              type="button"
              onClick={printReport}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-700 hover:ring-blue-200"
              aria-label="Print or save as PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
              </svg>
              Print/PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopHeader({
  showLevels,
  showCredits,
}: {
  showLevels: boolean;
  showCredits: boolean;
}) {
  return (
    <div className="hidden grid-cols-12 gap-2 px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:grid dark:text-zinc-500">
      <div className={showLevels && showCredits ? "col-span-4" : showLevels || showCredits ? "col-span-6" : "col-span-9"}>
        Subject
      </div>
      <div className="col-span-2">Grade</div>
      {showCredits && <div className="col-span-2">Credits</div>}
      {showLevels && <div className="col-span-3">Level</div>}
      <div className="col-span-1" />
    </div>
  );
}

interface ClassRowProps {
  entry: ClassEntry;
  onChange: (patch: Partial<ClassEntry>) => void;
  onRemove: () => void;
  canRemove: boolean;
  showLevels: boolean;
  showCredits: boolean;
}

function ClassRow({
  entry,
  onChange,
  onRemove,
  canRemove,
  showLevels,
  showCredits,
}: ClassRowProps) {
  const levelTone =
    LEVELS.find((l) => l.value === entry.level)?.tone ?? LEVELS[0].tone;

  const subjectSpan = showLevels && showCredits
    ? "sm:col-span-4"
    : showLevels || showCredits
    ? "sm:col-span-6"
    : "sm:col-span-9";

  return (
    <div className="grid grid-cols-12 gap-2 rounded-xl bg-white/40 p-3 transition hover:bg-white/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
      <div className={`col-span-12 ${subjectSpan}`}>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
          Subject
        </label>
        <input
          type="text"
          value={entry.name}
          placeholder="e.g. AP Biology"
          onChange={(e) => onChange({ name: e.target.value })}
          className="glass-input w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
      </div>

      <div className={`${showCredits || showLevels ? "col-span-4" : "col-span-12"} sm:col-span-2`}>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
          Grade
        </label>
        <select
          value={entry.grade}
          onChange={(e) => onChange({ grade: e.target.value as LetterGrade })}
          className="glass-input w-full rounded-lg px-2 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {LETTERS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {showCredits && (
        <div className="col-span-4 sm:col-span-2">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
            Credits
          </label>
          <input
            type="number"
            inputMode="decimal"
            step="0.5"
            min="0"
            value={entry.credits}
            onChange={(e) =>
              onChange({ credits: parseFloat(e.target.value) || 0 })
            }
            className="glass-input tabular w-full rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100"
          />
        </div>
      )}

      {showLevels && (
        <div className="col-span-4 sm:col-span-3">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:hidden dark:text-zinc-500">
            Level
          </label>
          <div className="relative">
            <select
              value={entry.level}
              onChange={(e) => onChange({ level: e.target.value as CourseLevel })}
              className={`glass-input w-full appearance-none rounded-lg px-3 py-2.5 text-sm font-semibold ${levelTone}`}
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="col-span-12 flex items-end justify-end sm:col-span-1">
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove ${entry.name || "class"}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500 dark:hover:bg-red-500/15 dark:hover:text-red-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
