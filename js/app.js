(function () {
  "use strict";

  var PRODUCTS = window.PRODUCTS, GROUPS = window.GROUPS, CFG = window.CONFIG || {};
  var $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stage = $("#stage"), ring = $("#ring"), ghost = $("#ghost"), card = $("#card"),
      thumbsEl = $("#thumbs"), chipsEl = $("#chips"), hint = $("#hint"), toastEl = $("#toast");

  var group = "all", list = [], slides = [], thumbBtns = [];
  var pos = 0, target = 0, raf = 0, active = -1;
  var W = 0, S = 240;

  var mod = function (a, n) { return ((a % n) + n) % n; };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  /* offset circular de la posición i respecto al centro p, en [-n/2, n/2) */
  var wrapOff = function (i, p, n) { return mod(i - p + n / 2, n) - n / 2; };

  /* ---------- Construcción ---------- */
  function buildChips() {
    chipsEl.innerHTML = "";
    GROUPS.forEach(function (g) {
      var n = g.id === "all" ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.group === g.id; }).length;
      var b = document.createElement("button");
      b.className = "chip" + (g.id === group ? " is-on" : "");
      b.type = "button";
      b.innerHTML = g.label + "<small>" + n + "</small>";
      b.addEventListener("click", function () { setGroup(g.id); });
      chipsEl.appendChild(b);
    });
  }

  function buildList(keepCode) {
    list = PRODUCTS.filter(function (p) { return group === "all" || p.group === group; });
    ring.innerHTML = ""; thumbsEl.innerHTML = "";
    slides = []; thumbBtns = [];

    list.forEach(function (p, i) {
      var s = document.createElement("button");
      s.type = "button"; s.className = "slide";
      s.setAttribute("aria-label", p.kind + " " + p.name + " " + (p.mpLabel || (p.mp ? p.mp + "MP" : "")));
      s.innerHTML = '<img src="' + p.img + '" alt="" draggable="false" decoding="async">';
      s.dataset.i = i;
      ring.appendChild(s); slides.push(s);

      var t = document.createElement("button");
      t.type = "button"; t.className = "thumb"; t.setAttribute("role", "option");
      t.setAttribute("aria-label", p.name + " " + p.code);
      t.innerHTML = '<img src="' + p.img + '" alt="" loading="lazy" draggable="false">';
      t.addEventListener("click", function () { goTo(i); });
      thumbsEl.appendChild(t); thumbBtns.push(t);
    });
    $("#tot").textContent = pad(list.length);

    var start = 0;
    if (keepCode) { var k = list.findIndex(function (p) { return p.code === keepCode; }); if (k >= 0) start = k; }
    return start;
  }

  /* ---------- Layout / render 3D ---------- */
  function layout() {
    var r = stage.getBoundingClientRect();
    W = r.width;
    S = Math.max(150, Math.min(r.height * 0.78, W * 0.62, 460));
    stage.style.setProperty("--s", S + "px");
    render(pos);
  }

  function render(p) {
    var n = list.length;
    for (var i = 0; i < n; i++) {
      var el = slides[i], o = wrapOff(i, p, n), a = Math.abs(o);
      if (a > 2.7) { el.style.visibility = "hidden"; continue; }
      el.style.visibility = "";
      var th = Math.max(-1.3, Math.min(1.3, o * 0.5));
      var x = Math.sin(th) * S * 1.9;
      var z = -Math.pow(a, 0.85) * S * 0.95;
      var ry = Math.max(-58, Math.min(58, -o * 36));
      el.style.transform = "perspective(900px) translate3d(" + x.toFixed(1) + "px,0," + z.toFixed(1) + "px) rotateY(" + ry.toFixed(1) + "deg)";
      el.style.opacity = Math.max(0, 1 - a * 0.42).toFixed(3);
      el.style.zIndex = 100 - Math.round(a * 10);
      el.tabIndex = a < 0.5 ? 0 : -1;
    }
    var idx = n ? mod(Math.round(p), n) : 0;
    if (idx !== active) { active = idx; showCard(list[idx], idx); }
  }

  /* ---------- Animación de posición ---------- */
  function animate() {
    cancelAnimationFrame(raf);
    if (reduce) { pos = target; render(pos); return; }
    (function step() {
      var d = target - pos;
      if (Math.abs(d) < 0.0008) { pos = target; render(pos); return; }
      pos += d * 0.14;
      render(pos);
      raf = requestAnimationFrame(step);
    })();
  }
  function go(d) { stopHint(); target = Math.round(target) + d; animate(); }
  function goTo(i) {
    stopHint();
    var o = Math.round(wrapOff(i, Math.round(pos), list.length));
    target = Math.round(pos) + o; animate();
  }

  /* ---------- Tarjeta de información ---------- */
  function showCard(p, idx) {
    $("#cur").textContent = pad(idx + 1);
    $("#kind").textContent = p.kind;
    $("#conn").textContent = p.conn || "";
    $("#name").textContent = p.name;
    $("#code").textContent = "Modelo " + p.code;

    var stat = $("#stat");
    if (p.mp) {
      stat.hidden = false;
      $("#statVal").textContent = p.mpLabel || (p.mp + " MP");
      $("#statBar").style.width = "0";
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        $("#statBar").style.width = Math.min(100, p.mp * 10) + "%";
      }); });
    } else { stat.hidden = true; }

    $("#tags").innerHTML = (p.tags || []).map(function (t) { return "<li>" + t + "</li>"; }).join("");

    var acts = "";
    if (CFG.whatsapp) {
      var msg = (CFG.mensaje || "Hola, me interesa:") + " " + p.name + " (" + p.code + ")";
      acts += '<a class="btn" target="_blank" rel="noopener" href="https://wa.me/' + CFG.whatsapp + "?text=" + encodeURIComponent(msg) + '">' +
              '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z"/></svg>Consultar este modelo</a>';
    }
    if (CFG.instagram) {
      acts += '<a class="btn' + (CFG.whatsapp ? " btn--ghost" : "") + '" target="_blank" rel="noopener" href="https://instagram.com/' + CFG.instagram + '">' +
              '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>' + (CFG.whatsapp ? "" : "Ver en Instagram") + "</a>";
    }
    acts += '<button type="button" class="btn' + (CFG.whatsapp || CFG.instagram ? " btn--ghost" : "") + '" id="share" aria-label="Compartir este modelo">' +
            '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/></svg>Compartir</button>';
    $("#actions").innerHTML = acts;
    $("#share").addEventListener("click", function () { share(p); });

    ghost.innerHTML = "<span>" + p.ghost + "</span>";
    [card, ghost].forEach(function (el) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); });

    thumbBtns.forEach(function (b, i) { b.classList.toggle("is-on", i === idx); b.setAttribute("aria-selected", i === idx); });
    var b = thumbBtns[idx];
    if (b && thumbsEl.scrollWidth > thumbsEl.clientWidth + 2) {
      thumbsEl.scrollTo({ left: b.offsetLeft - (thumbsEl.clientWidth - b.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    }
    if (history.replaceState) history.replaceState(null, "", "#" + p.code);
  }

  function share(p) {
    var url = location.href.split("#")[0] + "#" + p.code;
    var data = { title: "IMOU " + p.name, text: p.kind + " · " + p.name, url: url };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast("Enlace copiado"); }, function () { toast(url); });
    else toast(url);
  }
  var toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1800); }

  /* ---------- Filtros ---------- */
  function setGroup(g) {
    if (g === group) return;
    group = g; buildChips();
    var cur = list[mod(Math.round(pos), list.length)];
    var start = buildList(cur && (g === "all" || cur.group === g) ? cur.code : null);
    active = -1; target = start; pos = start - 3; layout(); animate();
  }

  /* ---------- Interacción: arrastre / teclado / rueda ---------- */
  var drag = null;
  stage.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".arrow")) return;
    cancelAnimationFrame(raf);
    drag = { x: e.clientX, y: e.clientY, p: pos, t: performance.now(), lx: e.clientX, lt: performance.now(), v: 0, moved: false, el: e.target.closest(".slide") };
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; stage.classList.add("is-drag"); stopHint(); try { stage.setPointerCapture(e.pointerId); } catch (_) {} }
    if (!drag.moved) return;
    var now = performance.now();
    drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.lt);
    drag.lx = e.clientX; drag.lt = now;
    pos = drag.p - dx / (S * 0.62);
    render(pos);
  });
  function endDrag() {
    if (!drag) return;
    var d = drag; drag = null; stage.classList.remove("is-drag");
    if (d.moved) {
      target = Math.round(pos - d.v * 220 / (S * 0.62) * 1.0);
      animate();
    } else if (d.el) {
      var i = +d.el.dataset.i;
      if (mod(Math.round(pos), list.length) !== i) goTo(i);
    } else { target = Math.round(pos); animate(); }
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  var lastWheel = 0;
  stage.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && !e.shiftKey) return;   // deja pasar el scroll vertical
    e.preventDefault();
    var now = Date.now(); if (now - lastWheel < 220) return;
    var d = e.deltaX || e.deltaY; if (Math.abs(d) < 8) return;
    lastWheel = now; go(d > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); }
  });
  $("#prev").addEventListener("click", function () { go(-1); });
  $("#next").addEventListener("click", function () { go(1); });
  stage.addEventListener("dragstart", function (e) { e.preventDefault(); });

  var hintOn = true;
  function stopHint() { if (hintOn) { hintOn = false; hint.classList.add("is-gone"); } }

  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(layout, 60); });

  function setupContact() {
    var digits = (CFG.whatsapp || "").replace(/\D/g, "");
    var notice = $("#notice"), tel = $("#footTel");
    if (CFG.empresa) $("#footBrand").textContent = CFG.empresa;
    if (CFG.telefono) {
      tel.textContent = CFG.telefono;
      tel.href = "tel:+" + (digits || CFG.telefono.replace(/\D/g, ""));
    } else tel.hidden = true;
    if (digits) {
      var msg = "Hola" + (CFG.empresa ? " " + CFG.empresa : "") + ", quisiera consultar la disponibilidad de nuevos modelos IMOU.";
      notice.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(msg);
    } else if (CFG.telefono) {
      notice.href = tel.href; notice.removeAttribute("target");
    } else notice.hidden = true;
  }

  /* ---------- Inicio ---------- */
  function init() {
    setupContact();
    var code = decodeURIComponent((location.hash || "").slice(1));
    var found = PRODUCTS.find(function (p) { return p.code === code; });
    buildChips();
    var start = buildList(found ? found.code : null);
    active = -1; target = start; pos = start - 3.2;   // giro de entrada
    layout(); animate();
  }
  init();
})();
