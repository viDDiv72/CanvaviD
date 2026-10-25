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

## Versiones públicas y actualizaciones

El código y los instaladores públicos se mantienen en [github.com/viDDiv72/CanvaviD](https://github.com/viDDiv72/CanvaviD). Los instaladores están en [Releases](https://github.com/viDDiv72/CanvaviD/releases). Cada etiqueta `vX.Y.Z` activa las pruebas de Windows, genera el instalador NSIS y publica `latest.yml`, el instalador, su `.blockmap` y `SHA256SUMS-X.Y.Z.txt`.

Para publicar una versión futura:

```powershell
# Actualizar package.json/package-lock.json y ejecutar las pruebas localmente
git add .
git commit -m "Publicar CanvaviD X.Y.Z"
git push origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```

La aplicación instalada no descarga nada al arrancar: desde `↻ Actualizaciones` se consulta GitHub, se descarga la versión disponible y se instala después de confirmar y reiniciar. Las compilaciones de desarrollo muestran el panel, pero no contactan con el servicio de actualización.

Los instaladores se generan en `release/`. Las pruebas de interfaz utilizan perfiles independientes; los documentos personales, claves, dependencias y binarios no se guardan en Git.

## Documentación

- [Uso general y límites](LEEME.md)
- [Plantillas corporativas e IA](GUIA-PLANTILLAS-E-IA.md)
- [Colección y licencias](COLECCION-1.4.md)

## Licencia

Código de CanvaviD bajo [MIT](LICENSE). Se conservan las licencias de las dependencias y de las adaptaciones externas en [src/third-party](src/third-party/).

El historial Git comienza con la importación de este proyecto. Los informes de comprobación anteriores se conservan como documentación histórica; no reconstruyen el código exacto de todas las versiones previas.
