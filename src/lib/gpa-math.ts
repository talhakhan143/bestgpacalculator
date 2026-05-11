export type LetterGrade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

export type CourseLevel = "regular" | "honors" | "ap" | "ib" | "dual";

export interface ClassEntry {
  id: string;
  name: string;
  grade: LetterGrade;
  credits: number;
  level: CourseLevel;
}

export interface WeightPreset {
  id: string;
  label: string;
  description: string;
  bonus: Record<CourseLevel, number>;
}

export const LETTER_TO_POINT: Record<LetterGrade, number> = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0,
};

export const PRESETS: WeightPreset[] = [
  {
    id: "standard",
    label: "Standard (+0.5 / +1.0)",
    description: "Most common US scale: +0.5 honors, +1.0 AP/IB/dual.",
    bonus: { regular: 0, honors: 0.5, ap: 1.0, ib: 1.0, dual: 1.0 },
  },
  {
    id: "conservative",
    label: "Conservative (+0.25 / +0.75)",
    description: "Some districts use +0.25 honors, +0.75 AP/IB.",
    bonus: { regular: 0, honors: 0.25, ap: 0.75, ib: 0.75, dual: 0.75 },
  },
  {
    id: "third-step",
    label: "Third-step (+0.33 / +0.67)",
    description: "Schools using thirds: +0.33 honors, +0.67 AP/IB.",
    bonus: { regular: 0, honors: 0.33, ap: 0.67, ib: 0.67, dual: 0.67 },
  },
  {
    id: "uniform",
    label: "Uniform (+1.0 all advanced)",
    description: "Treat honors and AP equally with +1.0 bonus.",
    bonus: { regular: 0, honors: 1.0, ap: 1.0, ib: 1.0, dual: 1.0 },
  },
  {
    id: "ap-only",
    label: "AP-only bonus (+1.0)",
    description: "No bonus for honors; only AP/IB/dual get +1.0.",
    bonus: { regular: 0, honors: 0, ap: 1.0, ib: 1.0, dual: 1.0 },
  },
];

export interface GpaResult {
  weighted: number;
  unweighted: number;
  totalCredits: number;
  totalQualityPointsWeighted: number;
  totalQualityPointsUnweighted: number;
}

export const EMPTY_RESULT: GpaResult = {
  weighted: 0,
  unweighted: 0,
  totalCredits: 0,
  totalQualityPointsWeighted: 0,
  totalQualityPointsUnweighted: 0,
};

export function gradeToPoint(grade: LetterGrade): number {
  return LETTER_TO_POINT[grade];
}

export function computeGpa(
  classes: ClassEntry[],
  preset: WeightPreset,
): GpaResult {
  let totalCredits = 0;
  let qpWeighted = 0;
  let qpUnweighted = 0;

  for (const c of classes) {
    if (!Number.isFinite(c.credits) || c.credits <= 0) continue;
    const base = gradeToPoint(c.grade);
    const bonus = base === 0 ? 0 : preset.bonus[c.level];
    const weightedPoint = Math.min(base + bonus, 5.0);
    totalCredits += c.credits;
    qpUnweighted += base * c.credits;
    qpWeighted += weightedPoint * c.credits;
  }

  if (totalCredits === 0) return EMPTY_RESULT;

  return {
    weighted: qpWeighted / totalCredits,
    unweighted: qpUnweighted / totalCredits,
    totalCredits,
    totalQualityPointsWeighted: qpWeighted,
    totalQualityPointsUnweighted: qpUnweighted,
  };
}

export function roundGpa(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function newClass(partial: Partial<ClassEntry> = {}): ClassEntry {
  return {
    id: partial.id ?? crypto.randomUUID(),
    name: partial.name ?? "",
    grade: partial.grade ?? "A",
    credits: partial.credits ?? 1,
    level: partial.level ?? "regular",
  };
}
