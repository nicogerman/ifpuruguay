<?php
/**
 * Script para asignar permisos correctos en Bluehost.
 * 
 * USO:
 * 1. Subí todos los archivos a public_html
 * 2. Visitá: https://tudominio.edu.uy/fix-permissions.php
 * 3. BORRÁ este archivo después (por seguridad)
 * 
 * En Bluehost: carpetas 755, archivos 644
 */
$baseDir = __DIR__;
$dirPerms = 0755;
$filePerms = 0644;
$log = [];
$ok = true;

function fixPermissionsRecursive($dir, $baseDir, $dirPerms, $filePerms, &$log, &$ok) {
    if (!is_dir($dir)) return;
    $relBase = strlen($baseDir) + 1;
    $skip = ['.', '..', '.git', 'node_modules', 'pwa-mvp'];
    
    foreach (scandir($dir) as $item) {
        if (in_array($item, $skip)) continue;
        $path = $dir . DIRECTORY_SEPARATOR . $item;
        $rel = substr($path, $relBase);
        if (is_dir($path)) {
            if (@chmod($path, $dirPerms)) {
                $log[] = "OK carpeta: $rel → 755";
            } else {
                $log[] = "Error carpeta: $rel (actual: " . substr(sprintf('%o', fileperms($path)), -4) . ")";
                $ok = false;
            }
            fixPermissionsRecursive($path, $baseDir, $dirPerms, $filePerms, $log, $ok);
        } else {
            if (@chmod($path, $filePerms)) {
                $log[] = "OK archivo: $rel → 644";
            } else {
                $log[] = "Error archivo: $rel";
                $ok = false;
            }
        }
    }
}

// Raíz: carpetas
foreach (scandir($baseDir) as $item) {
    if ($item === '.' || $item === '..' || $item === 'fix-permissions.php') continue;
    $path = $baseDir . DIRECTORY_SEPARATOR . $item;
    if (is_dir($path) && !in_array($item, ['.git', 'node_modules', 'pwa-mvp'])) {
        if (@chmod($path, $dirPerms)) {
            $log[] = "OK carpeta: $item → 755";
        }
        fixPermissionsRecursive($path, $baseDir, $dirPerms, $filePerms, $log, $ok);
    } elseif (is_file($path)) {
        if (@chmod($path, $filePerms)) {
            $log[] = "OK archivo: $item → 644";
        }
    }
}

// Archivos en raíz
foreach (glob($baseDir . '/*') as $f) {
    if (is_file($f)) {
        $name = basename($f);
        if ($name === 'fix-permissions.php') continue;
        if (@chmod($f, $filePerms)) {
            $log[] = "OK raíz: $name → 644";
        }
    }
}

header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Permisos Bluehost</title></head><body style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px">';
echo '<h1>Resultado de permisos</h1><pre style="background:#f5f5f5;padding:15px;overflow:auto;max-height:400px">';
echo implode("\n", $log);
echo '</pre><p><strong>' . count($log) . ' elementos procesados.</strong></p>';
if ($ok) {
    echo '<p style="color:green">Listo. <strong>Borrar fix-permissions.php</strong> por seguridad.</p>';
} else {
    echo '<p style="color:orange">Algunos no se pudieron cambiar. En cPanel → Administrador de archivos → clic derecho → Cambiar permisos.</p>';
}
echo '</body></html>';
