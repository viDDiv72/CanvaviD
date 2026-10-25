# CanvaviD 1.4

Editor visual para Windows, en español. Aplicación propia con plantillas geométricas originales; no contiene archivos de Canva ni accede a su cuenta o servicios.

## Instalar y abrir

Ejecuta `release/CanvaviD-Instalador-1.4.1-x64.exe`. Permite elegir carpeta y crea accesos directos. Lleva Electron y las dependencias incluidas: el equipo de destino no necesita Node.js, npm ni REA. No necesita conexión para instalarse o editar. El paquete está destinado a Windows de 64 bits; se ha comprobado en este equipo, no en todos los equipos domésticos.

El instalador no tiene certificado de firma de un editor comercial. Windows puede mostrar un aviso de aplicación no reconocida. El archivo SHA256SUMS-1.4.1.txt permite comparar su integridad con esta copia.

También puedes abrir `release/win-unpacked/CanvaviD.exe` desde su carpeta completa. No copies únicamente ese ejecutable: necesita los archivos que lo acompañan.

## Uso

1. Pulsa Nuevo y elige nombre y dimensiones, o abre un archivo `.canvavid`.
2. Usa una plantilla original, o añade formas, texto, fotos, tablas, gráficos o QR.
3. Arrastra los elementos. El cuadrado de la esquina inferior derecha cambia su tamaño; Mayús mantiene la proporción durante el ajuste. Las propiedades permiten rotación, opacidad, posición y tamaño.
4. Usa Mayús + clic para selección múltiple, y Capas para seleccionar o desbloquear elementos. Puedes mover, duplicar y reordenar páginas.
5. Guarda el proyecto. Las imágenes están incrustadas; copia el `.canvavid` a otro ordenador para seguir editando.
6. Exporta tu trabajo o usa el modo Presentar. Las notas están asociadas a cada página.

Atajos: Ctrl+S guardar, Ctrl+Mayús+S guardar como, Ctrl+O abrir, Ctrl+N nuevo, Ctrl+Z deshacer, Ctrl+Y rehacer, Ctrl+D duplicar, Ctrl+C/V copiar/pegar elementos dentro de la aplicación, Ctrl+A seleccionar todos, Supr eliminar. Flechas mueven 1 px; con Mayús, 10 px.

La recuperación automática guarda cada proyecto en una carpeta de `%APPDATA%/canvavid/projects/`, con páginas e imágenes separadas para no reescribir los recursos sin cambios. Al abrir se ofrece el último proyecto recuperado. Se admite la recuperación antigua de `recovery.canvavid`. Guarda siempre tus archivos `.canvavid`; las versiones explícitas están en Revisión.

## Funciones disponibles

- Diseños estáticos multipágina, tamaños personalizados y fondo de página.
- Plantillas originales de presentación, marca, evento, informe y editorial.
- Texto con fuentes del sistema, estilos y alineación; formas vectoriales, dibujo libre.
- Importación local PNG/JPG/WebP/GIF (GIF estático), ajuste al marco, brillo y blanco y negro.
- Selección múltiple, posición, dimensiones, giro, opacidad, bloqueo, orden de capas, cuadrícula y ajuste a cuadrícula durante el arrastre.
- Tablas con datos separados por comas; gráficos de barras y circulares. Los valores de los gráficos son no negativos. No es un parser CSV con campos entrecomillados.
- QR estáticos generados sin conexión; paleta y fuente de marca por proyecto.
- Guardado y reapertura, recuperación, deshacer/rehacer, duplicado y presentación.
- PNG/JPG/SVG de la página actual; PDF/PPTX/HTML de todas las páginas.
- Consulta opcional a Wikipedia en español, con inserción de resumen y URL en notas. Solo envía la consulta cuando pulsas Buscar; no envía el diseño. Revisa contenido, fuentes y licencia del artículo.

## Límites que conviene conocer

Esta es una primera versión de un editor propio. No reproduce todas las funciones Pro/Premium de Canva y no es compatible con sus archivos.

PDF y PPTX contienen imágenes de las páginas, no elementos editables ni texto buscable. SVG conserva las formas y texto vectoriales (las fotos siguen incrustadas como imágenes); necesita fuentes compatibles en el equipo donde se abra. HTML es una galería estática y no se publica automáticamente. La maquetación de texto usa un ajuste aproximado por caracteres, no un motor tipográfico avanzado. Las fuentes no se redistribuyen con la app.

No incluye vídeo/audio, animación, colaboración simultánea sin turnos, nube, IA de imágenes/vídeo, eliminación automática de fondos, OCR, fórmulas, importación de Office/PDF como elementos editables, impresión comercial, exportación MP4/GIF, ni un catálogo de fotos premium. Estas funciones requerirían desarrollos o integraciones adicionales reales. La IA de texto, visión opcional y propuestas de diseño están integradas mediante proveedores configurables. La aplicación las identifica como fuera de alcance; no tiene botones que simulen esos servicios.

Límites: 100 páginas, 1500 elementos por página, lados de 100–8000 px, fotos de hasta 20 MB cada una, proyectos de hasta 150 MB y exportación raster de hasta 64 megapíxeles por página. Proyectos grandes pueden necesitar mucha RAM; no se ha realizado una prueba de carga exhaustiva.

## Código y dependencias

Código de aplicación: `src/`. Tests: `tests/`. Se usan bibliotecas abiertas Electron, PptxGenJS y qrcode, y sus dependencias; no son código propio de CanvaviD ni proceden de Canva. Las versiones resueltas constan en package-lock.json y sus avisos de licencia se conservan con las dependencias distribuidas.

Para desarrollo: `npm ci`, `npm start`. Pruebas: `npm test` y `npm run test:ui`. Instalador: `npm run dist`. No hace falta usar estos comandos para instalar la aplicación terminada.

Los informes de verificación y archivos de ejemplo están en `test-results/`. Los tests automatizados usan su propio perfil temporal; no modifican el perfil habitual de CanvaviD.

## Asistente IA personal

### Elegir la IA

Abre Asistente IA → Configurar proveedor y modelo.

- **Ollama local:** debe estar instalado y en ejecución en el mismo equipo, con un modelo descargado que admita salida JSON. URL habitual: `http://127.0.0.1:11434`. Introduce el identificador exacto del modelo. Consultar modelos permite comprobar el servicio. El instalador de CanvaviD no contiene Ollama ni modelos de varios GB.
- **Servicio online compatible con OpenAI:** configura la URL HTTPS completa de Chat Completions, el modelo habilitado y tu clave API. La URL de OpenAI es `https://api.openai.com/v1/chat/completions`. Se utiliza salida JSON (`response_format: json_object`); el servicio y el modelo deben soportarla y `max_completion_tokens`. Algunos proveedores compatibles pueden necesitar adaptaciones adicionales. La API puede generar cargos independientes de una suscripción a ChatGPT.
- La clave solo se envía al proveedor configurado. Si marcas Recordar clave, se guarda cifrada con el almacén de Windows para tu usuario. Sin marcarlo, permanece en memoria durante esa sesión. Para eliminarla, marca Olvidar la clave anterior y guarda.

Consultar modelos hace una petición al proveedor; no genera un diseño. No se ejecuta ninguna consulta de IA al abrir la app. Cada petición muestra el destino y exige confirmar el envío. Se envían tu petición y textos, datos, dimensiones y estilos de la página actual; no notas de página ni el resto del documento. Las imágenes solo se incluyen al activar expresamente Analizar imágenes, con hasta tres imágenes de 2 MB cada una. El identificador y nombre del documento también forman parte del contexto técnico.

La IA puede proponer cambios de texto, recoloreado, fondo, notas, posiciones, tamaños y estilos de texto, añadir textos o formas y crear páginas editables. Devuelve hasta 30 acciones validadas. La aplicación nunca ejecuta código producido por el modelo. Primero se muestra una propuesta; no se modifica el lienzo hasta aplicar. Las páginas de IA se limitan a 250 elementos.

Las propuestas se guardan durante la sesión del asistente personal y se aplican solo al aprobarlas. Si cambia la página desde la consulta, solicita una propuesta nueva.

### Comprobaciones realizadas

Los protocolos de IA se prueban con servidores simulados. No se verifican acceso, facturación ni calidad de inferencia de modelos reales sin credenciales propias. La colaboración en red se retiró en la versión 1.3.

Fuentes de las integraciones: https://docs.ollama.com/api/chat y https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=chat.


## Novedades de la versión 1.2

Consulta `GUIA-PLANTILLAS-E-IA.md` para preparar presupuestos y manuales corporativos, usar los conectores nativos de OpenAI, Gemini y Claude, comparar propuestas y utilizar revisión y versiones. La sección de colaboración de versiones antiguas ya no está disponible.

Rendimiento: el lienzo reutiliza nodos y actualiza los elementos modificados; las miniaturas se almacenan en caché y se generan al entrar en la zona visible. El historial comparte las cadenas de imágenes y copia los datos editables. La recuperación incremental y la preparación de PowerPoint trabajan fuera del hilo principal. La opción Optimizar imágenes grandes al importar reduce el lado máximo a 4096 px; desactívala para conservar los originales.

La biblioteca de plantillas y versiones se guarda en `%APPDATA%/canvavid/library/`. Exporta las plantillas `.cvtemplate` para transferirlas a otros equipos. Las claves API permanecen en el perfil local y nunca forman parte de estas plantillas. Los documentos `.canvavid` siguen siendo editables; PDF y PPTX conservan las limitaciones de exportación descritas arriba.

## Novedades de la versión 1.3

- Fuentes: lectura de las familias instaladas en Windows al iniciar, con búsqueda en Texto, Marca e Identidad corporativa. En este equipo se detectaron 136 familias. En otros equipos se muestra su catálogo propio. Pulsa Cargar fuentes del sistema para actualizar el catálogo. Se conserva el nombre de las fuentes al guardar, recuperar y usar plantillas; si una no existe en otro equipo, Windows usa una alternativa. Las fuentes no se redistribuyen con los proyectos.
- Equipo retirado: no hay salas, chat, invitaciones, turnos ni servicios de colaboración en red. El asistente de IA continúa funcionando de forma personal. Las consultas web y las API de IA siguen siendo opcionales.
- Menú lateral de tarjetas grandes en una columna, iconos vectoriales propios, colores por herramienta y estado activo resaltado.

Pruebas personales de fuentes y menú: `npm run test:personal`.

## Fuente por nombre — versión 1.3.2

En el cuadro de fuente escribe sus primeras letras (por ejemplo, `aria`) y pulsa la coincidencia deseada. También puedes escribir el nombre completo y pulsar Enter o Aplicar. Con una única coincidencia, Enter aplica esa fuente. Las flechas permiten recorrer las coincidencias; Escape cancela la búsqueda. El selector clásico con toda la lista está sustituido por este campo editable en Texto, Marca e Identidad corporativa.

El botón Cargar fuentes del sistema vuelve a consultar todas las familias instaladas en Windows, sin reiniciar ni borrar los demás campos del formulario. No descarga ni instala fuentes externas; muestra el catálogo propio de cada equipo.

## Inicio y colección — versión 1.4

La aplicación abre en ¿Qué diseñamos hoy?, con búsqueda local, categorías, filtros de estilo y procedencia, favoritos y vista previa multipágina. Incluye 384 combinaciones propias de 32 formatos y 12 estilos, más cuatro adaptaciones MIT con atribución y licencias incluidas. No es una copia del catálogo de Canva ni contiene millones de plantillas. Para los formatos, fuentes y condiciones de uso de esta colección, consulta COLECCION-1.4.md.

## Menú e interfaz — versión 1.4.1

Los botones grandes de la izquierda permanecen visibles también en Inicio, en una sola columna. ¿Qué diseñamos hoy? ocupa el área central. Pulsa cualquier herramienta lateral para volver al editor sin cambiar de proyecto; Inicio recupera el buscador. El tema de la interfaz usa tonos azul grisáceo oscuros, botones coloreados y texto claro. Los colores del documento y sus exportaciones se conservan.
