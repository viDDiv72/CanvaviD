# CanvaviD

Estudio creativo local para Windows, con interfaz en español, editor multipágina, plantillas corporativas y proveedores de IA configurables.

## Funciones

- Editor con texto, formas, imágenes, dibujo, capas, agrupación y alineación.
- Fuentes instaladas en Windows: búsqueda por nombre y recarga del catálogo.
- Inicio con buscador, favoritos y 388 combinaciones: 384 propias de 32 formatos y 12 estilos, más cuatro adaptaciones MIT.
- Plantillas reutilizables para presupuestos y manuales: marca propia fija y campos variables por cliente.
- Exportación PNG, JPG, SVG, PDF, PPTX y HTML. PDF/PPTX contienen páginas rasterizadas; el proyecto `.canvavid` mantiene la edición.
- Ollama, OpenAI compatible, Gemini y Claude mediante credenciales propias. Los cambios de IA requieren revisión y aprobación.
- Guardado local, recuperación incremental, comentarios y versiones de documentos.

No contiene recursos de Canva ni es compatible con sus archivos. No dispone de colaboración en red. La colección no es una copia del catálogo de Canva. Las fuentes del sistema y los modelos de IA no se distribuyen con la aplicación.

## Desarrollo

Requisitos: Windows x64, Node.js 24 y npm.

```powershell
npm ci
npm start
npm test
npm run test:catalogue
npm run test:personal
npm run test:studio
npm run test:ui
npm run dist
```

Los instaladores se generan en `release/`. Las pruebas de interfaz utilizan perfiles independientes; los documentos personales, claves, dependencias y binarios no se guardan en Git.

## Documentación

- [Uso general y límites](LEEME.md)
- [Plantillas corporativas e IA](GUIA-PLANTILLAS-E-IA.md)
- [Colección y licencias](COLECCION-1.4.md)

## Licencia

Código de CanvaviD bajo [MIT](LICENSE). Se conservan las licencias de las dependencias y de las adaptaciones externas en [src/third-party](src/third-party/).

El historial Git comienza con la importación de este proyecto. Los informes de comprobación anteriores se conservan como documentación histórica; no reconstruyen el código exacto de todas las versiones previas.
