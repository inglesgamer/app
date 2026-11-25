# PROJECT_STATUS.md · InglésGamer

Última revisión: **17 nov 2026** (comprobado contra los archivos de `/home/claude/app` y `/home/claude/out`).
Leyenda: ✅ terminado y comprobado en archivo · 🟡 en desarrollo / en prueba · ⏳ pendiente (solo planeado) · ⚠️ error o contradicción.

> «Terminado» = está en GitHub y se probó en Playwright (computador). **Que esté en App Creator depende de que el usuario lo pegue**; ver §6.

---

## 0. RECORDATORIOS FIJOS (decirlos al final de CADA respuesta hasta que el usuario confirme)

**Meta: subir la app a más tardar el 1 de diciembre de 2026.**
1. Refuerzos: crear `premio5` y pegar lecciones 1–44 + `refuerza.html` (zip `refuerza_aura_sonido.zip`).
2. **Mandarle a Claude las reglas de Firebase** (Firestore → Reglas) para comprobar que ranking, liga, duelos y nube guardan bien.
3. Sugerencias pendientes (de la crítica 6.5/10): respaldo privado en GitHub de los generadores (hoy solo viven en el espacio de trabajo); probar hablar y duelos en un Android real; terminar Nieve (jefe) y Fuego; revisión de errores general; reglas de Firestore; optimizar lecturas de Firebase (Spark ≈400 sesiones/día).
4. Secciones por pegar en AC24 (ver último mensaje).

## 1. Funcionalidades terminadas ✅

### Mapas y niveles
| Funcionalidad | Archivos (app/ y out/) | Notas |
|---|---|---|
| Mapa de Verano, 20 niveles | `veranoa1.html`; niveles `escucha1 saludos vocab infopers paises numeros colores familia hogar ropa animales frutas restaurante esc2 viajes verbos vocab2 fechas esc3 final` | Voz Fenrir. Aliases AC24: `restaurant`, `verbosbasc` |
| Isla de Nieve, 13 niveles hechos | `mapanieve.html`; `nieve_vocab1 nieve_preposiciones nieve_repaso1 nieve_adjetivos nieve_gustos nieve_conectores nieve_comparativos nieve_futuro nieve_situaciones nieve_repaso2 nieve_vocab2 nieve_profesiones nieve_cuerpo` | Voz Puck |
| Isla de Fuego, niveles 1–7 | `mapafuego.html`; `fuego_pronombres fuego_tobe fuego_thereis fuego_esc1 fuego_articulos fuego_wh fuego_vocab5` | Voz Bella, galería v2. Gen.: `/home/claude/fuego/crear_fN.py` |
| Anuncios en los 40 niveles | parches `anuncios/anuncios_niveles.py`, `_v2`, `_v3`, `_v4` | Corazón (`premio`), x2 (`premio2`), Saltar nivel (`premio4`) |
| Saltar nivel (3 ★, sin Aura) | `anuncios/anuncios_v4.py` (lista `SIN_SALTO`) | No sale en jefes, repasos ni vocabularios |
| Escribir → «Comprobar» manual | `tools/escribir_comprobar.py` | Aplicado a los 40 niveles |
| Aura 35/25/15 por estrellas | `aura_est.py` | Jefe de Verano 100/70/40 |
| «Ver lección» → Refuerza | `refuerza/verano_leccion.py`, `fuego/leccion.py` | Guarda `ig:volver` |
| Pase VIP quitado | familia, colores, numeros | |

### Refuerza tu inglés
| Funcionalidad | Archivos | Notas |
|---|---|---|
| 44 lecciones, divididas por isla, desbloqueo por nivel | `1.html`…`44.html`, `refuerza.html`; gen. `refuerza/hacer_*.py` | |
| +5 Aura al marcar vista; +35 con anuncio (1 vez por lección), personaje copa | `refuerza/aura_refuerzo.py` (44/44), `premio5.html` (tipo `ref`) | |
| Contador «N/44 cobradas» y etiquetas +35 | `refuerza/aura_refuerza_pagina.py` en `refuerza.html` | |
| Sonido en tarjetas y minijuego (voz + efectos) | `refuerza/lec_sonido.py` (44/44) | Textos: `refuerza/sonido_textos.js` |

### Inicio
| Funcionalidad | Archivos | Notas |
|---|---|---|
| Tarjeta Refuerza (lección donde vas, Continuar / Ver todos los temas) | `tools/inicio_refuerza.py` → `inicio.html`, `index.html` | |
| Tarjetas de Retos de la semana | `tools/inicio_retos.py` | |
| Vocabulario del día: 67 palabras (5 + Vida diaria 31 + 31) con audio | `tools/vocab_dia.py` | Comprobado: 67 en `inicio.html` |

### Retos de la semana
| Funcionalidad | Archivos | Notas |
|---|---|---|
| Reto 1 Vocabulario, Reto 2 Gramática, Reto 3 Escucha contrarreloj; +50 Aura/semana; personajes | `reto1.html`, `reto2.html`, `reto3.html`; gen. `retos/hacer_retos.py` | Cambian cada lunes |

### Duelos v4
| Funcionalidad | Archivos | Notas |
|---|---|---|
| 1v1, 2v2, todos; apuestas 0/25/50/100; +10 por participar; anuncio +10 (`premio3`) | `duelo.html`; gen. `duelo4/aplicar.py` | |
| 18 juegos (Ruleta primero), «Ver todos», «Nuevo duelo» | `duelo4/mas_juegos.js`, `dibujos.js` | |
| 27 temas por isla + 14 categorías | `duelo4/temas_mas.js` | |
| Reglas de Firestore | `/home/claude/out/firestore-reglas-duelos-v4.txt` | El usuario debe publicarlas |

### Otros
- `perfil.html`: arreglado «celebrar is not defined» (menú inferior ya se ve). ✅
- `premio.html` = `premio2` = `premio3` = `premio4` = `premio5` (mismo código, comprobado). ✅
- Tienda, Ranking, Liga, Sopa, Estadísticas, Logros, Pase: existen en `app/` (hechos en sesiones anteriores; ver docs `claude/app-*.md`).

---

## 2. En desarrollo / en prueba 🟡

| Qué | Estado real | Archivos |
|---|---|---|
| **Niveles «más grandes y arriba»** | ✅ 17 nov: aplicado a los 40 niveles (contenido arriba y más grande, audio del globo al lado de la frase, botón Continuar/Comprobar siempre abajo también en Nieve y Fuego, «Lento» con estilo) | `tools/arriba.py` |
| **«Escribe lo que oyes» diseño D** | Solo en `esc2` (Repaso 1). Falta: `esc3`, `final`, `fuego_esc1`, `nieve_repaso1`, `nieve_repaso2` | `tools/dicta_d.py` |
| **Mapa A1 nuevo en una sola hilera** (Verano→Nieve→Fuego) | **Solo vista previa** con datos de ejemplo, no conectado a estrellas reales | `app/mapa-a1-simple.html` (gen. `/tmp/dz/mapa/gen8.py`, ⚠️ en /tmp) |

Decisiones ya tomadas para el mapa nuevo: fondo liso (sin paisaje), ícono propio por nivel, sin estrellas debajo, puntos que se colorean hasta el nivel actual, personajes pequeños con botón (Practicar / Repasar / Escuchar), tarjeta de perfil arriba, Aura arriba, **regalo de Aura = opción E (llama flotando)**, 4 paletas, colores de isla más intensos (#FF6B00 / #1E6FE0 / #E0262F). Descartado: cofres (todos los diseños), modo difícil (todas las formas propuestas), fondos con paisaje.

---

## 3. Pendientes (solo planeado) ⏳

- Armar el **mapa A1 nuevo de verdad** (todos los niveles, estrellas reales, regalos de Aura y «Practicar» funcionando).
- Pasar «más grande y arriba» y diseño D a los demás niveles (si el usuario aprueba).
- **Fuego niveles 8–16:** Present Simple (sigue; 30 % Vocabulario 5), Frecuencia, Repaso 6, Can e imperativo, Presente continuo, Was/were, Pasado -ed, Repaso 7, Jefe final.
- **Nieve:** jefe `nieve_final`.
- Ideas aceptadas para el mapa: **Mis errores**, **Historias** (mini historias por unidad), temas nuevos de Verano (Comida y bebidas, Tiendas y precios, Transporte, Deportes, Emociones, Clima, La hora, La escuela). Sin diseño final.
- Aura por escuchar la palabra del día (+5, o +10 con pregunta) — propuesto, **sin respuesta del usuario**.
- Duelos con desconocidos (solo explicado), más ideas de duelo (torneo, racha…), avisos al ser retado.
- Pantallas que no existen en GitHub: `comojuega`, `novedades`, `politicas`, `cofre`.
- Paso a app nativa (Capacitor/AdMob): **otra sesión**, no aquí.

---

## 4. Errores conocidos y contradicciones ⚠️

1. **Enlaces rotos (404) en los mapas:**
   - `mapafuego.html` enlaza a `fuego_psimple, fuego_frecuencia, fuego_esc2, fuego_canimp, fuego_pcont, fuego_pasado, fuego_pasado2, fuego_esc3, fuego_final` — no existen todavía (están bloqueados para el jugador, pero el archivo no existe).
   - `mapanieve.html` enlaza a `nieve_final` — no existe.
2. **Los generadores NO están en git.** Todo `/home/claude/{tools,refuerza,retos,duelo4,anuncios,nieve,fuego,tts,…}` y `out/` viven solo en el espacio de trabajo. Si ese espacio se pierde, solo quedan los HTML finales de `app/`. El generador del mapa nuevo está en `/tmp` (aún más frágil).
3. **Doc vs código – Retos:** `claude/app-mapa-fuego.md` dice que el usuario eligió «Supervivencia, Jefe de la semana y Dictado maratón»; lo implementado (y elegido después, 13 nov) es **Vocabulario / Gramática / Escucha**. Vale lo implementado.
4. **Doc desactualizado:** `claude/app-version-web-github.md` lista niveles y retos como «pendientes de subir»; ya están todos en GitHub.
5. Crucigrama de duelo con tema «Preguntas WH» sale con solo 2 palabras (palabras muy cortas).
6. `index.html` debe copiarse a mano desde `inicio.html` (ya causó que GitHub mostrara un Inicio viejo).
7. Caché del celular: GitHub Pages a veces muestra versión vieja → abrir con `?v=N`.
8. **No comprobado en celular:** retos, duelos nuevos, sonido de Refuerza, mapa nuevo (solo probado en computador).

---

## 5. Últimos cambios (12–14 nov 2026)

- 14 nov: vista previa del mapa A1 (`mapa-a1-simple.html`, regalo de Aura E, paletas, contraste); diseños `aura-disenos.html`, `mapa-disenos.html`, `mapa-a1-diseno.html`, `mapa-a1-suave.html` (solo prueba).
- 13 nov: diseño D en Repaso 1; «Comprobar» en los 40 niveles; tamaño intermedio en esc2/saludos; Vocabulario del día 67 palabras; Refuerza +5/+35/sonido (44 lecciones, `premio5`); retos con personajes; Inicio (Refuerza y Retos); duelos 18 juegos + 27 temas; perfil arreglado.
- 12 nov: anuncios V1–V4 en los 40 niveles; Saltar nivel; Aura 35 en niveles viejos; Pase VIP fuera; Fuego niveles 1–7.

---

## 6. Tareas del usuario (recordar en cada respuesta hasta que confirme)

0. ✅ (18 nov) Hecho por el usuario: Referencia `mapaa1`, `redir_mapa` en veranoa1/mapanieve/mapafuego, `MAPA` y `ranking` pegados.
   Falta: **pegar niveles** con Aura 25/15/5 a medida que se entregan.
   (antes) **Pegar en App Creator lo del 17 nov (zip `out/ac24_17nov.zip`):** los 40 niveles (sin liga al final), `ranking`, `mapaa1` (podio), `MAPA`, y `redir_mapa.html` en `veranoa1`, `mapanieve`, `mapafuego`; borrar `islaa1`.
   (antes) **Cambiar el mapa en App Creator:** pegar `MAPA.html` en `MAPA`, `mapaa1.html` en `mapaa1` (sección nueva), `redir_mapa.html` en `veranoa1`, `mapanieve` y `mapafuego`; borrar `islaa1`.

1. **Pasar los refuerzos a App Creator:** crear sección `premio5` («Ver vídeo para acceder: Sí», «Incluir en menú: No») y pegar lecciones 1–44 + `refuerza.html` (zip `out/refuerza_aura_sonido.zip`). *(Hay recordatorio diario 9:00 a. m. en su celular.)*
2. Crear secciones `premio2`, `premio3`, `premio4` y `reto1`–`reto3` si no existen.
3. **Publicar reglas de Firestore** (`firestore-reglas-duelos-v4.txt`); sin eso, crear duelos da «permission-denied».
4. Configurar videos bonificados en «Anuncios» de AC24.
5. Pasar las reglas de Firestore actuales a Claude (para cerrar la trampa del +500 del ranking).

---

## 7. Próximas tareas sugeridas

1. Decidir y armar el **mapa A1 nuevo** real.
2. Aplicar diseño D y tamaño nuevo al resto de niveles (si se aprueba).
3. Fuego nivel 8: Present Simple.
4. Mover los generadores a un lugar con respaldo (por ejemplo, un repo privado) — **pedir permiso antes**.
5. Actualizar los docs desactualizados (§4.3 y §4.4).

### 17 nov 2026 · Mapa A1 en una sola hilera (vista previa)
- Nueva pantalla `mapaa1` (generador `/home/claude/mapa/hacer_mapa_a1.py`): Verano → Jefe → Nieve → Jefe → Fuego → Jefe, todo seguido.
- Datos reales: mismas claves de estrellas y reglas de desbloqueo. Una isla se abre con 40 / 51 ★ de Verano **o** venciendo al jefe anterior.
- Regalos de Aura (una vez): **+30 Verano, +40 Nieve, +50 Fuego**. Tarjeta de perfil con el look de la Tienda (fondo, marco, skin, título); vista previa con `?look=fondo,marco,skin,titulo`.
- Regalos guardados en clave `ingles_gamer_mapa_regalos`. Niveles que no existen salen «Pronto».
- Zona de Verano con la **misma escena del mapa de Verano** (cielo con sol/luna, mar, olas, barco, arena, palmeras, sombrillas, camino de arena). Nieve y Fuego también con su escena original (montañas, aurora, pinos, muñecos, nieve cayendo / volcán, mar de lava, rocas, cristales, brasas). Las escenas se sacan de los mapas viejos con `mapa/escenas.py`. Demo con todo pasado: `mapaa1.html?demo=1`.
- Descartado: `verano-deco.html` (4 decoraciones nuevas); el usuario quiere la escena original.
- 24 nov (5): **Nieve 5–8** (repaso1, conectores, comparativos, futuro) a 25/15/5 + fin_botones (futuro → situaciones). **Repaso ~30 %** del nivel anterior en 1–4 con `nieve/repaso30.py` (idempotente, inserta ejercicios en el PLAN de `out/nieve_X.html`; volver a correrlo si se regenera vocab1/preposiciones/adjetivos/gustos): vocab1 28 % (repasa Verano: números, colores, familia; colores iguales al dibujo), preposiciones 31 %, adjetivos 30 %, gustos 29 %; 5–8 ya traían 26–32 %. 24 mp3 Puck nuevos (frases + palabras sueltas de opciones: two, five, red, blue…). Prueba `/tmp/t_son2.py`: sonido «ok» al acertar y «mal» al fallar en todos los ejercicios de elegir, sin audios faltantes ni errores. Vistas `out/nieve_vista_1a4.png`, `nieve_vista_5a8.png`. Faltan 9–13 (situaciones, repaso2, vocab2, profesiones, cuerpo) y el jefe.
- 24 nov (4): **Nieve 1–4** (vocab1, preposiciones, adjetivos, gustos) a Aura 25/15/5 + fin_botones (gustos → nieve_repaso1). Faltan 5–13 de Nieve y el jefe.
- 24 nov (3): **Nieve: 5 niveles de hablar** (uno **cada 3 niveles**, 10 frases c/u con audios Puck ya existentes, `audios/puck/`): `hablarn1..hablarn5` (ids `nieve_h1..h5`), secciones AC24 `hablarn1`…`hablarn5`. Grupos: Vocab 3·Preposiciones·Adjetivos / Gustos·Repaso 3·Conectores / Comparativos·Futuro·Situaciones / Repaso 4·Vocab 4·Profesiones / Cuerpo·Clima·Ciudad. Generador `hablar/hacer_hablar.py` (`GRUPOS_NIEVE`, placeholder `__CARPETA__`; normaliza don't/won't/what's). Mapa: `k < 2`, Verano cada 5 y Nieve cada 3 (`hacer_mapa_a1.py`); clic → `go:hablarnN`. Falta Fuego.
- 24 nov (2): **Nieve: 2 niveles nuevos** (A1, Puck, 3 corazones, 19–20 pantallas, ~30 % repaso del anterior): **El clima** (`crear_n14.py`→`nivel_n14.py`→`nieve_clima`, go:nieve_clima: sunny, cloudy, rainy, snowy, windy, cold, hot, summer, winter; dibujos `cl_*`, `es_*`) y **La ciudad** (`crear_n15.py`→`nivel_n15.py`→`nieve_ciudad`, go:nieve_ciudad: left, right, go straight, bus stop, supermarket, near, far; dibujos `di_*`, `lu_bus`, `lu_super`). Cadena: aura_est 35 → nieve_voz → anuncios v1–v4 → escribir_comprobar → final_sin_liga → aura_valores 25/15/5 → arriba → fin_botones (ORDEN con clima y ciudad; cuerpo → clima → ciudad → mapa). 65 mp3 Puck nuevos. Mapa: 2 nodos antes del Jefe (íconos mundo/casa). LG_NIEVE (logros, estadísticas, nav_puntos) con clima y ciudad. Sin «Ver lección» (no hay lección de Refuerza para estos). Pendiente: el usuario pidió «5 de habla» (confirmar si son 5 niveles de hablar en Nieve).
- 24 nov: Recordatorio en el celular: **agregar más retos de la semana** (más escenas, capítulos, frases y tipos nuevos). Lo que sigue: **Nieve** (13 niveles a 25/15/5 + fin_botones; jefe `nieve_final` no existe) → **Fuego** (7 hechos a ajustar + 8 por hacer y su jefe) → niveles de hablar de Nieve y Fuego.
- 22 nov (3): Retos v2: **3 vidas** (corazones arriba; Escena/Historia pierden al fallar, Repite si dice menos de la mitad; sin vidas → «Te quedaste sin corazones» + Intentar de nuevo), **«Ver traducción»** (oculta por defecto; Historia con traducción frase por frase, campo `es` en contenido.json) y barra de abajo con **nuestro personaje** (GAL alegre / ups).
- 22 nov (2): **Retos de la semana v2** (eligió reemplazar los 3, +30 de Aura): reto1 = **Escena** (4 escenas: restaurante, cafetería, tienda de ropa, hotel), reto2 = **Historia** «El misterio del faro» (cap. 1–4, uno por semana), reto3 = **Repite encima** (4 grupos de 5 frases; sin micrófono → «lo dije en voz alta»). Rotan cada lunes (semana 0 = 16 nov). Generador `retos2/hacer_retos_v2.py` + `retos2/contenido.json`; 72 audios en `audios/retos/`. Inicio (`tools/retos_v2_inicio.py`): tarjetas Escena/Historia/Repite, +30; Cómo se juega y Novedades (id 11) al día. El generador viejo `retos/hacer_retos.py` ya NO se usa.
- 22 nov: Ideas de aprendizaje (`aprender-disenos.html`, 7 formas + dónde irían). **Demos que funcionan:** `video-demo.html` (YouTube x-0WIrRZGIE «Ordering Coffee», IFrame API, pedacitos con Repetir/Lento, escribir y Comprobar; tiempos APROXIMADOS + «modo ajuste» para marcarlos) y `escena-demo.html` (restaurante con personajes pixel, voces Fenrir/Bella en `audios/escenas/`, elegir la palabra). Generadores en `demos/`. Luego el usuario dijo que escribir lo del video es muy complejo/inexacto. Demos nuevos: `pares-demo.html` (ship/sheep… 6 pares, voz Fenrir), `repite-demo.html` (shadowing con reconocimiento de voz, 4 frases), `historia-demo.html` (capítulo 3 «El misterio del faro», voz Bella, glosario al tocar, 2 preguntas). Audios en `audios/demos/`.
- 21 nov (5): **Anuncios recompensados para DESPUÉS** (el usuario los dejó en espera): salvar racha, cofre diario en Tienda, pista en niveles, revancha en duelos; ideas extra: 3 retos gratis al día y extra con video (o apuesta doble opcional), probar objeto 24 h, pista en sopa, ver respuesta correcta, regalo de regreso, abrir lección antes, reintentar reto. Solo recompensados (nada obligatorio). Firebase: Spark ≈400 sesiones/día; con 1000 simultáneos se acaba la cuota en 1–2 h (no se cae, se apagan ranking/duelos/nube hasta las 3 a. m.); optimización ofrecida.
- 21 nov (4): **Economía de Aura**: Refuerza con anuncio **+35 → +25** (44 lecciones + refuerza.html + generadores; zip `refuerza_aura_sonido.zip` rehecho con premio5) y **regalos del mapa 20** en las 3 islas (antes 30/40/50; generador del mapa). Análisis: sin anuncios ≈1.800 una vez; Tienda completa ≈25.560 (56 objetos), lo más caro InglésGamer 1.100. Pendiente decidir: limitar x2, Nieve/Fuego a 25/15/5, subir precios de lo legendario.
- 21 nov (3): Retos de la semana: se queda el diseño, sin el texto de abajo. **Racha avisa el próximo cofre** (`tools/racha_cofre.py`): cofre al final de la barra de la tarjeta («Cofre en N días · +R», tiembla si es mañana) y en la animación «Tu próximo cofre: día X» + el día marcado con cofre en la semana. Diseños de retos descartados: `retos-disenos.html`.
- 21 nov (2): El usuario ya pegó en AC24 inicio, tienda, perfil, ranking, mapaa1, duelo y estadisticas. Recibí el código de **Cómo se juega** y **Novedades** (bases en `comojuega/`); `comojuega/actualizar.py`: Cómo se juega con 12 pasos al día (mapa de 3 islas, Aura 25/15/5, racha con llama, liga semanal, duelos, hablar, retos nuevos, logros, packs) y 6 novedades nuevas (id 5–10); Inicio `NOVEDADES_ULTIMA = 10`.
- 21 nov: **Jefe de Verano** (`final`): Aura 50 / 30 / 10 y fin_botones («Siguiente nivel» → nieve_vocab1 + «Mapa»). Verano completo con los valores nuevos.
- 20 nov (3): **Ícono de racha = «Llama con rayo»** (eligió el 3 de `racha-iconos.html`). `tools/racha_llama.py`: tarjeta de racha del Inicio (gris si no jugó hoy), animación «Racha activada» sin personaje (la llama se enciende con chispas, el número sube, semana con llamitas, regalo igual), y chip de racha del Mapa (en el generador). Diseños descartados: `racha-disenos.html`.
- 20 nov (2): **Puntos rojos en el menú** (`tools/nav_puntos.py`): Perfil = premios de logros por reclamar, Tienda = cosas NUEVAS; en inicio, tienda, perfil, ranking (base), mapaa1 y duelo. **Diamante/Corona** también en mapaa1 (regenerado) y duelo. **Estadísticas** (`estadisticas/arreglos.py`): «Perfectos» (niveles con 3 ★) en vez de Precisión, estrellas de las 3 islas (de 120), «Niveles» solo cuenta niveles/lecciones, historial archivado hasta 300 (`ingles_gamer_historial`). Cómo se juega y Novedades: **falta el código** (no está en el espacio de trabajo; pedírselo al usuario).
- 20 nov: **Perfil** sin «Mis pases»/T1 (`perfil/sin_pase.py`). **Logros con premio para reclamar ahí mismo** (`logros/premios.py`, Perfil + Tienda): botón «Reclamar» y «Ponérmelo» en la hoja del logro, cartas con «RECLAMAR» y aviso en Mi álbum; premios solo de logro (LG_SOLO: Rey del A1, Perfeccionista, Constante, Imparable + skin Diamante, Gladiador (ganar 1 duelo), Caballero del Reino (ganar 20), Su Majestad + marco Corona (liga Rey), Rey del Hielo (terminar Nieve), Coleccionista (10 personajes)); en la Tienda dicen «Solo con logro», no salen en oferta ni cofre; punto rojo en pestaña y etiqueta NUEVO (`ingles_gamer_nuevos`). Skin 9 Diamante y marco 8 Corona (`tools/look_nuevo.py`) en inicio, perfil, tienda y ranking; las demás pantallas los muestran normal.
- 19 nov: **Tienda** sin Pase/Temporada (banner e intro de dinos quitados; lo de temporada solo lo ve quien ya lo tiene). Packs = **Packs de la semana**: 2 por semana de un grupo de 14 (cambian cada lunes, ~30 % más baratos), con «Termina en…». Parche `tienda/packs_semana.py` (idempotente).
- 19 nov: Aura 25/15/5 + fin_botones en Verbos básicos, Vocabulario 2, Días y meses y Repaso 2 (esc3). Verano listo salvo el Jefe (sigue 100/70/40).
- 19 nov (4): **Ranking solo liga semanal** (quitar Temporada y Siempre): 4 diseños en `ranking-disenos.html` (A podio + tarjetas, B reino arriba + lista limpia, C carrera, D tu puesto fijo arriba). **Eligió A.** Vista previa `ranking-a.html`: botón «Amigos» largo con número, corona que salta sobre el 1.º, brillo en el escalón de oro, punto verde en línea, y 4 animaciones (subir de rango, pasar a alguien, entrar al podio, resumen del lunes). Esperando qué animaciones se quedan. Luego pidió: «+X hoy» bajo cada nombre, animación de pasar a alguien, premios del top 3 y animación de fin de semana → vista previa `ranking-b.html` (cofres oro/plata/bronce 300/200/100 + corona/marco/trofeos, 25 Aura del 4.º al 10.º, hoja «Premios de la semana» con «Tus trofeos», fin de semana: puesto + contador de Aura + cofre que se abre). Luego: premios sencillos que mejoran con el rango y que el rango destaque, deslizando a otros rangos → `ranking-c.html` (carrusel de rangos con color del material; Aura top 3 por rango: Campesino 60/40/20, Soldado 90/60/30, Caballero 120/80/40, Noble 160/110/60, Rey 220/150/80 + trofeo; diseños 1 franja en la tarjeta, 2 en el podio, 3 botón «Premios» con escalera). **Eligió diseño 1 con ícono de Aura → HECHO en `ranking.html`** (gen. `ranking/liga_semanal.py` sobre `ranking/ranking_base.html`): título «Liga semanal», botón «Amigos» largo, sin Temporada/Siempre, franja de premios por rango en cada tarjeta del carrusel, podio top 3 (corona, brillo, escalones de metal), «+X hoy» (campos `dd`/`dg` de la ficha), animación al subir de puesto/entrar al podio (`ig_liga_pos`), y el lunes animación de fin de semana con cofre: da el Aura del puesto (top 3) + trofeo (`ingles_gamer_trofeos`), una sola vez (`ingles_gamer_liga_premio`). Pendiente: mostrar los trofeos en Perfil. **Corrección (19 nov):** el Ranking real ahora se ve igual a la vista previa `ranking-c` diseño 1 (chip «Termina en», tarjetas de rango con color del material y franja de premios, deslizar cambia de liga, podio con escalones de metal, filas con fondo), números de Aura en blanco, y la pantalla siempre en paleta Noche (las paletas no la cambian).
- 19 nov (3): **mapa usa el mismo personaje y look del Inicio** (20 personajes, 15 fondos, solo lo comprado; personaje no comprado → Constructor). Antes tenía una copia vieja de 9 personajes. ⚠️ **Error encontrado:** las vistas previas `aura-liga.html` y `aura-podio.html` guardaban datos de ejemplo en el celular (perfil, tienda con mp2/mc2/tt5, aura, liga) → pudieron llegar a la nube. Arreglado: todas las vistas previas usan almacenamiento aparte. El demo del mapa ya no guarda regalos.
- 19 nov (2): hablar **cada 5 niveles** (antes 3): en Verano quedan 3 niveles `hablar1..3` (10 frases, 5 temas c/u); `hablar4..6` eliminados. Tarjeta del mapa más pequeña (214 px) y siempre dentro de la pantalla (sin deslizar a la derecha).
- 19 nov: **Duelos en el Inicio** (el usuario dice que los retos pasan desapercibidos): 5 ideas en `duelo-inicio-disenos.html` (A ventana al entrar, B tarjeta grande VS arriba, C aviso que baja + número en Ranking, D fila tipo historias, E franja roja con sacudón). **Eligió A + D** y cambiar el Aura de arriba por un botón largo «Duelos» (espadas + texto + número). Hecho con `tools/inicio_duelos.py`: botón Duelos arriba, Aura en la tarjeta del jugador, fila de retos tipo historias (tiempo que queda, «¡NUEVO!», apuesta, «Retar») y ventana «¡Te retaron!» una vez por reto (`ig_retos_vistos`). Probado con Firebase simulado (`/tmp/fb/fs_duel.js`). Sin retos y con amigos: **A** (fila de amigos con «RETAR»), elegido. Sin amigos: **opción 1** (fila «Invita / Agrega / Reta / Buscar»), elegida. Final 19 nov.
- 18 nov (3): **eligió B, tarjeta blanca (Noche) / negra (Día, Rosa, Azul)**. Ya activo en el mapa (solo Verano): 6 niveles de hablar `hablar1`…`hablar6` (8 frases c/u con audio Fenrir existente) después de cada 3 niveles; ids `verano_h1..h6` en `ingles_gamer_hablar`. No bloquean el camino. Falta: Nieve y Fuego.
- 18 nov (2): hablar → personaje grande en el resultado, **solo Aura (+25 una vez), sin estrellas**, «Saltar nivel» con anuncio (premio4, no da Aura). Mapa: niveles de hablar **cada 3 niveles** (repasan esos 3), 3 diseños en vista previa `mapaa1.html?hab=A|B|C` (A burbuja con ondas, B tarjeta con personaje cantando, C escenario con anillo y notas); **esperando elección**. Sin `?hab=` el mapa no los muestra todavía.
- 18 nov: **nivel aparte «Habla en inglés»** (`hablar.html`, gen. `/home/claude/hablar/hacer_hablar.py`): 10 frases básicas de Verano con micrófono (reconocimiento de voz del navegador), muestra «Entendí: …» palabra por palabra, 3 intentos por frase, Aura 25/15/5 (clave `ingles_gamer_hablar`). Probado con reconocimiento simulado; el usuario confirmó que el micrófono funciona en su celular. Aún no está en el mapa. Si no hay reconocimiento: modo «Lo dije bien». `pruebamicro.html` = prueba de micrófono.
- 18 nov: personaje de la pantalla de inicio del nivel = **«Dormido»** en Colores, Familia y Casa; **«Bailando»** en Ropa, Animales y Frutas; **«Cool»** en Restaurante, Repaso 1 y Viajes (antes «Saludo» en todos). Herramienta `tools/intro_pj.py <pose> out/X.html`. El usuario elige pose de la galería «Personajes Inglés Gamer».
- 17 nov (4): **Aura por estrellas ahora 25 / 15 / 5** (antes 35/25/15). Hecho en: `escucha1` (Presentaciones), `saludos`, `vocab`, `infopers`, `paises`, `numeros`, `colores`, `familia`, `hogar`, `ropa`, `animales`, `frutas`, `restaurante`, `esc2`, `viajes`. En esos 3 también: final con «Siguiente nivel» + «Mapa» y siguiente nivel correcto (Saludos llevaba a `tobe` por error). El usuario pide ir de a poco; faltan los demás. Herramienta `tools/aura_valores.py`.
- 17 nov (3): mapa abre directo en el nivel actual (sin salto: se oculta hasta ubicarse). Sonidos correcto/incorrecto: se mostraron 8 opciones (`sonidos-disenos.html`); **el usuario decidió dejar los actuales**.
- 17 nov (2): **eligió C1**. Al reclamar un regalo sale el podio C1 con la liga real (Firestore, máx. 7 s), con el Aura acumulada desde la última vez (`ingles_gamer_liga_visto`). Final de los 40 niveles sin rango ni liga (`tools/final_sin_liga.py`); retos, duelos y sopa siguen igual. Ranking más rápido: abre con la última lista guardada (`ig_rank_cache`) y no espera amigos/ficha (`tools/ranking_rapido.py`). ⚠️ No probado con Firebase real (bloqueado en el entorno de pruebas).
- 17 nov: al reclamar un regalo de Aura el mapa guarda en la nube y publica la ficha (liga semanal) con los mismos bloques NUBE/FICHA de los niveles. Animación al reclamar: el usuario eligió el estilo B (tarjeta de liga). Variantes con la liga real (rango del Reino, tarjetas, personajes) en `aura-liga.html` (B1 rango+liga, B2 solo rango, B3 podio, B4 pantalla final de nivel). Eligió **B3 (podio)** con 4.º y 5.º: 4 diseños en `aura-podio.html` (C1 podio+tarjetas, C2 podio de 5, C3 podio+fichas, C4 escalera), esperando elección. Gen. `mapa/hacer_aura_podio.py`. Generador `mapa/hacer_aura_liga.py` (usa el bloque IGFinal de familia.html).
- **17 nov: el mapa completo reemplaza a las islas.** MAPA → Principiante → `mapaa1`. Las secciones `veranoa1`, `mapanieve`, `mapafuego` e `islaa1` ahora solo redirigen a `mapaa1` (archivo `out/redir_mapa.html`), así los niveles vuelven al mapa completo sin tocarlos. Copias de los mapas viejos: `/home/claude/mapa/originales/` (de ahí salen las escenas) y en el historial de git.
- (antes) Los mapas viejos (veranoa1, mapanieve, mapafuego, islaa1) **no se tocaron**. Falta que el usuario apruebe para cambiar el botón Mapa.
