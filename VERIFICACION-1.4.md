# Verificación de CanvaviD 1.4

25 de octubre de 2026.

## Instalación

Se generó el instalador, se actualizó la instalación local y se abrió CanvaviD. El ejecutable instalado declara `1.4.0.0`; Windows informó que respondía. Se mantuvo el icono personalizado. Las pruebas usan perfiles independientes del perfil habitual del usuario.

## Colección entregada

- 384 combinaciones propias: 32 formatos y 12 estilos.
- Cuatro adaptaciones MIT: factura y recibo basados en Sparksuite; presentación clara y oscura basadas en los temas y el esquema de demo de reveal.js.
- Total: 388 entradas editables. No son millones de plantillas ni una copia del catálogo Free de Canva.

Las fuentes externas se revisaron en revisiones concretas y se registraron sus SHA-256. Los avisos MIT se incluyen en el paquete y en las notas de las páginas adaptadas. No se incorporaron fotos, logos ni archivos de fuentes de esos proyectos. Los detalles constan en `COLECCION-1.4.md` y `src/third-party/credits.json`.

## Comprobaciones

Las 23 pruebas unitarias y de integración pasaron. Se generaron todas las entradas y se validaron dimensiones, número de páginas, unicidad de identificadores, texto editable y ausencia de avisos de marcos según la comprobación tipográfica aproximada. Se verificaron búsqueda en español, filtros, estilos, conservación de marca, generación desde campos variables, licencias y hashes de fuentes externas.

Las pruebas de interfaz pasaron tanto en desarrollo como sobre el ejecutable empaquetado: catálogo, fuentes y asistente personal, plantillas corporativas y editor. Incluyen guardado/reapertura, seis exportaciones, recuperación, dibujo, QR e imágenes. La consulta opcional de Wikipedia devolvió cinco resultados.

Tras instalar, la prueba de catálogo volvió a pasar sobre el ejecutable instalado. Comprobó:

- Pantalla ¿Qué diseñamos hoy?, búsqueda, filtros, favoritos y número real de entradas.
- Vista previa y creación de una presentación de ocho páginas editables, guardado y PDF.
- Procedencia MIT, consulta de licencias completas y conservación de los avisos en las páginas.
- Captura de un presupuesto del catálogo como plantilla corporativa y generación de una entrega para otro cliente, con un total de 121,00 EUR para un servicio de 100 EUR más IVA del 21 %.
- Sin errores de página registrados ni peticiones de recursos HTTP desde la interfaz del catálogo.

Informe instalado: `test-results/catalogue-packaged-report.json`. Capturas revisadas: `test-results/CanvaviD-inicio-1.4.png` y `test-results/CanvaviD-presentacion-catalogo.png`.

## Límites

Las variantes comparten esquemas de composición; la cifra representa combinaciones de formato y estilo. La colección es estática y local: no se conecta a un catálogo de millones de diseños ni a una API de Canva. No incorpora edición de vídeo, plantillas web interactivas o fotos de stock. Las ilustraciones geométricas son editables; las zonas TU IMAGEN sirven de referencia para colocar fotos propias. El ajuste de texto es aproximado y requiere revisar el resultado con los datos finales. PDF y PPTX continúan siendo páginas rasterizadas; el archivo `.canvavid` conserva la edición.

## Instalador

`release/CanvaviD-Instalador-1.4.0-x64.exe`

SHA-256: `cc6cb4d5f5382c87c9ac71ec1a07436f1ee76cccffb8d9c2abadbb6d35059f90`.
