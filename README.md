# Python3 模擬試験（静的版）

Flask版アプリ（[python3_mock_render](../python3_mock_render)）を元にした、サーバー不要の静的ページ版クイズアプリです。
HTML/CSS/JS のみで動作し、GitHub Pages などにそのまま公開できます。

## ローカルで確認する

ブラウザの `fetch` はローカルファイル（`file://`）だと制限されるため、簡易サーバー経由で開いてください。

```bash
python3 -m http.server 8000
# http://localhost:8000/ にアクセス
```

## 機能

- 組み込み問題集（`source/` の JSON を `data.js` にバンドル）でクイズに挑戦
- 問題はランダム出題、選択肢もシャッフル
- 正誤・解説を確認しながら進行、結果画面で回答一覧を確認
- **カスタム問題のインポート**: トップページから JSON ファイル（配列、または `{title, description, difficulty, questions:[...]}` 形式）をドラッグ＆ドロップ／選択して取り込み。ブラウザの `localStorage` に保存され、次回アクセス時も利用可能
- **結果の保存・ダウンロード**: 全問回答した結果は自動的にブラウザに保存され、トップページの「保存済みの結果」から確認可能。結果画面からは JSON / CSV 形式でダウンロードも可能

## 組み込み問題集を更新する

`source/problems.json` と `source/sets/*.json` を編集（`source/problem_manager.py` の CLI も利用可）した後、以下を実行して `data.js` を再生成してください。

```bash
python3 build_data.py
```

## カスタム問題のJSON形式

```json
[
  {
    "question": "実行結果は？",
    "code": "print(1 + 1)",
    "choices": ["1", "2", "3", "エラー"],
    "answer": 2,
    "explanation": "1 + 1 は 2 になる。"
  }
]
```

- `question`: 必須（最大500文字）
- `code`: 省略可（最大2000文字）
- `choices`: 2〜8個（各最大200文字）
- `answer`: 正解の番号（1始まり、choicesのインデックスに対応）
- `explanation`: 省略可（最大1000文字）

セット全体のタイトルなどをまとめて指定したい場合は、以下の形式でも取り込めます。

```json
{
  "title": "自作問題集",
  "description": "説明文",
  "difficulty": "中級",
  "questions": [ ... ]
}
```

## ファイル構成

```
index.html       画面のシェル（SPA）
style.css        スタイル
app.js           アプリ本体のロジック
data.js          組み込み問題集のバンドル（build_data.py が生成、直接編集しない）
build_data.py    source/ の JSON から data.js を再生成するスクリプト
source/          組み込み問題集の元データ（problems.json, sets/*.json, problem_manager.py）
```

## データの保存先について

インポートしたカスタム問題集・保存された結果は、いずれもブラウザの `localStorage` に保存されます。ブラウザやプロファイルが変わると引き継がれない点に注意してください（結果はダウンロードしてバックアップできます）。
