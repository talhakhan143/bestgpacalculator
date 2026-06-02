#!/usr/bin/env python3
"""Build primary/secondary keyword map for every page on bestgpacalculator.online.

Reads:
- keywords/analysis.json (Ahrefs paid-tool dataset, 2,385 kws)
- src/app/* (existing calculator + hub pages)
- src/lib/gpa-score-data.ts (27 GPA score pages)
- src/lib/university-data.ts (50 uni pages)
- content/drafts/*.md (32 blog posts)

Outputs:
- keywords/page-keyword-map.md (human-readable table)
- keywords/page-keyword-map.json (machine-readable for future scripts)
"""
import json, os, re, glob
from collections import defaultdict

ROOT = '/Users/eapple/Documents/Calculator'

# Load keyword dataset
with open(f'{ROOT}/keywords/analysis.json') as f:
    KWDATA = json.load(f)
ALL_KW = []
for bucket in ('gpa_direct', 'branded', 'adjacent', 'calculator_other'):
    for s in KWDATA[bucket]:
        s['bucket'] = bucket
        ALL_KW.append(s)

# Index by token for fast keyword lookup
def tokens(s):
    s = s.lower()
    return set(re.findall(r"[a-z0-9.]+", s))

KW_BY_TOKEN = defaultdict(list)
for s in ALL_KW:
    for t in tokens(s['kw']):
        KW_BY_TOKEN[t].append(s)

# Common GPA-niche tokens that should NOT count as distinctive (too generic)
GENERIC_TOKENS = {'gpa', 'calculator', 'school', 'college', 'a', 'is', 'good', 'high', 'the', 'what', 'how', 'to', 'in', 'of', 'and', 'or', 'for', 'on', 'my', 'your', 'i', 'do', 'does', '4.0', '2026', '2027'}

def find_keywords(page_topic_tokens, must_include=None, max_kd=40, min_vol=0, limit=20,
                  exclude_substr=None, require_distinctive=False, allow_high_kd_primary=False):
    """Return keywords scoring well for a page topic.
    page_topic_tokens: set of tokens the page is "about"
    must_include: optional substring all kws must contain
    require_distinctive: if True, kw must share at least one NON-generic token with page topic
    """
    must_include = (must_include or '').lower()
    distinctive_topic = page_topic_tokens - GENERIC_TOKENS
    scored = []
    seen = set()
    for s in ALL_KW:
        if s['kw'] in seen:
            continue
        if must_include and must_include not in s['kw']:
            continue
        if exclude_substr and any(x in s['kw'] for x in exclude_substr):
            continue
        # Apply kd ceiling unless this is the primary (allow generic head terms)
        effective_max_kd = 60 if allow_high_kd_primary else max_kd
        if s['kd'] > effective_max_kd or s['vol'] < min_vol:
            continue
        kw_toks = tokens(s['kw'])
        overlap = len(kw_toks & page_topic_tokens)
        distinctive_overlap = len(kw_toks & distinctive_topic)
        if must_include:
            # Already filtered by must_include; force at least 1 overlap
            if overlap == 0:
                continue
        else:
            if require_distinctive:
                if distinctive_overlap == 0:
                    continue
            elif overlap == 0:
                continue
        # Score: vol weighted by distinctive overlap (NOT generic overlap) + inverse KD
        # Distinctive overlap weighted much higher than generic
        score = s['vol'] * (distinctive_overlap * 5 + overlap + 1) / (s['kd'] + 1)
        seen.add(s['kw'])
        scored.append((score, s))
    scored.sort(key=lambda x: -x[0])
    return [s for _, s in scored[:limit]]

# ---------- Define every page on the site ----------
PAGES = []

# Homepage — target generic head "gpa calculator" + typo alts (broad reach)
PAGES.append({
    'url': '/',
    'section': 'Homepage',
    'title': 'Best GPA Calculator',
    'topic_tokens': tokens('gpa calculator'),
    'must_include': None,
    'exclude': None,
    'allow_high_kd_primary': True,  # homepage needs head term even at KD 47
    'manual_primary': 'gpa calculator',  # force pick this kw
})

# 14 calculator pages
CALC_PAGES = [
    ('/weighted-gpa-calculator', 'Weighted GPA Calculator', 'weighted gpa calculator', 'weighted gpa'),
    ('/unweighted-gpa-calculator', 'Unweighted GPA Calculator', 'unweighted gpa calculator', 'unweighted gpa'),
    ('/high-school-gpa-calculator', 'High School GPA Calculator', 'high school gpa calculator', 'high school gpa'),
    ('/college-gpa-calculator', 'College GPA Calculator', 'gpa calculator college', 'college gpa'),
    ('/cumulative-gpa-calculator', 'Cumulative GPA Calculator', 'cumulative gpa calculator', 'cumulative gpa'),
    ('/semester-gpa-calculator', 'Semester GPA Calculator', 'semester gpa calculator', 'semester gpa'),
    ('/current-gpa-calculator', 'Current GPA Calculator', 'current gpa calculator', 'current gpa'),
    ('/ap-gpa-calculator', 'AP GPA Calculator', 'ap gpa calculator', 'ap gpa'),
    ('/honors-gpa-calculator', 'Honors GPA Calculator', 'honors gpa calculator', 'honors gpa'),
    ('/percentage-to-gpa-calculator', 'Percentage to GPA Calculator', 'percentage to gpa calculator', 'percentage to gpa'),
    ('/middle-school-gpa-calculator', 'Middle School GPA Calculator', 'gpa calculator middle school', 'middle school gpa'),
    ('/gpa-goal-calculator', 'GPA Goal Calculator', 'gpa goal calculator', 'gpa goal'),
    ('/gpa-calculator-without-credits', 'GPA Calculator Without Credits', 'gpa calculator without credits', 'gpa no credits'),
    ('/ap-score-to-gpa-calculator', 'AP Score to GPA Calculator', 'ap score to gpa calculator', 'ap score gpa'),
    ('/how-to-calculate-gpa', 'How to Calculate GPA', 'how to calculate gpa', 'calculate gpa'),
]
for url, title, must, topic in CALC_PAGES:
    PAGES.append({
        'url': url,
        'section': 'Calculator',
        'title': title,
        'topic_tokens': tokens(topic + ' ' + title),
        'must_include': must,
        'exclude': None,
    })

# /gpa-scale hub
PAGES.append({
    'url': '/gpa-scale',
    'section': 'Reference',
    'title': 'GPA Scale',
    'topic_tokens': tokens('gpa scale reporting 4.0 weighted unweighted'),
    'must_include': 'scale',
    'exclude': None,
})

# /gpa hub (GPA scores index)
PAGES.append({
    'url': '/gpa',
    'section': 'Reference',
    'title': 'GPA Scores Hub',
    'topic_tokens': tokens('what is a good gpa'),
    'must_include': None,
    'exclude': None,
    'manual_primary': 'what is a good gpa',
})

# 27 GPA score pages — read from data
gpa_score_file = open(f'{ROOT}/src/lib/gpa-score-data.ts').read()
gpa_scores = re.findall(r'value:\s*"([\d.]+)"', gpa_score_file)
for v in gpa_scores:
    slug = v.replace('.', '-')
    PAGES.append({
        'url': f'/gpa/{slug}',
        'section': 'GPA Score',
        'title': f'Is a {v} GPA Good?',
        'topic_tokens': tokens(f'{v} gpa good letter percentage'),
        'must_include': v + ' gpa',
        'exclude': None,
    })

# /university hub
PAGES.append({
    'url': '/university',
    'section': 'Reference',
    'title': 'University Calculators Hub',
    'topic_tokens': tokens('college gpa calculator university'),
    'must_include': 'college gpa calculator',
    'exclude': None,
    'manual_primary': 'gpa calculator college',
})

# 50 university pages — read from data
uni_file = open(f'{ROOT}/src/lib/university-data.ts').read()
uni_slugs = re.findall(r'slug:\s*"([\w-]+)"', uni_file)
uni_abbrs = re.findall(r'abbr:\s*"([\w\s]+)"', uni_file)
uni_short = re.findall(r'shortName:\s*"([\w\s\-]+)"', uni_file)
for slug, abbr, sn in zip(uni_slugs, uni_abbrs, uni_short):
    PAGES.append({
        'url': f'/university/{slug}',
        'section': 'University',
        'title': f'{abbr} GPA Calculator',
        'topic_tokens': tokens(f'{slug} {abbr} {sn} gpa calculator'),
        'must_include': slug.replace('-', ' '),
        'exclude': None,
    })

# 32 blog posts — per-post explicit primary keyword from slug intent
BLOG_PRIMARY_HINTS = {
    'what-is-gpa': 'what is gpa scale reporting',
    'nhs-gpa-requirements': 'nhs gpa requirements',
    'how-many-as-to-raise-gpa': 'how many a',
    'percentage-to-gpa-conversion-chart': 'percentage to gpa',
    'does-retaking-a-class-replace-gpa': 'retake',
    'major-gpa-vs-overall-gpa': 'major gpa',
    'what-gpa-is-valedictorian': 'valedictorian gpa',
    'gpa-and-financial-aid': 'financial aid gpa',
    'uk-grade-to-gpa-conversion': 'uk gpa',
    'does-summer-school-raise-gpa': 'summer school gpa',
    'how-weighted-gpa-works': 'how weighted gpa',
    'weighted-vs-unweighted-gpa': 'weighted vs unweighted',
    '4-0-gpa-scale-explained': '4.0 gpa scale',
    'what-is-a-good-gpa-in-high-school': 'good gpa in high school',
    'what-is-a-good-gpa-in-college': 'good gpa in college',
    'ivy-league-average-gpa': 'ivy league gpa',
    'how-to-raise-gpa-fast': 'raise gpa fast',
    'pass-fail-and-your-gpa': 'pass fail gpa',
    'cumulative-vs-semester-gpa': 'cumulative vs semester',
    'gpa-requirements-for-scholarships': 'scholarship gpa',
    'academic-probation-gpa': 'academic probation',
    'how-do-honors-classes-affect-gpa': 'honors classes gpa',
    'recover-gpa-after-bad-semester': 'recover gpa',
    'how-to-calculate-cumulative-gpa': 'calculate cumulative gpa',
    'deans-list-gpa-requirements': "dean's list gpa",
    'should-i-put-gpa-on-resume': 'gpa on resume',
    'gpa-scale-explained': 'gpa scale',
    'ivy-league-gpa-requirements': 'ivy league gpa requirements',
    'how-to-raise-gpa': 'how to raise gpa',
    'ncaa-gpa-requirements': 'ncaa gpa requirements',
    'is-3-0-gpa-good': 'is a 3.0 gpa good',
    'is-3-5-gpa-good': 'is a 3.5 gpa good',
}

for path in sorted(glob.glob(f'{ROOT}/content/drafts/day-*.md')):
    text = open(path).read()
    m_title = re.search(r'title:\s*"([^"]+)"', text)
    m_slug = re.search(r'slug:\s*"([^"]+)"', text)
    title = m_title.group(1) if m_title else os.path.basename(path)
    slug = m_slug.group(1) if m_slug else os.path.basename(path).replace('.md','')
    topic = re.sub(r'^day-\d+-', '', slug).replace('-', ' ')
    hint = BLOG_PRIMARY_HINTS.get(slug, topic)
    PAGES.append({
        'url': f'/blog/{slug}',
        'section': 'Blog',
        'title': title,
        'topic_tokens': tokens(topic + ' ' + title + ' ' + hint),
        'must_include': None,
        'exclude': None,
        'require_distinctive': True,
        'manual_primary_hint': hint,
    })

# ---------- Score each page ----------
def kw_lookup_exact(text):
    """Find kw matching exact string in dataset, else closest substring match."""
    t = text.lower().strip()
    # exact
    for s in ALL_KW:
        if s['kw'] == t:
            return s
    # contains
    matches = [s for s in ALL_KW if t in s['kw']]
    if matches:
        return max(matches, key=lambda s: s['vol'])
    return None

for p in PAGES:
    kws = find_keywords(
        p['topic_tokens'],
        must_include=p['must_include'],
        max_kd=40,
        min_vol=0,
        limit=15,
        exclude_substr=p.get('exclude'),
        require_distinctive=p.get('require_distinctive', False),
        allow_high_kd_primary=p.get('allow_high_kd_primary', False),
    )
    # Manual primary override
    manual = p.get('manual_primary') or p.get('manual_primary_hint')
    if manual:
        forced = kw_lookup_exact(manual)
        if forced:
            # Move forced kw to position 0, others become secondary
            kws = [forced] + [s for s in kws if s['kw'] != forced['kw']]
    if not kws:
        p['primary'] = None
        p['secondary'] = []
        continue
    p['primary'] = kws[0]
    p['secondary'] = kws[1:8]

# ---------- Write output ----------
sections = ['Homepage', 'Calculator', 'Reference', 'GPA Score', 'University', 'Blog']
md_lines = ['# Page Keyword Map (bestgpacalculator.online)', '']
md_lines.append(f'**Source:** Ahrefs paid-tool dataset 2026-06-01 ({len(ALL_KW)} unique kws). Built {2026}-06-02.')
md_lines.append('')
md_lines.append('**Methodology:** For each page, find keywords sharing tokens with page topic, filter to KD ≤ 40, score by `vol * (token-overlap+1) / (kd+1)`. Primary = top score. Secondary = next 7.')
md_lines.append('')

total_addressable = 0
for section in sections:
    section_pages = [p for p in PAGES if p['section'] == section]
    if not section_pages:
        continue
    md_lines.append(f'## {section} ({len(section_pages)} pages)')
    md_lines.append('')
    md_lines.append('| URL | Primary kw | Pri KD/Vol | Secondary kws |')
    md_lines.append('|---|---|---|---|')
    for p in section_pages:
        pri = p['primary']
        if pri:
            pri_str = f'`{pri["kw"]}`'
            pri_kdvol = f'KD {pri["kd"]} / {pri["vol"]}'
            total_addressable += pri['vol']
        else:
            pri_str = '_(no match)_'
            pri_kdvol = '—'
        sec_str = '<br>'.join(f'`{s["kw"]}` (KD {s["kd"]}, {s["vol"]})' for s in p['secondary'][:5])
        md_lines.append(f'| `{p["url"]}` | {pri_str} | {pri_kdvol} | {sec_str} |')
    md_lines.append('')

md_lines.append(f'## Summary')
md_lines.append('')
md_lines.append(f'- Total pages mapped: **{len(PAGES)}**')
md_lines.append(f'- Pages with primary kw match: **{sum(1 for p in PAGES if p["primary"])}**')
md_lines.append(f'- Total primary-kw addressable monthly volume: **{total_addressable:,}**')
md_lines.append('')

# ---------- GAP REPORT — kws with no dedicated page ----------
md_lines.append('## Gap report: keywords without a dedicated page')
md_lines.append('')
md_lines.append('High-value keywords (KD ≤ 20, vol ≥ 500) currently NOT a primary target of any existing page. Each = candidate for new page or new blog post.')
md_lines.append('')

# Build set of kws already claimed (primary OR secondary)
claimed = set()
for p in PAGES:
    if p['primary']:
        claimed.add(p['primary']['kw'])
    for s in p['secondary']:
        claimed.add(s['kw'])

# Find unclaimed high-value kws
gaps = []
for s in ALL_KW:
    if s['kw'] in claimed:
        continue
    if s['kd'] > 20 or s['vol'] < 500:
        continue
    # Skip pure typos (we cover with meta alts)
    if s['kw'] in ('claculator', 'claculater', 'gpa caculator', 'gpa calulator', 'gpa caluclator', 'gpa calcuator', 'calculatior', 'calculatopr', 'calcualter', 'grade calcualtor', 'grade caluclator', 'grade claculator', 'garde calculator'):
        continue
    gaps.append(s)

gaps.sort(key=lambda s: -s['vol'] / (s['kd'] + 1))

md_lines.append('| Keyword | KD | Vol | Opp score | Suggested page type |')
md_lines.append('|---|---|---|---|---|')
for s in gaps[:60]:
    kw = s['kw']
    opp = round(s['vol'] / (s['kd'] + 1))
    if 'gpa calculator' in kw or 'gpa cal' in kw:
        suggested = 'New calculator page'
    elif 'gpa good' in kw or 'is a' in kw or 'whats a' in kw or 'what is a' in kw:
        suggested = '/gpa/<score> page (may already exist)'
    elif 'gpa' in kw and ('to percentage' in kw or 'letter grade' in kw):
        suggested = 'GPA conversion blog post'
    elif 'gpa scale' in kw or 'gpa reporting' in kw:
        suggested = 'Add to /gpa-scale or new sub-page'
    elif 'gpa requirements' in kw:
        suggested = 'Blog post (institutional/program GPA reqs)'
    elif 'how to' in kw or 'how do' in kw or 'how is' in kw:
        suggested = 'How-to blog post'
    elif 'what is' in kw or 'what does' in kw or 'what are' in kw:
        suggested = 'Definitional blog post'
    elif 'average gpa' in kw or 'good gpa' in kw:
        suggested = 'Blog post (benchmarks)'
    else:
        suggested = 'Blog post or expand existing'
    md_lines.append(f'| `{kw}` | {s["kd"]} | {s["vol"]:,} | {opp:,} | {suggested} |')

md_lines.append('')
md_lines.append(f'**Total unclaimed addressable vol (KD≤20, vol≥500):** {sum(s["vol"] for s in gaps):,} across {len(gaps)} keywords.')

with open(f'{ROOT}/keywords/page-keyword-map.md', 'w') as f:
    f.write('\n'.join(md_lines))

# JSON for machine use
json_out = []
for p in PAGES:
    json_out.append({
        'url': p['url'],
        'section': p['section'],
        'title': p['title'],
        'primary': {'kw': p['primary']['kw'], 'kd': p['primary']['kd'], 'vol': p['primary']['vol']} if p['primary'] else None,
        'secondary': [{'kw': s['kw'], 'kd': s['kd'], 'vol': s['vol']} for s in p['secondary']],
    })
with open(f'{ROOT}/keywords/page-keyword-map.json', 'w') as f:
    json.dump(json_out, f, indent=2)

print(f"Mapped {len(PAGES)} pages → keywords/page-keyword-map.md")
print(f"Pages with primary kw: {sum(1 for p in PAGES if p['primary'])}")
print(f"Total addressable vol: {total_addressable:,}")
