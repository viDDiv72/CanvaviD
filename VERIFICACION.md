# Verificación de CanvaviD 1.0

Fecha: 24/10/2026. Plataforma de ejecución: Windows x64 de este equipo.

- 4 pruebas unitarias del formato de documento y SVG: correctas.
- Prueba automatizada de Electron en desarrollo: correcta.
- Prueba de la aplicación empaquetada: correcta.
- Instalación real mediante el instalador NSIS: código de salida 0.
- Prueba automatizada de la copia instalada en AppData/Local/Programs/canvavid: correcta.
- Añadir, editar color y texto, deshacer/rehacer, duplicar/eliminar, páginas, gráfico y QR: correctos.
- Guardar y reabrir proyecto con imágenes incrustadas: correcto.
- PNG, JPG, SVG, PDF de dos páginas, PPTX de dos diapositivas y HTML: generados y comprobados.
- Nuevo proyecto, arrastre, bloqueo, dibujo libre e importación de imagen: correctos.
- Recuperación local: escritura y lectura correctas.
- Presentación y avance de diapositivas: correctos.
- Consulta real a Wikipedia en español: correcta; devolvió cinco resultados.
- Sin errores JavaScript detectados por el test de interfaz.
- npm audit --omit=dev: cero vulnerabilidades reportadas en la consulta realizada.
- Inspección visual de la ventana inicial mediante captura de pantalla: realizada.

Informe de máquina: test-results/packaged-report.json.
Captura: test-results/CanvaviD-inicio.png.
Integridad del instalador: release/SHA256SUMS.txt.

Límites de estas pruebas: no son una auditoría exhaustiva, no prueban todos los estados posibles, no verifican todos los Windows/equipos ni cargas máximas. La app no implementa todas las funciones de Canva. El alcance y los formatos rasterizados se detallan en LEEME.md y en Ayuda dentro de la aplicación.
