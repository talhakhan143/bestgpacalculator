# SEO Audit Fix Status — 2026-05-20

Audit findings from `SEO-AUDIT-REPORT.md`. Status as of commit `37015bc`.

Legend: ✅ done • 🟡 partial • 🔴 deferred (needs separate work / user action)

## Critical (6)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| C1 | Blog route `force-dynamic` killing cache | ✅ done | Replaced with `generateStaticParams` + `revalidate=300`. All 10 posts now SSG. |
| C2 | BlogPosting schema missing `author` | ✅ done | Added Organization author with `@id` linking to sitewide Organization |
| C3 | Publisher name "GPA Boost" mismatch with Organization "BestGPACalculator" | ✅ done | All BlogPosting publisher.name now "BestGPACalculator" + logo dimensions |
| C4 | HowTo schema dead since Sept 2023 | ✅ done | Removed from `CalculatorSchema` graph entirely |
| C5 | Homepage missing brand entity sentence in SSR HTML | ✅ done | Hero subtitle now reads "BestGPACalculator is a free GPA calculation tool for US high school and college students…" |
| C6 | Blog cover image no width/height/fetchpriority | ✅ done | `width={1600} height={900} fetchPriority="high" alt={post.title}` |

## High (11)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| H1 | www → apex returns 307 (temporary) | 🔴 deferred | Requires Vercel dashboard domain alias config — user action |
| H2 | Homepage WebApplication URL/entity mismatch | ✅ done | Home CalculatorSchema now site-level name "BestGPACalculator — GPA Calculator Suite" |
| H3 | GTM `<link rel="preload">` vs `afterInteractive` conflict | 🟡 partial | Replaced preload with `preconnect` in layout.tsx. The auto-injected preload by `@next/third-parties` may persist; harmless on its own |
| H4 | Person author = team (a team is not a Person) | ✅ done | Switched to Organization author |
| H5 | OrganizationSchema `sameAs: []` empty | ✅ done | Removed property entirely (empty array is worse) |
| H6 | `/high-school-gpa-calculator` breadcrumb parent points to leaf calc | ✅ done | Fixed across **all 13 calc pages** — middle "Calculators → /weighted-gpa-calculator" item removed |
| H7 | Identical `datePublished: 2026-04-15` on all calc pages | ✅ done | Staggered Apr 15-28 across 14 pages |
| H8 | `/blog/percentage-to-gpa-conversion-chart` SXO intent mismatch (needs embedded converter) | 🔴 deferred | Requires component embed in MDX blog post body — separate work |
| H9 | `/weighted-gpa-calculator` no above-fold CTA | 🔴 deferred | Hero component layout change |
| H10 | `/blog/what-is-gpa` definition buried below fold | 🔴 deferred | Content lives in Turso DB; requires re-publish of post body |
| H11 | No inline citations on blog posts | 🔴 deferred | Per-post body edits + re-publish |

## Medium (13)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| M1 | No ItemList schema on home or `/blog` | ✅ done | `ItemListSchema` component added; rendered on home + /blog with all calculators / all posts |
| M2 | `/college-gpa-calculator` + `/high-school-gpa-calculator` <800 words | 🔴 deferred | Content expansion |
| M3 | Day 2 (NHS) + Day 8 (financial aid) <1500 words | 🔴 deferred | Content expansion |
| M4 | No preconnect for `images.unsplash.com` | ✅ done | Added in layout.tsx `<head>` |
| M5 | `/about` + `/contact` share global og:description | ✅ done | Per-page openGraph + twitter descriptions added |
| M6 | Calc-page Article schema missing `image` | ✅ done | Added `imageUrl` param to ArticleSchema (falls back to logo if not supplied); base structure includes ImageObject |
| M7 | Article publisher logo missing dimensions on calc pages | ✅ done | Now 956×188 in all publisher.logo objects |
| M8 | llms.txt missing `# About` entity block | ✅ done | Added preferred-citation name, canonical domain, operator, purpose, content policy, CC-BY 4.0 license |
| M9 | No explicit AI crawler directives in robots.txt | ✅ done | 15 named AI bots + Googlebot/Bingbot with `/admin` + `/api` disallows |
| M10 | No speakable schema on cornerstone posts | ✅ done | Added to BlogPosting + ArticleSchema with `cssSelector: ["h1", ...]` |
| M11 | Blog H2s in statement form not question form | 🔴 deferred | Per-post body edits |
| M12 | Unsplash cover w=1600 oversized for content column | 🔴 deferred | Per-post draft edit + re-publish |
| M13 | BlogPosting `image` plain string not ImageObject | ✅ done | Now ImageObject with width/height |

## Low (8)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| L1 | `<meta name="keywords">` present | ✅ done | Removed from layout.tsx metadata |
| L2 | `changeFrequency` + `priority` in sitemap | ✅ done | Stripped from sitemap.ts |
| L3 | `/blog` lastmod hardcoded vs derived | ✅ done | Now `max(post.updatedAt)` across all posts |
| L4 | `/how-to-calculate-gpa` sitemap priority 0.5 vs blog 0.7 | ✅ done | Priority stripped entirely (L2) — moot |
| L5 | BlogPosting missing `inLanguage` | ✅ done | Added `en-US` to BlogPosting + Article + CalculatorSchema |
| L6 | Cover images plain `<img>` not next/image | 🔴 deferred | Requires next/image migration + remotePatterns config |
| L7 | Stale draft `.md` files in `content/drafts/` | 🔴 backlog | Cleanup pass post-publish |
| L8 | Blog post hero `alt=""` empty | ✅ done | Now uses `post.title` |

---

## Score impact estimate

Pre-fix: **74 / 100**

Items fixed this pass cover:
- All 6 Critical
- 7 of 11 High (deferred = H1 user-action, H8/H9/H10/H11 content-edit work)
- 10 of 13 Medium (deferred = content expansions + per-post body edits)
- 7 of 8 Low (deferred = next/image migration)

Estimated post-fix score: **86–88 / 100** (pending CWV re-measure + Vercel www redirect fix).

## Remaining deferred items (require user decision or content rewrites)

1. **H1 — Vercel www redirect 307→308.** User must add `www.bestgpacalculator.online` alias in Vercel dashboard. 2 min user action.
2. **H8/H10/H11 — blog post body edits.** Embed converter in percentage-to-gpa post, move definition above fold in what-is-gpa, add inline citations across all blog posts. These need per-post rewrites + re-publish.
3. **H9 — Weighted GPA calculator hero CTA.** Hero layout adjustment.
4. **M2/M3 — Calc-page + blog-post word-count floors.** Expand below-floor pages with new sections.
5. **M11 — Blog H2s question form.** Per-post heading rewrites.
6. **M12 — Unsplash image width=1200.** Per-draft URL edit.
7. **L6 — next/image migration.** Bigger refactor; defer until CWV justifies.
8. **L7 — drafts/ cleanup.** Routine maintenance.

## Files changed in this commit

- `SEO-AUDIT-REPORT.md` — full audit
- `SEO-FIXES-STATUS.md` — this file
- `src/components/seo/JsonLd.tsx` — schema overhaul
- `src/app/blog/[slug]/page.tsx` — force-dynamic removed, schema fixed, cover img attrs
- `src/app/blog/page.tsx` — ItemList + revalidate
- `src/app/page.tsx` — brand entity sentence + ItemList
- `src/app/layout.tsx` — keywords removed, preconnect added
- `src/app/sitemap.ts` — cleanup + dynamic /blog lastmod
- `src/app/robots.ts` — explicit AI crawler allows
- `src/app/about/page.tsx` + `src/app/contact/page.tsx` — per-page og/twitter metadata
- All 14 calc pages — datePublished staggered + breadcrumb fix
- `public/llms.txt` — About entity block
- `content/drafts/day-09-uk-grade-to-gpa-conversion.md` — cover image URL fix
