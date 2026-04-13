/**
 * Móvil: hint "Menú", barra de accesos visibles, y texto de contexto en el pie por página.
 */
(function () {
  function pageKey() {
    var p = (location.pathname || "").split("/").pop() || "";
    p = decodeURIComponent(p).replace(/^\s+|\s+$/g, "");
    if (!p || p === "index.html") return "home.html";
    return p;
  }

  function footerMessage(key) {
    var map = {
      "home.html":
        "Inicio: bienvenida, cursos destacados y capacitación con realidad virtual.",
      "Quienes-somos.html":
        "¿Quiénes somos?: el instituto, cifras y equipo.",
      "cursos.html": "Cursos: catálogo completo y temáticas.",
      "contacts.html":
        "Contacto: datos, ubicación y formulario de consulta o inscripción.",
      "catalogo-ergonomia-sst.html":
        "Catálogo: talleres ISO de ergonomía y manipulación manual.",
    };
    if (map[key]) return map[key];
    if (key === "curso-16.html") {
      return "Factores psicosociales: ficha del curso y oferta ampliada (psicosocial y salud mental) más abajo.";
    }
    if (/^curso-\d+\.html$/i.test(key)) {
      return "Ficha del curso. Listado completo: menú o «Inicio» → Cursos.";
    }
    return "Instituto de Formación en Prevención.";
  }

  function init() {
    var mq = window.matchMedia("(max-width: 991px)");
    if (!mq.matches) return;

    var head = document.querySelector(".page-head");
    if (head && !document.querySelector(".ifp-quicknav")) {
      var nav = document.createElement("nav");
      nav.className = "ifp-quicknav";
      nav.setAttribute("aria-label", "Acceso rápido");
      var cur = pageKey();
      var moodle = "https://www.ifp.edu.uy/moodle/login/index.php";
      var items = [
        { href: "home.html", label: "Inicio", match: "home.html" },
        { href: "cursos.html", label: "Cursos", match: "cursos" },
        {
          href: moodle,
          label: "Campus",
          match: null,
          external: true,
        },
        { href: "contacts.html", label: "Contacto", match: "contacts.html" },
      ];
      function isCursosSection(page) {
        if (page === "cursos.html" || page === "catalogo-ergonomia-sst.html")
          return true;
        return /^curso-\d+\.html$/i.test(page);
      }
      items.forEach(function (item) {
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        if (item.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        var active = false;
        if (item.match === "home.html" && (cur === "home.html" || cur === "index.html" || !cur))
          active = true;
        else if (item.match && cur === item.match) active = true;
        else if (item.match === "cursos" && isCursosSection(cur)) active = true;
        if (active) a.classList.add("ifp-quicknav-active");
        nav.appendChild(a);
      });
      head.insertAdjacentElement("afterend", nav);
    }

    var panel = document.querySelector(".rd-navbar-panel");
    if (panel && !panel.querySelector(".ifp-menu-hint")) {
      var toggle = panel.querySelector(".rd-navbar-toggle");
      if (toggle) {
        var hint = document.createElement("span");
        hint.className = "ifp-menu-hint";
        hint.textContent = "Menú";
        panel.insertBefore(hint, toggle);
      }
    }

    var footCol = document.querySelector(
      ".page-footer-classic .row-55 > .col-md-6.col-xl-3",
    );
    if (footCol && !footCol.querySelector(".ifp-footer-context")) {
      var ctx = document.createElement("p");
      ctx.className = "ifp-footer-context";
      ctx.textContent = footerMessage(pageKey());
      var first = footCol.firstElementChild;
      if (first) footCol.insertBefore(ctx, first);
      else footCol.appendChild(ctx);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
