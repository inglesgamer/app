# PROJECT_STATUS.md · InglésGamer

Última revisión: **17 nov 2026** (comprobado contra los archivos de `/home/claude/app` y `/home/claude/out`).
Leyenda: ✅ terminado y comprobado en archivo · 🟡 en desarrollo / en prueba · ⏳ pendiente (solo planeado) · ⚠️ error o contradicción.

> «Terminado» = está en GitHub y se probó en Playwright (computador). **Que esté en App Creator depende de que el usuario lo pegue**; ver §6.

---

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
| **Niveles «más grandes y arriba»** | Solo aplicado en `esc2` y `saludos`. Falta aprobación final para el resto | `tools/arriba.py` |
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
- **17 nov: el mapa completo reemplaza a las islas.** MAPA → Principiante → `mapaa1`. Las secciones `veranoa1`, `mapanieve`, `mapafuego` e `islaa1` ahora solo redirigen a `mapaa1` (archivo `out/redir_mapa.html`), así los niveles vuelven al mapa completo sin tocarlos. Copias de los mapas viejos: `/home/claude/mapa/originales/` (de ahí salen las escenas) y en el historial de git.
- (antes) Los mapas viejos (veranoa1, mapanieve, mapafuego, islaa1) **no se tocaron**. Falta que el usuario apruebe para cambiar el botón Mapa.
