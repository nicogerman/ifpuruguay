/**
 * Menú móvil - un solo botón (hamburguesa) despliega todo:
 * navegación + contacto. El botón de puntos está oculto.
 */
(function() {
  function initMobileMenu() {
    var toggle = document.querySelector('.rd-navbar-toggle[data-rd-navbar-toggle=".rd-navbar-nav-wrap"]');
    var navWrap = document.querySelector('.rd-navbar-nav-wrap');
    var collapse = document.querySelector('.rd-navbar-collapse');

    function closeAll() {
      if (navWrap) navWrap.classList.remove('active');
      if (collapse) collapse.classList.remove('active');
      if (toggle) toggle.classList.remove('active');
    }

    function openAll() {
      if (navWrap) navWrap.classList.add('active');
      if (collapse) collapse.classList.add('active');
      if (toggle) toggle.classList.add('active');
    }

    if (toggle && (navWrap || collapse)) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var isOpen = navWrap && navWrap.classList.contains('active');
        if (isOpen) {
          closeAll();
        } else {
          openAll();
        }
      }, true); // capture: ejecutar antes del plugin RDNavbar
    }

    // Cerrar al hacer clic en un enlace
    if (navWrap) {
      var links = navWrap.querySelectorAll('a[href^="http"], a[href$=".html"], a[href^="/"], a[href$=".pdf"]');
      links.forEach(function(link) {
        link.addEventListener('click', closeAll);
      });
    }

    // Cerrar al hacer clic fuera (backdrop)
    document.addEventListener('click', function(e) {
      if (!toggle || !navWrap || !navWrap.classList.contains('active')) return;
      if (!toggle.contains(e.target) && !navWrap.contains(e.target) && !(collapse && collapse.contains(e.target))) {
        closeAll();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
