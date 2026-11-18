/* GRABAR video InglésGamer (18 nov)
   node videos/grabar.js videos/colores.html [v|h|ambos] [tema]  ->  videos/salida/colores-v.mp4
   Va cuadro por cuadro (30 fps) con __seek(t) y mezcla los mp3 en sus tiempos. */
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path"), fs = require("fs");

async function grabar(archivo, f, tema) {
  const nombre = path.basename(archivo, ".html") + "-" + f + (tema ? "-" + tema : "");
  const salida = path.join(__dirname, "salida"); fs.mkdirSync(salida, { recursive: true });
  const w = f === "v" ? 1080 : 1920, hh = f === "v" ? 1920 : 1080, FPS = 30;
  const nav = await chromium.launch();
  const pg = await nav.newPage({ viewport: { width: w, height: hh } });
  const errores = []; pg.on("pageerror", e => errores.push(e.message));
  const url = "file://" + path.resolve(archivo) + "?grabar=1&f=" + f + (tema ? "&tema=" + tema : "");
  await pg.goto(url); await pg.waitForFunction(() => window.ESCENA && document.fonts.ready);
  await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
  if (errores.length) throw new Error(errores.join("\n"));
  const E = await pg.evaluate(() => window.ESCENA);
  const n = Math.ceil(E.dur * FPS);
  const dir = path.dirname(path.resolve(archivo));
  const audios = E.audios.map(a => ({ t: a.t, src: path.resolve(dir, a.src) })).filter(a => fs.existsSync(a.src) || (console.warn("Falta audio:", a.src), 0));
  const args = ["-y", "-f", "image2pipe", "-framerate", "" + FPS, "-i", "-"];
  audios.forEach(a => args.push("-i", a.src));
  if (audios.length) {
    const f2 = audios.map((a, i) => "[" + (i + 1) + ":a]adelay=" + Math.round(a.t * 1000) + "|" + Math.round(a.t * 1000) + "[a" + i + "]").join(";");
    args.push("-filter_complex", f2 + ";" + audios.map((_, i) => "[a" + i + "]").join("") + "amix=inputs=" + audios.length + ":normalize=0,apad[au]", "-map", "0:v", "-map", "[au]", "-c:a", "aac", "-b:a", "160k");
  }
  const mp4 = path.join(salida, nombre + ".mp4");
  args.push("-t", "" + E.dur, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4);
  const ff = spawn("ffmpeg", args, { stdio: ["pipe", "ignore", "pipe"] });
  let log = ""; ff.stderr.on("data", d => log = (log + d).slice(-3000));
  const fin = new Promise((ok, mal) => ff.on("close", c => c ? mal(new Error(log)) : ok()));
  const el = await pg.$("#lienzo");
  for (let i = 0; i < n; i++) {
    await pg.evaluate(t => window.__seek(t), i / FPS);
    const buf = await el.screenshot({ type: "jpeg", quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
    if (i % 60 === 0) process.stdout.write("\r" + nombre + " " + Math.round(i / n * 100) + "%");
  }
  ff.stdin.end(); await fin; await nav.close();
  console.log("\r" + mp4 + "  (" + E.dur + " s, " + audios.length + " audios)");
  // portada
  return mp4;
}

(async () => {
  const [archivo, fmt = "v", tema] = process.argv.slice(2);
  for (const f of fmt === "ambos" ? ["v", "h"] : [fmt]) await grabar(archivo, f, tema);
})().catch(e => { console.error(e); process.exit(1); });
