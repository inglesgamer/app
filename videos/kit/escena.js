/* ESCENA InglésGamer (18 nov)
   Motor de videos: todo se anima con CSS + animation-delay, así el grabador
   (videos/grabar.js) puede ir cuadro por cuadro con __seek(t) y queda idéntico.
   Uso en una página de video:
     IG.video({ plantilla:"vocab", tema:"noche", titulo:[..], items:[..] })
   URL: ?f=h  -> 16:9 YouTube (por defecto 9:16) · ?tema=dia|rosa|azul|noche · ?grabar=1
*/
(function () {
  const Q = new URLSearchParams(location.search);
  const FORMATO = Q.get("f") === "h" ? "h" : "v";
  const GRABAR = Q.get("grabar") === "1";
  const AUDIOS = [];
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // anima(el, "pop", inicio, duración, curva) — se pueden encadenar varias en el mismo elemento
  function anima(el, nombre, t, d, curva, extra) {
    // la 1.ª animación del elemento rellena hacia atrás (both); las siguientes solo hacia adelante,
    // si no, su relleno de antes taparía a la primera
    const primera = !el.style.animation;
    const modo = (extra || "").replace(/\b(both|forwards)\b/, "").trim();
    const a = nombre + " " + d + "s " + (curva || "cubic-bezier(.3,1.4,.5,1)") + " " + t + "s " + (modo ? modo + " " : "") + (primera ? "both" : "forwards");
    el.style.animation = el.style.animation ? el.style.animation + "," + a : a;
    return el;
  }
  function h(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function capa(lienzo, t0, t1, clase) {
    const c = h('<div class="capa ' + (clase || "") + '"></div>');
    anima(c, "entra", t0, .25, "linear"); anima(c, "sale", t1 - .25, .25, "linear");
    lienzo.appendChild(c); return c;
  }
  function sonido(t, src) { AUDIOS.push({ t: +t.toFixed(3), src }); }

  const ICONO_VOZ = '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  const ICONO_OK = '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // visual de cada palabra: {color:"#hex"} · {pj:"alegre"} · {svg:"<svg…>"}
  function visual(v, w) {
    if (!v) return "";
    if (v.color) return '<div class="muestra" style="width:' + w + 'px;height:' + w + 'px;background:' + v.color + '"></div>';
    if (v.pj) return '<div style="width:' + w + 'px">' + GAL(v.pj, w) + '</div>';
    if (v.svg) return '<div style="width:' + w + 'px;height:' + w + 'px">' + v.svg + '</div>';
    return "";
  }

  function fondo(lienzo, dur) {
    lienzo.appendChild(h('<div class="fondo"></div>'));
    for (let i = 0; i < 14; i++) {
      const p = h('<i class="pixel"></i>');
      p.style.left = ((i * 137) % 100) + "%"; p.style.top = (20 + (i * 53) % 75) + "%";
      p.style.animationDelay = (-(i * 0.9)) + "s"; p.style.background = i % 3 ? "var(--gold)" : "var(--mu)";
      lienzo.appendChild(p);
    }
  }

  /* ---------- PLANTILLA «vocab»: intro · N palabras · mini quiz · cierre ---------- */
  const CSS_VOCAB = `
  .muestra{border-radius:48px;border:10px solid rgba(255,255,255,.18);box-shadow:inset 0 -24px 0 rgba(0,0,0,.18),0 18px 0 rgba(0,0,0,.35)}
  .pal{display:flex;flex-direction:column;align-items:center;gap:48px}
  .h .pal{flex-direction:row;gap:110px}
  .pal .txt{display:flex;flex-direction:column;align-items:center;gap:24px}
  .h .pal .txt{align-items:flex-start}
  .en{font-size:190px;font-weight:900;line-height:1;letter-spacing:-.03em}
  .es{font-size:72px;color:var(--mu);font-weight:800}
  .es b{color:var(--ink);font-weight:900}
  .voz{position:relative;width:120px;height:120px;border-radius:50%;background:var(--hi);color:var(--on-hi);padding:26px}
  .voz .o{position:absolute;inset:0;border-radius:50%;border:6px solid var(--hi);opacity:0}
  .fila{display:flex;align-items:center;gap:30px}
  .arriba{position:absolute;top:150px;left:90px;right:90px;display:flex;flex-direction:column;gap:22px}
  .h .arriba{top:70px;left:160px;right:160px}
  .arriba .n{display:flex;justify-content:space-between;font-size:42px;color:var(--mu);font-weight:900}
  .pjAbajo{position:absolute;bottom:120px;right:90px}
  .h .pjAbajo{bottom:60px;right:120px}
  .globo{position:absolute;bottom:430px;right:120px;background:var(--card);border:4px solid var(--bd);padding:18px 30px;border-radius:30px;font-size:40px;font-weight:900}
  .h .globo{bottom:330px;right:160px}
  .ops{display:flex;gap:40px}
  .op{display:flex;flex-direction:column;align-items:center;gap:22px;padding:30px;border-radius:44px;background:var(--card);border:5px solid var(--bd);font-size:58px;font-weight:900}
  .op.bien{border-color:var(--ok)}
  .marca{position:absolute;bottom:70px;left:0;right:0;display:flex;justify-content:center}
  .h .marca{bottom:40px}
  .ok{width:110px;height:110px;border-radius:50%;background:var(--ok);color:#06210F;padding:18px;position:absolute;top:-40px;right:-40px}
  `;

  function vocab(o, lienzo) {
    const V = FORMATO === "v";
    const voz = o.voz || "../audios/";
    const N = o.items.length, D = o.porPalabra || 3.2;
    let t = 0;
    document.head.appendChild(h("<style>" + CSS_VOCAB + "@keyframes llenaV{from{transform:scaleX(var(--a))}to{transform:scaleX(var(--b))}}</style>"));
    fondo(lienzo);

    // INTRO
    const tI = o.intro || 2.8;
    let c = capa(lienzo, 0, tI);
    const caja = h('<div style="display:flex;flex-direction:column;align-items:center;gap:' + (V ? 50 : 30) + 'px"></div>');
    const chip = h('<div class="chip"><img src="../icono-180.png" alt="">InglésGamer</div>');
    const tit = h('<div class="titulo">' + o.titulo + '</div>');
    const sub = h('<div class="sub">' + (o.sub || "") + '</div>');
    const pj = h('<div>' + GAL(o.pjIntro || "saludo", V ? 460 : 320) + '</div>');
    caja.append(chip, tit, sub, pj); c.appendChild(caja);
    anima(chip, "bajaIn", .15, .5); anima(tit, "pop", .35, .6); anima(sub, "entra", .8, .4, "ease"); anima(pj, "subeIn", .6, .6);
    t = tI;

    // PALABRAS
    const poses = o.poses || ["alegre", "pulgar", "idea", "cool", "baile", "animo", "super", "nerd"];
    o.items.forEach((it, i) => {
      const s = t, e = t + D;
      c = capa(lienzo, s, e);
      const top = h('<div class="arriba"><div class="n"><span>' + (o.etiqueta || "Palabra") + '</span><span>' + (i + 1) + ' / ' + N + '</span></div><div class="barra"><i></i></div></div>');
      const bi = top.querySelector("i");
      bi.style.setProperty("--a", i / N); bi.style.setProperty("--b", (i + 1) / N);
      anima(bi, "llenaV", s + .1, .6, "ease-out");
      const pal = h('<div class="pal"></div>');
      const vis = h('<div>' + visual(it.vis, V ? 520 : 440) + '</div>');
      const txt = h('<div class="txt"></div>');
      const en = h('<div class="en">' + it.en + '</div>');
      const fila = h('<div class="fila"><div class="voz">' + ICONO_VOZ + '<i class="o"></i></div><div class="es">= <b>' + it.es + '</b></div></div>');
      txt.append(en, fila); pal.append(vis, txt); c.append(top, pal);
      anima(vis, "pop", s + .1, .55); anima(en, "subeIn", s + .35, .45);
      const vz = fila.querySelector(".voz"), es = fila.querySelector(".es");
      anima(vz, "pop", s + .55, .4); anima(vz.querySelector(".o"), "onda", s + .6, .9, "ease-out", "both 2");
      anima(es, "izqIn", s + 1.3, .45);
      sonido(s + .6, voz + (it.audio || slug(it.en)) + ".mp3");
      if (o.repetir !== false) sonido(s + 1.9, voz + (it.audio || slug(it.en)) + ".mp3");
      const p2 = h('<div class="pjAbajo">' + GAL(it.pj || poses[i % poses.length], V ? 230 : 180) + '</div>');
      c.appendChild(p2); anima(p2, "subeIn", s + .9, .5);
      t = e;
    });

    // MINI QUIZ: «¿Cuál es …?» con 3 opciones
    if (o.quiz) {
      const q = o.quiz, s = t, e = t + (q.dur || 4.2);
      c = capa(lienzo, s, e);
      const caja = h('<div style="display:flex;flex-direction:column;align-items:center;gap:70px"></div>');
      const pr = h('<div class="titulo" style="font-size:' + (V ? 96 : 90) + 'px">' + q.pregunta + '</div>');
      const ops = h('<div class="ops"' + (V ? ' style="flex-wrap:wrap;justify-content:center;max-width:960px"' : "") + '></div>');
      q.opciones.forEach((op, k) => {
        const it = o.items[op];
        const b = h('<div class="op" style="position:relative">' + visual(it.vis, V ? 240 : 230) + '<span>' + it.en + '</span></div>');
        ops.appendChild(b); anima(b, "pop", s + .5 + k * .15, .45);
        if (op === q.bien) {
          const ok = h('<div class="ok">' + ICONO_OK + '</div>'); b.appendChild(ok);
          anima(ok, "pop", s + 2.6, .4); anima(b, "latido", s + 2.6, .5, "ease");
          b.style.setProperty("border-color", "var(--bd)");
          anima(b, "marcaBien", s + 2.6, .2, "linear");
          sonido(s + 2.7, voz + (it.audio || slug(it.en)) + ".mp3");
        } else anima(b, "apaga", s + 2.6, .3, "linear");
      });
      const cuenta = h('<div class="barra" style="width:' + (V ? 700 : 900) + 'px"><i></i></div>');
      anima(cuenta.querySelector("i"), "vacia", s + .6, 2, "linear");
      caja.append(pr, ops, cuenta); c.appendChild(caja);
      anima(pr, "pop", s + .1, .5);
      document.head.appendChild(h("<style>@keyframes marcaBien{to{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 16%,var(--card))}}@keyframes llenaV{from{transform:scaleX(var(--a))}to{transform:scaleX(var(--b))}}@keyframes apaga{to{opacity:.35}}@keyframes vacia{from{transform:scaleX(1)}to{transform:scaleX(0)}}</style>"));
      t = e;
    }

    // CIERRE
    const s = t, e = t + (o.cierreDur || 3.6);
    c = capa(lienzo, s, e + .3);
    const cj = h('<div style="display:flex;flex-direction:column;align-items:center;gap:' + (V ? 56 : 34) + 'px"></div>');
    const pj3 = h('<div>' + GAL(o.pjCierre || "baile", V ? 460 : 300) + '</div>');
    const t1 = h('<div class="titulo" style="font-size:' + (V ? 104 : 96) + 'px">' + (o.cierre || 'Aprende inglés <em>jugando</em>') + '</div>');
    const t2 = h('<div class="sub">' + (o.cierreSub || "Islas, duelos y liga semanal") + '</div>');
    const bt = h('<div class="boton">InglésGamer</div>');
    cj.append(pj3, t1, t2, bt); c.appendChild(cj);
    anima(pj3, "pop", s + .1, .6); anima(t1, "subeIn", s + .4, .5); anima(t2, "entra", s + .8, .4, "ease"); anima(bt, "pop", s + 1.1, .5);
    anima(bt, "latido", s + 1.8, .8, "ease-in-out", "both 2");
    return e;
  }

  const PLANTILLAS = { vocab };

  /* ---------- arranque, escala de vista previa y control de tiempo ---------- */
  window.IG = {
    video(o) {
      document.documentElement.setAttribute("data-tema", Q.get("tema") || o.tema || "noche");
      const lienzo = document.getElementById("lienzo"); lienzo.className = FORMATO;
      const dur = PLANTILLAS[o.plantilla || "vocab"](o, lienzo);
      window.ESCENA = { dur: +dur.toFixed(2), audios: AUDIOS, formato: FORMATO, w: FORMATO === "v" ? 1080 : 1920, h: FORMATO === "v" ? 1920 : 1080 };
      window.__seek = s => document.getAnimations().forEach(a => { a.pause(); a.currentTime = s * 1000; });
      if (GRABAR) { document.body.style.background = "transparent"; window.__seek(0); return; }
      const ajusta = () => { const k = Math.min(innerWidth / ESCENA.w, innerHeight / ESCENA.h); lienzo.style.transform = "scale(" + k + ")"; };
      ajusta(); addEventListener("resize", ajusta);
      vistaPrevia();
    }
  };

  // vista previa en el navegador: toca para reproducir con sonido
  function vistaPrevia() {
    window.__seek(0);
    const b = h('<button style="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9;font:900 18px Nunito,sans-serif;padding:14px 26px;border-radius:16px;border:0;background:#fff;color:#000;cursor:pointer">Reproducir</button>');
    document.body.appendChild(b);
    let inicio = 0, timers = [], raf;
    b.onclick = () => {
      timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf);
      ESCENA.audios.forEach(a => timers.push(setTimeout(() => new Audio(a.src).play().catch(() => {}), a.t * 1000)));
      inicio = performance.now(); b.textContent = "Repetir";
      const paso = () => { const s = (performance.now() - inicio) / 1000; window.__seek(Math.min(s, ESCENA.dur)); if (s < ESCENA.dur) raf = requestAnimationFrame(paso); };
      paso();
    };
  }
})();
