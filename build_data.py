"""
build_data.py — source/problems.json と source/sets/*.json を読み込み、
ブラウザ側で fetch なしに読み込める data.js（組み込み問題集バンドル）を生成する。

使い方:
  python3 build_data.py

source/ 以下の問題を problem_manager.py で編集した後、このスクリプトを
再実行すると data.js が更新される。
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
SOURCE_DIR = BASE_DIR / "source"
REGISTRY_PATH = SOURCE_DIR / "problems.json"
OUTPUT_PATH = BASE_DIR / "data.js"


def build():
    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    sets = []
    for entry in registry:
        set_path = SOURCE_DIR / entry["file"]
        questions = json.loads(set_path.read_text(encoding="utf-8"))
        sets.append({
            "id": entry["id"],
            "title": entry["title"],
            "description": entry.get("description", ""),
            "difficulty": entry.get("difficulty", ""),
            "questions": questions,
        })

    payload = json.dumps(sets, ensure_ascii=False, indent=2)
    js = (
        "// このファイルは build_data.py によって自動生成されます。直接編集しないでください。\n"
        f"window.BUILTIN_SETS = {payload};\n"
    )
    OUTPUT_PATH.write_text(js, encoding="utf-8")
    total_q = sum(len(s["questions"]) for s in sets)
    print(f"data.js を生成しました（{len(sets)} セット、計 {total_q} 問）。")


if __name__ == "__main__":
    build()
