# Subir IFP a Bluehost – evitar problemas de permisos

## Opción A: Borrar y subir de nuevo (recomendada si tenés 403)

1. **En cPanel → Administrador de archivos**:
   - Entrá a `public_html`
   - Seleccioná **todo** (archivos y carpetas)
   - Clic derecho → **Eliminar**
   - Confirmá (solo si tenés backup o podés volver a subir)

2. **Subir los archivos**:
   - Por FTP (FileZilla, etc.): subí la carpeta del proyecto a `public_html`
   - O por cPanel: Subir archivos → elegir el .zip → Extraer

3. **Asignar permisos correctos**:
   - Visitá: `https://tudominio.edu.uy/fix-permissions.php`
   - Esperá a que termine y mostré "OK"
   - Borrá `fix-permissions.php` desde cPanel (clic derecho → Eliminar)

---

## Opción B: Subir con permisos correctos desde el principio

Si usás **FileZilla** u otro FTP:

- Carpetas: **755** (clic derecho → Permisos de archivo)
- Archivos (.html, .css, .js, .jpg, .php): **644**

En cPanel → Administrador de archivos:

- Para cada carpeta: clic derecho → Cambiar permisos → `755`
- Para cada archivo: clic derecho → Cambiar permisos → `644`

---

## Valores correctos en Bluehost

| Tipo   | Permisos | Descripción      |
|--------|----------|------------------|
| Carpetas | **755** | rwxr-xr-x        |
| Archivos | **644** | rw-r--r--        |

---

## Si seguís con 403 después de fix-permissions.php

1. Comprobá que `public_html` tiene permisos **755**
2. Revisá que `index.html` o `home.html` exista y tenga **644**
3. Los archivos `curso-1.html` a `curso-20.html` deben tener **644**
4. La carpeta `images/` debe tener **755** y las imágenes **644**
5. El `.htaccess` incluye reglas para permitir HTML, CSS, JS e imágenes
6. Si usás subdominio, verificá que la carpeta del subdominio tenga **755**
7. En cPanel → Configuración de PHP → buscá “open_basedir” u otras restricciones
