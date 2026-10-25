# Verificación de CanvaviD 1.2

25 de octubre de 2026.

## Resultado

Instalador generado y actualización aplicada a la instalación local. El ejecutable instalado declara versión `1.2.0.0`; se abrió la ventana principal y Windows indicó `Responding: True`. Se conservaron los datos previos y se copiaron los archivos existentes de configuración y recuperación a una carpeta `backups/antes-1.2-*` del perfil local antes de actualizar. No se configuraron credenciales reales ni se modificó la marca personal del usuario mediante las pruebas.

## Pruebas

- **21 pruebas unitarias y de integración aprobadas:** edición y validación, cuatro protocolos de IA, perfiles de credenciales, presupuestos con cálculo y validación, plantilla original inmutable, separación de logos, repetición de secciones y continuación, biblioteca persistente, versiones, recuperación incremental y deduplicación de recursos, colaboración y permisos.
- **Ejecutable empaquetado:** pruebas de interfaz de estudio corporativo, editor y colaboración aprobadas. Se verificaron guardado/reapertura, seis exportaciones, PDF con presupuesto generado, dibujo, imágenes, presentación y recuperación.
- **Ejecutable instalado:** pruebas de estudio corporativo y colaboración aprobadas. La biblioteca, las credenciales de prueba y los diseños de prueba usaron perfiles separados de los datos habituales del usuario.
- Flujo corporativo: identidad propia con logo, paleta y fuente; modelo y captura; formulario de cliente; vista previa; documento independiente editable; total de 423,50 EUR para servicios de 350 EUR más IVA del 21 %; conservación del logo propio y de la plantilla original; manual de cuatro páginas con dos secciones; comentarios, agrupación y alineación.
- Sin errores de página registrados por esas pruebas. La consulta de Wikipedia devolvió cinco resultados en las pruebas de editor empaquetado.

Informes: `test-results/studio-packaged-report.json`, `test-results/packaged-report.json` y `test-results/team-packaged-report.json`. Los informes de estudio y equipo se actualizaron con las pruebas del ejecutable instalado.

## Rendimiento y límites de la comprobación

La prueba de interfaz comprueba que mover una imagen conserva el mismo nodo de imagen en el lienzo. Veinte actualizaciones pequeñas tardaron aproximadamente 2,4 ms en la prueba empaquetada y 5,5 ms en la instalada. Es una comprobación localizada, no una medición comparativa de todas las cargas ni una garantía de velocidad en otros equipos. Se verificó por separado que repetir un guardado sin cambios no crea páginas ni imágenes duplicadas en la recuperación.

Los protocolos de IA se probaron con servidores HTTP simulados, incluidos autenticación, formato, uso declarado, consentimiento de visión, errores y cancelación. No había claves reales ni un modelo local configurado; no se verificaron acceso de cuentas, facturación o calidad de inferencia. La aplicación permite configurarlos posteriormente.

La colaboración se probó entre procesos del mismo equipo, no entre dos máquinas domésticas. Sigue usando un turno de edición. Los comentarios son cambios del documento y necesitan ese turno. La maquetación y paginación de texto son aproximadas: hay vista previa y avisos de marcos en Revisión. Los PDF y PPTX contienen páginas rasterizadas; la copia `.canvavid` conserva la edición.

## Distribución

Instalador: `release/CanvaviD-Instalador-1.2.0-x64.exe`.

SHA-256: `0faa414a7f193ac1d1c06e77694a51a59d6ae824171fe7ac1efa4592e0d4affc`.

Guía: `GUIA-PLANTILLAS-E-IA.md`. Instrucciones generales y límites: `LEEME.md`.
