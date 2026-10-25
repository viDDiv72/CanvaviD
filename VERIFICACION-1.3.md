# CanvaviD 1.3 — fuentes de Windows y menú personal

Fecha: 25 de octubre de 2026.

## Cambios

- Enumeración local de las familias instaladas en Windows mediante InstalledFontCollection, sin instalar ni redistribuir archivos de fuentes. Este equipo devolvió 136 familias. Catálogo con búsqueda y vista de cada familia en los selectores de texto, marca e identidad corporativa.
- Validación de nombres de fuentes independiente del antiguo catálogo de seis familias: guardar, recuperar y generar plantillas conserva la selección. Una familia ausente en otro equipo se muestra identificada y Windows utiliza una alternativa. Reiniciar la aplicación actualiza el catálogo tras instalar una fuente nueva.
- Eliminados Equipo, salas, invitaciones, chat, turnos, IPC de colaboración y módulo del servidor LAN. La IA conserva propuestas personales, vista previa, aprobación y deshacer. No se borraron los documentos o copias de seguridad de versiones anteriores.
- Menú en dos columnas con tarjetas grandes, iconos vectoriales propios, colores por herramienta y resaltado activo.

## Verificación

19 pruebas unitarias y de integración aprobadas. Se verificaron protocolos de IA simulados, plantillas, persistencia, recuperación y preservación de nombres de fuentes.

Pruebas de interfaz aprobadas tanto durante desarrollo como sobre el ejecutable empaquetado: fuentes y menú personal; plantillas corporativas; editor y sus seis exportaciones. Se comprobó que el paquete ASAR no contiene los módulos de Equipo eliminados.

Tras instalar se repitió la prueba personal sobre `%LOCALAPPDATA%/Programs/canvavid/CanvaviD.exe`: 136 familias, búsqueda, selección de Segoe UI, guardado/reapertura, selectores de marca e identidad corporativa, ausencia de Equipo y de API de salas, propuesta de IA personal con proveedor simulado, vista previa, aprobación y deshacer. Sin errores de página. Informe: `test-results/personal-packaged-report.json`.

El ejecutable instalado declara versión 1.3.0.0. Se abrió su ventana y Windows confirmó que respondía. Las pruebas usan perfiles separados del perfil habitual del usuario.

## Instalador

`release/CanvaviD-Instalador-1.3.0-x64.exe`

SHA-256: `aad3d45955db4758e5ad04d257c4afb953ab12303f7514e53461f4f56e570de3`.
