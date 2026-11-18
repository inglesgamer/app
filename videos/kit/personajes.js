/* GAL: personajes pixel InglésGamer. GAL(id, ancho) -> HTML */
const GAL = (function () {
/* Cuadrícula (12 columnas x 16 filas). Cada letra es un color de la paleta */
const BASE = [
"...kkkkkk...","..kkkkkkkk..","..kwwwwwwk..","..hhhhhhhh..","..hwessewh..","..ssssssss..","..sssmmsss..",
"ggggqllqgggg","ggggqllqgggg","ggggzllzgggg","gggggllggggg","llgggllgggll","ssgggllgggss","ssppppppppss",
"..ppp..ppp..","..fff..fff.."
];
const PAL = { k:"#151518", w:"#F2F4F8", h:"#8A5A33", e:"#3A2414", s:"#F2B98F", m:"#B8704F", M:"#7A1F1F", g:"#5A5A5E", l:"#C4C4C8", q:"#A0A0A5", z:"#0B0B0D", p:"#1A1A1E", f:"#F2F4F8", W:"#FFFFFF", r:"#FF8FA3", t:"#6EC6FF", v:"#FF2D2D", S:"#E3A67C", H:"#FF4D8D", y:"#FFC83D", R:"#E5322B", N:"#2B1B12", B:"#8B5A2B", b:"#5E3E22", C:"#C98F6B", U:"#2E86DE", O:"#FF8A3D", T:"#FF6B5E", G:"#44444A", c:"#3FD8C8", A:"#2F6B3F", K:"#6B4423", D:"#1E1E24", P:"#8E5BD6", V:"#5E3A99" };

const solo = (r1, r2, c1, c2, k) => { const o = []; for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) o.push([r, c, k]); return o; };
const rects = l => l.map(x => '<rect x="' + x[1] + '" y="' + x[0] + '" width="1" height="1" fill="' + PAL[x[2]] + '"></rect>').join("");
// brazo levantado (lado "R" o "L"), top = fila donde empieza la mano
const arriba = (lado, top) => { const a = lado === "R" ? 10 : 0; return solo(top, top + 1, a, a + 1, "s").concat(solo(top + 2, top + 2, a, a + 1, "l"), solo(top + 3, 8, a, a + 1, "g")); };
// brazo ladeado (para el saludo)
const lado = top => solo(top, top + 1, 11, 12, "s").concat(solo(top + 2, top + 2, 11, 12, "l"), solo(top + 3, 8, 10, 11, "g"));
// mano en la cara (para limpiarse las lágrimas)
const cara = () => solo(4, 5, 9, 10, "s").concat(solo(6, 6, 10, 11, "l"), solo(7, 8, 10, 11, "g"));
const chispa = (x, y, d) => '<g class="sp" style="animation-delay:' + d + 's"><rect x="' + (x + 1) + '" y="' + y + '" width="1" height="3" fill="#FFC83D"></rect><rect x="' + x + '" y="' + (y + 1) + '" width="3" height="1" fill="#FFC83D"></rect></g>';

const papel = x => [[3,x,"W"],[3,x+1,"W"],[4,x,"q"],[4,x+1,"W"]];
const corazon = (x, y, d) => '<g class="cor" style="animation-delay:' + d + 's">' + rects([[y,x,"H"],[y,x+2,"H"],[y+1,x,"H"],[y+1,x+1,"H"],[y+1,x+2,"H"],[y+2,x+1,"H"]]) + '</g>';
const interrog = '<g class="q">' + rects([[-2,10,"y"],[-2,11,"y"],[-2,12,"y"],[-1,12,"y"],[0,11,"y"],[2,11,"y"]]) + '</g>';
const sudor = (a, b, d) => '<g class="tA" style="animation-delay:' + d + 's">' + rects([[a[0],a[1],"t"]]) + '</g><g class="tB" style="animation-delay:' + d + 's">' + rects([[b[0],b[1],"t"]]) + '</g>';
const SONRISA = [[6,4,7,"M"],[5,3,3,"M"],[5,8,8,"M"]];

const nota = (x, y, d) => '<g class="cor" style="animation-delay:' + d + 's">' + rects([[y,x+1,"y"],[y+1,x+1,"y"],[y+2,x,"y"],[y+2,x+1,"y"]]) + '</g>';
const zeta = (x, y, d) => '<g class="cor" style="animation-delay:' + d + 's">' + rects([[y,x,"W"],[y,x+1,"W"],[y,x+2,"W"],[y+1,x+1,"W"],[y+2,x,"W"],[y+2,x+1,"W"],[y+2,x+2,"W"]]) + '</g>';
const lineas = x => [0, .17, .34].map((d, i) => '<g class="linea" style="animation-delay:' + d + 's">' + rects([[2 + i * 3, x, "q"], [3 + i * 3, x, "q"]]) + '</g>').join("");
const SIN_PIERNAS = [[13,2,9,"."],[14,2,9,"."],[15,2,9,"."]];

const caraL = () => solo(4, 5, 1, 2, "s").concat(solo(6, 6, 0, 1, "l"), solo(7, 8, 0, 1, "g"));
const cara2 = () => solo(5, 6, 9, 10, "s").concat(solo(7, 7, 10, 11, "l"), solo(8, 8, 10, 11, "g"));
const caraL2 = () => solo(5, 6, 1, 2, "s").concat(solo(7, 7, 0, 1, "l"), solo(8, 8, 0, 1, "g"));
const excl = x => '<g class="vena">' + rects([[-2,x,"v"],[-1,x,"v"],[0,x,"v"],[2,x,"v"]]) + '</g>';
const mariposa = '<g class="mari"><g class="m1">' + rects([[1,10,"H"],[1,12,"H"],[2,11,"z"],[3,10,"H"],[3,12,"H"]]) + '</g><g class="m2">' + rects([[2,10,"H"],[2,12,"H"],[2,11,"z"]]) + '</g></g>';
const lagrimas = '<g class="t1">' + rects([[5,3,"t"],[5,8,"t"]]) + '</g><g class="t2">' + rects([[6,3,"t"],[6,8,"t"]]) + '</g><g class="t3">' + rects([[7,3,"t"],[7,8,"t"]]) + '</g><g class="t4">' + rects([[8,3,"t"],[8,8,"t"]]) + '</g>';
const OJOS_CERRADOS = [[4,3,4,"e"],[4,7,8,"e"]];

const MANOBOCA = [[6,7,"S"],[6,8,"S"],[7,7,"S"],[7,8,"S"],[7,9,"l"],[8,9,"l"],[7,10,"g"],[7,11,"g"],[8,10,"g"],[8,11,"g"]];
const MANOBOCA2 = [[6,8,"S"],[6,9,"S"],[7,8,"S"],[7,9,"S"],[7,10,"l"],[8,10,"l"],[7,11,"g"],[8,11,"g"]];
const copo = x => '<g class="nieve" style="left:0;animation-delay:' + (-x * .3) + 's">' + rects([[-2,x,"W"]]) + '</g>';
const fantasma = '<g class="q">' + rects([[0,11,"W"],[0,12,"W"],[0,13,"W"]].concat(solo(1, 1, 10, 14, "W"), [[2,10,"W"],[2,11,"z"],[2,12,"W"],[2,13,"z"],[2,14,"W"]], solo(3, 3, 10, 14, "W"), [[4,10,"W"],[4,12,"W"],[4,14,"W"]])) + '</g>';
const pizza = '<g class="q">' + rects(solo(1, 1, 11, 15, "B").concat([[2,11,"y"],[2,12,"R"],[2,13,"y"],[2,14,"R"],[2,15,"y"],[3,12,"y"],[3,13,"y"],[3,14,"y"],[4,13,"y"]])) + '</g>';
const bombilla = '<g class="b1">' + rects(solo(-3, -2, 4, 6, "y").concat([[-1,5,"q"]])) + '</g><g class="b2">' + rects(solo(-3, -2, 4, 6, "W").concat([[-1,5,"q"],[-3,3,"y"],[-3,7,"y"],[-2,2,"y"],[-2,8,"y"]])) + '</g>';

const barra = y => solo(y, y, -1, 12, "q").concat(solo(y - 2, y + 2, -1, -1, "z"), solo(y - 2, y + 2, 12, 12, "z"));
const copaC = y => solo(y, y, 10, 13, "y").concat([[y+1,10,"y"],[y+1,11,"W"],[y+1,12,"y"],[y+1,13,"y"]], solo(y + 2, y + 3, 11, 12, "y"), [[y,9,"y"],[y+1,9,"y"],[y,14,"y"],[y+1,14,"y"]]);
const confeti = (x, col, d) => '<g class="nieve" style="animation-delay:' + d + 's"><rect x="' + x + '" y="-3" width=".8" height=".8" fill="' + col + '"></rect></g>';
const llamas = hs => [-1, 0, 11, 12].reduce((o, x, i) => { for (let k = 0; k < hs[i]; k++) o.push([14 - k, x, k < 2 ? "O" : "y"]); return o; }, []);
const CAPA_A = solo(13, 16, 1, 10, "R").concat(solo(15, 16, 11, 12, "R"));
const CAPA_B = solo(13, 16, 1, 10, "R").concat(solo(15, 16, -1, 0, "R"));

const ACCIONES = [
  { id:"saludo", n:"Saludar", d:"Saluda con la mano y mueve la boca al decir hola.", g:"¡Hola!", mod:[],
    bo:solo(5, 6, 5, 6, "M"), r1:arriba("R", 3), r2:lado(3), extra:"" },
  { id:"alegre", n:"Alegre", d:"Salta con los dos brazos arriba, se ríe y le salen destellos.", g:"¡Yupi!",
    mod:[[6,4,7,"M"],[5,3,3,"M"],[5,8,8,"M"],[5,2,2,"r"],[5,9,9,"r"]],
    bo:solo(6, 6, 5, 6, "W"), r1:arriba("R", 3), r2:arriba("R", 4), l1:arriba("L", 3), l2:arriba("L", 4),
    extra:"", fuera:chispa(-1, 0, 0) + chispa(11, 0, .4) + chispa(5, -2, .8) },
  { id:"triste", n:"Triste", d:"Cabeza baja, llora y se limpia las lágrimas.", g:"Buaaa...",
    mod:[[6,5,6,"s"],[5,5,6,"m"],[6,4,4,"m"],[6,7,7,"m"]],
    bo:[], r1:arriba("R", 4), r2:cara(),
    extra:'<g class="tA">' + rects([[5,3,"t"],[5,8,"t"]]) + '</g><g class="tB">' + rects([[6,3,"t"],[6,8,"t"]]) + '</g>' +
          '<g class="tA" style="animation-delay:-.9s">' + rects([[5,8,"t"]]) + '</g>' },
  { id:"brava", n:"Brava", d:"Se pone roja, tiembla, saca humo y levanta el puño.", g:"¡Grrr!",
    mod:[[3,3,8,"e"],[6,4,7,"M"],[6,5,6,"W"]],
    bo:solo(5, 5, 4, 7, "M"), r1:arriba("R", 3),
    extra:'<rect class="rojo" x="2" y="4" width="8" height="3" fill="#FF3B3B"></rect>',
    fuera:'<g class="vena">' + rects([[1,10,"v"],[1,12,"v"],[2,11,"v"],[3,10,"v"],[3,12,"v"]]) + '</g>' +
          '<g class="humo">' + rects([[1,0,"W"],[0,1,"W"],[1,1,"W"]]).replace(/fill="#FFFFFF"/g, 'fill="#E8E8EE"') + '</g>' },
  { eval:true, id:"pulgar", n:"Pulgar arriba", d:"Guiña el ojo y sube el pulgar para decir 'vas muy bien'.", g:"¡Muy bien!",
    mod:SONRISA, bo:[], gu:[[4,7,"e"],[4,8,"e"]],
    r1:arriba("R", 5).concat(solo(3, 4, 11, 11, "s")), r2:arriba("R", 5).concat(solo(2, 3, 11, 11, "s")),
    extra:"", fuera:chispa(11, -2, 0) + chispa(-1, 1, .5) },
  { eval:true, id:"animo", n:"Ánimo", d:"Levanta el puño y grita para darle fuerzas a quien está en el examen.", g:"¡Tú puedes!",
    mod:SONRISA, bo:solo(6, 6, 5, 6, "W"), r1:arriba("R", 3), extra:"", fuera:chispa(-1, 0, 0) + chispa(11, -1, .5) },
  { eval:true, id:"pienso", n:"Pensando", d:"Mano en la barbilla, mueve la cabeza y le sale un signo de pregunta.", g:"Hmm...",
    mod:[[6,5,6,"s"],[6,6,7,"m"]], bo:[],
    r1:solo(5, 6, 9, 10, "S").concat(solo(7, 7, 10, 11, "l"), solo(8, 8, 10, 11, "g")),
    r2:solo(6, 7, 9, 10, "S").concat(solo(8, 8, 10, 11, "l")), extra:"", fuera:interrog },
  { eval:true, id:"copion", n:"Copión", d:"Mira de lado, susurra y pasa un papelito con la respuesta.", g:"Psst... 🤫",
    mod:[[4,7,7,"w"],[4,8,8,"e"],[6,5,6,"M"]], bo:[], gl:[[4,3,"e"],[4,4,"w"],[4,7,"e"],[4,8,"w"]],
    r1:arriba("R", 5).concat(papel(10)), r2:lado(5).concat(papel(11)),
    extra:sudor([3,1], [4,1], 0) },
  { eval:true, id:"amor", n:"Enamorado", d:"Ojos de corazón, mejillas rosadas y corazones que flotan.", g:"Ay, qué lindo 😍",
    mod:[[4,3,4,"H"],[4,7,8,"H"],[5,2,3,"r"],[5,8,9,"r"],[6,4,7,"m"]], bo:[],
    r1:arriba("R", 4), r2:cara(), extra:"", fuera:corazon(10, 2, 0) + corazon(-1, 1, .8) + corazon(10, -2, 1.6) },
  { eval:true, id:"ups", n:"¡Ups!", d:"Se equivocó: tiembla, suda y levanta las manos del susto.", g:"¡Ups!",
    mod:[[5,5,6,"M"],[6,5,6,"M"]], bo:[], r1:arriba("R", 3), l1:arriba("L", 3),
    extra:sudor([1,1], [2,1], 0),
    fuera:'<g class="vena">' + rects([[-2,10,"v"],[-1,10,"v"],[0,10,"v"],[2,10,"v"]]) + '</g>' },
  { rand:true, id:"moto", n:"En moto", d:"Maneja una moto a toda velocidad: la rueda gira y se ven las líneas de velocidad.", g:"¡Brum brum!",
    vb:"-1 -2 14 21", sy:18, mod:SIN_PIERNAS.concat(SONRISA, [[14,2,3,"p"],[14,8,9,"p"],[15,2,3,"f"],[15,8,9,"f"]]), bo:[],
    atras:rects(solo(13, 13, -1, 12, "q").concat([[13,-1,"z"],[13,12,"z"],[14,4,"q"],[14,5,"y"],[14,6,"y"],[14,7,"q"]], solo(15, 15, 4, 7, "R"))) +
          '<g class="ra">' + rects([[16,5,"z"],[16,6,"q"],[17,5,"q"],[17,6,"z"]]) + '</g><g class="rb">' + rects([[16,5,"q"],[16,6,"z"],[17,5,"z"],[17,6,"q"]]) + '</g>',
    extra:"", fuera:lineas(-1) + lineas(12) },
  { rand:true, id:"caballo", n:"A caballo", d:"Galopa montado en su caballo: sube y baja y las pezuñas se alternan.", g:"¡Arre!",
    vb:"-1 -2 14 22", sy:19, mod:SIN_PIERNAS.concat(SONRISA, [[13,2,3,"p"],[13,8,9,"p"],[14,2,2,"p"],[14,9,9,"p"],[15,2,2,"f"],[15,9,9,"f"]]), bo:[],
    atras:rects(solo(14, 16, 1, 10, "B").concat([[17,2,"B"],[17,3,"B"],[17,8,"B"],[17,9,"B"]])) +
          '<g class="hA">' + rects([[18,2,"b"],[18,3,"b"]]) + '</g><g class="hB">' + rects([[18,8,"b"],[18,9,"b"]]) + '</g>',
    extra:"", fuera:rects(solo(14, 16, 4, 7, "B").concat([[13,4,"b"],[13,7,"b"],[13,5,"R"],[13,6,"R"],[14,3,"N"],[14,8,"N"],[15,3,"N"],[15,8,"N"],[15,4,"z"],[15,7,"z"],[15,5,"W"],[15,6,"W"],[16,5,"W"],[16,6,"W"]], solo(17, 17, 4, 7, "C"), [[17,4,"z"],[17,7,"z"]])) },
  { rand:true, ancha:true, id:"pesca", n:"Pescando", d:"Sostiene la caña, el flotador se mece y de vez en cuando salta un pez.", g:"¡Algo picó!",
    vb:"-1 -2 19 18.8", mod:SONRISA, bo:[], r1:arriba("R", 5), r2:arriba("R", 6),
    extra:"", fuera:rects([[4,12,"N"],[3,12,"N"],[2,13,"N"],[1,14,"N"],[0,14,"N"],[-1,15,"N"],[-2,16,"N"]]) +
          '<rect x="16.4" y="-1.5" width=".2" height="14.5" fill="#F2F4F8"></rect>' +
          rects(solo(15, 16, 12, 17, "U")) + '<g class="wA">' + rects([[15,12,"t"],[15,14,"t"],[15,16,"t"]]) + '</g><g class="wB">' + rects([[15,13,"t"],[15,15,"t"],[15,17,"t"]]) + '</g>' +
          '<g class="bob">' + rects([[13,16,"W"],[14,16,"v"]]) + '</g>' +
          '<g class="pez">' + rects([[14,12,"O"],[14,13,"O"],[14,14,"y"]]) + '</g>' },
  { rand:true, id:"baile", n:"Bailando", d:"Salta al ritmo, alterna los brazos arriba y sueltan notas musicales.", g:"¡Qué ritmo! 🎵",
    mod:SONRISA.concat([[5,2,2,"r"],[5,9,9,"r"]]), bo:[], r1:arriba("R", 3), l1:arriba("L", 3),
    extra:"", fuera:nota(10, 1, 0) + nota(-1, 0, .8) + nota(10, -2, 1.6) },
  { rand:true, id:"dormido", n:"Dormido", d:"Se queda dormido: respira lento, ronca y le salen las Zzz.", g:"Zzz...",
    mod:[[4,3,4,"e"],[4,7,8,"e"]], bo:solo(5, 6, 5, 6, "M"), extra:"", fuera:zeta(10, 2, 0) + zeta(10, -2, 1.2) },
  { mas:true, id:"ceja", n:"Ceja levantada", d:"Mira de lado con una ceja arriba y media sonrisa, como dudando.", g:"¿En serio? 🤨",
    mod:[[3,3,8,"e"],[4,7,7,"w"],[4,8,8,"e"],[6,5,6,"m"],[5,7,7,"m"]], bo:[], gu:[[3,6,8,"h"],[2,6,8,"e"]], extra:"", fuera:interrog },
  { mas:true, id:"lloron", n:"Llorón", d:"Llora a mares con las manos en los ojos, la boca abierta y un charco en el piso.", g:"¡Buaaaa!",
    vb:"-1 -2 14 19.8", sy:17, mod:OJOS_CERRADOS.concat([[5,4,7,"M"],[6,4,7,"M"]]), bo:[[5,4,"s"],[5,7,"s"],[6,4,"s"],[6,7,"s"]],
    r1:cara(), r2:cara2(), l1:caraL(), l2:caraL2(), extra:lagrimas, fuera:rects(solo(16, 16, 1, 10, "U")) },
  { mas:true, id:"amoroso", n:"Amoroso", d:"Cierra los ojos, se sonroja y manda un beso volado con la mano.", g:"Muac 😘",
    vb:"-1 -2 16 18.8", mod:OJOS_CERRADOS.concat([[5,2,3,"r"],[5,8,9,"r"],[6,5,6,"H"]]), bo:[],
    r1:[[6,7,"S"],[6,8,"S"],[7,7,"S"],[7,8,"S"],[7,9,"l"],[8,9,"l"],[7,10,"g"],[7,11,"g"],[8,10,"g"],[8,11,"g"]], r2:lado(5),
    extra:"", fuera:'<g class="beso">' + rects([[2,12,"H"],[2,14,"H"],[3,12,"H"],[3,13,"H"],[3,14,"H"],[4,13,"H"]]) + '</g>' + corazon(-1, 1, .6) },
  { mas:true, id:"tonto", n:"Tonto", d:"Pone ojos locos, saca la lengua y agita los brazos sin sentido.", g:"¡Bleeeh! 🤪",
    mod:[[6,4,7,"M"],[7,5,6,"H"]], bo:[[8,5,"H"],[8,6,"H"]], gl:[[4,3,3,"e"],[4,4,4,"w"],[4,7,7,"w"],[4,8,8,"e"]],
    r1:arriba("R", 4), l1:arriba("L", 4), extra:"" },
  { mas:true, id:"carro", n:"En carro", d:"Maneja un carro rojo con volante, faros y llantas que giran.", g:"¡Piii piii!",
    vb:"-1 -2 14 19.8", sy:17, mod:SIN_PIERNAS.concat(SONRISA), bo:[], extra:"",
    fuera:rects(solo(-2, -1, -1, 12, "R").concat(solo(0, 10, -1, -1, "R"), solo(0, 10, 12, 12, "R"),
            [[8,4,"z"],[8,5,"z"],[8,6,"z"],[8,7,"z"],[9,3,"s"],[9,8,"s"],[10,4,"z"],[10,5,"z"],[10,6,"z"],[10,7,"z"]],
            solo(11, 13, -1, 12, "R"), solo(11, 11, 0, 11, "T"), [[12,0,"y"],[12,1,"y"],[12,10,"y"],[12,11,"y"]],
            solo(12, 12, 4, 7, "q"), solo(13, 13, 4, 7, "z"), solo(14, 14, -1, 12, "q"),
            solo(14, 16, -1, 1, "z"), solo(14, 16, 10, 12, "z"))) +
          '<g class="ra">' + rects([[15,0,"q"],[15,11,"z"]]) + '</g><g class="rb">' + rects([[15,0,"z"],[15,11,"q"]]) + '</g>' },
  { mas:true, id:"distraido", n:"Distraído", d:"Silba mirando para todos lados, siguiendo una mariposa que pasa.", g:"Mmm... ¿qué?",
    vb:"-1 -2 16 18.8", mod:[[4,7,7,"w"],[4,8,8,"e"],[6,5,6,"M"]], bo:[], gl:[[4,3,3,"e"],[4,4,4,"w"],[4,7,7,"e"],[4,8,8,"w"]],
    extra:"", fuera:mariposa + nota(-1, 1, 0) },
  { mas:true, id:"sorpresa", n:"Sorprendido", d:"Se asusta: ojos enormes, boca abierta, manos en la cara y signos de exclamación.", g:"¡¿Qué?!",
    mod:[[4,3,4,"w"],[4,7,8,"w"],[5,3,4,"w"],[5,7,8,"w"],[5,4,4,"e"],[5,7,7,"e"],[6,5,6,"M"]], bo:[],
    r1:cara(), l1:caraL(), extra:"", fuera:excl(10) + excl(0) },
  { mas:true, id:"cool", n:"Cool", d:"Con lentes oscuros, sonrisa de lado y se acomoda los lentes con la mano.", g:"Qué cool 😎",
    mod:[[4,3,8,"z"],[6,4,7,"m"],[5,8,8,"m"]], bo:[], gu:[[4,4,"W"],[4,7,"W"]],
    r1:arriba("R", 4), r2:cara(), extra:"", fuera:chispa(11, -1, 0) + chispa(-1, 0, .7) },
  { rx:true, id:"neg", n:"Diciendo no", d:"Mueve la cabeza de lado a lado y el dedo, con cara seria.", g:"¡No, no, no!",
    mod:[[3,3,8,"e"],[6,4,7,"m"]], bo:[], r1:arriba("R", 4), r2:lado(4), extra:"" },
  { rx:true, id:"afirma", n:"Diciendo sí", d:"Asiente con la cabeza una y otra vez con una gran sonrisa.", g:"¡Sí, sí, sí!",
    mod:SONRISA, bo:[], extra:"", fuera:chispa(11, -1, 0) },
  { rx:true, id:"miedo", n:"Con miedo", d:"Tiembla con los dientes castañeando, mira para todos lados y lo asusta un fantasma.", g:"¡Aaah! 😱",
    vb:"-1 -2 16 18.8", mod:[[4,3,4,"w"],[4,7,8,"w"],[5,3,4,"w"],[5,7,8,"w"],[5,4,4,"e"],[5,7,7,"e"],[6,4,4,"M"],[6,5,5,"m"],[6,6,6,"M"],[6,7,7,"m"]],
    bo:[[6,4,4,"m"],[6,5,5,"M"],[6,6,6,"m"],[6,7,7,"M"]], gl:[[5,3,3,"e"],[5,4,4,"w"],[5,7,7,"e"],[5,8,8,"w"]],
    r1:cara2(), l1:caraL2(), extra:sudor([3,1], [4,1], 0), fuera:fantasma },
  { rx:true, id:"ansiedad", n:"Ansiedad", d:"Se come las uñas, mira nervioso a todos lados y una nube lo sigue.", g:"Uy, uy, uy...",
    mod:[[4,7,7,"w"],[4,8,8,"e"],[6,5,6,"M"]], bo:[], gl:[[4,3,3,"e"],[4,4,4,"w"],[4,7,7,"e"],[4,8,8,"w"]],
    r1:MANOBOCA, r2:MANOBOCA2, extra:sudor([3,1], [4,1], 0) + sudor([2,10], [3,10], .5),
    fuera:'<g class="nube">' + rects(solo(-2, -2, 4, 7, "q").concat(solo(-1, -1, 3, 8, "q"))) + '</g>' },
  { rx:true, id:"frio", n:"Con frío", d:"Se abraza, le castañean los dientes, tiene la nariz roja y cae nieve.", g:"Brrr... 🥶",
    mod:OJOS_CERRADOS.concat([[5,5,6,"T"],[6,4,7,"M"],[10,2,9,"G"],[11,2,9,"G"],[10,2,2,"s"],[11,9,9,"s"]]), bo:[[6,4,7,"W"]],
    extra:"", fuera:copo(-1) + copo(3) + copo(7) + copo(11) },
  { rx:true, id:"enfermo", n:"Enfermo", d:"Está verde, con termómetro en la boca, la mano en la frente y muy decaído.", g:"Achú... 🤒",
    mod:OJOS_CERRADOS.concat([[5,5,6,"T"],[6,5,6,"M"]]), bo:[], r1:cara(),
    extra:'<rect class="rojo" x="2" y="3" width="8" height="4" fill="#7BC96F"></rect>' + rects([[6,7,"W"],[6,8,"W"],[6,9,"W"],[6,10,"v"]]) + sudor([3,1], [4,1], 0) },
  { rx:true, id:"hambre", n:"Con hambre", d:"Se le hace agua la boca, estira la mano hacia una pizza y le ruge la panza.", g:"¡Tengo hambre! 🍕",
    vb:"-1 -2 16 18.8", mod:[[6,4,7,"M"]], bo:[], r1:lado(6), r2:lado(5), extra:sudor([7,4], [8,4], 0), fuera:pizza },
  { rx:true, id:"idea", n:"¡Una idea!", d:"Levanta el dedo y se le prende un foco sobre la cabeza.", g:"¡Ya sé!",
    vb:"-1 -3 14 19.8", mod:SONRISA, bo:[], r1:arriba("R", 1), r2:arriba("R", 2), extra:"", fuera:bombilla },
  { her:true, id:"ejer", n:"Haciendo ejercicio", d:"Levanta una pesa con los dos brazos, aprieta los dientes y se pone rojo del esfuerzo.", g:"¡Uno más! 💪",
    vb:"-1 -4 14 20.8", mod:[[3,3,8,"e"],[6,4,7,"W"]], bo:[],
    r1:arriba("R", 0).concat(barra(-1)), r2:arriba("R", 3).concat(barra(2)), l1:arriba("L", 0), l2:arriba("L", 3),
    extra:'<rect class="rojo" x="2" y="4" width="8" height="3" fill="#FF3B3B"></rect>' },
  { her:true, id:"copa", n:"Ganando la copa", d:"Levanta un trofeo dorado, salta de alegría y le cae confeti.", g:"¡Campeón! 🏆",
    vb:"-1 -3 16 19.8", mod:SONRISA.concat([[5,2,2,"r"],[5,9,9,"r"]]), bo:[],
    r1:arriba("R", 3).concat(copaC(-1)), r2:arriba("R", 2).concat(copaC(-2)), l1:arriba("L", 3), l2:arriba("L", 4),
    extra:"", fuera:confeti(-1, "#FF4D4D", 0) + confeti(2, "#3FD8C8", .5) + confeti(5, "#FFC83D", 1) + confeti(8, "#8E5BD6", 1.5) + confeti(12, "#5DB33A", .3) + confeti(14, "#FF4D8D", 1.1) },
  { her:true, id:"super", n:"Poder máximo", d:"Se le para el pelo dorado, lo rodea un aura de fuego con rayos y grita levitando.", g:"¡Poder máximo! ⚡",
    vb:"-1 -4 14 20.8", mod:[[0,3,8,"y"],[1,2,9,"y"],[2,2,9,"y"],[3,2,9,"y"],[4,4,4,"c"],[4,7,7,"c"],[6,4,7,"W"]], bo:solo(5, 6, 5, 6, "M"),
    atras:'<rect class="rojo" x="-1" y="-4" width="14" height="20.8" fill="#FFC83D"></rect>' +
          '<g class="m1">' + rects(llamas([7,5,5,7])) + '</g><g class="m2">' + rects(llamas([5,8,8,5])) + '</g>' +
          '<g class="b1">' + rects([[2,-1,"c"],[3,0,"c"],[4,-1,"c"],[5,0,"c"],[4,12,"c"],[5,11,"c"],[6,12,"c"],[7,11,"c"]]) + '</g>' +
          '<g class="b2">' + rects([[6,-1,"c"],[7,0,"c"],[8,-1,"c"],[9,0,"c"],[1,12,"c"],[2,11,"c"],[3,12,"c"],[4,11,"c"]]) + '</g>',
    extra:'<g class="m1">' + rects([[-1,3,"y"],[-1,5,"y"],[-1,6,"y"],[-1,8,"y"],[-2,4,"y"],[-2,7,"y"],[-3,5,"y"]]) + '</g><g class="m2">' + rects([[-1,3,"y"],[-1,4,"y"],[-1,7,"y"],[-1,8,"y"],[-2,3,"y"],[-2,6,"y"],[-2,8,"y"],[-3,4,"y"],[-3,7,"y"]]) + '</g>' },
  { her:true, id:"heroe", n:"Superhéroe", d:"Se pone el antifaz con la mano y levanta el puño con la capa al viento.", g:"¡Súper Gamer! 🦸",
    mod:SONRISA.concat([[9,5,6,"y"],[10,5,6,"y"]]), bo:[], gu:[[4,2,"R"],[4,5,"R"],[4,6,"R"],[4,9,"R"]],
    r1:arriba("R", 3), r2:cara(),
    atras:'<g class="m1">' + rects(CAPA_A) + '</g><g class="m2">' + rects(CAPA_B) + '</g>', extra:"", fuera:chispa(11, -1, 0) + chispa(-1, 1, .6) }
];

// acepta [fila, col, color] o [fila, col1, col2, color]
const px = l => rects(l.reduce((o, x) => o.concat(x.length === 4 ? solo(x[0], x[0], x[1], x[2], x[3]) : [x]), []));
const mosca = '<g class="mari"><g class="m1">' + rects([[1,12,"z"],[0,11,"W"],[0,13,"W"]]) + '</g><g class="m2">' + rects([[1,12,"z"],[1,11,"W"],[1,13,"W"]]) + '</g></g>';
const simbolo = (x, y, d) => '<g class="cor" style="animation-delay:' + d + 's">' + rects([[y,x+1,"c"],[y+1,x,"c"],[y+1,x+1,"c"],[y+1,x+2,"c"],[y+2,x+1,"c"]]) + '</g>';
const TABLERO = '<rect x="14" y="16" width="7" height=".6" fill="#000" opacity=".4"></rect>' +
  rects(solo(1, 10, 14, 20, "K").concat(solo(2, 9, 15, 19, "A"), solo(11, 15, 15, 15, "K"), solo(11, 15, 19, 19, "K"), [[10,17,"W"],[10,18,"W"]])) +
  '<g class="e1">' + rects(solo(3, 7, 15, 15, "W").concat([[5,16,"W"]])) + '</g>' +
  '<g class="e2">' + rects(solo(3, 7, 17, 17, "W")) + '</g>' +
  '<g class="e3">' + rects([[3,19,"W"]].concat(solo(5, 7, 19, 19, "W"))) + '</g>';
const LIBRO = rects(solo(7, 8, 0, 1, "g").concat(solo(7, 8, 10, 11, "g"), solo(9, 9, 0, 1, "l"), solo(9, 9, 10, 11, "l"),
    solo(10, 13, 1, 10, "R"), solo(9, 12, 2, 5, "W"), solo(9, 12, 6, 9, "W"), [[12,5,"q"],[12,6,"q"]],
    [[10,3,"q"],[10,4,"q"],[11,3,"q"],[10,7,"q"],[10,8,"q"],[11,7,"q"],[11,8,"q"]],
    solo(10, 11, 0, 1, "s"), solo(10, 11, 10, 11, "s"))) +
  '<g class="f1">' + rects(solo(8, 12, 7, 8, "W").concat(solo(8, 12, 9, 9, "q"))) + '</g>' +
  '<g class="f2">' + rects(solo(7, 12, 5, 6, "W").concat([[7,5,"q"]])) + '</g>' +
  '<g class="f3">' + rects(solo(8, 12, 3, 4, "W").concat(solo(8, 12, 2, 2, "q"))) + '</g>';
const CUADERNO = rects(solo(7, 9, 0, 1, "g").concat(solo(10, 10, 0, 1, "l"), solo(7, 9, 10, 11, "g"), solo(10, 10, 10, 11, "l"),
    solo(10, 13, 1, 8, "W"), [[10,2,"q"],[10,4,"q"],[10,6,"q"],[10,8,"q"]], solo(11, 12, 0, 1, "s"))) +
  '<g class="e1">' + rects(solo(11, 11, 2, 6, "U")) + '</g>' +
  '<g class="e2">' + rects(solo(12, 12, 2, 7, "U")) + '</g>' +
  '<g class="e3">' + rects(solo(13, 13, 2, 5, "U")) + '</g>' +
  '<g class="lapiz">' + rects(solo(11, 12, 9, 10, "s").concat([[12,8,"N"],[10,10,"y"],[9,11,"y"],[8,12,"H"]])) + '</g>';
const CONTROL = rects(solo(7, 9, 0, 1, "g").concat(solo(7, 9, 10, 11, "g"), solo(10, 10, 0, 1, "l"), solo(10, 10, 10, 11, "l"),
    solo(10, 12, 2, 9, "D"), [[13,2,"D"],[13,3,"D"],[13,8,"D"],[13,9,"D"]],
    [[10,4,"q"],[11,3,"q"],[11,4,"q"],[11,5,"q"],[12,4,"q"]], [[10,7,"y"],[11,8,"U"],[12,7,"R"]],
    solo(11, 12, 1, 2, "s"), solo(11, 12, 9, 10, "s"))) +
  '<g class="pa">' + rects([[11,4,"s"]]) + '</g><g class="pb">' + rects([[11,8,"s"],[10,7,"W"]]) + '</g>';
const AUDIFONOS = rects(solo(-1, -1, 3, 8, "G").concat([[0,2,"G"],[0,9,"G"],[1,1,"G"],[1,10,"G"],[2,1,"G"],[2,10,"G"]],
    solo(3, 5, 1, 2, "R"), solo(3, 5, 9, 10, "R"), [[4,1,"T"],[4,10,"T"]]));
const LUPA = solo(7, 8, 10, 11, "g").concat(solo(9, 10, 10, 11, "s"), [[7,9,"K"],[8,10,"K"]],
    [[3,7,"y"],[3,8,"y"],[4,6,"y"],[4,9,"y"],[5,6,"y"],[5,9,"y"],[6,7,"y"],[6,8,"y"]],
    [[4,7,"W"],[4,8,"W"],[5,7,"W"],[5,8,"W"]]);

const NUEVAS = [
  { clase:true, id:"aburrido", n:"Aburrido", d:"Apoya la cara en la mano, bosteza cada rato y mira una mosca que da vueltas.", g:"Qué aburrido... 😑",
    vb:"-1 -2 16 18.8", mod:[[4,3,3,"S"],[4,8,8,"S"],[6,4,7,"m"]],
    bo:[[5,5,"M"],[5,6,"M"],[6,5,"M"],[6,6,"M"]], gu:[[4,3,4,"e"],[4,7,8,"e"]],
    r1:cara(), extra:"", fuera:mosca },
  { clase:true, ancha:true, id:"ensena", n:"Enseñando", d:"Explica señalando el tablero con un puntero mientras aparece escrito 'Hi' con tiza.", g:"Repeat after me! 👩‍🏫",
    vb:"-1 -2 22 18.8", mod:SONRISA, bo:solo(5, 6, 5, 6, "M"),
    r1:lado(4).concat([[4,13,"B"],[4,14,"B"],[4,15,"R"]]), r2:lado(5).concat([[6,13,"B"],[6,14,"B"],[6,15,"R"]]),
    atras:TABLERO, extra:"" },
  { clase:true, id:"leer", n:"Leyendo", d:"Sostiene un libro abierto, sus ojos siguen las líneas y de vez en cuando pasa la página.", g:"Once upon a time... 📖",
    mod:[], bo:[], gl:[[4,3,"e"],[4,4,"w"],[4,7,"e"],[4,8,"w"]], dentro:LIBRO, extra:"" },
  { clase:true, id:"nerd", n:"Nerd", d:"Gafas gruesas que brillan, corbatín y lápices en el bolsillo; se acomoda las gafas y levanta el dedo.", g:"Well, actually... 🤓",
    mod:[[3,2,9,"z"],[4,2,2,"z"],[4,3,4,"W"],[4,5,6,"z"],[4,7,8,"W"],[4,9,9,"z"],
         [5,2,2,"z"],[5,3,3,"W"],[5,4,4,"e"],[5,5,6,"z"],[5,7,7,"e"],[5,8,8,"W"],[5,9,9,"z"],[6,4,7,"M"],[6,5,6,"W"],
         [7,4,4,"P"],[7,7,7,"P"],[7,5,6,"V"],[7,8,8,"U"],[7,9,9,"R"],[8,8,9,"W"]],
    bo:[], gu:[[5,4,"W"],[5,7,"W"],[4,3,"t"],[4,8,"t"]],
    r1:cara(), r2:arriba("R", 5).concat(solo(3, 4, 11, 11, "s")), extra:"", fuera:simbolo(-1, 1, 0) + simbolo(10, -1, 1.2) },
  { clase:true, id:"escribir", n:"Escribiendo", d:"Toma apuntes en su cuaderno: el lápiz garabatea y van apareciendo las palabras.", g:"Taking notes ✏️",
    mod:[[6,7,7,"H"]], bo:[], dentro:CUADERNO, extra:"" },
  { clase:true, id:"mano", n:"Levanta la mano", d:"Sabe la respuesta: salta y estira la mano bien alto para que lo escojan.", g:"Me! Me! 🙋",
    mod:SONRISA.concat([[5,2,2,"r"],[5,9,9,"r"]]), bo:solo(6, 6, 5, 6, "W"),
    r1:arriba("R", 0), r2:arriba("R", 1), extra:"", fuera:excl(0) },
  { clase:true, id:"detective", n:"Detective", d:"Con gorro de investigador, mira por la lupa con un ojo gigante buscando pistas.", g:"A clue! 🔍",
    mod:[[0,3,8,"B"],[0,4,4,"b"],[0,6,6,"b"],[0,8,8,"b"],[1,2,9,"b"],[1,3,3,"B"],[1,5,5,"B"],[1,7,7,"B"],[1,9,9,"B"],[2,1,10,"N"],[4,3,4,"e"],[6,4,6,"m"]],
    bo:[], r1:LUPA, dentro:'<g class="xa">' + rects([[5,7,"e"],[5,8,"e"]]) + '</g><g class="xb">' + rects([[4,8,"e"],[5,8,"e"]]) + '</g>',
    extra:rects([[-1,5,"b"],[-1,6,"b"]]), fuera:interrog },
  { libre:true, id:"gamer", n:"Jugando", d:"Aprieta los botones del control a toda velocidad, saca la lengua y la pantalla le ilumina la cara.", g:"GG! 🎮",
    mod:[[3,3,4,"e"],[3,7,8,"e"],[6,4,7,"M"],[6,7,7,"H"]], bo:[], dentro:CONTROL,
    extra:'<rect class="brillo" x="2" y="3" width="8" height="4" fill="#6EC6FF"></rect>',
    fuera:'<g class="cor">' + rects([[1,11,"y"],[1,12,"y"],[2,11,"y"],[2,12,"O"]]) + '</g>' + chispa(-1, 0, .6) },
  { libre:true, id:"musica", n:"Con audífonos", d:"Cierra los ojos, mueve la cabeza al ritmo y le salen notas musicales.", g:"Listening... 🎧",
    mod:OJOS_CERRADOS.concat(SONRISA), bo:[], extra:AUDIFONOS, fuera:nota(10, 1, 0) + nota(-1, 0, .8) + nota(10, -2, 1.6) },
  { libre:true, id:"cantar", n:"Cantando", d:"Canta con un micrófono, abre el brazo con emoción y lo ilumina un reflector.", g:"La la la 🎤",
    mod:OJOS_CERRADOS.concat([[5,2,2,"r"],[5,9,9,"r"],[6,4,7,"M"]]), bo:solo(5, 6, 5, 6, "M"),
    r1:solo(7, 8, 11, 11, "g").concat(solo(9, 10, 10, 11, "g"), solo(7, 8, 9, 10, "s"), [[5,7,"q"],[5,8,"G"],[6,7,"G"],[6,8,"G"],[7,8,"z"],[8,8,"z"]]),
    l1:arriba("L", 3), atras:'<polygon class="foco" points="4,-2 8,-2 12,16 0,16" fill="#FFC83D"></polygon>',
    extra:"", fuera:nota(10, 0, 0) + nota(-1, -1, 1) },
  { libre:true, id:"selfie", n:"Selfie", d:"Levanta el celular, hace el signo de paz, guiña el ojo y ¡flash! se toma una foto.", g:"Say cheese! 📸",
    mod:SONRISA.concat([[5,2,2,"r"],[5,9,9,"r"]]), bo:[], gu:[[4,7,"e"],[4,8,"e"]],
    r1:arriba("R", 3).concat(solo(0, 2, 10, 11, "D"), [[0,11,"q"]]),
    l1:arriba("L", 4).concat([[3,0,"s"],[3,1,"s"],[2,-1,"s"],[2,1,"s"]]), extra:"",
    fuera:'<g class="flash">' + rects([[-2,11,"y"],[-1,10,"y"],[-1,11,"W"],[-1,12,"y"]]) + '</g>' +
          '<rect class="flash" x="-1" y="-2" width="14" height="18.8" fill="#FFFFFF"></rect>' }
];
ACCIONES.push(...NUEVAS);

function dibujar(a) {
  const g = BASE.map(f => f.split(""));
  a.mod.forEach(m => { for (let c = m[1]; c <= m[2]; c++) g[m[0]][c] = m[3]; });
  const cab = [], cue = [], rd = [], ld = [];
  g.forEach((fila, r) => fila.forEach((k, c) => {
    if (k === ".") return;
    const x = [r, c, k];
    if (r <= 6) cab.push(x); else if (r <= 13 && c >= 10) rd.push(x); else if (r <= 13 && c <= 1) ld.push(x); else cue.push(x);
  }));
  const ojos = [[4,3,"e"],[4,4,"e"],[4,7,"e"],[4,8,"e"]];
  return '<svg class="' + a.id + '" viewBox="' + (a.vb || "-1 -2 14 18.8") + '" shape-rendering="crispEdges" role="img" aria-label="' + a.n + '">' +
    '<rect x="2" y="' + (a.sy || 16) + '" width="8" height=".6" fill="#000" opacity=".4"></rect><g class="atras">' + (a.atras || "") + '</g>' +
    '<g class="mov">' + rects(cue) +
    '<g class="cab">' + rects(cab) + '<g class="oc">' + rects(ojos) + '</g><g class="gu">' + px(a.gu || []) + '</g><g class="gl">' + px(a.gl || []) + '</g><g class="bo">' + rects(a.bo) + '</g>' + a.extra + '</g>' +
    '<g class="ld">' + rects(ld) + '</g><g class="l1">' + rects(a.l1 || []) + '</g><g class="l2">' + rects(a.l2 || []) + '</g>' +
    '<g class="rd">' + rects(rd) + '</g><g class="r1">' + rects(a.r1 || []) + '</g><g class="r2">' + rects(a.r2 || []) + '</g>' + (a.dentro || "") +
    '</g><g class="fuera">' + (a.fuera || "") + '</g></svg>';
}

  const M = {}; ACCIONES.forEach(a => { M[a.id] = a; });
  return (id, w) => { const a = M[id]; if (!a) return ""; const s = dibujar(a).replace(/class="([^"]+)"/g, (m, c) => 'class="' + c.split(" ").map(x => "ga-" + x).join(" ") + '"');
    return '<span class="gax" style="width:' + (w || 80) + 'px">' + s + '</span>'; };
})();
