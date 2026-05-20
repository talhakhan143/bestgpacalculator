# SEO Audit Report — bestgpacalculator.online

**Audit Date:** 2026-05-20
**Method:** 8 parallel specialist subagents (technical, content, schema, sitemap, performance, GEO, SXO, visual)
**Overall SEO Health Score:** 74 / 100

| Category | Weight | Score |
|----------|--------|-------|
| Technical SEO | 22% | 79 |
| Content / E-E-A-T | 23% | 74 |
| On-Page (SXO + Visual) | 20% | 78 |
| Schema / Structured Data | 10% | 70 |
| Performance (Core Web Vitals) | 10% | 65 |
| AI Search Readiness (GEO) | 10% | 71 |
| Images | 5% | 75 |

---

## Critical Issues (6)

### C1. Blog route is `force-dynamic` → kills caching
**File:** `src/app/blog/[slug]/page.tsx:13`
**Symptom:** Every blog request misses Vercel cache. TTFB ~1,000 ms vs 230 ms on static pages.
**Fix:** Remove `export const dynamic = "force-dynamic"`. Add `generateStaticParams` + `export const revalidate = 300`.

### C2. BlogPosting schema missing `author` entirely
**File:** `src/app/blog/[slug]/page.tsx` (Article schema block)
**Symptom:** No machine-readable author on any blog post. Blocks Google Article rich-result eligibility, weakens E-E-A-T.
**Fix:** Add Person author block matching calc-page ArticleSchema.

### C3. Publisher name mismatch on blog posts
**File:** `src/app/blog/[slug]/page.tsx`
**Symptom:** `publisher.name = "GPA Boost"` on every BlogPosting, but sitewide Organization is `"BestGPACalculator"`. Identity inconsistency.
**Fix:** Change all `publisher.name` to `"BestGPACalculator"` + add logo width/height.

### C4. HowTo schema is dead since Sept 2023 but still on every calc page
**File:** `src/components/seo/JsonLd.tsx:38-58`
**Symptom:** Google ignores HowTo rich results. The block adds bytes + noise without benefit.
**Fix:** Remove HowTo from `CalculatorSchema` graph. WebApplication `featureList` already signals tool purpose.

### C5. Homepage missing brand entity sentence in SSR HTML
**File:** home page hero / layout
**Symptom:** AI Overviews and ChatGPT cannot extract "what is BestGPACalculator" because no prose sentence names + defines the brand entity in static HTML.
**Fix:** Add a single sentence: *"BestGPACalculator is a free GPA calculation tool for US high school and college students, supporting weighted, unweighted, AP, Honors, and IB grading systems."*

### C6. Blog cover image has no width/height/fetchpriority → guaranteed CLS
**File:** `src/app/blog/[slug]/page.tsx` cover `<img>`
**Symptom:** Layout shift on every blog post; LCP image not prioritized.
**Fix:** Add `width={1600} height={900} fetchpriority="high"` + real `alt` from post title.

---

## High Priority Issues (11)

### H1. www subdomain returns 307 (temporary) instead of 308
**Action:** Vercel dashboard → project settings → Domains → add `www.bestgpacalculator.online` as alias pointing to apex. Vercel auto-serves 308.
**Requires:** User action in Vercel dashboard (not code).

### H2. Homepage WebApplication schema URL/entity mismatch
**File:** `src/components/seo/JsonLd.tsx` CalculatorSchema usage
**Symptom:** Home page schema names "Weighted GPA Calculator" but URL is `/`.
**Fix:** Use site-level WebApplication on home, or only render CalculatorSchema on actual tool pages.

### H3. GTM `<link rel="preload">` conflicts with `afterInteractive` loading
**Symptom:** Browser preloads gtag/js then waits for the chunk that uses it. Wasted bandwidth + Lighthouse warning.
**Fix:** Remove preload hint. Add `<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>` instead.

### H4. Person author = "Editorial Team" — a team is not a Person
**File:** `src/components/seo/JsonLd.tsx` ArticleSchema
**Symptom:** Schema integrity violation. Google's Rich Results validator flags.
**Fix:** Switch to `Organization` author OR add real named Person stubs.

### H5. OrganizationSchema `sameAs: []` empty
**File:** `src/components/seo/JsonLd.tsx:102`
**Symptom:** Explicitly tells Google there are no entity references anywhere. Worse than omitting.
**Fix:** Add at least one external profile URL (LinkedIn company page, Twitter/X handle), or remove the property.

### H6. `/high-school-gpa-calculator` breadcrumb parent links to wrong page
**File:** `src/app/high-school-gpa-calculator/page.tsx`
**Symptom:** Breadcrumb parent points to `/weighted-gpa-calculator` (another leaf calc) instead of a hub.
**Fix:** Change middle breadcrumb to `{ name: "Home", href: "/" }` or create a `/calculators` hub.

### H7. Identical `datePublished: "2026-04-15"` on all calculator pages
**Symptom:** Looks templated to crawlers; removes per-page freshness signal.
**Fix:** Stagger real dates per page based on actual launch order.

### H8. `/blog/percentage-to-gpa-conversion-chart` SXO intent mismatch
**Symptom:** SERP for "percentage to gpa conversion chart" is dominated by tool-hybrid pages (6/10). Current page is editorial only.
**Fix:** Embed live converter widget above the chart tables.
**Note:** Defer — requires building/embedding component into MDX blog content; not a simple file edit.

### H9. `/weighted-gpa-calculator` no above-fold CTA
**Symptom:** Hero shows result widget but no "Add class" / "Start calculating" prompt for first-time users.
**Fix:** Add explicit primary CTA in hero.
**Note:** Defer — requires Hero component layout change.

### H10. `/blog/what-is-gpa` definition buried below fold
**Symptom:** Featured-snippet eligibility blocked because no 1-sentence definition in first paragraph.
**Fix:** Move definition to lead paragraph.
**Note:** Content is in Turso DB → requires re-publish.

### H11. No inline citations on blog posts (calc pages have them)
**Symptom:** YMYL-adjacent claims (financial aid SAP thresholds, NHS chapter cutoffs) without source links. AI Overviews prefer attributed claims.
**Fix:** Add 2–3 hyperlinked citations per post body.
**Note:** Defer — requires editing each blog post body.

---

## Medium Priority Issues (13)

| # | Issue | File / Area |
|---|-------|-------------|
| M1 | No ItemList schema on home or /blog index | home + /blog page |
| M2 | `/college-gpa-calculator` + `/high-school-gpa-calculator` below 800-word floor | content expansion needed |
| M3 | Day 2 (NHS) + Day 8 (financial aid) below 1500-word blog floor | content expansion |
| M4 | No `preconnect` to `images.unsplash.com` | blog layout `<head>` |
| M5 | `/about` + `/contact` share global og:description | per-page metadata |
| M6 | Article schema on calc pages missing `image` | JsonLd.tsx ArticleSchema |
| M7 | Article publisher logo missing dimensions on calc pages | JsonLd.tsx ArticleSchema |
| M8 | llms.txt missing `# About` entity block | public/llms.txt |
| M9 | No explicit AI crawler directives in robots.txt | public/robots.txt |
| M10 | Speakable schema missing on cornerstone posts | JsonLd.tsx |
| M11 | Blog H2s use statement form instead of question form | per-post markdown |
| M12 | Unsplash images served at w=1600 (content column ~740px) | blog cover URL |
| M13 | Blog post `image` is plain string, not ImageObject | blog page schema |

---

## Low Priority Issues (8)

| # | Issue | File |
|---|-------|------|
| L1 | `<meta name="keywords">` present (Google ignores, looks spammy) | layout.tsx |
| L2 | `changeFrequency` + `priority` in sitemap (Google ignores) | sitemap.ts |
| L3 | `/blog` lastmod hardcoded instead of derived from latest post | sitemap.ts |
| L4 | `/how-to-calculate-gpa` sitemap priority 0.5 vs blog 0.7 | sitemap.ts |
| L5 | BlogPosting missing `inLanguage` | blog page schema |
| L6 | Cover images via plain `<img>`, not next/image | blog/page.tsx |
| L7 | Stale draft `.md` files in `content/drafts/` after publish | content directory |
| L8 | Blog post hero `alt=""` empty | blog cover img |

---

## Fix Status (updated as work proceeds)

Status legend: ✅ done • 🟡 in progress • 🔴 deferred (needs separate work / user action)

See `SEO-FIXES-STATUS.md` for live status table after this report was committed.

---

## SXO Findings Summary

| Page | Keyword | Match |
|------|---------|-------|
| /weighted-gpa-calculator | "weighted gpa calculator" | ✅ Aligned (tool dominant SERP, page is tool-hybrid) |
| /blog/what-is-gpa | "what is gpa" | ✅ Aligned (guide dominant SERP, page is long-form guide) |
| /blog/percentage-to-gpa-conversion-chart | "percentage to gpa conversion chart" | 🔴 Mismatch (SERP wants tool-hybrid, page is editorial) |
| / (home) | "gpa calculator" | 🟡 Partial (tool present, but H1 says "weighted" not generic) |

---

## GEO Platform Readiness

| Platform | Score | Bottleneck |
|----------|-------|------------|
| Google AI Overviews | 62 / 100 | No attributed stats, no entity prose on home |
| ChatGPT (web browse) | 68 / 100 | No named author, no entity anchoring |
| Perplexity | 74 / 100 | Strong FAQ structure; author missing |
| Bing Copilot | 70 / 100 | robots.txt + schema adequate |

---

## What Was Already Good (passed all checks)

- HTTPS + HSTS preload
- All security headers (CSP excluded intentionally)
- robots.txt syntax + sitemap accessibility
- Trailing slash redirects (308 permanent)
- Canonical tags self-referencing + full URL
- meta robots: index, follow site-wide
- Viewport meta + mobile responsive
- Full SSR (no CSR shell)
- All scripts async
- IndexNow key file
- Breadcrumb schema correct + absolute URLs
- WebApplication w/ EducationalApplication + Offer price 0
- ISO 8601 dates on Article/BlogPosting
- /about page: corrections policy, sources policy, peer review process (~1100 words)
- Logo dimensions in OrganizationSchema correct (956×188)
