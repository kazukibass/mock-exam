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
  const QUESTION_TIME_SEC = 30;

  const viewEl = document.getElementById("view");
  const titleEl = document.getElementById("page-title");
  const toastEl = document.getElementById("toast");

  let session = loadSession();
  let pendingImport = null; // { questions, sourceLabel }
  let quizTimerId = null;

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

    if (parts[0] !== "quiz") clearQuizTimer();

    if (parts[0] === "quiz" && session) return renderQuiz();
    if (parts[0] === "result") return renderResult();
    if (parts[0] === "help") return renderHelp();
    if (parts[0] === "list") return renderSetList();
    if (parts[0] === "sheets") return renderSheetsPage(parts[1]);
    if (parts[0] === "import") return renderImportPage();
    if (parts[0] === "stats") return renderStats();
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
            <a class="button ghost small" href="#/sheets/${esc(h.setId)}">シート</a>
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
          <a class="button secondary" href="#/sheets">印刷用の試験セットを作る</a>
          <a class="button ghost" href="#/import">問題をインポートする</a>
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
            <a class="button secondary small" href="#/sheets/${esc(s.id)}">印刷用セットを作る</a>
            ${removeBtn}
          </div>
        </li>`;
    }).join("");

    viewEl.innerHTML = `
      <p class="lead">問題集を選んでスタートしましょう。</p>
      <label class="timer-toggle">
        <input type="checkbox" id="timer-mode-toggle">
        制限時間モード（1問${QUESTION_TIME_SEC}秒、時間切れは不正解になります）
      </label>
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
    const timerToggle = document.getElementById("timer-mode-toggle");
    const timed = !!(timerToggle && timerToggle.checked);
    session = {
      setId, setTitle: set.title,
      order, current: 0, score: 0, history: [],
      choiceOrder: null, timed,
    };
    saveSession();
    go("#/quiz");
  }

  function startReviewQuiz(payloadId) {
    let payload = window.__quiz.__currentPayload;
    if (!payload || payload.id !== payloadId) {
      payload = getResultHistory().find((h) => h.id === payloadId);
    }
    if (!payload) { toast("結果が見つかりません"); return; }
    const set = getSetById(payload.setId);
    if (!set) { toast("元の問題集が見つかりません"); return; }
    const wrongQids = payload.history.filter((h) => !h.is_correct).map((h) => h.qid);
    if (!wrongQids.length) { toast("間違えた問題はありません"); return; }
    session = {
      setId: payload.setId, setTitle: set.title + "（復習）",
      order: shuffle(wrongQids), current: 0, score: 0, history: [],
      choiceOrder: null, timed: false,
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
      ${session.timed ? `
        <div class="quiz-timer">
          <div class="quiz-timer-bar"><div class="quiz-timer-bar-fill" id="timer-bar-fill" style="width:100%;"></div></div>
          <p class="quiz-timer-text">残り時間: <span id="timer-value">${QUESTION_TIME_SEC}</span>秒</p>
        </div>
      ` : ""}
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

    if (session.timed) startQuestionTimer(qid);
  }

  function startQuestionTimer(qid) {
    clearQuizTimer();
    let remaining = QUESTION_TIME_SEC;
    const valueEl = document.getElementById("timer-value");
    const barEl = document.getElementById("timer-bar-fill");
    quizTimerId = setInterval(() => {
      remaining -= 1;
      if (valueEl) valueEl.textContent = Math.max(0, remaining);
      if (barEl) barEl.style.width = Math.max(0, (remaining / QUESTION_TIME_SEC) * 100) + "%";
      if (remaining <= 0) {
        clearQuizTimer();
        toast("時間切れです");
        submitAnswer(qid, -1);
      }
    }, 1000);
  }

  function clearQuizTimer() {
    if (quizTimerId) { clearInterval(quizTimerId); quizTimerId = null; }
  }

  function submitAnswer(qid, selectedIndex) {
    clearQuizTimer();
    const set = currentSet();
    const qmap = questionsMap(set);
    const question = qmap[qid];
    const choiceOrder = session.choiceOrder || question.choices.map((_, i) => i);
    const timedOut = selectedIndex < 0;
    const selected = timedOut ? "（未回答・時間切れ）" : question.choices[choiceOrder[selectedIndex]];
    const correct = question.choices[question.answer - 1];
    const isCorrect = !timedOut && selected === correct;

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
    clearQuizTimer();
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

    const wrongCount = payload.history.filter((h) => !h.is_correct).length;
    const reviewBtn = wrongCount
      ? `<button class="button secondary" onclick="window.__quiz.startReviewQuiz('${payload.id}')">間違えた${wrongCount}問だけ復習する</button>`
      : "";

    const liveActions = opts.live ? `
      <button class="primary" onclick="window.__quiz.startQuiz('${esc(payload.setId)}')">もう一度挑戦する</button>
      ${reviewBtn}
      <p><a href="#/">トップに戻る</a></p>
    ` : `
      ${reviewBtn}
      <p><a href="#/">トップに戻る</a></p>
    `;

    viewEl.innerHTML = `
      ${summary}
      ${payload.history.length ? `
        <h2>回答結果一覧</h2>
        <p>正答率: ${rate}%</p>
        <ul class="problem-list">${items}</ul>
      ` : ""}
      <div class="actions">
        <a class="button primary" href="#/sheets/${esc(payload.setId)}">この問題集で印刷用セットを作る</a>
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

  // ---------- stats ----------

  function lineChartSvg(rates) {
    const w = 280, h = 90, pad = 12;
    const n = rates.length;
    const stepX = n > 1 ? (w - pad * 2) / (n - 1) : 0;
    const coords = rates.map((r, i) => ({
      x: pad + stepX * i,
      y: pad + (h - pad * 2) * (1 - Math.max(0, Math.min(100, r)) / 100),
    }));
    const points = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
    const circles = coords.map((c) => `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5" fill="#4338ca"></circle>`).join("");
    return `
      <svg viewBox="0 0 ${w} ${h}" class="stats-chart" preserveAspectRatio="none">
        <polyline points="${points}" fill="none" stroke="#4338ca" stroke-width="2"></polyline>
        ${circles}
      </svg>`;
  }

  function renderStats() {
    setTitle("成績グラフ");
    const history = getResultHistory();

    if (!history.length) {
      viewEl.innerHTML = `<p class="lead">まだ結果がありません。問題を解くとここに正答率の推移が表示されます。</p><p><a href="#/">トップに戻る</a></p>`;
      return;
    }

    const groups = {};
    const order = [];
    history.forEach((h) => {
      if (!groups[h.setId]) { groups[h.setId] = { title: h.setTitle, entries: [] }; order.push(h.setId); }
      const rate = h.answered ? Math.round((h.score / h.answered) * 1000) / 10 : 0;
      groups[h.setId].entries.push({ date: h.date, rate });
    });

    const cards = order.map((setId) => {
      const g = groups[setId];
      const rates = g.entries.map((e) => e.rate);
      const latest = rates[rates.length - 1];
      const best = Math.max(...rates);
      return `
        <div class="stats-card">
          <h2 class="stats-title">${esc(g.title)}</h2>
          <p class="stats-meta">挑戦回数: ${g.entries.length}回 ・ 直近: ${latest}% ・ 最高: ${best}%</p>
          ${lineChartSvg(rates)}
        </div>`;
    }).join("");

    viewEl.innerHTML = `
      <p class="lead">問題集ごとの正答率の推移です。</p>
      ${cards}
      <p style="margin-top:24px"><a href="#/">トップに戻る</a></p>
    `;
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
        <li>問題リストページの「制限時間モード」をONにすると、1問${QUESTION_TIME_SEC}秒の制限時間付きで挑戦できます。時間切れは不正解として扱われます。</li>
        <li>結果画面から「間違えた問題だけ復習する」を選ぶと、間違えた問題だけを再度出題できます。</li>
        <li>メニューの「成績グラフ」から、問題集ごとの正答率の推移を確認できます。</li>
        <li>メニューの「印刷用の試験セットを作る」から、問題用紙・解答用紙・正答・解説を選び、まとめて印刷またはPDF保存できます。</li>
        <li>メニューの「問題をインポート」から、JSONファイルまたは貼り付けたテキストで自作の問題集を追加できます。</li>
        <li>メニューの「インポート用プロンプトをダウンロード」から、AIに問題を生成してもらうためのルール・プロンプトを入手できます。</li>
        <li>結果画面や保存済みの結果からは、JSON / CSV 形式でダウンロードできます。</li>
      </ul>
      <p><a href="#/">トップに戻る</a></p>
    `;
  }

  // ---------- sheets (A4 print & export) ----------

  let currentSheetMode = "question"; // "question" | "answer-blank" | "answer-key" | "explanation"
  let currentSheetLayout = "1col"; // "1col" | "2col"
  let sheetFontScale = 1.0;
  let activeSheetSet = null;
  const selectedSheetModes = new Set(["question", "answer-blank"]);

  const SHEET_MODE_LABELS = {
    question: "問題用紙",
    "answer-blank": "解答用紙（受講用）",
    "answer-key": "解答用紙（正答入り）",
    explanation: "正答・解説",
  };

  function renderSheetsPage(targetSetId) {
    setTitle("印刷用の試験セットを作る");

    const allSets = getAllSets();
    if (!allSets.length) {
      viewEl.innerHTML = `<p class="lead">利用可能な問題集がありません。</p><p><a href="#/">トップに戻る</a></p>`;
      return;
    }

    if (targetSetId) {
      const found = getSetById(targetSetId);
      if (found) activeSheetSet = found;
    }
    if (!activeSheetSet || !allSets.find((s) => s.id === activeSheetSet.id)) {
      activeSheetSet = allSets[0];
    }

    const setOptions = allSets.map((s) => {
      const selected = (s.id === activeSheetSet.id) ? "selected" : "";
      return `<option value="${esc(s.id)}" ${selected}>${esc(s.title)} (${(s.questions || []).length}問)</option>`;
    }).join("");

    viewEl.innerHTML = `
      <p class="lead sheets-lead">問題集と必要な用紙を選び、まとめて印刷またはPDF保存できます。</p>

      <div class="sheets-flow" aria-label="出力の手順">
        <section class="sheets-step">
          <div class="sheets-step-heading">
            <span class="sheets-step-number">1</span>
            <div><h2>問題集を選ぶ</h2><p>印刷したい問題データを指定します。</p></div>
          </div>
          <label class="sheets-field-label" for="sheets-select-dataset">問題集</label>
          <select id="sheets-select-dataset" class="sheets-select sheets-select-wide">${setOptions}</select>
        </section>

        <section class="sheets-step">
          <div class="sheets-step-heading">
            <span class="sheets-step-number">2</span>
            <div><h2>セットに含める用紙を選ぶ</h2><p>問題用紙と受講用の解答用紙は最初から選択されています。</p></div>
          </div>
          <div class="sheet-output-options">
            ${Object.entries(SHEET_MODE_LABELS).map(([mode, label]) => `
              <label class="sheet-output-option">
                <input type="checkbox" class="sheet-output-check" value="${mode}" ${selectedSheetModes.has(mode) ? "checked" : ""}>
                <span><strong>${esc(label)}</strong><small>${mode === "question" ? "設問と選択肢" : mode === "answer-blank" ? "受講者が記入する解答欄" : mode === "answer-key" ? "採点用の正答一覧" : "正答・選択肢・解説"}</small></span>
              </label>
            `).join("")}
          </div>
        </section>

        <section class="sheets-step sheets-step-action">
          <div class="sheets-step-heading">
            <span class="sheets-step-number">3</span>
            <div><h2>出力する</h2><p>印刷画面でプリンターを選ぶか、「PDFに保存」を選択します。</p></div>
          </div>
          <div class="sheet-primary-action">
            <button type="button" class="button primary" id="btn-sheet-print">選択した2種類を印刷 / PDF保存</button>
            <span id="sheet-output-summary" class="sheet-output-summary">問題用紙＋解答用紙（受講用）</span>
          </div>
          <details class="sheet-secondary-exports">
            <summary>編集用ファイルも出力する（β版）</summary>
            <div class="sheet-secondary-actions">
              <button type="button" class="button secondary sheets-btn-sm" id="btn-sheet-word">プレビュー中の用紙をWord出力 (.doc)</button>
              <button type="button" class="button secondary sheets-btn-sm" id="btn-sheet-excel">正答・解説をExcel出力 (.xls)</button>
              <span>簡易互換ファイルのため、環境により微調整が必要です。</span>
            </div>
          </details>
        </section>
      </div>

      <div class="sheets-control-card sheets-preview-controls">
        <div class="sheets-preview-heading">
          <div><strong>プレビュー</strong><span>表示を切り替えて内容を確認できます。</span></div>
          <div class="sheets-control-row">
            <span class="sheets-control-label">表示:</span>
            <button type="button" class="sheets-tab-btn ${currentSheetMode === 'question' ? 'active' : ''}" data-mode="question">問題用紙</button>
            <button type="button" class="sheets-tab-btn ${currentSheetMode === 'answer-blank' ? 'active' : ''}" data-mode="answer-blank">受講用解答</button>
            <button type="button" class="sheets-tab-btn ${currentSheetMode === 'answer-key' ? 'active' : ''}" data-mode="answer-key">正答入り解答</button>
            <button type="button" class="sheets-tab-btn ${currentSheetMode === 'explanation' ? 'active' : ''}" data-mode="explanation">正答・解説</button>
          </div>
        </div>
        <div class="sheets-control-row" id="sheets-sub-options">
          <div id="sheets-layout-group" style="display:${currentSheetMode === 'question' ? 'flex' : 'none'};align-items:center;gap:6px;">
            <span class="sheets-control-label">配置:</span>
            <select id="sheets-select-layout" class="sheets-select" style="padding:4px 8px;font-size:0.85rem;">
              <option value="1col" ${currentSheetLayout === '1col' ? 'selected' : ''}>1列 (標準)</option>
              <option value="2col" ${currentSheetLayout === '2col' ? 'selected' : ''}>2段組 (試験用紙)</option>
            </select>
          </div>

          <div id="sheets-font-scale-group" style="display:${(currentSheetMode === 'question' || currentSheetMode === 'explanation') ? 'flex' : 'none'};align-items:center;gap:6px;">
            <span class="sheets-control-label">文字サイズ:</span>
            <button type="button" class="button secondary sheets-btn-sm" id="btn-sheet-font-dec" title="文字を少し小さくして詰め込む（-2%）">A -</button>
            <span id="sheet-font-scale-label" style="font-size:0.85rem;font-weight:bold;min-width:3.2em;text-align:center;display:inline-block;">${Math.round(sheetFontScale * 100)}%</span>
            <button type="button" class="button secondary sheets-btn-sm" id="btn-sheet-font-inc" title="文字を少し大きくする（+2%）">A +</button>
            <button type="button" class="button ghost sheets-btn-sm" id="btn-sheet-font-reset" title="標準（100%）に戻す">標準</button>
          </div>

        </div>
      </div>

      <div class="sheets-preview-area" id="sheets-preview-container"></div>
      <p style="margin-top:24px" class="no-print"><a href="#/list">問題リストに戻る</a></p>
    `;

    setupSheetsEvents();
    renderActiveSheet();
  }

  function setupSheetsEvents() {
    const selectDataset = document.getElementById("sheets-select-dataset");
    if (selectDataset) {
      selectDataset.addEventListener("change", (e) => {
        const found = getSetById(e.target.value);
        if (found) {
          activeSheetSet = found;
          renderActiveSheet();
        }
      });
    }

    const tabBtns = document.querySelectorAll(".sheets-tab-btn");
    const layoutGroup = document.getElementById("sheets-layout-group");
    const fontScaleGroup = document.getElementById("sheets-font-scale-group");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentSheetMode = btn.dataset.mode;

        if (layoutGroup) {
          layoutGroup.style.display = (currentSheetMode === "question") ? "flex" : "none";
        }
        if (fontScaleGroup) {
          fontScaleGroup.style.display = (currentSheetMode === "question" || currentSheetMode === "explanation") ? "flex" : "none";
        }

        renderActiveSheet();
      });
    });

    const outputChecks = document.querySelectorAll(".sheet-output-check");
    outputChecks.forEach((check) => {
      check.addEventListener("change", () => {
        if (check.checked) selectedSheetModes.add(check.value);
        else selectedSheetModes.delete(check.value);
        updateSheetOutputSummary();
      });
    });
    updateSheetOutputSummary();

    const selectLayout = document.getElementById("sheets-select-layout");
    if (selectLayout) {
      selectLayout.addEventListener("change", (e) => {
        currentSheetLayout = e.target.value;
        renderActiveSheet();
      });
    }

    const btnFontDec = document.getElementById("btn-sheet-font-dec");
    const btnFontInc = document.getElementById("btn-sheet-font-inc");
    const btnFontReset = document.getElementById("btn-sheet-font-reset");
    const fontScaleLabel = document.getElementById("sheet-font-scale-label");

    function setScale(s) {
      sheetFontScale = Math.round(Math.max(0.80, Math.min(1.20, s)) * 100) / 100;
      document.documentElement.style.setProperty("--font-scale", sheetFontScale);
      if (fontScaleLabel) {
        fontScaleLabel.textContent = `${Math.round(sheetFontScale * 100)}%`;
      }
      renderActiveSheet();
    }

    if (btnFontDec) btnFontDec.addEventListener("click", () => setScale(sheetFontScale - 0.02));
    if (btnFontInc) btnFontInc.addEventListener("click", () => setScale(sheetFontScale + 0.02));
    if (btnFontReset) btnFontReset.addEventListener("click", () => setScale(1.0));

    const btnPrint = document.getElementById("btn-sheet-print");
    if (btnPrint) btnPrint.addEventListener("click", printSelectedSheets);

    const btnWord = document.getElementById("btn-sheet-word");
    if (btnWord) btnWord.addEventListener("click", exportActiveSheetToWord);

    const btnExcel = document.getElementById("btn-sheet-excel");
    if (btnExcel) btnExcel.addEventListener("click", exportActiveSheetToExcel);
  }

  function updateSheetOutputSummary() {
    const printButton = document.getElementById("btn-sheet-print");
    const summary = document.getElementById("sheet-output-summary");
    const selected = Object.keys(SHEET_MODE_LABELS).filter((mode) => selectedSheetModes.has(mode));
    if (printButton) {
      printButton.disabled = selected.length === 0;
      printButton.textContent = selected.length
        ? `選択した${selected.length}種類を印刷 / PDF保存`
        : "出力する用紙を選んでください";
    }
    if (summary) {
      summary.textContent = selected.length
        ? selected.map((mode) => SHEET_MODE_LABELS[mode]).join("＋")
        : "用紙が選択されていません";
    }
  }

  function renderSheetMode(container, mode) {
    if (mode === "question") renderSheetQuestionPages(container, activeSheetSet, currentSheetLayout);
    else if (mode === "answer-blank") renderSheetAnswerPages(container, activeSheetSet, false);
    else if (mode === "answer-key") renderSheetAnswerPages(container, activeSheetSet, true);
    else if (mode === "explanation") renderSheetExplanationPages(container, activeSheetSet);
  }

  // 印刷時は、プレビュー枠とその祖先だけを残して他を隠す。
  // 共通シェル(shell.js)が body 直下に要素を差し込んでも、
  // それが余計な用紙として出力されるのを防ぐ。
  const PRINT_HIDDEN_CLASS = "print-isolate-hidden";
  const PRINT_KEEP_CLASS = "print-isolate-keep";

  function applyPrintIsolation() {
    const container = document.getElementById("sheets-preview-container");
    if (!container || !container.querySelector(".a4-page")) return;

    let node = container;
    while (node.parentElement) {
      const parent = node.parentElement;
      Array.from(parent.children).forEach((sibling) => {
        if (sibling !== node) sibling.classList.add(PRINT_HIDDEN_CLASS);
      });
      parent.classList.add(PRINT_KEEP_CLASS);
      node = parent;
    }
  }

  function clearPrintIsolation() {
    document.querySelectorAll("." + PRINT_HIDDEN_CLASS).forEach((el) => el.classList.remove(PRINT_HIDDEN_CLASS));
    document.querySelectorAll("." + PRINT_KEEP_CLASS).forEach((el) => el.classList.remove(PRINT_KEEP_CLASS));
  }

  window.addEventListener("beforeprint", applyPrintIsolation);
  window.addEventListener("afterprint", clearPrintIsolation);

  function printSelectedSheets() {
    const container = document.getElementById("sheets-preview-container");
    const selected = Object.keys(SHEET_MODE_LABELS).filter((mode) => selectedSheetModes.has(mode));
    if (!container || !activeSheetSet || !selected.length) return;

    container.innerHTML = "";
    container.classList.add("printing-sheet-bundle");
    selected.forEach((mode) => renderSheetMode(container, mode));

    const restorePreview = () => {
      container.classList.remove("printing-sheet-bundle");
      renderActiveSheet();
    };
    window.addEventListener("afterprint", restorePreview, { once: true });
    window.print();
  }

  function renderActiveSheet() {
    const container = document.getElementById("sheets-preview-container");
    if (!container || !activeSheetSet) return;
    container.innerHTML = "";

    document.documentElement.style.setProperty("--font-scale", sheetFontScale);

    renderSheetMode(container, currentSheetMode);
  }

  function createSheetHeaderHtml(sheetSet, sheetLabel, showScoreBox, sheetMode) {
    const title = sheetSet.title || "模擬試験";
    const totalQ = (sheetSet.questions || []).length;

    return `
      <div class="exam-header">
        <div class="exam-title-line">
          <h1 class="exam-main-title" contenteditable="true" title="クリックしてタイトルを直接編集できます">${esc(title)}</h1>
          <div class="exam-title-right">
            <span class="exam-sheet-type">${esc(sheetLabel)}</span>
            ${showScoreBox ? `
              <div class="meta-score-box">
                得点：<span class="score-input-line" contenteditable="true">&nbsp;&nbsp;&nbsp;&nbsp;</span> / ${totalQ}
              </div>
            ` : ""}
          </div>
        </div>
        <div class="exam-meta-line">
          <div class="meta-date">
            実施日：<span class="date-space-year" contenteditable="true" title="年">&nbsp;&nbsp;&nbsp;&nbsp;</span>年
            <span class="date-space-month" contenteditable="true" title="月">&nbsp;&nbsp;</span>月
            <span class="date-space-day" contenteditable="true" title="日">&nbsp;&nbsp;</span>日
          </div>
          <div class="meta-name">
            氏名：<span class="name-space" contenteditable="true" title="氏名"></span>
          </div>
        </div>
        ${sheetMode === "question" ? `
          <div class="exam-notes">
            注意事項：解答はすべて別紙の「解答用紙」に記入してください。問題用紙への記入は無効となります。
          </div>
        ` : ""}
      </div>
    `;
  }

  function createSheetSubHeader(sheetSet, pageNum, sheetLabel) {
    const title = sheetSet.title || "模擬試験";
    return `
      <div class="exam-header" style="margin-bottom:8px;">
        <div class="exam-title-line" style="margin-bottom:3px;padding-bottom:3px;">
          <span style="font-size:1.02rem;font-weight:bold;">${esc(title)}（${esc(sheetLabel)}）</span>
          <div class="meta-name" style="font-size:0.85rem;">
            氏名：<span class="name-space" style="min-width:11em;" contenteditable="true"></span>
          </div>
        </div>
      </div>
    `;
  }

  function renderSheetQuestionPages(container, sheetSet, layout) {
    const questions = sheetSet.questions || [];
    if (!questions.length) return;

    const A4_MAX_CONTENT_H = 950;
    const firstRenderedPageIndex = container.querySelectorAll(".a4-page").length;
    let pageNum = 1;

    function createPage(isFirst, num) {
      const page = document.createElement("div");
      page.className = "a4-page";
      page.innerHTML = `
        <div class="a4-body">
          ${isFirst ? createSheetHeaderHtml(sheetSet, "問題用紙", false, "question") : createSheetSubHeader(sheetSet, num, "問題用紙")}
          <div class="questions-container ${layout === '2col' ? 'layout-2col' : ''}"></div>
        </div>
        <div class="page-footer">- ${num} -</div>
      `;
      container.appendChild(page);
      return page;
    }

    function createBlock(q, qNum) {
      const block = document.createElement("div");
      block.className = "question-block";

      const codeHtml = q.code ? `<pre class="q-code-frame">${esc(q.code)}</pre>` : "";
      const choicesHtml = (q.choices || []).map((ch, chIdx) => {
        const label = CHOICE_LABELS[chIdx] || String(chIdx + 1);
        return `
          <div class="q-choice-item">
            <span class="choice-symbol">(${label})</span>
            <span class="choice-text">${esc(ch)}</span>
          </div>
        `;
      }).join("");

      block.innerHTML = `
        <div class="q-head">
          <span class="q-num">【問 ${qNum}】</span>
          <span class="q-text">${esc(q.question)}</span>
        </div>
        ${codeHtml}
        <div class="q-choices-list">
          ${choicesHtml}
        </div>
      `;
      return block;
    }

    let currentPage = createPage(true, pageNum);
    let currentContainer = currentPage.querySelector(".questions-container");
    let headerEl = currentPage.querySelector(".exam-header");
    let maxAllowedH = A4_MAX_CONTENT_H - (headerEl ? headerEl.offsetHeight : 100);

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const block = createBlock(q, qNum);
      currentContainer.appendChild(block);

      const currentH = currentContainer.offsetHeight;

      if (currentH > maxAllowedH && currentContainer.children.length > 1) {
        currentContainer.removeChild(block);

        pageNum++;
        currentPage = createPage(false, pageNum);
        currentContainer = currentPage.querySelector(".questions-container");
        headerEl = currentPage.querySelector(".exam-header");
        maxAllowedH = A4_MAX_CONTENT_H - (headerEl ? headerEl.offsetHeight : 40);

        currentContainer.appendChild(block);
      }
    });

    const totalPages = pageNum;
    const footers = Array.from(container.querySelectorAll(".a4-page .page-footer")).slice(firstRenderedPageIndex);
    footers.forEach((f, i) => {
      f.textContent = `- ${i + 1} / ${totalPages} -`;
    });
  }

  function renderSheetAnswerPages(container, sheetSet, isAnswerKey) {
    const questions = sheetSet.questions || [];
    const totalQ = questions.length;
    const sheetLabel = isAnswerKey ? "解答用紙（正答）" : "解答用紙";

    const questionsPerPage = 40;
    const totalPages = Math.max(1, Math.ceil(totalQ / questionsPerPage));

    for (let p = 0; p < totalPages; p++) {
      const startQ = p * questionsPerPage;
      const pageQuestions = questions.slice(startQ, startQ + questionsPerPage);
      const leftQuestions = pageQuestions.slice(0, 20);
      const rightQuestions = pageQuestions.slice(20, 40);

      function renderColumn(items, colStartIdx) {
        const rows = [];
        for (let i = 0; i < 20; i++) {
          const q = items[i];
          const qNum = colStartIdx + i + 1;

          if (q) {
            const origAnswerIdx = (typeof q.answer === "number") ? q.answer - 1 : -1;
            const correctLabel = (origAnswerIdx >= 0 && origAnswerIdx < CHOICE_LABELS.length)
              ? CHOICE_LABELS[origAnswerIdx]
              : (q.answer != null ? String(q.answer) : "");

            rows.push(`
              <tr>
                <td class="td-qnum">問 ${qNum}</td>
                <td class="${isAnswerKey ? 'td-ans-key' : 'td-ans-blank'}">
                  ${isAnswerKey ? esc(correctLabel) : ''}
                </td>
              </tr>
            `);
          } else if (colStartIdx + i < totalQ) {
            rows.push(`
              <tr>
                <td class="td-qnum">問 ${qNum}</td>
                <td class="td-ans-blank"></td>
              </tr>
            `);
          } else {
            rows.push(`
              <tr>
                <td class="td-qnum" style="color:#bbb;">-</td>
                <td style="color:#bbb;"></td>
              </tr>
            `);
          }
        }

        return `
          <table class="answer-symmetry-table">
            <thead>
              <tr>
                <th class="th-qnum">問題番号</th>
                <th class="th-ans">解　答</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join("")}
            </tbody>
          </table>
        `;
      }

      const pageEl = document.createElement("div");
      pageEl.className = "a4-page";
      pageEl.innerHTML = `
        <div class="a4-body">
          ${createSheetHeaderHtml(sheetSet, sheetLabel, true, isAnswerKey ? "answer-key" : "answer-blank")}
          <div class="answer-symmetry-container">
            <div class="answer-column">
              ${renderColumn(leftQuestions, startQ)}
            </div>
            <div class="answer-column">
              ${renderColumn(rightQuestions, startQ + 20)}
            </div>
          </div>
        </div>
        <div class="page-footer">- ${p + 1} / ${totalPages} -</div>
      `;
      container.appendChild(pageEl);
    }
  }

  function renderSheetExplanationPages(container, sheetSet) {
    const questions = sheetSet.questions || [];
    if (!questions.length) return;

    const A4_MAX_CONTENT_H = 950;
    const firstRenderedPageIndex = container.querySelectorAll(".a4-page").length;
    let pageNum = 1;

    function createNewExpPage(num) {
      const p = document.createElement("div");
      p.className = "a4-page";
      p.innerHTML = `
        <div class="a4-body">
          <div class="exam-header" style="margin-bottom:6px;">
            <div class="exam-title-line">
              <h1 class="exam-main-title" contenteditable="true">${esc(sheetSet.title || "模擬試験")}</h1>
              <span class="exam-sheet-type">正答・解説（別紙）</span>
            </div>
          </div>
          <table class="explanation-table">
            <thead>
              <tr>
                <th class="exp-col-num">問題</th>
                <th class="exp-col-ans">正答</th>
                <th class="exp-col-content">正答の内容</th>
                <th class="exp-col-text">解　説</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="page-footer">- 解説 ${num} -</div>
      `;
      container.appendChild(p);
      return p;
    }

    let currentPageEl = createNewExpPage(pageNum);
    let tableEl = currentPageEl.querySelector(".explanation-table");
    let currentTbody = tableEl.querySelector("tbody");
    let headerEl = currentPageEl.querySelector(".exam-header");
    let maxAllowedH = A4_MAX_CONTENT_H - (headerEl ? headerEl.offsetHeight : 45);

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const origAnswerIdx = (typeof q.answer === "number") ? q.answer - 1 : -1;
      const correctLabel = (origAnswerIdx >= 0 && origAnswerIdx < CHOICE_LABELS.length)
        ? CHOICE_LABELS[origAnswerIdx]
        : String(q.answer || "-");
      const correctText = (q.choices && origAnswerIdx >= 0 && q.choices[origAnswerIdx])
        ? q.choices[origAnswerIdx]
        : "";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="exp-col-num">問 ${qNum}</td>
        <td class="exp-col-ans">${esc(correctLabel)}</td>
        <td class="exp-col-content">${esc(correctText)}</td>
        <td class="exp-col-text">${esc(q.explanation || "—")}</td>
      `;

      currentTbody.appendChild(tr);

      const currentH = tableEl.offsetHeight;

      if (currentH > maxAllowedH && currentTbody.children.length > 1) {
        currentTbody.removeChild(tr);

        pageNum++;
        currentPageEl = createNewExpPage(pageNum);
        tableEl = currentPageEl.querySelector(".explanation-table");
        currentTbody = tableEl.querySelector("tbody");
        headerEl = currentPageEl.querySelector(".exam-header");
        maxAllowedH = A4_MAX_CONTENT_H - (headerEl ? headerEl.offsetHeight : 45);

        currentTbody.appendChild(tr);
      }
    });

    const totalPages = pageNum;
    const footers = Array.from(container.querySelectorAll(".a4-page .page-footer")).slice(firstRenderedPageIndex);
    footers.forEach((f, i) => {
      f.textContent = `- 解説 ${i + 1} / ${totalPages} -`;
    });
  }

  function exportActiveSheetToWord() {
    if (!activeSheetSet) return;
    const title = activeSheetSet.title || "模擬試験";
    const container = document.getElementById("sheets-preview-container");
    if (!container) return;

    const content = container.innerHTML;
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${esc(title)}</title>
        <style>
          body { font-family: 'MS Mincho', 'Yu Mincho', serif; font-size: 10pt; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1pt solid black; padding: 4pt; }
          .a4-page { page-break-after: always; margin-bottom: 25pt; }
          .exam-title-line { border-bottom: 1pt solid black; padding-bottom: 4pt; margin-bottom: 6pt; }
          .meta-score-box { border: 1pt solid black; padding: 2pt 6pt; }
          .q-code-frame { border: 1pt solid black; padding: 4pt; font-family: monospace; font-size: 9pt; }
        </style>
      </head>
      <body>
        <div style="font-size:8pt;color:#666;margin-bottom:10pt;">※この文書はシステムから自動出力されたβ版互換ファイルです。</div>
        ${content}
      </body>
      </html>
    `;
    const blob = new Blob(["\ufeff" + html], { type: "application/msword;charset=utf-8" });
    downloadBlob(`${title}_${currentSheetMode}_beta.doc`, blob, "application/msword");
  }

  function exportActiveSheetToExcel() {
    if (!activeSheetSet) return;
    const title = activeSheetSet.title || "模擬試験";
    const questions = activeSheetSet.questions || [];

    let tableRows = `
      <tr>
        <th colspan="4" style="font-size:14pt;font-weight:bold;text-align:left;">${esc(title)} 解答・正答一覧（β版）</th>
      </tr>
      <tr>
        <td colspan="4" style="text-align:right;">実施日：　　　　年　　月　　日　　氏名：＿＿＿＿＿＿＿＿　　得点：＿＿ / ${questions.length}</td>
      </tr>
      <tr style="background:#eeeeee;font-weight:bold;">
        <th style="border:1px solid #000;width:80px;">問題番号</th>
        <th style="border:1px solid #000;width:80px;">正答</th>
        <th style="border:1px solid #000;width:200px;">正答内容</th>
        <th style="border:1px solid #000;width:350px;">解説</th>
      </tr>
    `;

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const origAnswerIdx = (typeof q.answer === "number") ? q.answer - 1 : -1;
      const correctLabel = (origAnswerIdx >= 0 && origAnswerIdx < CHOICE_LABELS.length)
        ? CHOICE_LABELS[origAnswerIdx]
        : String(q.answer || "");
      const correctText = (q.choices && origAnswerIdx >= 0 && q.choices[origAnswerIdx])
        ? q.choices[origAnswerIdx]
        : "";

      tableRows += `
        <tr>
          <td style="border:1px solid #000;text-align:center;">問 ${qNum}</td>
          <td style="border:1px solid #000;text-align:center;font-weight:bold;">${esc(correctLabel)}</td>
          <td style="border:1px solid #000;">${esc(correctText)}</td>
          <td style="border:1px solid #000;">${esc(q.explanation || "—")}</td>
        </tr>
      `;
    });

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>解答一覧</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head>
      <body>
        <table border="1">${tableRows}</table>
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + html], { type: "application/vnd.ms-excel;charset=utf-8" });
    downloadBlob(`${title}_解答一覧_beta.xls`, blob, "application/vnd.ms-excel");
  }

  // ---------- expose ----------

  window.__quiz = {
    startQuiz, startReviewQuiz, abortQuiz, goNext, submitAnswer,
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
