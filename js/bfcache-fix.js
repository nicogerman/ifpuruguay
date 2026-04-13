/**
 * Corrige que al volver atrás (flecha) la página se vea en blanco.
 * Cuando el navegador restaura desde caché (bfcache), a veces el header no se pinta.
 * Recargar asegura que todo se renderice correctamente.
 * Nota: cursos.html tiene además un script inline en head para máxima prioridad.
 */
window.addEventListener('pageshow', function(e) {
  if (e.persisted) {
    window.location.reload();
  }
});
