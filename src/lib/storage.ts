import type { ClassEntry } from "./gpa-math";

const PREFIX = "wgc";

function classesKey(scope: string) {
  return `${PREFIX}.${scope}.classes.v1`;
}

function presetKey(scope: string) {
  return `${PREFIX}.${scope}.preset.v1`;
}

export function loadClasses(scope: string): ClassEntry[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(classesKey(scope));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as ClassEntry[];
  } catch {
    return null;
  }
}

export function saveClasses(scope: string, classes: ClassEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(classesKey(scope), JSON.stringify(classes));
  } catch {
    /* ignore */
  }
}

export function loadPresetId(scope: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(presetKey(scope));
  } catch {
    return null;
  }
}

export function savePresetId(scope: string, id: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(presetKey(scope), id);
  } catch {
    /* ignore */
  }
}

export function loadJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${PREFIX}.${key}`);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${PREFIX}.${key}`, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
