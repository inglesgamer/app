/* ===== InglésGamer · puente con la app nativa (Capacitor) =====
   Solo lo usa la app nativa: el proyecto Capacitor lo mete en cada pantalla al copiar
   (scripts/copiar-pantallas.js). La web de GitHub y App Creator no lo cargan.
   En la web de GitHub no existe: las pantallas deben preguntar  if (window.IGAnuncio && IGAnuncio.disponible())

   ANUNCIO CON PREMIO:
     IGAnuncio.recompensa().then(function (r) {
       // r = "ok"      -> vio el anuncio completo: dar el premio
       // r = "cerrado" -> lo cerró antes de tiempo: no dar premio
       // r = "error"   -> no cargó (sin internet, sin anuncios): no dar premio
     });
*/
(function () {
  "use strict";

  var ADMOB = {
    // true = anuncios DE PRUEBA de Google (para desarrollar sin riesgo).
    // Cambiar a false solo cuando se publique en Play Store.
    PRUEBA: true,
    RECOMPENSADO: "ca-app-pub-9906496327838261/7532842716"   // recompensado_saltar
  };

  function cap() { return window.Capacitor; }
  function nativo() { var c = cap(); return !!(c && c.isNativePlatform && c.isNativePlatform()); }

  var plugin = null;
  function admob() {
    if (plugin) return plugin;
    var c = cap(); if (!c) return null;
    plugin = (c.Plugins && c.Plugins.AdMob) || (c.registerPlugin ? c.registerPlugin("AdMob") : null);
    return plugin;
  }

  var iniciado = null;
  function iniciar() {
    if (iniciado) return iniciado;
    var A = admob();
    iniciado = A ? A.initialize({ initializeForTesting: ADMOB.PRUEBA }).catch(function (e) { falla("initialize", e); }) : Promise.resolve();
    return iniciado;
  }

  function txt(e) { try { return (e && (e.message || e.errorMessage || JSON.stringify(e))) || String(e); } catch (x) { return String(e); } }
  function falla(donde, e) {
    var m = donde + ": " + txt(e);
    window.IGAnuncio && (window.IGAnuncio.ultimoError = m);
    if (ADMOB.PRUEBA) { try { alert("[Prueba AdMob] " + m); } catch (x) {} }   // solo en modo prueba
  }

  var ocupado = false;
  function recompensa() {
    var A = admob();
    if (!nativo() || !A) { falla("puente", "no hay plugin AdMob"); return Promise.resolve("error"); }
    if (ocupado) return Promise.resolve("cerrado");
    ocupado = true;

    return new Promise(function (fin) {
      var gano = false, listo = false, hs = [];
      function escuchar(ev, fn) { A.addListener(ev, fn).then(function (h) { hs.push(h); }); }
      function terminar(r) {
        if (listo) return; listo = true; ocupado = false;
        hs.forEach(function (h) { try { h.remove(); } catch (e) {} });
        fin(r);
      }
      escuchar("onRewardedVideoAdReward", function () { gano = true; });
      escuchar("onRewardedVideoAdDismissed", function () { setTimeout(function () { terminar(gano ? "ok" : "cerrado"); }, 300); });
      escuchar("onRewardedVideoAdFailedToShow", function (e) { falla("no se pudo mostrar", e); terminar("error"); });
      escuchar("onRewardedVideoAdFailedToLoad", function (e) { falla("no cargó", e); terminar("error"); });

      var paso = "iniciar";
      iniciar()
        .then(function () { paso = "cargar"; return A.prepareRewardVideoAd({ adId: ADMOB.RECOMPENSADO, isTesting: ADMOB.PRUEBA }); })
        .then(function () { paso = "mostrar"; return A.showRewardVideoAd(); })
        .then(function () { gano = true; })          // resuelve cuando ganó el premio
        .catch(function (e) { if (!gano && !listo) { falla(paso, e); terminar("error"); } });

      setTimeout(function () { if (!gano) terminar("error"); }, 120000); // por si algo se queda colgado
    });
  }

  window.IGAnuncio = {
    disponible: function () { return nativo() && !!admob(); },
    recompensa: recompensa,
    prueba: ADMOB.PRUEBA
  };
  window.IGNativo = nativo();

  if (nativo()) setTimeout(iniciar, 1500);   // calienta AdMob sin frenar la pantalla
})();
