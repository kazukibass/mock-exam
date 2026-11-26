"""Exercise actual Chromium PDF printing without contacting or altering production.

The app's Print button builds the selected bundle. Only the native print dialog
is replaced so Playwright's PDF print session can drive beforeprint/afterprint.
"""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
from threading import Thread
from urllib.parse import urlsplit

import fitz
from playwright.sync_api import sync_playwright


MODES = ("question", "answer-blank", "answer-key", "explanation")
LAYOUTS = ("1col", "2col")
FIXTURE_TITLE = "Print Regression Fixture"
ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def fixture_questions():
    # 43 questions exercise the 40-question answer sheet boundary. ASCII markers
    # are deliberately distinct and stable for PDF text extraction.
    return {
        "title": FIXTURE_TITLE,
        "questions": [
            {
                "question": f"FixtureQ{i:03d} What is {i} + 1?",
                "code": f"print({i} + 1)" if i % 3 == 0 else "",
                "choices": [str(i), str(i + 1), str(i + 2), str(i + 3)],
                "answer": 2,
                "explanation": f"FixtureE{i:03d} The answer is {i + 1}.",
            }
            for i in range(1, 44)
        ],
    }


def norm(value):
    return "".join(value.split())


def import_fixture(page, origin, query):
    page.goto(f"{origin}/{query}#/import")
    page.locator("#import-textarea").fill(json.dumps(fixture_questions()))
    page.get_by_role("button", name="テキストを読み込む").click()
    page.locator("#import-title").wait_for()
    assert page.locator("#import-title").input_value() == FIXTURE_TITLE
    page.get_by_role("button", name="この内容でインポート").click()
    page.wait_for_url("**#/list")
    page.goto(f"{origin}/{query}#/sheets")
    page.locator("#sheets-select-dataset").wait_for()
    options = page.locator("#sheets-select-dataset option").evaluate_all(
        "els => els.map(e => ({id: e.value, label: e.textContent}))"
    )
    fixture = next(item["id"] for item in options if FIXTURE_TITLE in item["label"])
    return [item["id"] for item in options], fixture


def screen_snapshot(page):
    return page.locator("#sheets-preview-container .a4-page").evaluate_all(
        """els => els.map(e => ({
            text: e.innerText,
            height: e.getBoundingClientRect().height,
            width: e.getBoundingClientRect().width
        }))"""
    )


def verify_case(page, dataset, layout, selected, synthetic=False):
    page.locator('.sheets-tab-btn[data-mode="question"]').click()
    page.locator("#sheets-select-layout").select_option(layout)
    # Keep a different preview visible while generating selected outputs.
    page.locator('.sheets-tab-btn[data-mode="explanation"]').click()
    for mode in MODES:
        page.locator(f'.sheet-output-check[value="{mode}"]').set_checked(mode in selected)
    before = screen_snapshot(page)
    assert before, "screen preview unexpectedly empty"
    page.evaluate("window.__printChecks = { before: [], after: 0 }")
    page.locator("#btn-sheet-print").click()
    assert page.locator(".printing-sheet-bundle").count() == 1
    expected = page.locator("#sheets-preview-container .a4-page").evaluate_all(
        """els => els.map(e => ({
            footer: e.querySelector(".page-footer").textContent.trim(),
            markers: e.innerText.match(/Fixture[QE]\\d{3}/g) || []
        }))"""
    )
    assert expected, "selected output bundle is empty"

    # page.pdf() performs a real Chromium print-media layout and dispatches
    # native beforeprint / afterprint. Do not manually apply isolation.
    pdf_bytes = page.pdf(prefer_css_page_size=True, print_background=True)
    flags = page.evaluate("window.__printChecks")
    assert len(flags["before"]) >= 1 and flags["after"] >= 1, flags
    assert all(rec["isolated"] and rec["navIsolated"] for rec in flags["before"]), flags
    after = screen_snapshot(page)
    assert before == after, f"preview changed: {dataset}/{layout}/{selected}"
    assert page.locator(".printing-sheet-bundle").count() == 0
    assert page.locator(".print-isolate-hidden, .print-isolate-keep").count() == 0
    assert page.locator('.sheets-tab-btn.active').get_attribute("data-mode") == "explanation"

    markers_seen = []
    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        assert len(doc) == len(expected), (
            f"{dataset}/{layout}/{selected}: {len(expected)} DOM pages vs {len(doc)} PDF pages"
        )
        for index, (sheet, manifest) in enumerate(zip(doc, expected), 1):
            assert abs(sheet.rect.width - 595.28) < 2 and abs(sheet.rect.height - 841.89) < 2
            body = sheet.get_text()
            assert body.strip(), f"blank PDF page {index}: {dataset}/{layout}/{selected}"
            footer = norm(manifest["footer"])
            assert footer in norm(body), f"missing footer {manifest['footer']} on PDF page {index}"
            # Extracted text must actually fit within the printable A4 sheet.
            words = sheet.get_text("words")
            assert words and all(
                -1 <= word[0] <= word[2] <= sheet.rect.width + 1
                and -1 <= word[1] <= word[3] <= sheet.rect.height + 1
                for word in words
            ), f"text outside A4 page {index}"
            # Verify each page's footer is present inside the PDF, not merely in DOM.
            footer_blocks = [
                block for block in sheet.get_text("blocks")
                if norm(str(block[4])) == footer
            ]
            assert footer_blocks, f"footer not a separate PDF text block on page {index}"
            assert all(0 <= block[1] < block[3] < sheet.rect.height for block in footer_blocks)
            if synthetic:
                actual = re.findall(r"Fixture[QE]\d{3}", body)
                assert sorted(actual) == sorted(manifest["markers"]), (
                    f"fixture content missing/repeated on PDF page {index}: "
                    f"expected {manifest['markers']}, got {actual}"
                )
                markers_seen.extend(actual)
        if synthetic:
            expected_markers = []
            if "question" in selected:
                expected_markers.extend(f"FixtureQ{i:03d}" for i in range(1, 44))
            if "explanation" in selected:
                expected_markers.extend(f"FixtureE{i:03d}" for i in range(1, 44))
            assert sorted(markers_seen) == sorted(expected_markers), "fixture lost or duplicated"
    return len(expected), pdf_bytes


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--shell-dir", type=Path, required=True, help="Pinned portfolio assets directory")
    parser.add_argument("--output", type=Path, required=True, help="Synthetic PDF evidence and summary")
    args = parser.parse_args()
    shell_dir = args.shell_dir.resolve()
    args.output.mkdir(parents=True, exist_ok=True)
    for asset in ("shell.js", "shell.css"):
        assert (shell_dir / asset).is_file(), f"missing shared shell: {asset}"

    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Handler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f"http://127.0.0.1:{server.server_port}"
    summaries = []

    def serve_test_route(route):
        url = urlsplit(route.request.url)
        if url.netloc == "kazukibass.github.io" and url.path in ("/assets/shell.js", "/assets/shell.css"):
            name = url.path.rsplit("/", 1)[-1]
            route.fulfill(path=shell_dir / name, content_type="text/css" if name.endswith(".css") else "application/javascript")
        elif route.request.url.startswith(origin + "/"):
            route.continue_()
        else:
            route.abort()

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            for width, height in ((1280, 800), (390, 844)):
                for with_nav in (False, True):
                    context = browser.new_context(viewport={"width": width, "height": height})
                    page = context.new_page()
                    errors = []
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    page.route("**/*", serve_test_route)
                    page.add_init_script("window.print = () => {};")
                    query = "?from=portfolio" if with_nav else ""
                    datasets, fixture = import_fixture(page, origin, query)
                    assert len(datasets) >= 6, "expected five bundled datasets and the synthetic fixture"
                    page.evaluate("document.fonts.ready")
                    assert page.locator("#kb-nav").count() == int(with_nav)
                    if with_nav and width == 390:
                        burger = page.locator(".kb-burger")
                        burger.click()
                        assert page.locator("#kb-sheet").is_visible()
                        assert page.locator("#kb-sheet > #side-menu").count() == 1
                        burger.click()
                        assert not page.locator("#kb-sheet").is_visible()
                    elif with_nav:
                        assert page.locator("#kb-slot > #side-menu").count() == 1

                    # Listeners run after the app's own isolation/restoration.
                    page.evaluate("""() => {
                      window.addEventListener("beforeprint", () => {
                        const root = document.querySelector("#sheets-preview-container");
                        const nav = document.querySelector("#kb-nav");
                        window.__printChecks.before.push({
                          isolated: root?.parentElement.classList.contains("print-isolate-keep"),
                          navIsolated: !nav || nav.classList.contains("print-isolate-hidden"),
                        });
                      });
                      window.addEventListener("afterprint", () => window.__printChecks.after++);
                    }""")
                    cases = total_pages = 0
                    for dataset in datasets:
                        page.locator("#sheets-select-dataset").select_option(dataset)
                        for layout in LAYOUTS:
                            # All five shipped sets and the synthetic set exercise
                            # the full bundle; the synthetic set also tests each
                            # individual mode independently.
                            selections = (MODES, *((mode,) for mode in MODES)) if dataset == fixture else (MODES,)
                            for selected in selections:
                                count, pdf = verify_case(page, dataset, layout, selected, dataset == fixture)
                                cases += 1
                                total_pages += count
                                if dataset == fixture and layout == "2col" and selected == MODES:
                                    name = f"fixture-{width}-{'shell' if with_nav else 'standalone'}"
                                    (args.output / f"{name}.pdf").write_bytes(pdf)
                                    with fitz.open(stream=pdf, filetype="pdf") as doc:
                                        doc[0].get_pixmap(matrix=fitz.Matrix(1, 1)).save(args.output / f"{name}.png")
                    assert not errors, errors
                    record = {"width": width, "shell": with_nav, "datasets": len(datasets), "cases": cases, "pdf_pages": total_pages}
                    summaries.append(record)
                    print(json.dumps(record), flush=True)
                    context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    summary = {"contexts": summaries, "cases": sum(s["cases"] for s in summaries), "pdf_pages": sum(s["pdf_pages"] for s in summaries),
               "blank_pages": 0, "page_counts_match": True, "footers_inside_a4": True, "preview_restored": True}
    (args.output / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print("PASS", json.dumps(summary), flush=True)


if __name__ == "__main__":
    main()
