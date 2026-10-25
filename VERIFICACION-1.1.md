# Verificación de CanvaviD 1.1

Fecha: 24 de octubre de 2026.

Actualización instalada después de que el usuario confirmara haber guardado y cerrado la versión anterior. Se conserva una copia de la recuperación previa cuando existía. La aplicación instalada se abrió y Windows indicó que respondía.

## Comprobado

- Dos procesos Electron independientes utilizando el ejecutable instalado: invitación, presencia, protección de solo lectura, sincronización del documento, petición y transferencia del turno, chat, salida y cierre de sala.
- Configuración de IA online, clave persistida cifrada y lectura de configuración sin revelar la clave, propuesta compartida, ausencia de aplicación automática y aprobación humana con sincronización del resultado.
- Editor, historial, guardado y reapertura, QR, seis exportaciones, presentación, arrastre, bloqueo, dibujo, importación de imagen y recuperación.
- Consulta online de Wikipedia: cinco resultados.
- El informe automatizado de colaboración no registró errores: `test-results/team-packaged-report.json`.

## Límites de la verificación

La colaboración se probó entre dos procesos del mismo equipo por HTTP en localhost. Falta comprobar la conexión entre dos equipos domésticos y sus cortafuegos. Las salas permiten un único turno de edición transferible; no hay edición simultánea del lienzo.

La integración de IA se verificó con proveedores HTTP simulados, incluyendo los protocolos de Ollama y chat completions compatible. No se verificó inferencia con un modelo real. El usuario debe configurar Ollama con un modelo instalado o un servicio online con su modelo y credenciales. Las cuotas y los costes del servicio online dependen del proveedor.

Las salas usan HTTP y están destinadas a una red privada de confianza. El chat y las propuestas pertenecen a la sesión; se puede exportar el acta. El instalador contiene la aplicación, pero no incluye modelos de IA ni credenciales de servicios externos. Esta versión no equivale a todas las funciones de Canva.

## Instalador

Archivo: `release/CanvaviD-Instalador-1.1.0-x64.exe`.

SHA-256: `4e93d8986b6a22a60f9347e384133d4aec140e08690f81e12881842bb85de3b1`.

Las instrucciones de uso están en `LEEME.md`.
