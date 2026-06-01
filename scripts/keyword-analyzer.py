#!/usr/bin/env python3
"""Parse Ahrefs UTF-16LE CSV exports and score keyword opportunities."""
import os, re, csv, json
from collections import defaultdict

KEYWORDS_DIR = '/Users/eapple/Documents/Calculator/keywords'

def parse_ahrefs_csv(path):
    with open(path, 'rb') as f:
        raw = f.read()
    text = raw.replace(b'\x00', b'').decode('utf-8', errors='replace')
    lines = text.split('\n')
    # Header: strip the `""` wrapping and split on `""\t""`
    def split_row(line):
        line = line.strip()
        if line.startswith('"') and line.endswith('"'):
            inner = line[1:-1]  # strip outermost ""
            # split on "\t"
            return inner.split('"\t"')
        return None
    header = split_row(lines[0])
    if not header:
        return []
    # clean header field names
    header = [h.strip().strip('"').strip('﻿').strip() for h in header]
    rows = []
    for line in lines[1:]:
        if not line.strip():
            continue
        parts = split_row(line)
        if not parts or len(parts) < len(header):
            continue
        row = {}
        for i, h in enumerate(header):
            v = parts[i].strip().strip('"').strip() if i < len(parts) else ''
            row[h] = v
        rows.append(row)
    return rows

def to_int(s, default=0):
    if not s:
        return default
    try:
        return int(float(s.replace(',', '').strip()))
    except:
        return default

def to_float(s, default=0.0):
    if not s:
        return default
    try:
        return float(s.replace(',', '').strip())
    except:
        return default

# Load + dedupe
all_kw = {}
for fn in sorted(os.listdir(KEYWORDS_DIR)):
    if not fn.endswith('.csv'):
        continue
    rows = parse_ahrefs_csv(os.path.join(KEYWORDS_DIR, fn))
    print(f"{fn}: {len(rows)} rows")
    for r in rows:
        kw = r.get('Keyword', '').strip().lower()
        if not kw:
            continue
        if kw not in all_kw:
            all_kw[kw] = r

print(f"\nTotal unique keywords: {len(all_kw)}")

# Score each
scored = []
for kw, r in all_kw.items():
    kd = to_int(r.get('Difficulty', ''), 999)
    vol = to_int(r.get('Volume', ''), 0)
    cpc = to_float(r.get('CPC', ''), 0)
    tp = to_int(r.get('Traffic potential', ''), 0)
    intents = r.get('Intents', '')
    serp = r.get('SERP Features', '')
    cat = r.get('Category', '')
    parent = r.get('Parent Keyword', '')
    # opportunity score: volume per unit of KD difficulty
    opp = vol / (kd + 1) if vol > 0 else 0
    scored.append({
        'kw': kw, 'kd': kd, 'vol': vol, 'cpc': cpc, 'tp': tp,
        'intents': intents, 'serp': serp, 'cat': cat, 'parent': parent,
        'opp': opp,
    })

# Identify branded (university/school name)
BRANDED_PATTERNS = [
    r'\b(uf|ucla|usc|ucsd|uci|ucsb|ucsc|uc|csu|sjsu|sdsu|cuny|nyu|mit|stanford|harvard|yale|princeton|columbia|cornell|brown|penn|duke|northwestern|chicago|berkeley|asu|byu|tcu|smu|gmu|fsu|fau|fiu|fgcu|usf|ut|utd|uta|utsa|tamu|tx|umd|umich|msu|osu|psu|pitt|cmu|drexel|temple|villanova|gw|gwu|csulb|csun|csula|csueb|sfsu|nau|uofa|ua|au|wsu|uw|gonzaga|notre dame|nd|miami|um|fla|gator|nc state|unc|duke|nccu|app state|appstate|wfu|elon|davidson|liberty|vt|vcu|odu|jmu|ku|kstate|mu|missouri|illinois|uiuc|iu|purdue|psu|pitt|kent|akron|miami ohio|toledo|ysu|wright|oakland|gvsu|emu|cmich|wmich|nu|nau|ksu|wsu|kansas|wichita|kstate|tulsa|ou|baylor|texas tech|ttu|sdsu|aztec|sonoma|stanislaus|chico|fresno|cal poly|calpoly|csumb|csudh|csub|csuf|csulb|csula|csun|csueb|sfsu|sjsu|csuci|csus|nyit|stony brook|sbu|buffalo|albany|binghamton|new paltz|geneseo|oneonta|brockport|cortland|oswego|fredonia|plattsburgh|potsdam|farmingdale|maritime|esf|stonybrook|kean|montclair|tcnj|stockton|ramapo|rowan|njit|rutgers|seton hall|fordham|sju|stj|hofstra|adelphi|liu|pace|marist|siena|nazareth|hartwick|skidmore|union|hamilton|colgate|lehigh|lafayette|bucknell|temple|drexel|villanova|st joes|saint josephs|psu|pitt|west virginia|wvu|marshall|wfu|elon|davidson|liberty|jmu|odu|vcu|vt|vmi|wm|w&m|tcnj|monmouth|stockton|rowan|montclair|ramapo|rider|drew|fdu|seton hall|nyu|columbia|barnard|fordham|hofstra|adelphi|stony brook|sbu|buffalo|albany|binghamton|new paltz)\b',
]
def is_branded(kw):
    for p in BRANDED_PATTERNS:
        if re.search(p, kw, re.I):
            return True
    return False

# Buckets
gpa_direct = []      # contains "gpa" + not branded
calculator_other = [] # calculator but not gpa (tip, period etc - if any)
branded = []         # university branded
adjacent = []        # grade calc, weighted average, etc

for s in scored:
    kw = s['kw']
    if is_branded(kw):
        s['bucket'] = 'branded'
        branded.append(s)
    elif 'gpa' in kw:
        s['bucket'] = 'gpa-direct'
        gpa_direct.append(s)
    elif 'calculator' in kw:
        s['bucket'] = 'calculator-other'
        calculator_other.append(s)
    else:
        s['bucket'] = 'adjacent'
        adjacent.append(s)

# Sort each by opp score
for arr in (gpa_direct, calculator_other, branded, adjacent):
    arr.sort(key=lambda x: x['opp'], reverse=True)

def print_bucket(name, arr, n=30):
    print(f"\n=== {name} (top {n} of {len(arr)}) ===")
    print(f"{'kw':<50} {'KD':>4} {'Vol':>8} {'TP':>8} {'CPC':>6} {'Opp':>10}  intent  serp")
    for s in arr[:n]:
        intents = (s['intents'] or '')[:30]
        serp = (s['serp'] or '')[:30]
        print(f"{s['kw'][:50]:<50} {s['kd']:>4} {s['vol']:>8} {s['tp']:>8} {s['cpc']:>6.2f} {s['opp']:>10.0f}  {intents:<30}  {serp}")

print_bucket('GPA-DIRECT (KD<=20, vol>=300)',
             [s for s in gpa_direct if s['kd'] <= 20 and s['vol'] >= 300], 50)

print_bucket('GPA-DIRECT (KD<=10 any vol, easy wins)',
             [s for s in gpa_direct if s['kd'] <= 10], 50)

print_bucket('GPA-DIRECT (KD 20-35, vol>=2000)',
             [s for s in gpa_direct if 20 < s['kd'] <= 35 and s['vol'] >= 2000], 30)

print_bucket('BRANDED uni (KD<=15)',
             [s for s in branded if s['kd'] <= 15 and s['vol'] >= 200], 50)

print_bucket('ADJACENT (KD<=15)',
             [s for s in adjacent if s['kd'] <= 15 and s['vol'] >= 500], 30)

print_bucket('CALCULATOR-OTHER (KD<=15)',
             [s for s in calculator_other if s['kd'] <= 15 and s['vol'] >= 500], 30)

# Save full data to JSON
out = {'gpa_direct': gpa_direct, 'branded': branded, 'adjacent': adjacent, 'calculator_other': calculator_other}
with open(os.path.join(KEYWORDS_DIR, 'analysis.json'), 'w') as f:
    json.dump(out, f, indent=2, default=str)
print(f"\nSaved full analysis to {KEYWORDS_DIR}/analysis.json")
