# Colección y pantalla de inicio de CanvaviD 1.4

## Qué incluye

La pantalla **¿Qué diseñamos hoy?** permite buscar diseños locales, filtrar categoría, estilo y procedencia, marcar favoritos y revisar todas las páginas antes de crear un documento. **Continuar en el editor** mantiene el proyecto actual; **Inicio** permite volver al catálogo.

La colección contiene **384 combinaciones propias**: 32 formatos con 12 familias de estilo. Algunas combinaciones comparten esquemas de composición; son variantes de formato y estilo, no 384 obras completamente independientes. Incluye además **cuatro adaptaciones MIT**, para un total de **388 entradas**. No contiene millones de plantillas ni una copia del catálogo de Canva.

### Formatos

Presentaciones, pitch de negocio, clases y talleres, propuestas, portfolios, informes, manuales de marca, manuales de aplicaciones, presupuestos, facturas, currículums, cartas corporativas, infografías, carteles A3, folletos A4, invitaciones, tarjetas de visita, logotipos geométricos, publicaciones cuadradas y verticales, historias, carruseles, portadas de Facebook, cabeceras de LinkedIn, miniaturas de YouTube, cartas de restaurante, listas de precios, certificados, calendarios, planificadores, collages y trípticos.

Los tamaños se expresan en píxeles. Los calendarios son maquetas sin mes asignado: ajusta los días al mes elegido. Los importes, datos y textos iniciales son ejemplos o campos variables. No hay vídeo, animación ni un catálogo de fotografías de stock: las ilustraciones son geometría editable y las zonas TU IMAGEN sirven como referencia para colocar tus propias fotos.

### Estilos

Minimal claro, Editorial cálido, Corporativo azul, Geometría viva, Orgánico verde, Pastel creativo, Nocturno, Retro naranja, Tipografía potente, Tecnológico, Elegante y Aula y color.

### Cómo usarlo

1. Busca por nombre o propósito, por ejemplo `presentación`, `presupuestos para mi empresa`, `post Instagram`, `manual` o `menú`.
2. Filtra categoría, estilo o procedencia. Los favoritos se guardan en el perfil local.
3. Abre un diseño para ver sus páginas. **Usar los colores, fuente y logo de mi marca actual** aplica la identidad del proyecto abierto al nuevo diseño.
4. **Crear diseño completo** abre una copia independiente, con las dimensiones y páginas del modelo. Si el documento anterior tenía cambios pendientes, se conserva una versión local antes de cambiarlo.
5. **Aplicar esta página al lienzo** adapta la página seleccionada al tamaño actual. Se puede deshacer; el cambio de proporción puede requerir ajustes visuales.
6. **Guardar en mis plantillas** conserva una copia en Plantillas empresa. Los modelos de presupuesto y manual llevan campos variables para generar entregas con nuevos datos y logos de cliente siguiendo la guía corporativa. Al capturar un diseño de otro tipo se guarda con la categoría de presupuesto; puedes editar sus campos antes de usarlo.

Los textos y formas permanecen editables en `.canvavid`. PDF y PPTX mantienen el comportamiento de exportación rasterizada de la aplicación.

## Material externo y licencias

Se incorporan adaptaciones nativas, no motores HTML externos:

- Factura sencilla y una variante de recibo basadas en [Simple HTML Invoice Template de Sparksuite](https://github.com/sparksuite/simple-html-invoice-template), licencia MIT. Revisión: `7d74fe34c862b7712f1a23a3f12147a4a8bd53e1`.
- Presentación clara y oscura adaptadas de los temas White y Black y del esquema de demostración de [reveal.js](https://github.com/hakimel/reveal.js), licencia MIT. Revisión: `e240e175232fa2de660a02bc0d7bf5f655b159bb`.

Se sustituyeron textos por ejemplos en español, se tradujeron estructuras a objetos de CanvaviD y se usó Arial del sistema en lugar de copiar archivos de fuentes. No se copiaron fotos, logos ni otros recursos multimedia de esos proyectos. Las notas de cada página externa conservan el origen y el texto íntegro de su licencia MIT.

Los avisos completos y la procedencia pueden consultarse en **Procedencia y licencias** dentro de la aplicación. También se incluyen en `src/third-party/`. El registro `credits.json` contiene revisiones, URLs y SHA-256 de los archivos revisados; las fuentes originales consultadas se conservan en `research/licensed-templates/`, fuera del paquete de la aplicación.

## Referencia de Canva y alcance

Se consultó el [catálogo público de Canva](https://www.canva.com/templates/) para identificar familias de formatos y estilos. Se observaron categorías de presentaciones, publicaciones sociales, folletos, carteles, documentos y marca. No se descargaron sus plantillas ni recursos.

La [licencia de contenido de Canva](https://www.canva.com/policies/content-license-agreement/) distingue contenidos Free, Pro y otras categorías. Su sección 6 contempla usos adicionales para algunos contenidos Free, mientras que la sección 9 contiene restricciones sobre redistribución, extracción y usos que compitan con Canva. La etiqueta Free por sí sola no se trató como autorización para incorporar masivamente su catálogo a otra aplicación. El usuario eligió una colección propia más material externo cuya redistribución pudiera verificarse.

El buscador trabaja sobre la colección incluida en CanvaviD. No consulta una API de Canva ni necesita conexión para mostrar miniaturas, buscar o crear diseños.
