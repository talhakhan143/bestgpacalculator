# 14-Day Recovery Battle Plan

**Start date:** 2026-06-13 (kal subah)
**End date:** 2026-06-26
**Mission:** lift impressions from ~10/day → 200+/day; escape position 50+ → position 20-30 zone; hit first 50-click day.

## Phase A: Quick-win content gaps (Days 1-3, 06-13 to 06-15)

| Day | Date | Build |
|-----|------|-------|
| 1 | 06-13 | `/ez-grader` (teacher tool) — 50K SV, KD ~5 |
| 2 | 06-14 | `/letter-grade-to-gpa-converter` + 5 GSC URL-Inspection requests on enriched unis |
| 3 | 06-15 | `/cgpa-to-percentage-calculator` (standalone) |

Daily: 1 title rewrite on impression-heavy page from GSC (target 5 more in 3 days).

## Phase B: International conversion suite (Days 4-7, 06-16 to 06-19)

Steal from gpacalculator.net.

| Day | Date | Build |
|-----|------|-------|
| 4 | 06-16 | `/uk-to-us-gpa-converter` |
| 5 | 06-17 | `/india-cgpa-to-gpa-converter` + `/sgpa-to-cgpa-calculator` |
| 6 | 06-18 | `/german-grade-to-gpa-converter` |
| 7 | 06-19 | `/chinese-gpa-converter` + `/canadian-gpa-converter` |

6 new pages. Combined SV target: ~40K/mo at KD <12.

## Phase C: Admission requirement pages (Days 8-10, 06-20 to 06-22)

Buyer-intent "what GPA do I need for X".

| Day | Date | Build |
|-----|------|-------|
| 8 | 06-20 | `/gpa-requirements-medical-school` + `/gpa-requirements-law-school` |
| 9 | 06-21 | `/gpa-requirements-ivy-league` (hub) + `/scholarship-gpa-requirements` |
| 10 | 06-22 | `/gpa-for-nursing-school` + `/gpa-for-mba` + `/gpa-for-pharmacy-school` |

7 new pages. Pure content, no new calc logic. Each cites actual school data.

## Phase D: Backlink offensive + monitoring (Days 11-14, 06-23 to 06-26)

| Action | Cadence | Target source |
|--------|---------|---------------|
| HARO replies | 3/day | Education journalists (DR 70+) |
| .edu outreach | 5 emails/day | High school counselors + college admissions blogs |
| Quora answers | 2/day | Education topics |
| Pinterest pins | 5/day | Each calc page = 1 pin |
| Reddit | 1 useful comment/day | r/ApplyingToCollege, r/college, r/PSAT |

Stop: Medium/Dev.to/Blogger churn (low-trust signal hurting score).

## Parallel tracks (run alongside daily builds)

### Track 1: E-E-A-T hardening
- Add real LinkedIn URLs to editorial team page
- Author bio with photo on every blog post
- "Last reviewed" date + reviewer name on every calc page
- `/about/methodology` page explaining admit ranges + scaling

### Track 2: Tech health
- PageSpeed Insights on top 5 calc pages — fix LCP > 2.5s
- Validate schema on all 65 uni pages via Rich Results Test
- Internal link audit: every calc has >=3 inbound from blog posts
- Mobile CWV via CrUX

### Track 3: GSC daily ritual
- Morning: check Performance tab
- Track top-20 query positions
- URL Inspection: 5-7 new URLs requested daily (within quota)
- Watch "Discovered - currently not indexed" count drop

## Success metrics

| Metric | Day 1 | Day 7 | Day 14 |
|--------|-------|-------|--------|
| Daily impressions | 10 | 50 | 150-200 |
| Daily clicks | 0 | 2-3 | 10-15 |
| Avg position | 50+ | 35-40 | 20-25 |
| CTR | 0% | 1% | 2% |
| Indexed pages | 37 | 70 | 120+ |
| Backlinks DR 30+ | 0 | 3 | 8-10 |

## Pending decisions

1. 2 LinkedIn URLs for editorial team byline (user + collaborator). Else "BestGPA Editorial Team" no link.
2. Ahrefs export "what gpa do you need for X" keyword cluster.
3. HARO: free tier (3 queries/day) or paid ($149/mo unlimited)?

## Day 1 boot sequence (kal 06-13 AM)

1. Ship `/ez-grader` (component + page + content) — 4 hr
2. GSC URL Inspection request for 10 fresh URLs
3. IndexNow ping
4. Commit + push
5. Day-1 done by 2pm

## Risk register

| Risk | Mitigation |
|------|-----------|
| Google still cooking penalty | Wait 30 more days. Wave 3 + new content keeps trajectory upward |
| HARO/.edu zero response | Pivot to college newspapers + counselor associations. Dead-link building |
| Sitemap stuck at 84 URLs | Enrich 12 noindex scores in week 2 spare time |
| New pages "Discovered - not indexed" | Strong internal link from homepage + relevant blog post launch day |
