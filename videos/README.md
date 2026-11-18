# Videos InglésGamer (9:16 y 16:9)

Kit para hacer videos cortos con la misma identidad de la app.

- `kit/marca.css` — 4 paletas de la app (Noche, Día, Rosa, Azul), Nunito, fondo de cuadrícula pixel, piezas (chip, título, tarjeta, botón, barra) y movimientos (`pop`, `subeIn`, `izqIn`, `latido`, `onda`…).
- `kit/personajes.css` + `kit/personajes.js` — los 46 personajes pixel (`GAL(id, ancho)`), sacados de las lecciones.
  Poses: saludo alegre triste brava pulgar animo pienso copion amor ups moto caballo pesca baile dormido ceja lloron amoroso tonto carro distraido sorpresa cool neg afirma miedo ansiedad frio enfermo hambre idea ejer copa super heroe aburrido ensena leer nerd escribir mano detective gamer musica cantar selfie
- `kit/escena.js` — motor. Plantilla `vocab`: intro → N palabras (visual + inglés + audio x2 + español) → mini reto «¿Cuál es…?» → cierre.
- `grabar.js` — graba cuadro por cuadro a 30 fps y mezcla los mp3 de `../audios/`.

## Nueva temática
1. Copiar `colores.html` → `tema.html` y cambiar los datos (`items`, `quiz`, títulos, poses).
   Visual de cada palabra: `{color:"#hex"}`, `{pj:"pose"}` o `{svg:"<svg…>"}`. Audio = slug de `en` (o `audio:"nombre"`; `voz:"../audios/puck/"` para Nieve).
2. Vista previa: abrir el html (botón «Reproducir»). `?f=h` = YouTube, `?tema=dia|rosa|azul`.
3. Grabar: `node videos/grabar.js videos/tema.html ambos [tema]` → `videos/salida/tema-v.mp4` y `tema-h.mp4` (no van a git).
