# CLAUDE.md · InglésGamer

Memoria permanente del proyecto **InglésGamer**. Léelo antes de tocar nada.
El estado del día a día está en **`PROJECT_STATUS.md`** (mismo directorio).
Más detalle por pantalla en los docs del Project de claude.ai «INGLESGAMER APP» (`claude/app-*.md`).

---

## 1. Qué es la app

App para **aprender inglés jugando** (nivel A1 por ahora), estilo Duolingo pero con identidad propia:
personajes pixel de InglésGamer, islas temáticas, Aura como moneda, rangos, liga semanal y duelos con amigos.

- Público: **mayores de 16 años** (no es app para niños).
- Idioma de la interfaz: español (Colombia). Se aprende inglés.
- El dueño (usuario) arma la app en **App Creator 24 (AC24)** pegando cada pantalla como una sección HTML.
  En paralelo existe una **versión web de prueba en GitHub Pages** para verla en iPhone.

## 2. Cómo funciona (flujo del jugador)

1. **Acceso** (Firebase Auth) → **Inicio**.
2. **Inicio:** racha, Aura, Vocabulario del día, Retos de la semana, Refuerza tu inglés (Continuar / Ver todos los temas), duelos pendientes, sopa de letras.
3. **Mapas / Islas** del A1, en este orden: **Verano → Nieve → Fuego**.
   - Nieve se abre con 40 ★ de Verano, Fuego con 51.
   - Cada nivel da hasta 3 ★ y Aura según estrellas (35 / 25 / 15; jefe de Verano 100 / 70 / 40).
   - 3 corazones; «Sin corazones» → ver anuncio para revivir.
4. **Refuerza tu inglés:** 44 lecciones cortas (teoría + tarjetas + minijuego), que se abren al LLEGAR al nivel del mapa.
5. **Duelos** asincrónicos con amigos, **Ranking / liga semanal**, **Tienda** (personajes, skins, marcos, paletas), **Perfil** (rango, colección, logros).

## 3. Tecnologías y herramientas

| Cosa | Qué se usa |
|---|---|
| Pantallas | HTML de un solo archivo (CSS + JS dentro), sin framework |
| Contenedor | App Creator 24 (WebView Android). Navegación con enlaces `go:<seccion>` |
| Web de prueba | GitHub Pages: repo `github.com/inglesgamer/app`, sitio https://inglesgamer.github.io/app/ |
| Datos locales | `localStorage` compartido entre pantallas (claves `ingles_gamer_*`, `ig_*`, `ig:*`) |
| Nube | Firebase (Auth + Firestore): progreso, ranking, amigos, duelos. Plan Spark (gratis) |
| Audio | mp3 con voz natural Kokoro TTS (`/home/claude/tts/gen.py`), servidos desde GitHub |
| Anuncios | Videos bonificados de AC24 vía secciones `premio`…`premio5` («Ver vídeo para acceder: Sí») |
| Pruebas | Playwright + Chrome headless, con simulador de Firebase en `/tmp/fb/` |
| Generadores | Scripts Python / Node en `/home/claude/*` (ver §4) |

Voces (nombre del mp3 = slug del texto, sin tildes):
- **Verano: Fenrir** (`am_fenrir`) → `app/audios/`
- **Nieve: Puck** (`am_puck`) → `app/audios/puck/`
- **Fuego: Bella** (`af_bella`) → `app/audios/bella/`

## 4. Arquitectura y carpetas

```
/home/claude/            (espacio de trabajo; NO está en git)
├── out/                 versión App Creator de cada pantalla (fuente que se entrega al usuario)
├── app/                 ← REPO GIT (GitHub Pages). Copia web de out/ hecha con tools/web.py
│   ├── *.html           pantallas (nombre = sección go:)
│   ├── audios/          mp3 Fenrir · audios/puck · audios/bella
│   ├── CLAUDE.md, PROJECT_STATUS.md, README.md
├── tools/               scripts de parches y de publicación (web.py, arriba.py, dicta_d.py…)
├── anuncios/            premio.html y parches V1–V4 de anuncios/«Saltar nivel»
├── refuerza/            generadores de las 44 lecciones y de refuerza.html
├── retos/               generador de reto1–3 (motor, gramática, galería)
├── duelo4/              duelo.html (nuevo.js, mas_juegos.js, temas_mas.js, dibujos.js, aplicar.py)
├── nieve/, fuego/       generadores de niveles de cada isla
├── tts/gen.py           generador de audios
└── acc/, sopa/, pase/, plus/, jefe/, logros/, racha/, login/ …  generadores de otras pantallas
```

- **Archivo AC24 → web:** `python3 tools/web.py out/X.html app/X.html` (agrega manifest, icono y convierte `go:x` → `x.html` solo en github.io).
- `index.html` en GitHub = **copia de `inicio.html`** (hay que copiarlo cada vez que cambia el Inicio).
- Alias de AC24 sin archivo propio en GitHub: `restaurant.html`→restaurante, `verbosbasc.html`→verbos, `repaso.html`→MAPA (redirecciones).

## 5. Funcionalidades principales (resumen; estado real en PROJECT_STATUS.md)

- Mapas Verano (20 niveles), Nieve, Fuego; jefes; estrellas, Aura, corazones, racha.
- «Ver lección» en cada nivel → lección de Refuerza (con «Volver al nivel»).
- Anuncios: +1 corazón, Aura x2, Saltar nivel, +10 en duelos, +35 en Refuerza.
- Refuerza tu inglés: 44 lecciones divididas por isla, con sonido, +5 Aura al marcar vista y +35 con anuncio.
- Retos de la semana (3 mini juegos, cambian cada lunes).
- Duelos v4: 1v1, 2v2, todos contra todos; 18 juegos; 27 temas; apuestas.
- Vocabulario del día (67 palabras), sopa de letras, liga semanal, tienda, perfil, logros, ranking.

## 6. Reglas de programación y desarrollo

1. **Flujo de cada cambio:** generador/parche → `out/X.html` → prueba en Playwright → `tools/web.py out/X.html app/X.html` → `git add` / `commit` / `git pull --rebase` / `push` en `/home/claude/app` → enviar archivo al usuario → actualizar docs.
2. **Nunca forzar push.** Si lo rechaza: `git pull --rebase`. Otra sesión (VS Code/Capacitor) sube `ig-nativo.js` y `pase.html`: **no pisarlos**.
3. Los parches son **idempotentes** (marca tipo `/* NOMBRE (fecha) */`; si existe, se reemplaza). Correrlos de nuevo no duplica.
4. **Si se regenera un nivel**, volver a correr en orden: `aura_est.py 35 25 15` → `callar.py` → (Fuego: `fuego_voz.py`) → `verano_leccion.py` / `leccion.py` → `anuncios_niveles.py` → `anuncios_v2.py` → `anuncios_v3.py` → `anuncios_v4.py` → `tools/escribir_comprobar.py` → (si aplica) `tools/arriba.py`, `tools/dicta_d.py`.
5. **Si se regenera una lección de Refuerza:** volver a correr `refuerza/aura_refuerzo.py` y `refuerza/lec_sonido.py`; si se regenera `refuerza.html`: `refuerza/aura_refuerza_pagina.py`.
6. **Duelos:** solo con `duelo4/aplicar.py`. **No usar `tools/build_duelo.py`** (versión vieja).
7. Al agregar temas a duelos: **siempre al final** de `TEMAS`/`CATS` (los duelos guardan el número del tema).
8. No usar la clase CSS `.pop` en niveles (ya existe con `position:absolute`).
9. Audio: nunca leer español con la voz del celular; si falta un mp3, generarlo. El audio se corta al cambiar de pantalla.
10. Commits terminan con las líneas de atribución de la sesión.
11. Seguridad: el correo del usuario y claves (OneSignal REST, etc.) son privados; no ponerlos en archivos públicos.

## 7. Decisiones importantes ya tomadas

- **Solo GitHub + App Creator por ahora.** Nada de VS Code / Capacitor desde aquí (eso va en otra sesión).
- **Plus en pausa.** OneSignal descartado (WebView de AC24 no recibe web push; AC24 tiene su propio envío de notificaciones a todos).
- **Anuncios = una sección por premio** (AC24 no repite el video en la misma sección): `premio` corazón, `premio2` Aura x2, `premio3` duelos, `premio4` saltar nivel, `premio5` Refuerza. Las 5 tienen el mismo código.
- **Saltar nivel:** da 3 ★ y **no** da Aura; no sale en jefes, repasos ni vocabularios.
- **Pase VIP quitado** de los niveles (se usa «Saltar nivel» con anuncio).
- **Escribir se revisa con «Comprobar»** (nunca solo al terminar de escribir) — regla permanente.
- **«Escribe lo que oyes» = diseño D** (casillas por letra, «N LETRAS», Pista).
- Personajes: Fuego usa la galería v2 (ensena, nerd, mano, detective, musica, escribir…). Retos y Refuerza también usan `GAL`.
- Retos semanales = **mini juegos** (Vocabulario / Gramática / Escucha), con lo que el jugador ya jugó.
- Refuerza: «Marcar como vista» es gratis (+5); el +35 es opcional con anuncio (nunca bloquear progreso con anuncios).
- Firebase: seguir en Spark; si se pasa a Blaze, poner alerta de presupuesto.

## 8. Preferencias de diseño e interfaz

- Estilo Duolingo **pero con identidad propia**; no copiar arte, personajes ni textos de Duolingo (solo mecánicas).
- **Sin emojis** dentro de la app (usar SVG). Personajes **pixel art**; cofres/regalos **no** pixelados (más 3D/caricatura).
- Letra **Nunito** (600–900). Ancho máx. 520 px (Mapa Verano 430). Safe-area.
- 4 paletas compartidas (`PALETAS`, clave `ingles_gamer_tema`): **Noche, Día, Rosa, Azul**. Todo color de pantalla debe salir de sus variables (`--bg --card --bd --ink --mu --chip --hi --on-hi --track --toff …`).
- Tono normal y lógico, sin «recocha». Textos cortos.
- Mobile first: botones grandes, contenido arriba (no centrado con espacio vacío).
- Respuestas al usuario: español colombiano, cortas, aptas para celular.

## 9. Antes de modificar código

1. Leer `PROJECT_STATUS.md` y el doc `claude/app-*.md` de esa pantalla.
2. Revisar el archivo **real** (`out/` y `app/`) — no suponer que algo existe o funciona.
3. Si es una idea o diseño nuevo, **mostrar diseños/opciones primero** y esperar elección.
4. Hacer copia (`/tmp/...`) antes de parchear; parchear con scripts idempotentes.
5. Probar en Playwright (sin errores de consola, flujo completo) antes de publicar.
6. Después: publicar en GitHub, enviar archivo, decir en qué **sección de AC24** va, y **actualizar PROJECT_STATUS.md** y los docs.
