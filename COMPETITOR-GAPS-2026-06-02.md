# Competitor Deep-Dive + Gap Report

Generated 2026-06-02 via WebFetch on top 5 competitors. Builds on external Claude audit memory `project_competitor_audit_2026-06-02.md`.

## Competitors analyzed

| Site | Position | Strength | Weakness |
|---|---|---|---|
| **gpacalculator.net** | #1 GPA niche | Full grade calc family + international conversion + admission pages + Indian (SGPA/CGPA) tools | Plain UI, weak per-school depth |
| **gpacalculator.io** | Brand-led | Save/account + social sharing + clean UX | Thin tool set (3 GPA + 3 grade) |
| **calculator.net/gpa** | DA giant | Multi-input (letter/%/point), GPA planning, sibling utility universe | Generic; no student tone or moat |
| **rapidtables.com** | DA giant | Letter↔GPA converters, test calc, AP/IB/College scale presets | Bare-bones, zero E-E-A-T |
| **gradecalculator.com / .app / gpa-calculator.com / rogerhub.com** | Niche/utility | EZ Grader, grade curve, edge-case handling (drop lowest, extra credit) | No GPA depth, no per-school |

## Our moat (already shipped — competitors don't have)

1. **5 per-school weighting scales** (standard / conservative / third-step / uniform / AP-only) — niche-unique
2. **65 university-specific calculators** with calibrated admit ranges + Honors GPA + good-standing GPA — biggest portfolio in space
3. **27 GPA score lookup pages** (1.0–4.5 + decimal 3.25/3.33/3.75) — gpacalculator.net has 6, we have 5×
4. **Law School (LSAC CAS) full dedicated calc** — most have it as a side note
5. **AMCAS + CASPA university pages** for med/PA school applicants — extremely rare
6. **AP Score → GPA predictor** — uncommon
7. **GPA Goal reverse with feasibility tiers** — most have plain reverse, ours rates "easy/tight/stretch/impossible"
8. **Editorial team + peer review process page** — shipped today, most competitors zero on E-E-A-T
9. **GPA Scale comprehensive guide** — full 4.0/4.33/weighted/% in one reference
10. **Highest GPA Possible blog post** with weighted-ceiling explanation — unique answer-engine angle

## Tier-1 GAPS we should close (high volume + high commercial intent)

### Gap 1: **EZ Grader / Easy Grader**
- **What it is:** Teacher-focused tool — "out of 10 questions, 3 wrong = what %?" Audience = teachers + parents + students
- **Why:** Distinct keyword cluster ("ez grader" ~50K vol/mo, "easy grader" ~20K, KD low). Different audience opens fresh traffic.
- **Competitors who have it:** calculator.net, gradecalculator.com, gradecalculator.app, gpa-calculator.com, gpacalculator.net (/ez-grader/)
- **Page:** `/ez-grader` or `/easy-grader`
- **Effort:** 4-6 hours (single calc + content)

### Gap 2: **International grade conversion suite** (HUGE)
- **What it is:** Per-country conversion pages: UK degree class → US GPA, Indian CGPA → US 4.0, German Notensystem → US, Chinese 100-scale → US GPA, Canadian percentage → GPA.
- **Why:** International students applying to US colleges = high commercial intent + low KD niche. gpacalculator.net dominates this and we have nothing.
- **Suggested pages:**
  - `/uk-to-us-gpa-converter` (UK degree class / first/2:1/2:2 → US GPA)
  - `/india-cgpa-to-gpa-converter` (10-point CGPA → 4.0)
  - `/sgpa-to-cgpa-calculator` (Indian semester to cumulative)
  - `/german-grade-to-gpa-converter` (1.0–5.0 inverted → 4.0)
  - `/chinese-gpa-converter` (100-scale → 4.0)
  - `/canadian-gpa-converter`
- **Effort:** 2-3 hours per page. Build top 3 first.

### Gap 3: **"What GPA do I need for X" admission pages**
- **What it is:** Prescriptive rather than descriptive. "GPA for med school", "GPA for law school", "Ivy League GPA requirements", "scholarship GPA requirements".
- **Why:** Massive search intent — students Googling "what gpa do I need for harvard/stanford/UCLA". Buyer-intent crowd.
- **Suggested pages:**
  - `/gpa-requirements-medical-school` (we hint at this in /university/amcas)
  - `/gpa-requirements-law-school` (overlaps law-school calc; add admission tier page)
  - `/gpa-requirements-ivy-league` (already have blog post — make into hub)
  - `/gpa-for-nursing-school`
  - `/gpa-for-mba`
  - `/gpa-for-pharmacy-school`
  - `/scholarship-gpa-requirements` (Hope, Bright Futures, Cal Grant, Pell)
- **Effort:** 2 hours per page. Pure content, no new calc logic.

### Gap 4: **Colleges-by-GPA recommender**
- **What it is:** User inputs current GPA → app lists colleges fitting that GPA range (safety/target/reach).
- **Why:** **MASSIVE commercial intent killer.** collegesimply.com built their domain on this. Sticky + linkable feature.
- **Page:** `/colleges-by-gpa` with interactive filter
- **Effort:** 1-2 days (need college dataset — Common Data Set has it free). Higher effort, highest reward.

### Gap 5: **Letter Grade ↔ GPA Converter** (dedicated)
- **What we have:** Letter-to-GPA inline in calculators, not standalone
- **Competitor:** rapidtables has dedicated pages for both directions; high SV "letter grade to gpa"
- **Page:** `/letter-grade-to-gpa-converter`
- **Effort:** 2-3 hours. Lightweight calc + conversion table page.

### Gap 6: **CGPA to Percentage Calculator** (Indian student segment)
- **What it is:** Indian universities use 10-point CGPA. CBSE × 9.5 formula.
- **Why:** Huge Indian student market (we have it inline in /gpa-to-percentage but need standalone page for SEO).
- **Page:** `/cgpa-to-percentage-calculator`
- **Effort:** 2 hours

## Tier-2 GAPS (good adds when Tier-1 done)

### Gap 7: **Grade Curve Calculator**
- Niche but ranks. `gradecalculator.app /grade-curve-calculator/`
- Page: `/grade-curve-calculator`

### Gap 8: **Drop-lowest + Extra-credit + Point-system support** on Final Grade Calc
- RogerHub's edge-case handling is its USP. Our /final-grade-calculator currently only handles standard 3-input case.
- Add toggle options to existing component.

### Gap 9: **Account/save** (cross-device)
- gpacalculator.io has it. We have localStorage only (same device).
- Trade-off: requires backend + login. Heavy lift. Skip for now per "don't add features beyond task needs" rule.

### Gap 10: **GPA planning / multi-semester projection** (calculator.net feature)
- Beyond `/gpa-goal-calculator` — multi-term planner. "If I get these grades in Sem 3, what's my Sem 4 target for a 3.8 cumulative?"
- Page: `/gpa-projection-calculator`
- Effort: 4 hours (extends existing logic)

## Recommended sequencing (next 7 days)

| Day | Build | Why |
|---|---|---|
| **Day 2 (06-03)** | `/ez-grader` | High SV, low KD, fresh audience (teachers) |
| **Day 3 (06-04)** | `/letter-grade-to-gpa-converter` + `/cgpa-to-percentage-calculator` | Quick wins, niche SEO |
| **Day 4 (06-05)** | `/india-cgpa-to-gpa-converter` + `/uk-to-us-gpa-converter` | Open Indian + UK segments |
| **Day 5 (06-06)** | `/gpa-requirements-medical-school` + `/gpa-requirements-law-school` | Prescriptive admission content |
| **Day 6 (06-07)** | `/gpa-requirements-ivy-league` + `/scholarship-gpa-requirements` | High-intent guides |
| **Day 7 (06-08)** | `/colleges-by-gpa` MVP | Commercial-intent killer; can refine later |

## Anti-patterns (DO NOT copy competitors here)

- Generic tone (gpacalculator.io reads dated)
- Bare-bones tool only (rapidtables — no E-E-A-T)
- 100+ thin pages (some competitors spam school-specific without depth — we go deep on 65 unis instead)
- Account-wall (we stay no-signup; market differentiator)

## Summary

**Our portfolio is already 70%+ ahead on depth (5 scales, 65 unis, 27 score pages, editorial team).** Top 3 gaps to close are:
1. **EZ Grader** — fresh audience + traffic
2. **International conversion suite** (UK + India + Germany + China) — untapped segments competitors own
3. **GPA admission requirement pages** — prescriptive high-intent

Building all 3 in next 5 days adds ~80K combined monthly addressable volume at KD <15 for most pages.
