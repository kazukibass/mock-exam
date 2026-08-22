/* 模擬試験 — 静的SPA版 */
(function () {
  "use strict";

  const LS_CUSTOM_SETS = "quiz_custom_sets_v1";
  const LS_RESULT_HISTORY = "quiz_result_history_v1";
  const LS_SESSION = "quiz_session_v1";

  const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const MAX_QUESTION_LEN = 500;
  const MAX_CODE_LEN = 2000;
  const MAX_CHOICE_LEN = 200;
  const MAX_EXPLANATION_LEN = 1000;
  const MIN_CHOICES = 2;
  const MAX_CHOICES = 8;

  const viewEl = document.getElementById("view");
  const titleEl = document.getElementById("page-title");
  const toastEl = document.getElementById("toast");

  let session = loadSession();
  let pendingImport = null; // { questions, sourceLabel }

  // ---------- storage helpers ----------

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("localStorage への保存に失敗しました", e);
    }
  }

  function loadSession() {
    return readJSON(LS_SESSION, null);
  }

  function saveSession() {
    writeJSON(LS_SESSION, session);
  }

  function getCustomSets() {
    return readJSON(LS_CUSTOM_SETS, []);
  }

  function saveCustomSets(sets) {
    writeJSON(LS_CUSTOM_SETS, sets);
  }

  function getResultHistory() {
    return readJSON(LS_RESULT_HISTORY, []);
  }

  function saveResultHistory(list) {
    writeJSON(LS_RESULT_HISTORY, list);
  }

  // ---------- data access ----------

  function getAllSets() {
    const builtin = (window.BUILTIN_SETS || []).map((s) => Object.assign({ isCustom: false }, s));
    const custom = getCustomSets().map((s) => Object.assign({ isCustom: true }, s));
    return builtin.concat(custom);
  }

  function getSetById(setId) {
    return getAllSets().find((s) => s.id === setId) || null;
  }

  function questionsMap(set) {
    const map = {};
    (set.questions || []).forEach((q) => { map[q.id] = q; });
    return map;
  }

  // ---------- utils ----------

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  function setTitle(t) { titleEl.textContent = t; }

  function slugify(str, fallback) {
    const base = (str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9぀-ヿ一-龯_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return (base || fallback || "custom").slice(0, 40);
  }

  function uniqueSetId(desired) {
    const existing = new Set(getAllSets().map((s) => s.id));
    let id = desired;
    let n = 2;
    while (existing.has(id)) {
      id = `${desired}_${n}`;
      n++;
    }
    return id;
  }

  function downloadBlob(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function csvEscape(v) {
    const s = String(v == null ? "" : v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  // ---------- routing ----------

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", () => {
    if (!location.hash) location.hash = "#/";
    route();
  });

  function route() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const parts = hash.split("/").filter(Boolean);

    if (parts[0] === "quiz" && session) return renderQuiz();
    if (parts[0] === "result") return renderResult();
    if (parts[0] === "help") return renderHelp();
    if (parts[0] === "list") return renderSetList();
    if (parts[0] === "import") return renderImportPage();
    if (parts[0] === "history" && parts[1]) return renderSavedResult(parts[1]);
    return renderHome();
  }

  function go(hash) { location.hash = hash; }

  // ---------- home ----------

  function renderHome() {
    setTitle("模擬試験");
    const sets = getAllSets();
    const history = getResultHistory();

    const historyItems = history.slice().reverse().slice(0, 10).map((h) => {
      const rate = h.answered ? Math.round((h.score / h.answered) * 1000) / 10 : 0;
      return `
        <li class="history-item">
          <div class="history-info">
            <div class="history-title">${esc(h.setTitle)}</div>
            <div class="history-meta">${esc(h.date)} ・ ${h.score}/${h.answered}問正解（${rate}%）${h.finished ? "" : "・中断"}</div>
          </div>
          <div class="history-buttons">
            <button class="button secondary small" onclick="window.__quiz.viewSavedResult('${h.id}')">詳細</button>
            <button class="button ghost small" onclick="window.__quiz.downloadSavedResult('${h.id}','json')">JSON</button>
            <button class="button ghost small" onclick="window.__quiz.downloadSavedResult('${h.id}','csv')">CSV</button>
            <button class="button danger small" onclick="window.__quiz.deleteSavedResult('${h.id}')">削除</button>
          </div>
        </li>`;
    }).join("");

    viewEl.innerHTML = `
      <p class="lead">問題集を選んでスタートしましょう。</p>
      <div class="section" style="margin-top:0;padding-top:0;border-top:none;">
        <div class="actions">
          <a class="button primary" href="#/list">問題リストを見る（全${sets.length}セット）</a>
          <a class="button secondary" href="#/import">問題をインポートする</a>
        </div>
      </div>

      <div class="section">
        <h2>保存済みの結果</h2>
        ${history.length ? `<ul class="problem-list">${historyItems}</ul>` : `<p class="empty-note">まだ保存された結果はありません。</p>`}
      </div>

      <p style="margin-top:24px"><a href="#/help">使い方ページ</a></p>
    `;
  }

  // ---------- set list ----------

  function renderSetList() {
    setTitle("問題リスト");
    const sets = getAllSets();

    const setItems = sets.map((s) => {
      const count = (s.questions || []).length;
      const badgeClass = "difficulty-" + (s.difficulty || "カスタム");
      const removeBtn = s.isCustom
        ? `<button class="button danger small" onclick="window.__quiz.removeCustomSet('${esc(s.id)}')">削除</button>`
        : "";
      return `
        <li class="set-card">
          <div class="set-info">
            <span class="set-badge ${badgeClass}">${esc(s.difficulty || "カスタム")}</span>
            <h2 class="set-title">${esc(s.title)}</h2>
            <p class="set-desc">${esc(s.description || "")}</p>
            <p class="set-count">全 ${count} 問${s.isCustom ? "（インポート）" : ""}</p>
          </div>
          <div class="set-actions">
            <button class="button primary" onclick="window.__quiz.startQuiz('${esc(s.id)}')">スタート</button>
            ${removeBtn}
          </div>
        </li>`;
    }).join("");

    viewEl.innerHTML = `
      <p class="lead">問題集を選んでスタートしましょう。</p>
      ${sets.length ? `<ul class="set-list">${setItems}</ul>` : `<p class="empty-note">問題集がありません。トップページからインポートしてください。</p>`}
      <p style="margin-top:24px"><a href="#/">トップに戻る</a></p>
    `;
  }

  // ---------- import ----------

  function renderImportPage() {
    setTitle("問題をインポート");
    viewEl.innerHTML = `
      <p class="lead">問題集のJSONファイル（配列、または {title, questions:[...]} 形式）をファイルまたはテキストで読み込みます。</p>

      <div class="section" style="margin-top:0;padding-top:0;border-top:none;">
        <h2>ファイルから読み込む</h2>
        <label class="dropzone" id="dropzone">
          <div>クリックまたはドラッグ＆ドロップでJSONファイルを選択</div>
          <input type="file" id="file-input" accept="application/json,.json">
        </label>
      </div>

      <div class="section">
        <h2>テキストから読み込む</h2>
        <p class="empty-note">JSONテキストを直接貼り付けてインポートできます。AIで問題を生成した場合はこちらが便利です（メニューの「インポート用プロンプトをダウンロード」も参照）。</p>
        <textarea class="import-textarea" id="import-textarea" placeholder='[{"question": "実行結果は？", "choices": ["1", "2"], "answer": 2, "explanation": "..."}]'></textarea>
        <div class="actions">
          <button class="button primary" onclick="window.__quiz.handleImportTextarea()">テキストを読み込む</button>
        </div>
      </div>

      <div id="import-form-slot"></div>

      <p style="margin-top:24px"><a href="#/">トップに戻る</a></p>
    `;

    const dz = document.getElementById("dropzone");
    const fi = document.getElementById("file-input");
    fi.addEventListener("change", (e) => { if (e.target.files[0]) handleImportFile(e.target.files[0]); });
    dz.addEventListener("dragover", (e) => { e.preventDefault(); dz.classList.add("drag"); });
    dz.addEventListener("dragleave", () => dz.classList.remove("drag"));
    dz.addEventListener("drop", (e) => {
      e.preventDefault();
      dz.classList.remove("drag");
      if (e.dataTransfer.files[0]) handleImportFile(e.dataTransfer.files[0]);
    });
  }

  function validateQuestion(q, idx) {
    const errs = [];
    if (!q.question || typeof q.question !== "string") errs.push(`#${idx}: question は必須です`);
    else if (q.question.length > MAX_QUESTION_LEN) errs.push(`#${idx}: question が長すぎます`);
    if (q.code && String(q.code).length > MAX_CODE_LEN) errs.push(`#${idx}: code が長すぎます`);
    const choices = Array.isArray(q.choices) ? q.choices : [];
    if (choices.length < MIN_CHOICES || choices.length > MAX_CHOICES) {
      errs.push(`#${idx}: 選択肢は${MIN_CHOICES}〜${MAX_CHOICES}個にしてください`);
    }
    choices.forEach((c) => {
      if (String(c).length > MAX_CHOICE_LEN) errs.push(`#${idx}: 選択肢が長すぎます`);
    });
    const answer = q.answer;
    if (!Number.isInteger(answer) || answer < 1 || answer > choices.length) {
      errs.push(`#${idx}: answer は 1〜${choices.length} の整数にしてください`);
    }
    if (q.explanation && String(q.explanation).length > MAX_EXPLANATION_LEN) {
      errs.push(`#${idx}: explanation が長すぎます`);
    }
    return errs;
  }

  function processImportRaw(rawText, sourceLabel, defaultTitle) {
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      toast("JSONの解析に失敗しました");
      return;
    }

    let rawQuestions;
    let defaults = { title: defaultTitle, description: "", difficulty: "カスタム" };

    if (Array.isArray(data)) {
      rawQuestions = data;
    } else if (data && Array.isArray(data.questions)) {
      rawQuestions = data.questions;
      defaults.title = data.title || defaults.title;
      defaults.description = data.description || "";
      defaults.difficulty = data.difficulty || "カスタム";
    } else {
      toast("対応していない形式です（配列 または {questions:[...]} が必要）");
      return;
    }

    const errors = [];
    rawQuestions.forEach((q, i) => errors.push(...validateQuestion(q, i + 1)));
    if (errors.length) {
      toast(`検証エラー ${errors.length}件（詳細はコンソール）`);
      console.error("インポート検証エラー:\n" + errors.join("\n"));
      return;
    }

    const questions = rawQuestions.map((q, i) => ({
      id: Number.isInteger(q.id) ? q.id : i + 1,
      question: q.question,
      code: q.code || "",
      choices: q.choices,
      answer: q.answer,
      explanation: q.explanation || "",
    }));

    pendingImport = { questions, defaults, fileName: sourceLabel };
    renderImportForm();
    toast(`${questions.length}問を読み込みました。内容を確認してください。`);
  }

  function handleImportFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      processImportRaw(reader.result, file.name, file.name.replace(/\.json$/i, ""));
    };
    reader.readAsText(file, "utf-8");
  }

  function handleImportTextarea() {
    const ta = document.getElementById("import-textarea");
    const text = ta ? ta.value.trim() : "";
    if (!text) { toast("テキストを入力してください"); return; }
    processImportRaw(text, "貼り付けたテキスト", "カスタム問題集");
  }

  function renderImportForm() {
    const slot = document.getElementById("import-form-slot");
    if (!slot || !pendingImport) return;
    const d = pendingImport.defaults;
    slot.innerHTML = `
      <div class="import-form">
        <p><strong>${pendingImport.questions.length}問</strong> を「${esc(pendingImport.fileName)}」から読み込みました。</p>
        <label>セットタイトル</label>
        <input type="text" id="import-title" value="${esc(d.title)}">
        <label>説明（省略可）</label>
        <input type="text" id="import-desc" value="${esc(d.description)}">
        <label>難易度</label>
        <select id="import-diff">
          ${["初級", "中級", "上級", "カスタム"].map((v) => `<option value="${v}" ${v === d.difficulty ? "selected" : ""}>${v}</option>`).join("")}
        </select>
        <div class="actions">
          <button class="button primary" onclick="window.__quiz.confirmImport()">この内容でインポート</button>
          <button class="button secondary" onclick="window.__quiz.cancelImport()">キャンセル</button>
        </div>
      </div>
    `;
  }

  function confirmImport() {
    if (!pendingImport) return;
    const title = document.getElementById("import-title").value.trim() || "カスタム問題集";
    const description = document.getElementById("import-desc").value.trim();
    const difficulty = document.getElementById("import-diff").value;
    const id = uniqueSetId(slugify(title, "custom_set"));

    const newSet = {
      id, title, description, difficulty,
      questions: pendingImport.questions,
      isCustom: true,
    };
    const sets = getCustomSets();
    sets.push(newSet);
    saveCustomSets(sets);
    pendingImport = null;
    toast("問題集をインポートしました");
    if (location.hash === "#/list") renderSetList(); else go("#/list");
  }

  function cancelImport() {
    pendingImport = null;
    renderImportPage();
  }

  function removeCustomSet(setId) {
    if (!confirm("この問題集を削除しますか？")) return;
    const sets = getCustomSets().filter((s) => s.id !== setId);
    saveCustomSets(sets);
    toast("削除しました");
    renderSetList();
  }

  // ---------- quiz ----------

  function startQuiz(setId) {
    const set = getSetById(setId);
    if (!set) { toast("問題集が見つかりません"); return; }
    const order = shuffle((set.questions || []).map((q) => q.id));
    session = {
      setId, setTitle: set.title,
      order, current: 0, score: 0, history: [],
      choiceOrder: null,
    };
    saveSession();
    go("#/quiz");
  }

  function currentSet() {
    return session ? getSetById(session.setId) : null;
  }

  function renderQuiz() {
    const set = currentSet();
    if (!set || !session || session.current >= session.order.length) {
      return go("#/result");
    }
    setTitle(`問題 ${session.current + 1}/${session.order.length}`);
    const qmap = questionsMap(set);
    const qid = session.order[session.current];
    const question = qmap[qid];

    const choiceOrder = shuffle(question.choices.map((_, i) => i));
    session.choiceOrder = choiceOrder;
    saveSession();

    const pct = Math.round(((session.current) / session.order.length) * 100);
    const choicesHtml = choiceOrder.map((origIdx, i) => `
      <div class="choice">
        <label>
          <input type="radio" name="choice" value="${i}">
          <strong>${CHOICE_LABELS[i]}</strong> ${esc(question.choices[origIdx])}
        </label>
      </div>`).join("");

    viewEl.innerHTML = `
      <div class="progress"><div class="progress-fill" style="width:${pct}%;"></div></div>
      <p class="lead">${esc(question.question)}</p>
      ${question.code ? `<pre>${esc(question.code)}</pre>` : ""}
      <form id="quiz-form">
        ${choicesHtml}
        <div class="actions">
          <button class="primary" type="submit">回答する</button>
          <button type="button" class="button secondary" onclick="window.__quiz.abortQuiz()">中断</button>
        </div>
      </form>
    `;

    document.getElementById("quiz-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const picked = e.target.querySelector('input[name="choice"]:checked');
      if (!picked) { toast("選択肢を選んでください"); return; }
      submitAnswer(qid, parseInt(picked.value, 10));
    });
  }

  function submitAnswer(qid, selectedIndex) {
    const set = currentSet();
    const qmap = questionsMap(set);
    const question = qmap[qid];
    const choiceOrder = session.choiceOrder || question.choices.map((_, i) => i);
    const selected = question.choices[choiceOrder[selectedIndex]];
    const correct = question.choices[question.answer - 1];
    const isCorrect = selected === correct;

    session.history.push({ qid, selected, correct, is_correct: isCorrect });
    if (isCorrect) session.score += 1;
    session.current += 1;
    session.choiceOrder = null;
    saveSession();

    renderAnswer({ selected, correct, isCorrect, explanation: question.explanation || "" });
  }

  function renderAnswer(result) {
    setTitle(result.isCorrect ? "○正解！" : "×不正解");
    const isLast = session.current >= session.order.length;
    const nextLabel = isLast ? "結果を見る" : "次の問題へ";

    viewEl.innerHTML = `
      <p class="lead">あなたの回答: ${esc(result.selected)}</p>
      <p>答え: ${esc(result.correct)}</p>
      ${result.explanation ? `<div class="explanation-box"><p><strong>【解説】</strong>${esc(result.explanation)}</p></div>` : ""}
      <p>現在の得点: ${session.score}/${session.order.length}</p>
      <div class="actions">
        <button class="primary" onclick="window.__quiz.goNext(${isLast ? "true" : "false"})">${nextLabel}</button>
        <button class="button secondary" onclick="window.__quiz.abortQuiz()">中断</button>
      </div>
    `;
  }

  // hash はブックマーク用の目印に過ぎず、遷移先の描画は常に直接呼び出す
  // （同じ hash への遷移では hashchange イベントが発火しないため）
  function goNext(isLast) {
    if (isLast) {
      if (location.hash === "#/result") renderResult(); else go("#/result");
    } else {
      if (location.hash === "#/quiz") renderQuiz(); else go("#/quiz");
    }
  }

  function abortQuiz() {
    if (location.hash === "#/result") renderResult(); else go("#/result");
  }

  // ---------- result ----------

  let resultSavedForSession = null; // session snapshot id already saved, avoid dup saves

  function buildResultPayload(set, sess) {
    const qmap = questionsMap(set);
    const total = sess.order.length;
    const answered = sess.current;
    const finished = answered >= total && total > 0;
    const detail = sess.history.map((h) => {
      const q = qmap[h.qid] || {};
      return {
        qid: h.qid,
        question: q.question || "",
        selected: h.selected,
        correct: h.correct,
        is_correct: h.is_correct,
        explanation: q.explanation || "",
      };
    });
    return {
      id: String(Date.now()) + "_" + Math.random().toString(36).slice(2, 7),
      setId: sess.setId,
      setTitle: sess.setTitle,
      date: new Date().toLocaleString("ja-JP"),
      score: sess.score,
      total, answered, finished,
      history: detail,
    };
  }

  function renderResult() {
    if (!session) {
      viewEl.innerHTML = `<p class="lead">受験中のクイズがありません。</p><p><a href="#/">トップに戻る</a></p>`;
      setTitle("結果");
      return;
    }
    const set = currentSet();
    const payload = buildResultPayload(set, session);
    setTitle("結果");

    if (payload.finished && resultSavedForSession !== session.setId + ":" + session.order.join(",")) {
      const hist = getResultHistory();
      hist.push(payload);
      saveResultHistory(hist);
      resultSavedForSession = session.setId + ":" + session.order.join(",");
    }

    renderResultView(payload, { live: true });
  }

  function renderSavedResult(id) {
    const hist = getResultHistory();
    const payload = hist.find((h) => h.id === id);
    if (!payload) { go("#/"); return; }
    setTitle("結果（保存済み）");
    renderResultView(payload, { live: false });
  }

  function renderResultView(payload, opts) {
    const rate = payload.answered ? Math.round((payload.score / payload.answered) * 1000) / 10 : 0;
    const summary = payload.finished
      ? `<p class="lead">全${payload.total}問中 ${payload.score}問正解でした。</p>`
      : `<p class="lead">ここまでの正解数は ${payload.score}/${payload.answered} です。</p><p>残りの問題は ${payload.total - payload.answered} 問です。</p>`;

    const items = payload.history.map((item, idx) => `
      <li class="problem-item ${item.is_correct ? "correct" : "incorrect"}">
        <button class="problem-link" onclick="window.__quiz.showProblemDetail('${payload.id}', ${idx})">
          <span class="problem-num">第${idx + 1}問</span>
          <span class="problem-question">${esc(item.question)}</span>
          <span class="problem-status ${item.is_correct ? "status-correct" : "status-incorrect"}">${item.is_correct ? "✓ 正解" : "✗ 不正解"}</span>
        </button>
      </li>`).join("");

    const liveActions = opts.live ? `
      <button class="primary" onclick="window.__quiz.startQuiz('${esc(payload.setId)}')">もう一度挑戦する</button>
      <p><a href="#/">トップに戻る</a></p>
    ` : `<p><a href="#/">トップに戻る</a></p>`;

    viewEl.innerHTML = `
      ${summary}
      ${payload.history.length ? `
        <h2>回答結果一覧</h2>
        <p>正答率: ${rate}%</p>
        <ul class="problem-list">${items}</ul>
      ` : ""}
      <div class="actions">
        <button class="button secondary" onclick="window.__quiz.downloadResult('${payload.id}','json',${opts.live ? "true" : "false"})">結果をJSONでダウンロード</button>
        <button class="button secondary" onclick="window.__quiz.downloadResult('${payload.id}','csv',${opts.live ? "true" : "false"})">結果をCSVでダウンロード</button>
      </div>
      <div class="actions">
        ${liveActions}
      </div>
    `;

    window.__quiz.__currentPayload = payload;
  }

  function showProblemDetail(payloadId, idx) {
    let payload = window.__quiz.__currentPayload;
    if (!payload || payload.id !== payloadId) {
      payload = getResultHistory().find((h) => h.id === payloadId);
    }
    if (!payload) return;
    const item = payload.history[idx];
    const modalBody = document.getElementById("problem-detail-body");
    modalBody.innerHTML = `
      <div class="problem-detail">
        <h3>${esc(item.question)}</h3>
        <div class="answer-section">
          <p><strong>あなたの回答:</strong> <span class="user-answer">${esc(item.selected)}</span></p>
          <p><strong>正答:</strong> <span class="correct-answer">${esc(item.correct)}</span></p>
          <p class="result-message ${item.is_correct ? "correct-message" : "incorrect-message"}">${item.is_correct ? "✓ 正解！" : "✗ 不正解"}</p>
        </div>
        ${item.explanation ? `<div class="explanation-box"><p><strong>【解説】</strong>${esc(item.explanation)}</p></div>` : ""}
        <div class="modal-footer">
          <button class="button secondary" onclick="closeProblemModal()">リストに戻る</button>
        </div>
      </div>
    `;
    document.getElementById("problem-detail-modal").classList.add("open");
  }

  window.closeProblemModal = function () {
    document.getElementById("problem-detail-modal").classList.remove("open");
  };

  function downloadResult(payloadId, format, live) {
    let payload;
    if (live) {
      payload = window.__quiz.__currentPayload;
    } else {
      payload = getResultHistory().find((h) => h.id === payloadId);
    }
    if (!payload) { toast("結果が見つかりません"); return; }
    doDownload(payload, format);
  }

  function downloadSavedResult(id, format) {
    const payload = getResultHistory().find((h) => h.id === id);
    if (!payload) { toast("結果が見つかりません"); return; }
    doDownload(payload, format);
  }

  function doDownload(payload, format) {
    const safeTitle = slugify(payload.setTitle, "result");
    if (format === "json") {
      downloadBlob(`result_${safeTitle}_${payload.id}.json`, JSON.stringify(payload, null, 2), "application/json");
    } else {
      const rows = [["問題番号", "問題文", "あなたの回答", "正解", "正誤"]];
      payload.history.forEach((h, i) => rows.push([i + 1, h.question, h.selected, h.correct, h.is_correct ? "正解" : "不正解"]));
      const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
      downloadBlob(`result_${safeTitle}_${payload.id}.csv`, "\ufeff" + csv, "text/csv");
    }
  }

  function viewSavedResult(id) { go("#/history/" + id); }

  function deleteSavedResult(id) {
    if (!confirm("この結果を削除しますか？")) return;
    saveResultHistory(getResultHistory().filter((h) => h.id !== id));
    toast("削除しました");
    renderHome();
  }

  // ---------- import prompt ----------

  const IMPORT_PROMPT_TEMPLATE = `あなたは模擬試験の問題作成アシスタントです。
以下のルールに厳密に従って、指定されたテーマの問題を JSON 形式で出力してください。

# 出力形式
JSON配列、または次の形式のオブジェクトのどちらかで出力してください。
{
  "title": "問題集のタイトル",
  "description": "説明文（省略可）",
  "difficulty": "初級 | 中級 | 上級 | カスタム",
  "questions": [ ... ]
}

# questions の各要素（1問ごとのルール）
- "question": 問題文（必須、500文字以内）
- "code": コード例など（省略可、2000文字以内）
- "choices": 選択肢の配列（2〜8個、各200文字以内）
- "answer": 正解の選択肢番号（1始まりの整数。choices のインデックスに対応。例: choices[0]が正解なら 1）
- "explanation": 解説（省略可、1000文字以内）

# 出力例
[
  {
    "question": "実行結果は？",
    "code": "print(1 + 1)",
    "choices": ["1", "2", "3", "エラー"],
    "answer": 2,
    "explanation": "1 + 1 は 2 になる。"
  }
]

# 依頼内容
テーマ: （ここにテーマを記入）
問題数: （ここに問題数を記入）
難易度: （初級 / 中級 / 上級 のいずれかを記入）

# 注意事項
- 上記のJSON形式・ルールを厳守してください。
- 出力は JSON のみとし、前置きや説明文、コードブロックの \`\`\` は付けないでください。
- 生成した JSON は、このアプリの「問題をインポート」ページの「テキストから読み込む」欄にそのまま貼り付けて使用します。
`;

  function downloadImportPrompt() {
    downloadBlob("import_prompt.txt", IMPORT_PROMPT_TEMPLATE, "text/plain");
  }

  // ---------- help ----------

  function renderHelp() {
    setTitle("使い方");
    viewEl.innerHTML = `
      <p class="lead">このアプリは様々な分野の模擬試験に挑戦できるクイズアプリです。各問題を読んで、正しい選択肢を選んでください。</p>
      <ul>
        <li>問題はランダム出題です。</li>
        <li>途中で「中断」ボタンを押すと、今までの正解数を表示します。</li>
        <li>最後まで回答すると、結果画面で成績を確認できます。全問回答した結果は自動的にブラウザに保存されます。</li>
        <li>メニューの「問題をインポート」から、JSONファイルまたは貼り付けたテキストで自作の問題集を追加できます。</li>
        <li>メニューの「インポート用プロンプトをダウンロード」から、AIに問題を生成してもらうためのルール・プロンプトを入手できます。</li>
        <li>結果画面や保存済みの結果からは、JSON / CSV 形式でダウンロードできます。</li>
      </ul>
      <p><a href="#/">トップに戻る</a></p>
    `;
  }

  // ---------- expose ----------

  window.__quiz = {
    startQuiz, abortQuiz, goNext, submitAnswer,
    removeCustomSet, confirmImport, cancelImport, handleImportTextarea,
    showProblemDetail, downloadResult, downloadSavedResult,
    viewSavedResult, deleteSavedResult,
  };

  // ---------- hamburger menu ----------

  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("menu-close");
    const overlay = document.getElementById("menu-overlay");
    const menu = document.getElementById("side-menu");
    const downloadBtn = document.getElementById("menu-download-prompt");

    function openMenu() { menu.classList.add("open"); overlay.classList.add("open"); }
    function closeMenu() { menu.classList.remove("open"); overlay.classList.remove("open"); }

    toggleBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    menu.querySelectorAll(".menu-link").forEach((el) => el.addEventListener("click", closeMenu));
    downloadBtn.addEventListener("click", () => { downloadImportPrompt(); closeMenu(); });
  });
})();
