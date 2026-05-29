from playwright.sync_api import sync_playwright
import os

URLS = [
    ("home", "https://bestgpacalculator.online/"),
    ("weighted-gpa-calculator", "https://bestgpacalculator.online/weighted-gpa-calculator"),
    ("blog-what-is-gpa", "https://bestgpacalculator.online/blog/what-is-gpa"),
]

VIEWPORTS = [
    ("desktop", 1440, 900),
    ("mobile", 375, 812),
]

OUT_DIR = "/Users/eapple/Documents/Calculator/screenshots"

def capture(url, output_path, width, height):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=2 if width <= 375 else 1,
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception:
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
        # Wait a bit for any JS-driven layout to settle
        page.wait_for_timeout(1500)
        page.screenshot(path=output_path, full_page=False)
        browser.close()
        print(f"Saved: {output_path}")

for slug, url in URLS:
    for label, w, h in VIEWPORTS:
        out = os.path.join(OUT_DIR, f"{slug}__{label}.png")
        capture(url, out, w, h)

print("All done.")
