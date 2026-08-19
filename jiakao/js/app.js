(function () {
  "use strict";

  const STORAGE_KEY = "jiakao_v5_progress";

  const state = {
    mode: "quiz",
    index: 0,
    list: [],
    removed: new Set(),
    answers: {},
    correct: 0,
    wrong: 0,
    autoTimer: 0,
  };

  const els = {
    typeTag: document.getElementById("typeTag"),
    questionText: document.getElementById("questionText"),
    questionImageWrap: document.getElementById("questionImageWrap"),
    questionImage: document.getElementById("questionImage"),
    questionImageCaption: document.getElementById("questionImageCaption"),
    optionsList: document.getElementById("optionsList"),
    explainBox: document.getElementById("explainBox"),
    explainText: document.getElementById("explainText"),
    quizPanel: document.getElementById("quizPanel"),
    resultPanel: document.getElementById("resultPanel"),
    resultScore: document.getElementById("resultScore"),
    resultDetail: document.getElementById("resultDetail"),
    statCorrect: document.getElementById("statCorrect"),
    statWrong: document.getElementById("statWrong"),
    progressText: document.getElementById("progressText"),
    gridSheet: document.getElementById("gridSheet"),
    qGrid: document.getElementById("qGrid"),
  };

  function letter(i) {
    return String.fromCharCode(65 + i);
  }

  function typeLabel(type) {
    return "单选题";
  }

  function buildList() {
    return QUESTIONS.filter((q) => !state.removed.has(q.id));
  }

  function clearAuto() {
    if (state.autoTimer) {
      clearTimeout(state.autoTimer);
      state.autoTimer = 0;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mode: state.mode,
      index: state.index,
      removed: [...state.removed],
      answers: state.answers,
      correct: state.correct,
      wrong: state.wrong,
    }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      state.mode = d.mode === "memo" ? "memo" : "quiz";
      state.removed = new Set(d.removed || []);
      state.answers = d.answers || {};
      state.correct = d.correct || 0;
      state.wrong = d.wrong || 0;
      state.index = d.index || 0;
    } catch (_) { /* ignore */ }
  }

  function recount() {
    let ok = 0, bad = 0;
    for (const q of QUESTIONS) {
      if (state.removed.has(q.id)) continue;
      if (!(q.id in state.answers)) continue;
      if (state.answers[q.id] === q.answer) ok += 1;
      else bad += 1;
    }
    state.correct = ok;
    state.wrong = bad;
  }

  function currentQ() {
    return state.list[state.index];
  }

  function refreshList() {
    state.list = buildList();
    if (state.index >= state.list.length) state.index = Math.max(0, state.list.length - 1);
  }

  function renderImage(q) {
    if (!q.image) {
      els.questionImageWrap.hidden = true;
      els.questionImage.removeAttribute("src");
      els.questionImageCaption.hidden = true;
      return;
    }
    els.questionImage.src = q.image;
    els.questionImage.alt = q.imageAlt || "题目配图";
    els.questionImageWrap.hidden = false;
    if (q.imageCaption) {
      els.questionImageCaption.textContent = q.imageCaption;
      els.questionImageCaption.hidden = false;
    } else {
      els.questionImageCaption.hidden = true;
    }
  }

  function render() {
    document.getElementById("modeQuiz").classList.toggle("active", state.mode === "quiz");
    document.getElementById("modeMemo").classList.toggle("active", state.mode === "memo");
    recount();
    els.statCorrect.textContent = state.correct;
    els.statWrong.textContent = state.wrong;

    if (!state.list.length) {
      els.quizPanel.hidden = false;
      els.resultPanel.hidden = true;
      els.questionText.textContent = "题都被移除了，点关闭再练一遍。";
      els.optionsList.innerHTML = "";
      els.explainBox.hidden = true;
      els.progressText.textContent = "0/0";
      return;
    }

    const q = currentQ();
    els.quizPanel.hidden = false;
    els.resultPanel.hidden = true;
    els.typeTag.textContent = typeLabel(q.type);
    els.questionText.textContent = q.text;
    renderImage(q);
    els.progressText.textContent = (state.index + 1) + "/" + state.list.length;

    const picked = state.answers[q.id];
    const answered = picked !== undefined;
    const isWrong = answered && picked !== q.answer;
    const showMark = state.mode === "memo" || answered;
    const showExplain = state.mode === "memo" || isWrong;

    els.optionsList.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      const radio = document.createElement("span");
      radio.className = "radio";
      const lab = document.createElement("span");
      lab.textContent = letter(i) + "、" + opt;
      btn.appendChild(radio);
      btn.appendChild(lab);
      if (showMark) {
        if (i === q.answer) btn.classList.add("right");
        if (answered && i === picked && i !== q.answer) btn.classList.add("wrong");
        if (state.mode === "memo" && i === q.answer) btn.classList.add("picked");
      }
      btn.addEventListener("click", () => select(i));
      els.optionsList.appendChild(btn);
    });

    if (showExplain) {
      const letterAns = letter(q.answer);
      els.explainText.textContent = "正确答案：" + letterAns + "。 " + q.explain;
      els.explainBox.hidden = false;
    } else {
      els.explainBox.hidden = true;
    }
    setSlideX(els.quizPanel, 0, 0);
  }

  function select(i) {
    const q = currentQ();
    if (!q) return;
    if (state.mode === "memo") return;
    if (q.id in state.answers) return;
    state.answers[q.id] = i;
    save();
    render();
    if (i === q.answer) {
      clearAuto();
      state.autoTimer = setTimeout(() => {
        state.autoTimer = 0;
        flipTo(1);
      }, 1000);
    }
  }

  function go(delta) {
    if (!state.list.length) return;
    clearAuto();
    if (!els.resultPanel.hidden && delta < 0) {
      els.resultPanel.hidden = true;
      els.quizPanel.hidden = false;
      state.index = Math.max(0, state.list.length - 1);
      save();
      render();
      return;
    }
    const next = state.index + delta;
    if (next < 0) return;
    if (next >= state.list.length) {
      showResult();
      return;
    }
    state.index = next;
    save();
    render();
  }

  let flipping = false;

  function activeSlide() {
    return els.resultPanel.hidden ? els.quizPanel : els.resultPanel;
  }

  function setSlideX(el, x, ms) {
    if (!el) return;
    el.style.transition = ms ? "transform " + ms + "ms ease" : "none";
    el.style.transform = "translate3d(" + x + "px,0,0)";
  }

  function flipTo(delta) {
    if (flipping || !state.list.length) return;
    if (els.resultPanel.hidden && delta < 0 && state.index <= 0) {
      setSlideX(activeSlide(), 0, 180);
      return;
    }
    const el = activeSlide();
    const w = Math.max(document.getElementById("swipeStage").clientWidth, 280);
    flipping = true;
    clearAuto();
    setSlideX(el, delta > 0 ? -w : w, 220);
    setTimeout(function () {
      go(delta);
      const el2 = activeSlide();
      setSlideX(el2, delta > 0 ? w : -w, 0);
      el2.offsetHeight;
      setSlideX(el2, 0, 220);
      setTimeout(function () { flipping = false; }, 240);
    }, 220);
  }

  function showResult() {
    clearAuto();
    recount();
    const total = state.list.length;
    const score = total ? Math.round((state.correct / total) * 100) : 0;
    els.quizPanel.hidden = true;
    els.resultPanel.hidden = false;
    els.resultScore.textContent = score + " 分";
    els.resultDetail.textContent =
      "共 " + total + " 题，答对 " + state.correct + "，答错 " + state.wrong +
      "。科目一合格线 90 分。";
    els.progressText.textContent = total + "/" + total;
  }

  function restart() {
    clearAuto();
    state.answers = {};
    state.removed = new Set();
    state.correct = 0;
    state.wrong = 0;
    state.index = 0;
    refreshList();
    els.gridSheet.hidden = true;
    save();
    render();
  }

  function clearAll() {
    if (!confirm("确定清空当前答题进度，从头开始？")) return;
    restart();
  }

  function removeCurrent() {
    const q = currentQ();
    if (!q) return;
    clearAuto();
    state.removed.add(q.id);
    delete state.answers[q.id];
    refreshList();
    save();
    render();
  }

  function openGrid() {
    els.qGrid.innerHTML = "";
    state.list.forEach((q, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = i + 1;
      if (i === state.index) b.classList.add("cur");
      if (q.id in state.answers) {
        b.classList.add(state.answers[q.id] === q.answer ? "ok" : "bad");
      }
      b.addEventListener("click", () => {
        clearAuto();
        state.index = i;
        els.gridSheet.hidden = true;
        save();
        render();
      });
      els.qGrid.appendChild(b);
    });
    els.gridSheet.hidden = false;
  }

  document.getElementById("modeQuiz").addEventListener("click", () => {
    clearAuto();
    state.mode = "quiz";
    save();
    render();
  });
  document.getElementById("modeMemo").addEventListener("click", () => {
    clearAuto();
    state.mode = "memo";
    save();
    render();
  });
  document.getElementById("btnGrid").addEventListener("click", openGrid);
  document.getElementById("sheetMask").addEventListener("click", () => { els.gridSheet.hidden = true; });
  document.getElementById("btnCloseSheet").addEventListener("click", () => { els.gridSheet.hidden = true; });
  document.getElementById("btnRemove").addEventListener("click", removeCurrent);
  document.getElementById("btnRestartResult").addEventListener("click", restart);
  document.getElementById("btnClear").addEventListener("click", clearAll);
  document.getElementById("btnBack").addEventListener("click", () => flipTo(-1));
  document.getElementById("btnClose").addEventListener("click", restart);

  const stage = document.getElementById("swipeStage");
  const drag = { on: false, x: 0, y: 0, dx: 0, axis: "", skipClick: false, pid: 0 };

  function onDragStart(x, y, pid) {
    if (flipping) return;
    drag.on = true;
    drag.x = x;
    drag.y = y;
    drag.dx = 0;
    drag.axis = "";
    drag.skipClick = false;
    drag.pid = pid || 0;
    setSlideX(activeSlide(), 0, 0);
  }

  function onDragMove(x, y, e) {
    if (!drag.on) return;
    const dx = x - drag.x;
    const dy = y - drag.y;
    if (!drag.axis) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      drag.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (drag.axis === "x" && drag.pid && e && e.target && stage.setPointerCapture) {
        try { stage.setPointerCapture(drag.pid); } catch (_) {}
      }
    }
    if (drag.axis !== "x") return;
    if (e && e.cancelable) e.preventDefault();
    drag.dx = dx;
    drag.skipClick = true;
    let tx = dx;
    if (els.resultPanel.hidden && state.index <= 0 && dx > 0) tx = dx * 0.28;
    setSlideX(activeSlide(), tx, 0);
  }

  function onDragEnd() {
    if (!drag.on) return;
    drag.on = false;
    const dx = drag.dx;
    const axis = drag.axis;
    drag.axis = "";
    if (axis !== "x") return;
    if (Math.abs(dx) < 56) {
      setSlideX(activeSlide(), 0, 180);
      return;
    }
    flipTo(dx < 0 ? 1 : -1);
  }

  stage.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button !== 0) return;
    if (e.target.closest(".again-btn")) return;
    onDragStart(e.clientX, e.clientY, e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => onDragMove(e.clientX, e.clientY, e), { passive: false });
  stage.addEventListener("pointerup", onDragEnd);
  stage.addEventListener("pointercancel", onDragEnd);

  els.optionsList.addEventListener("click", (e) => {
    if (drag.skipClick) {
      e.preventDefault();
      e.stopPropagation();
      drag.skipClick = false;
    }
  }, true);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") flipTo(-1);
    if (e.key === "ArrowRight") flipTo(1);
  });

  load();
  refreshList();
  render();
})();
