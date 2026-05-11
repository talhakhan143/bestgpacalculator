import { describe, it, expect } from "vitest";
import {
  computeGpa,
  PRESETS,
  newClass,
  roundGpa,
  type ClassEntry,
} from "./gpa-math";

const standard = PRESETS.find((p) => p.id === "standard")!;
const conservative = PRESETS.find((p) => p.id === "conservative")!;
const apOnly = PRESETS.find((p) => p.id === "ap-only")!;

const c = (overrides: Partial<ClassEntry>): ClassEntry =>
  newClass(overrides);

describe("computeGpa", () => {
  it("returns zeros for empty list", () => {
    const r = computeGpa([], standard);
    expect(r.weighted).toBe(0);
    expect(r.unweighted).toBe(0);
    expect(r.totalCredits).toBe(0);
  });

  it("ignores classes with zero or negative credits", () => {
    const r = computeGpa(
      [
        c({ grade: "A", credits: 0, level: "regular" }),
        c({ grade: "A", credits: -1, level: "ap" }),
      ],
      standard,
    );
    expect(r.totalCredits).toBe(0);
  });

  it("standard scale: all A regular = 4.0 unweighted, 4.0 weighted", () => {
    const r = computeGpa(
      [
        c({ grade: "A", credits: 1, level: "regular" }),
        c({ grade: "A", credits: 1, level: "regular" }),
      ],
      standard,
    );
    expect(roundGpa(r.weighted)).toBe(4.0);
    expect(roundGpa(r.unweighted)).toBe(4.0);
  });

  it("standard scale: all A AP = 4.0 unweighted, 5.0 weighted", () => {
    const r = computeGpa(
      [
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "ap" }),
      ],
      standard,
    );
    expect(roundGpa(r.unweighted)).toBe(4.0);
    expect(roundGpa(r.weighted)).toBe(5.0);
  });

  it("standard scale: A in honors = 4.5 weighted, 4.0 unweighted", () => {
    const r = computeGpa(
      [c({ grade: "A", credits: 1, level: "honors" })],
      standard,
    );
    expect(roundGpa(r.weighted)).toBe(4.5);
    expect(roundGpa(r.unweighted)).toBe(4.0);
  });

  it("F never gets weight bonus", () => {
    const r = computeGpa(
      [c({ grade: "F", credits: 1, level: "ap" })],
      standard,
    );
    expect(r.weighted).toBe(0);
    expect(r.unweighted).toBe(0);
  });

  it("mixed credits weights correctly", () => {
    // A in 4-credit AP, C in 1-credit regular
    // unweighted: (4*4 + 2*1) / 5 = 18/5 = 3.6
    // weighted:   (5*4 + 2*1) / 5 = 22/5 = 4.4
    const r = computeGpa(
      [
        c({ grade: "A", credits: 4, level: "ap" }),
        c({ grade: "C", credits: 1, level: "regular" }),
      ],
      standard,
    );
    expect(roundGpa(r.unweighted)).toBe(3.6);
    expect(roundGpa(r.weighted)).toBe(4.4);
  });

  it("conservative preset uses +0.25 / +0.75", () => {
    const r = computeGpa(
      [
        c({ grade: "A", credits: 1, level: "honors" }),
        c({ grade: "A", credits: 1, level: "ap" }),
      ],
      conservative,
    );
    // honors A = 4.25, AP A = 4.75 → avg 4.5
    expect(roundGpa(r.weighted)).toBe(4.5);
  });

  it("ap-only preset gives no bonus to honors", () => {
    const r = computeGpa(
      [c({ grade: "A", credits: 1, level: "honors" })],
      apOnly,
    );
    expect(roundGpa(r.weighted)).toBe(4.0);
  });

  it("caps weighted point at 5.0 even with stacked bonuses", () => {
    // hypothetical preset with +2 bonus
    const wild = {
      ...standard,
      bonus: { ...standard.bonus, ap: 2.0 },
    };
    const r = computeGpa(
      [c({ grade: "A", credits: 1, level: "ap" })],
      wild,
    );
    expect(r.weighted).toBe(5.0);
  });

  it("matches PrepScholar example: 4 AP A + 2 regular A = ~4.67 weighted", () => {
    // 4 AP A's (5.0 each) + 2 regular A's (4.0 each)
    // weighted: (4*5 + 2*4) / 6 = 28/6 = 4.6667
    const r = computeGpa(
      [
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "ap" }),
        c({ grade: "A", credits: 1, level: "regular" }),
        c({ grade: "A", credits: 1, level: "regular" }),
      ],
      standard,
    );
    expect(roundGpa(r.weighted)).toBe(4.67);
  });
});
