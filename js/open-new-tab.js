/**
 * Fuerza que Cronograma, Campus Virtual y WhatsApp abran en nueva pestaña
 */
(function() {
  function init() {
    var links = document.querySelectorAll('a[href="cronograma.pdf"], a[href*="moodle/login"], a[href*="wa.me"], a[href*="youtube.com/watch"], a[href*="youtu.be"]');
    links.forEach(function(a) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        window.open(this.href, '_blank', 'noopener,noreferrer');
        e.preventDefault();
      }, true);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
