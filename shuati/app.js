(function () {
  "use strict";

  var BANK = window.ZUOYE_BANK;
  if (!BANK || !BANK.mc) {
    document.body.innerHTML =
      '<p style="padding:24px;color:#f2e8d5;font-family:sans-serif">题库未加载：请确认 ../data.js 存在，并用 file:// 打开本页。</p>';
    return;
  }

  var LIVES_MAX = 3;
  var FEEDBACK_MS = 1100;

  var els = {
    pick: document.getElementById("screen-pick"),
    play: document.getElementById("screen-play"),
    list: document.getElementById("chapter-list"),
    tabH: document.getElementById("tab-history"),
    tabX: document.getElementById("tab-xi"),
    canvas: document.getElementById("stage"),
    lives: document.getElementById("lives"),
    toast: document.getElementById("toast"),
    qmeta: document.getElementById("qmeta"),
    qtext: document.getElementById("qtext"),
    opts: document.getElementById("opts"),
    feedback: document.getElementById("feedback"),
    hudTitle: document.getElementById("hud-title"),
    hudProgress: document.getElementById("hud-progress"),
    hudCombo: document.getElementById("hud-combo"),
    modal: document.getElementById("modal"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    btnRestart: document.getElementById("btn-restart"),
    btnChapters: document.getElementById("btn-to-chapters"),
    btnBack: document.getElementById("btn-back-chapters"),
  };

  var course = "history";
  var state = null;
  var anim = {
    bullets: [],
    particles: [],
    muzzle: 0,
    shake: 0,
    flash: 0,
  };
  var raf = 0;
  var audioCtx = null;

  /* ---------- utils ---------- */
  function stripTag(t) {
    return String(t || "").replace(/^\[自测单选\]\s*/, "").replace(/^\[.*?\]\s*/, "");
  }

  function chapterKeys(c) {
    return Object.keys(BANK.mc[c] || {}).sort(function (a, b) {
      return +a - +b;
    });
  }

  function fmtTime(ms) {
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    s = s % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function ensureAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep(kind) {
    if (!audioCtx) return;
    var t0 = audioCtx.currentTime;
    var o = audioCtx.createOscillator();
    var g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    if (kind === "shot") {
      o.type = "square";
      o.frequency.setValueAtTime(420, t0);
      o.frequency.exponentialRampToValueAtTime(140, t0 + 0.08);
      g.gain.setValueAtTime(0.12, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.1);
      o.start(t0);
      o.stop(t0 + 0.11);
    } else if (kind === "hit") {
      o.type = "sawtooth";
      o.frequency.setValueAtTime(180, t0);
      o.frequency.exponentialRampToValueAtTime(40, t0 + 0.18);
      g.gain.setValueAtTime(0.16, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
      o.start(t0);
      o.stop(t0 + 0.22);
    } else if (kind === "wrong") {
      o.type = "triangle";
      o.frequency.setValueAtTime(220, t0);
      o.frequency.linearRampToValueAtTime(90, t0 + 0.22);
      g.gain.setValueAtTime(0.1, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25);
      o.start(t0);
      o.stop(t0 + 0.26);
    } else if (kind === "win") {
      o.type = "square";
      o.frequency.setValueAtTime(523, t0);
      o.frequency.setValueAtTime(659, t0 + 0.12);
      o.frequency.setValueAtTime(784, t0 + 0.24);
      g.gain.setValueAtTime(0.1, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
      o.start(t0);
      o.stop(t0 + 0.42);
    }
  }

  /* ---------- chapter list ---------- */
  function renderChapters() {
    var keys = chapterKeys(course);
    var html = [];
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var qs = BANK.mc[course][k] || [];
      var name = (BANK.names[course] && BANK.names[course][k]) || "第" + k + "章";
      html.push(
        '<button type="button" class="chapter-btn" data-ch="' +
          k +
          '">' +
          '<span class="idx">' +
          k +
          "</span>" +
          '<span class="t">' +
          name +
          "</span>" +
          '<span class="n">' +
          qs.length +
          " 题</span>" +
          "</button>"
      );
    }
    els.list.innerHTML = html.join("");
  }

  els.tabH.addEventListener("click", function () {
    course = "history";
    els.tabH.classList.add("on");
    els.tabX.classList.remove("on");
    renderChapters();
  });
  els.tabX.addEventListener("click", function () {
    course = "xi";
    els.tabX.classList.add("on");
    els.tabH.classList.remove("on");
    renderChapters();
  });
  els.list.addEventListener("click", function (e) {
    var btn = e.target.closest(".chapter-btn");
    if (!btn) return;
    ensureAudio();
    startChapter(course, btn.getAttribute("data-ch"));
  });

  /* ---------- game state ---------- */
  function startChapter(c, ch) {
    var qs = (BANK.mc[c][ch] || []).slice();
    if (!qs.length) return;
    state = {
      course: c,
      ch: ch,
      name: (BANK.names[c] && BANK.names[c][ch]) || "第" + ch + "章",
      questions: qs,
      order: qs.map(function (_, i) {
        return i;
      }),
      retry: [],
      cursor: 0,
      phase: "main", // main | retry
      lives: LIVES_MAX,
      killed: 0,
      answered: 0,
      correct: 0,
      combo: 0,
      maxCombo: 0,
      startedAt: Date.now(),
      locked: false,
      ended: false,
      enemies: [],
    };
    layoutEnemies();
    anim.bullets = [];
    anim.particles = [];
    anim.muzzle = 0;
    anim.shake = 0;
    anim.flash = 0;
    els.modal.hidden = true;
    els.pick.hidden = true;
    els.play.hidden = false;
    els.hudTitle.textContent = "第" + ch + "章";
    updateHud();
    showQuestion();
    startLoop();
  }

  function layoutEnemies() {
    var n = state.questions.length;
    var cols = Math.ceil(Math.sqrt(n * 1.35));
    if (cols < 4) cols = 4;
    if (cols > 10) cols = 10;
    var rows = Math.ceil(n / cols);
    state.enemies = [];
    for (var i = 0; i < n; i++) {
      var r = Math.floor(i / cols);
      var c = i % cols;
      var inRow = Math.min(cols, n - r * cols);
      var rowOffset = (cols - inRow) / 2;
      state.enemies.push({
        alive: true,
        col: c + rowOffset,
        row: r,
        cols: cols,
        rows: rows,
        hitFlash: 0,
      });
    }
  }

  function currentQIndex() {
    if (!state) return -1;
    if (state.phase === "main") return state.order[state.cursor];
    return state.retry[state.cursor];
  }

  function remainingEnemies() {
    var n = 0;
    for (var i = 0; i < state.enemies.length; i++) if (state.enemies[i].alive) n++;
    return n;
  }

  function updateHud() {
    var left = remainingEnemies();
    var total = state.questions.length;
    els.hudProgress.textContent = total - left + "/" + total;
    var hearts = "";
    for (var i = 0; i < LIVES_MAX; i++) {
      hearts += i < state.lives ? "♥" : '<span class="off">♥</span>';
    }
    els.lives.innerHTML = hearts;
    if (state.combo >= 2) {
      els.hudCombo.textContent = "连击×" + state.combo;
    } else {
      els.hudCombo.textContent = "";
    }
  }

  function showToast(text) {
    els.toast.hidden = false;
    els.toast.textContent = text;
    els.toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      els.toast.classList.remove("show");
    }, 700);
  }

  function showQuestion() {
    var idx = currentQIndex();
    if (idx < 0 || idx >= state.questions.length) {
      finishWin();
      return;
    }
    var q = state.questions[idx];
    state.locked = false;
    els.feedback.hidden = true;
    els.feedback.textContent = "";
    els.feedback.className = "feedback";
    els.qmeta.textContent =
      (state.course === "history" ? "近代史" : "习思想") +
      " · 第" +
      state.ch +
      "章 · " +
      (state.phase === "retry" ? "补刀 " : "") +
      (state.killed + 1) +
      "/" +
      state.questions.length;
    els.qtext.textContent = stripTag(q.text);
    var html = [];
    for (var i = 0; i < q.options.length; i++) {
      var op = q.options[i];
      html.push(
        '<button type="button" class="opt" data-key="' +
          op.key +
          '"><span class="k">' +
          op.key +
          "</span><span>" +
          op.label +
          "</span></button>"
      );
    }
    els.opts.innerHTML = html.join("");
    resizeCanvas();
  }

  els.opts.addEventListener("click", function (e) {
    var btn = e.target.closest(".opt");
    if (!btn || !state || state.locked || state.ended) return;
    ensureAudio();
    answer(btn.getAttribute("data-key"), btn);
  });

  function answer(key, btn) {
    var idx = currentQIndex();
    var q = state.questions[idx];
    var ok = key === q.correct;
    state.locked = true;
    state.answered++;

    var buttons = els.opts.querySelectorAll(".opt");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (buttons[i].getAttribute("data-key") === q.correct) {
        buttons[i].classList.add("ok", "reveal");
      }
    }

    if (ok) {
      btn.classList.add("ok");
      state.correct++;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;
      fireAt(idx);
      beep("shot");
      if (state.combo >= 3) showToast("连击 ×" + state.combo);
      els.feedback.hidden = false;
      els.feedback.className = "feedback right";
      els.feedback.textContent = "命中！";
      updateHud();
      setTimeout(function () {
        if (!state || state.ended) return;
        advanceAfterAnswer(true, idx);
      }, FEEDBACK_MS);
    } else {
      btn.classList.add("bad");
      state.combo = 0;
      state.lives--;
      anim.shake = 10;
      beep("wrong");
      els.feedback.hidden = false;
      els.feedback.className = "feedback wrong";
      var label = "";
      for (var j = 0; j < q.options.length; j++) {
        if (q.options[j].key === q.correct) {
          label = q.options[j].label;
          break;
        }
      }
      els.feedback.textContent =
        "答错 −1♥  正确：" + q.correct + (label ? " · " + label : "");
      if (q.explain) {
        els.feedback.textContent += "\n" + q.explain;
      }
      updateHud();

      if (state.lives <= 0) {
        setTimeout(function () {
          finishFail();
        }, FEEDBACK_MS + 400);
        return;
      }

      setTimeout(function () {
        if (!state || state.ended) return;
        advanceAfterAnswer(false, idx);
      }, FEEDBACK_MS + 350);
    }
  }

  function fireAt(enemyIndex) {
    var e = state.enemies[enemyIndex];
    if (!e || !e.alive) return;
    var gun = gunPos();
    var tgt = enemyPos(e);
    anim.bullets.push({
      x: gun.x,
      y: gun.y - 8,
      tx: tgt.x,
      ty: tgt.y,
      t: 0,
      dur: 0.22,
      enemyIndex: enemyIndex,
    });
    anim.muzzle = 1;
  }

  function advanceAfterAnswer(wasCorrect, idx) {
    if (wasCorrect) {
      // 子弹命中时可能已消灭；兜底再消一次
      if (state.enemies[idx].alive) {
        state.enemies[idx].alive = false;
        state.killed++;
      }
      updateHud();
      if (remainingEnemies() <= 0) {
        finishWin();
        return;
      }
    }

    if (state.phase === "main") {
      if (!wasCorrect && state.retry.indexOf(idx) < 0) state.retry.push(idx);
      state.cursor++;
      if (state.cursor >= state.order.length) {
        state.retry = state.retry.filter(function (i) {
          return state.enemies[i].alive;
        });
        if (!state.retry.length) {
          finishWin();
          return;
        }
        state.phase = "retry";
        state.cursor = 0;
      }
    } else {
      state.retry = state.retry.filter(function (i) {
        return state.enemies[i].alive;
      });
      if (!wasCorrect) {
        state.retry = state.retry.filter(function (i) {
          return i !== idx;
        });
        state.retry.push(idx);
      }
      if (!state.retry.length) {
        finishWin();
        return;
      }
      if (state.cursor >= state.retry.length) state.cursor = 0;
    }
    showQuestion();
  }

  function finishWin() {
    if (!state || state.ended) return;
    state.ended = true;
    beep("win");
    var ms = Date.now() - state.startedAt;
    var acc = state.answered
      ? Math.round((state.correct / state.answered) * 100)
      : 100;
    var stars =
      state.lives === 3 ? "★★★" : state.lives === 2 ? "★★☆" : "★☆☆";
    els.modalTitle.textContent = "阵地肃清";
    els.modalBody.textContent =
      stars +
      "\n用时 " +
      fmtTime(ms) +
      "\n正确率 " +
      acc +
      "%（" +
      state.correct +
      "/" +
      state.answered +
      "）\n最高连击 ×" +
      state.maxCombo;
    els.modal.hidden = false;
  }

  function finishFail() {
    if (!state || state.ended) return;
    state.ended = true;
    els.modalTitle.textContent = "阵地失守";
    els.modalBody.textContent =
      "生命耗尽。\n已消灭 " +
      state.killed +
      "/" +
      state.questions.length +
      "\n用时 " +
      fmtTime(Date.now() - state.startedAt) +
      "\n看清刚才的正确答案后，可以重来。";
    els.modal.hidden = false;
  }

  els.btnRestart.addEventListener("click", function () {
    if (!state) return;
    startChapter(state.course, state.ch);
  });
  els.btnChapters.addEventListener("click", goChapters);
  els.btnBack.addEventListener("click", goChapters);

  function goChapters() {
    state = null;
    stopLoop();
    els.modal.hidden = true;
    els.play.hidden = true;
    els.pick.hidden = false;
  }

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    var wrap = els.canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = wrap.clientWidth;
    var h = wrap.clientHeight;
    if (w < 10 || h < 10) return;
    els.canvas.width = Math.floor(w * dpr);
    els.canvas.height = Math.floor(h * dpr);
    els.canvas.style.width = w + "px";
    els.canvas.style.height = h + "px";
    var ctx = els.canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function gunPos() {
    var w = els.canvas.clientWidth;
    var h = els.canvas.clientHeight;
    return { x: w * 0.5, y: h - 28 };
  }

  function enemyPos(e) {
    var w = els.canvas.clientWidth;
    var h = els.canvas.clientHeight;
    var padX = 18;
    var padTop = 18;
    var fieldH = h - 70;
    var cellW = (w - padX * 2) / e.cols;
    var cellH = Math.min(36, fieldH / Math.max(e.rows, 1));
    return {
      x: padX + (e.col + 0.5) * cellW,
      y: padTop + (e.row + 0.5) * cellH,
    };
  }

  function draw() {
    var ctx = els.canvas.getContext("2d");
    var w = els.canvas.clientWidth;
    var h = els.canvas.clientHeight;
    if (!w || !h) return;

    ctx.save();
    if (anim.shake > 0) {
      ctx.translate((Math.random() - 0.5) * anim.shake, (Math.random() - 0.5) * anim.shake);
      anim.shake *= 0.85;
      if (anim.shake < 0.4) anim.shake = 0;
    }

    // ground
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#1a2214");
    g.addColorStop(0.55, "#141a10");
    g.addColorStop(1, "#0c100a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = "rgba(180,150,80,0.08)";
    ctx.lineWidth = 1;
    for (var gy = 20; gy < h; gy += 22) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    // horizon glow
    var hg = ctx.createRadialGradient(w / 2, h * 0.2, 10, w / 2, h * 0.2, w * 0.55);
    hg.addColorStop(0, "rgba(200,160,60,0.12)");
    hg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = hg;
    ctx.fillRect(0, 0, w, h);

    if (state) {
      for (var i = 0; i < state.enemies.length; i++) {
        var e = state.enemies[i];
        if (!e.alive) continue;
        var p = enemyPos(e);
        drawEnemy(ctx, p.x, p.y, i === currentQIndex(), e.hitFlash);
        if (e.hitFlash > 0) e.hitFlash *= 0.8;
      }
    }

    // bullets
    for (var b = anim.bullets.length - 1; b >= 0; b--) {
      var bl = anim.bullets[b];
      bl.t += 1 / 60 / bl.dur;
      var u = Math.min(1, bl.t);
      // ease out
      var ee = 1 - Math.pow(1 - u, 2);
      var x = bl.x + (bl.tx - bl.x) * ee;
      var y = bl.y + (bl.ty - bl.y) * ee;
      ctx.strokeStyle = "#ffe28a";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - (bl.tx - bl.x) * 0.08, y - (bl.ty - bl.y) * 0.08);
      ctx.stroke();
      ctx.fillStyle = "#fff6c8";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      if (u >= 1) {
        impact(bl.enemyIndex, bl.tx, bl.ty);
        anim.bullets.splice(b, 1);
      }
    }

    // particles
    for (var p_i = anim.particles.length - 1; p_i >= 0; p_i--) {
      var pt = anim.particles[p_i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.12;
      pt.life -= 0.04;
      if (pt.life <= 0) {
        anim.particles.splice(p_i, 1);
        continue;
      }
      ctx.globalAlpha = Math.max(0, pt.life);
      ctx.fillStyle = pt.c;
      ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
      ctx.globalAlpha = 1;
    }

    drawGun(ctx, gunPos());

    if (anim.flash > 0) {
      ctx.fillStyle = "rgba(255,220,120," + anim.flash * 0.25 + ")";
      ctx.fillRect(0, 0, w, h);
      anim.flash *= 0.8;
      if (anim.flash < 0.05) anim.flash = 0;
    }

    // remaining count badge
    if (state) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(8, 8, 72, 20);
      ctx.fillStyle = "#d8c090";
      ctx.font = "11px sans-serif";
      ctx.fillText("敌 " + remainingEnemies(), 14, 22);
    }

    ctx.restore();
  }

  function impact(enemyIndex, x, y) {
    beep("hit");
    anim.flash = 1;
    if (state && state.enemies[enemyIndex] && state.enemies[enemyIndex].alive) {
      state.enemies[enemyIndex].alive = false;
      state.enemies[enemyIndex].hitFlash = 1;
      state.killed++;
      updateHud();
    }
    for (var i = 0; i < 14; i++) {
      var a = Math.random() * Math.PI * 2;
      var sp = 1.5 + Math.random() * 3.5;
      anim.particles.push({
        x: x,
        y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1,
        life: 0.7 + Math.random() * 0.4,
        s: 2 + Math.random() * 3,
        c: Math.random() > 0.4 ? "#ffc857" : "#e86a3a",
      });
    }
  }

  function drawEnemy(ctx, x, y, focus, flash) {
    ctx.save();
    ctx.translate(x, y);
    var s = focus ? 1.12 : 1;
    ctx.scale(s, s);
    // body
    ctx.fillStyle = flash > 0.2 ? "#ffe08a" : focus ? "#6a8a3a" : "#3a4a28";
    ctx.strokeStyle = focus ? "#c8e080" : "#2a3218";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-10, 6);
    ctx.lineTo(-10, -2);
    ctx.lineTo(-6, -8);
    ctx.lineTo(6, -8);
    ctx.lineTo(10, -2);
    ctx.lineTo(10, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // turret
    ctx.fillStyle = focus ? "#9aba50" : "#4a5a30";
    ctx.fillRect(-3, -14, 6, 8);
    ctx.fillRect(-1, -18, 2, 6);
    // legs
    ctx.strokeStyle = "#2a3218";
    ctx.beginPath();
    ctx.moveTo(-8, 6);
    ctx.lineTo(-12, 11);
    ctx.moveTo(8, 6);
    ctx.lineTo(12, 11);
    ctx.stroke();
    ctx.restore();
  }

  function drawGun(ctx, gpos) {
    ctx.save();
    ctx.translate(gpos.x, gpos.y);
    // base
    ctx.fillStyle = "#3a3220";
    ctx.beginPath();
    ctx.moveTo(-22, 16);
    ctx.lineTo(22, 16);
    ctx.lineTo(14, 4);
    ctx.lineTo(-14, 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#c8a24a";
    ctx.fillRect(-16, 2, 32, 3);
    // barrel
    var ang = -Math.PI / 2;
    if (state) {
      var idx = currentQIndex();
      if (idx >= 0 && state.enemies[idx] && state.enemies[idx].alive) {
        var tp = enemyPos(state.enemies[idx]);
        ang = Math.atan2(tp.y - gpos.y, tp.x - gpos.x);
      }
    }
    ctx.rotate(ang);
    ctx.fillStyle = "#5a4a28";
    ctx.fillRect(0, -4, 28, 8);
    ctx.fillStyle = "#2a2418";
    ctx.fillRect(22, -3, 10, 6);
    if (anim.muzzle > 0) {
      ctx.fillStyle = "rgba(255,220,120," + anim.muzzle + ")";
      ctx.beginPath();
      ctx.moveTo(32, 0);
      ctx.lineTo(44, -6);
      ctx.lineTo(44, 6);
      ctx.closePath();
      ctx.fill();
      anim.muzzle *= 0.75;
      if (anim.muzzle < 0.05) anim.muzzle = 0;
    }
    ctx.restore();
    // cabin
    ctx.fillStyle = "#8b5a1a";
    ctx.beginPath();
    ctx.arc(gpos.x, gpos.y + 2, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e0c06a";
    ctx.beginPath();
    ctx.arc(gpos.x, gpos.y + 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function startLoop() {
    stopLoop();
    resizeCanvas();
    var last = performance.now();
    function frame(now) {
      raf = requestAnimationFrame(frame);
      // keep ~60 logic for bullets even if tab slows
      if (now - last > 50) last = now - 16;
      last = now;
      draw();
    }
    raf = requestAnimationFrame(frame);
  }

  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  window.addEventListener("resize", function () {
    if (state) resizeCanvas();
  });

  renderChapters();
})();
