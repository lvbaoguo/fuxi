(function () {
  "use strict";

  const PRACTICE_KEY = "jiakao_v9_practice";
  const REVIEW_KEY = "jiakao_v9_review";
  const WRONG_KEY = "jiakao_v9_wrong";

  const state = {
    scene: "home",
    mode: "quiz",
    index: 0,
    list: [],
    removed: new Set(),
    answers: {},
    pending: {},
    correct: 0,
    wrong: 0,
    autoTimer: 0,
    shuffled: false,
    shuffleOrder: null,
    wrongIds: [],
  };

  const els = {
    typeTag: document.getElementById("typeTag"),
    questionText: document.getElementById("questionText"),
    questionImageWrap: document.getElementById("questionImageWrap"),
    questionImage: document.getElementById("questionImage"),
    questionImageCaption: document.getElementById("questionImageCaption"),
    optionsList: document.getElementById("optionsList"),
    multiBar: document.getElementById("multiBar"),
    btnMultiSubmit: document.getElementById("btnMultiSubmit"),
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
    moduleBar: document.getElementById("moduleBar"),
    btnShuffle: document.getElementById("btnShuffle"),
    koujuePage: document.getElementById("koujuePage"),
    homePage: document.getElementById("homePage"),
    pageTitle: document.getElementById("pageTitle"),
    wrongCountLabel: document.getElementById("wrongCountLabel"),
    clearTitle: document.getElementById("clearTitle"),
    clearDesc: document.getElementById("clearDesc"),
  };

  function moduleName(q) {
    if (!q) return "";
    if (q.module) return q.module;
    if (q.image) return "图题";
    if (q.type === "tf") return "判断";
    if (q.type === "multi") return "多选";
    return "单选";
  }

  function moduleRank(q) {
    if (q.image) return 3;
    if (q.type === "single") return 0;
    if (q.type === "tf") return 1;
    if (q.type === "multi") return 2;
    return 4;
  }

  function sortByModule(arr) {
    return arr.slice().sort(function (a, b) {
      var ra = moduleRank(a);
      var rb = moduleRank(b);
      if (ra !== rb) return ra - rb;
      var fa = a.family || "";
      var fb = b.family || "";
      if (fa < fb) return -1;
      if (fa > fb) return 1;
      return (a.id || 0) - (b.id || 0);
    });
  }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function letter(i) {
    return String.fromCharCode(65 + i);
  }

  function typeLabel(type) {
    if (type === "multi") return "多选题";
    if (type === "tf") return "判断题";
    return "单选题";
  }

  function normAns(a) {
    if (Array.isArray(a)) return a.map(Number).sort(function (x, y) { return x - y; });
    return a;
  }

  function sameAns(a, b) {
    const aa = normAns(a);
    const bb = normAns(b);
    if (Array.isArray(aa) || Array.isArray(bb)) {
      const x = Array.isArray(aa) ? aa : [aa];
      const y = Array.isArray(bb) ? bb : [bb];
      return x.length === y.length && x.every(function (v, i) { return v === y[i]; });
    }
    return aa === bb;
  }

  function isMulti(q) {
    return q && q.type === "multi";
  }

  function answerLetters(q) {
    const a = normAns(q.answer);
    if (Array.isArray(a)) return a.map(letter).join("");
    return letter(a);
  }

  function answerLettersFrom(indices) {
    var arr = Array.isArray(indices) ? normAns(indices) : [indices];
    return arr.map(letter).join("");
  }

  function isReview() {
    return state.scene === "review";
  }

  function storageKey() {
    return isReview() ? REVIEW_KEY : PRACTICE_KEY;
  }

  function loadWrongIds() {
    try {
      var raw = localStorage.getItem(WRONG_KEY);
      if (!raw) {
        state.wrongIds = [];
        return;
      }
      var d = JSON.parse(raw);
      state.wrongIds = Array.isArray(d.ids) ? d.ids.map(Number) : [];
    } catch (_) {
      state.wrongIds = [];
    }
  }

  function saveWrongIds() {
    localStorage.setItem(WRONG_KEY, JSON.stringify({ ids: state.wrongIds }));
  }

  function rememberWrong(id) {
    if (state.wrongIds.indexOf(id) >= 0) return;
    state.wrongIds.push(id);
    saveWrongIds();
    updateHomeCounts();
  }

  function updateHomeCounts() {
    if (!els.wrongCountLabel) return;
    var n = state.wrongIds.length;
    els.wrongCountLabel.textContent = n ? ("已收录 " + n + " 题") : "还没有错题";
  }

  function buildList() {
    if (isReview()) {
      var map = {};
      QUESTIONS.forEach(function (q) { map[q.id] = q; });
      var list = [];
      state.wrongIds.forEach(function (id) {
        if (map[id]) list.push(map[id]);
      });
      if (state.shuffled && state.shuffleOrder && state.shuffleOrder.length) {
        var byId = {};
        list.forEach(function (q) { byId[q.id] = q; });
        var ordered = [];
        state.shuffleOrder.forEach(function (id) {
          if (byId[id]) ordered.push(byId[id]);
        });
        list.forEach(function (q) {
          if (ordered.indexOf(q) < 0) ordered.push(q);
        });
        return ordered;
      }
      return list;
    }
    var base = QUESTIONS.slice();
    if (state.shuffled) {
      if (state.shuffleOrder && state.shuffleOrder.length) {
        var pmap = {};
        base.forEach(function (q) { pmap[q.id] = q; });
        var pordered = [];
        state.shuffleOrder.forEach(function (id) {
          if (pmap[id]) pordered.push(pmap[id]);
        });
        base.forEach(function (q) {
          if (pordered.indexOf(q) < 0) pordered.push(q);
        });
        return pordered;
      }
      return shuffleArray(base);
    }
    return sortByModule(base);
  }

  function clearAuto() {
    if (state.autoTimer) {
      clearTimeout(state.autoTimer);
      state.autoTimer = 0;
    }
  }

  function save() {
    if (state.scene === "home") return;
    localStorage.setItem(storageKey(), JSON.stringify({
      mode: state.mode,
      index: state.index,
      answers: state.answers,
      shuffled: state.shuffled,
      shuffleOrder: state.shuffleOrder,
    }));
  }

  function loadSession() {
    state.answers = {};
    state.pending = {};
    state.index = 0;
    state.shuffled = false;
    state.shuffleOrder = null;
    state.mode = "quiz";
    try {
      var raw = localStorage.getItem(storageKey());
      if (!raw) return;
      var d = JSON.parse(raw);
      state.mode = d.mode === "memo" ? "memo" : "quiz";
      state.answers = d.answers || {};
      state.index = d.index || 0;
      state.shuffled = !!d.shuffled;
      state.shuffleOrder = d.shuffleOrder || null;
    } catch (_) { /* ignore */ }
  }

  function load() {
    loadWrongIds();
    try {
      localStorage.removeItem("jiakao_v8_progress");
      localStorage.removeItem("jiakao_v7_progress");
      localStorage.removeItem("jiakao_v6_progress");
      localStorage.removeItem("jiakao_v5_progress");
    } catch (_) { /* ignore */ }
  }

  function recount() {
    var ok = 0, bad = 0;
    for (var i = 0; i < state.list.length; i++) {
      var q = state.list[i];
      if (!(q.id in state.answers)) continue;
      if (sameAns(state.answers[q.id], q.answer)) ok += 1;
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

  function getPending(qid) {
    if (!state.pending[qid]) state.pending[qid] = [];
    return state.pending[qid];
  }

  function moduleRangeLabel(mod) {
    var first = -1, last = -1, i;
    for (i = 0; i < state.list.length; i++) {
      if (moduleName(state.list[i]) === mod) {
        if (first < 0) first = i;
        last = i;
      }
    }
    if (first < 0) return "";
    return (first + 1) + "–" + (last + 1) + "题";
  }

  function toggleShuffle() {
    clearAuto();
    if (!state.shuffled) {
      state.shuffled = true;
      state.shuffleOrder = shuffleArray(buildList().map(function (q) { return q.id; }));
      state.index = 0;
    } else {
      state.shuffled = false;
      state.shuffleOrder = null;
      state.index = 0;
    }
    refreshList();
    save();
    render();
  }

  function showHome() {
    clearAuto();
    closeKoujue();
    closeClearSheet();
    state.scene = "home";
    if (els.gridSheet) els.gridSheet.hidden = true;
    if (els.homePage) els.homePage.hidden = false;
    updateHomeCounts();
  }

  function enterScene(scene) {
    clearAuto();
    closeKoujue();
    closeClearSheet();
    state.scene = scene;
    state.pending = {};
    if (els.homePage) els.homePage.hidden = true;
    loadSession();
    refreshList();
    if (state.index >= state.list.length) state.index = Math.max(0, state.list.length - 1);
    render();
  }

  function openKoujue() {
    clearAuto();
    if (els.koujuePage) els.koujuePage.hidden = false;
  }

  function closeKoujue() {
    if (els.koujuePage) els.koujuePage.hidden = true;
  }

  function render() {
    document.getElementById("modeQuiz").classList.toggle("active", state.mode === "quiz");
    document.getElementById("modeMemo").classList.toggle("active", state.mode === "memo");
    recount();
    els.statCorrect.textContent = state.correct;
    els.statWrong.textContent = state.wrong;
    if (els.pageTitle) els.pageTitle.textContent = isReview() ? "错题回顾" : "答题练习";

    if (!state.list.length) {
      els.quizPanel.hidden = false;
      els.resultPanel.hidden = true;
      els.questionText.textContent = isReview()
        ? "还没有错题。去答题练习做错的题会收进来。"
        : "没有题目。";
      els.optionsList.innerHTML = "";
      els.explainBox.hidden = true;
      els.multiBar.hidden = true;
      els.progressText.textContent = "0/0";
      if (els.moduleBar) {
        els.moduleBar.textContent = isReview() ? "错题回顾 · 0 题" : "模块：—";
      }
      return;
    }

    var q = currentQ();
    els.quizPanel.hidden = false;
    els.resultPanel.hidden = true;
    els.typeTag.textContent = typeLabel(q.type);
    els.questionText.textContent = q.text;
    renderImage(q);
    els.progressText.textContent = (state.index + 1) + "/" + state.list.length;
    if (els.moduleBar) {
      if (isReview()) {
        els.moduleBar.textContent = "错题回顾 · 共 " + state.list.length + " 题";
      } else {
        var mod = moduleName(q);
        var range = moduleRangeLabel(mod);
        els.moduleBar.textContent = state.shuffled
          ? ("乱序模式 · 当前：" + mod)
          : ("模块顺序 · " + mod + (range ? "（" + range + "）" : ""));
      }
    }
    if (els.btnShuffle) {
      els.btnShuffle.classList.toggle("active", state.shuffled);
      els.btnShuffle.textContent = state.shuffled ? "乱序·开" : "打乱";
    }

    var picked = state.answers[q.id];
    var answered = picked !== undefined;
    var isOk = answered && sameAns(picked, q.answer);
    var isWrong = answered && !isOk;
    var showMark = state.mode === "memo" || answered;
    var showExplain = state.mode === "memo" || isWrong;
    var pending = getPending(q.id);
    var multiMode = isMulti(q);
    var ansArr = Array.isArray(normAns(q.answer)) ? normAns(q.answer) : [q.answer];
    var pickedArr = answered ? (Array.isArray(picked) ? normAns(picked) : [picked]) : [];

    els.multiBar.hidden = !(multiMode && state.mode === "quiz" && !answered);
    if (!els.multiBar.hidden) {
      els.btnMultiSubmit.disabled = pending.length === 0;
      els.btnMultiSubmit.textContent = pending.length
        ? ("提交答案（已选 " + pending.length + " 项）")
        : "提交答案";
    }

    els.optionsList.innerHTML = "";
    els.optionsList.classList.toggle("is-multi", multiMode);

    q.options.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt" + (multiMode ? " opt-multi" : "");
      var mark = document.createElement("span");
      mark.className = multiMode ? "check" : "radio";
      var lab = document.createElement("span");
      lab.className = "opt-text";
      lab.textContent = letter(i) + "、" + opt;
      btn.appendChild(mark);
      btn.appendChild(lab);

      var inAns = ansArr.indexOf(i) >= 0;
      var inPick = pickedArr.indexOf(i) >= 0;

      // 答题中：只点亮你勾选的项
      if (!answered && multiMode && state.mode === "quiz" && pending.indexOf(i) >= 0) {
        btn.classList.add("picked");
      }

      if (showMark) {
        if (state.mode === "memo" && !answered) {
          if (inAns) btn.classList.add("right", "picked");
        } else if (answered) {
          if (multiMode && isWrong) {
            // 整题算错：你选的一律红；漏选的正确项标绿
            if (inPick) {
              btn.classList.add("wrong", "yours");
            } else if (inAns) {
              btn.classList.add("missed");
              var tag = document.createElement("span");
              tag.className = "miss-tag";
              tag.textContent = "漏选";
              btn.appendChild(tag);
            }
          } else if (inPick && inAns) {
            btn.classList.add("right", "yours");
          } else if (inPick && !inAns) {
            btn.classList.add("wrong", "yours");
          } else if (!inPick && inAns) {
            btn.classList.add("missed");
            var tag2 = document.createElement("span");
            tag2.className = "miss-tag";
            tag2.textContent = "漏选";
            btn.appendChild(tag2);
          }
        }
      }

      btn.addEventListener("click", function () { select(i); });
      els.optionsList.appendChild(btn);
    });

    if (showExplain) {
      var yours = answered ? ("你的答案：" + answerLettersFrom(picked) + "。") : "";
      var right = "正确答案：" + answerLetters(q) + "。";
      var tip = (multiMode && isWrong) ? "（多选必须全对，漏选/多选都不算对）" : "";
      els.explainText.textContent = (yours ? yours + " " : "") + right + " " + tip + " " + q.explain;
      els.explainBox.hidden = false;
    } else {
      els.explainBox.hidden = true;
    }
    setSlideX(els.quizPanel, 0, 0);
  }

  function commitAnswer(q, value) {
    state.answers[q.id] = value;
    delete state.pending[q.id];
    if (!isReview() && !sameAns(value, q.answer)) {
      rememberWrong(q.id);
    }
    save();
    render();
    if (sameAns(value, q.answer)) {
      clearAuto();
      state.autoTimer = setTimeout(function () {
        state.autoTimer = 0;
        flipTo(1);
      }, 1000);
    }
  }

  function select(i) {
    var q = currentQ();
    if (!q) return;
    if (state.mode === "memo") return;
    if (q.id in state.answers) return;

    if (isMulti(q)) {
      var pending = getPending(q.id).slice();
      var pos = pending.indexOf(i);
      if (pos >= 0) pending.splice(pos, 1);
      else pending.push(i);
      pending.sort(function (a, b) { return a - b; });
      state.pending[q.id] = pending;
      render();
      return;
    }

    commitAnswer(q, i);
  }

  function submitMulti() {
    var q = currentQ();
    if (!q || !isMulti(q)) return;
    if (state.mode === "memo") return;
    if (q.id in state.answers) return;
    var pending = getPending(q.id);
    if (!pending.length) return;
    commitAnswer(q, pending.slice());
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
    var next = state.index + delta;
    if (next < 0) return;
    if (next >= state.list.length) {
      showResult();
      return;
    }
    state.index = next;
    save();
    render();
  }

  var flipping = false;

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
    var el = activeSlide();
    var w = Math.max(document.getElementById("swipeStage").clientWidth, 280);
    flipping = true;
    clearAuto();
    setSlideX(el, delta > 0 ? -w : w, 220);
    setTimeout(function () {
      go(delta);
      var el2 = activeSlide();
      setSlideX(el2, delta > 0 ? w : -w, 0);
      el2.offsetHeight;
      setSlideX(el2, 0, 220);
      setTimeout(function () { flipping = false; }, 240);
    }, 220);
  }

  function showResult() {
    clearAuto();
    recount();
    var total = state.list.length;
    var score = total ? Math.round((state.correct / total) * 100) : 0;
    els.quizPanel.hidden = true;
    els.resultPanel.hidden = false;
    els.multiBar.hidden = true;
    els.resultScore.textContent = score + " 分";
    els.resultDetail.textContent =
      "共 " + total + " 题，答对 " + state.correct + "，答错 " + state.wrong +
      "。科目一合格线 90 分。";
    els.progressText.textContent = total + "/" + total;
  }

  function resetCurrentSession() {
    clearAuto();
    state.answers = {};
    state.pending = {};
    state.removed = new Set();
    state.correct = 0;
    state.wrong = 0;
    state.index = 0;
    state.shuffled = false;
    state.shuffleOrder = null;
    refreshList();
    els.gridSheet.hidden = true;
    var clearSheet = document.getElementById("clearSheet");
    if (clearSheet) clearSheet.hidden = true;
    save();
    render();
  }

  function restart() {
    resetCurrentSession();
  }

  function clearAll() {
    if (isReview()) {
      state.wrongIds = [];
      saveWrongIds();
      localStorage.removeItem(REVIEW_KEY);
    } else {
      localStorage.removeItem(PRACTICE_KEY);
    }
    resetCurrentSession();
    updateHomeCounts();
  }

  function openClearSheet() {
    clearAuto();
    if (els.clearTitle && els.clearDesc) {
      if (isReview()) {
        els.clearTitle.textContent = "清空错题回顾？";
        els.clearDesc.textContent = "只清错题本。答题练习的进度和题号都还在。";
      } else {
        els.clearTitle.textContent = "清空答题练习进度？";
        els.clearDesc.textContent = "只清练习里的对错和题号。错题回顾里的题不会被清掉。";
      }
    }
    document.getElementById("clearSheet").hidden = false;
  }

  function closeClearSheet() {
    var el = document.getElementById("clearSheet");
    if (el) el.hidden = true;
  }

  function removeCurrent() {
    // 已取消「移除」，保留空函数防旧缓存报错
  }

  function openGrid() {
    els.qGrid.innerHTML = "";
    state.list.forEach(function (q, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = i + 1;
      if (i === state.index) b.classList.add("cur");
      if (q.id in state.answers) {
        b.classList.add(sameAns(state.answers[q.id], q.answer) ? "ok" : "bad");
      }
      b.addEventListener("click", function () {
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

  document.getElementById("modeQuiz").addEventListener("click", function () {
    clearAuto();
    state.mode = "quiz";
    save();
    render();
  });
  document.getElementById("modeMemo").addEventListener("click", function () {
    clearAuto();
    state.mode = "memo";
    save();
    render();
  });
  document.getElementById("btnGrid").addEventListener("click", openGrid);
  document.getElementById("sheetMask").addEventListener("click", function () { els.gridSheet.hidden = true; });
  document.getElementById("btnCloseSheet").addEventListener("click", function () { els.gridSheet.hidden = true; });
  document.getElementById("btnRestartResult").addEventListener("click", restart);
  document.getElementById("btnClear").addEventListener("click", openClearSheet);
  document.getElementById("btnClearConfirm").addEventListener("click", clearAll);
  document.getElementById("clearMask").addEventListener("click", closeClearSheet);
  document.getElementById("btnClearCancel").addEventListener("click", closeClearSheet);
  document.getElementById("btnHome").addEventListener("click", showHome);
  document.getElementById("btnGoPractice").addEventListener("click", function () { enterScene("practice"); });
  document.getElementById("btnGoReview").addEventListener("click", function () { enterScene("review"); });
  els.btnMultiSubmit.addEventListener("click", submitMulti);
  document.getElementById("btnShuffle").addEventListener("click", toggleShuffle);
  document.getElementById("btnKoujue").addEventListener("click", openKoujue);
  document.getElementById("btnKoujueBack").addEventListener("click", closeKoujue);

  var stage = document.getElementById("swipeStage");
  var drag = { on: false, x: 0, y: 0, dx: 0, axis: "", skipClick: false, pid: 0 };

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
    var dx = x - drag.x;
    var dy = y - drag.y;
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
    var tx = dx;
    if (els.resultPanel.hidden && state.index <= 0 && dx > 0) tx = dx * 0.28;
    setSlideX(activeSlide(), tx, 0);
  }

  function onDragEnd() {
    if (!drag.on) return;
    drag.on = false;
    var dx = drag.dx;
    var axis = drag.axis;
    drag.axis = "";
    if (axis !== "x") return;
    if (Math.abs(dx) < 56) {
      setSlideX(activeSlide(), 0, 180);
      return;
    }
    flipTo(dx < 0 ? 1 : -1);
  }

  stage.addEventListener("pointerdown", function (e) {
    if (e.button != null && e.button !== 0) return;
    if (e.target.closest(".again-btn, .multi-submit")) return;
    onDragStart(e.clientX, e.clientY, e.pointerId);
  });
  stage.addEventListener("pointermove", function (e) { onDragMove(e.clientX, e.clientY, e); }, { passive: false });
  stage.addEventListener("pointerup", onDragEnd);
  stage.addEventListener("pointercancel", onDragEnd);

  els.optionsList.addEventListener("click", function (e) {
    if (drag.skipClick) {
      e.preventDefault();
      e.stopPropagation();
      drag.skipClick = false;
    }
  }, true);

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") flipTo(-1);
    if (e.key === "ArrowRight") flipTo(1);
  });

  load();
  closeKoujue();
  showHome();
})();
