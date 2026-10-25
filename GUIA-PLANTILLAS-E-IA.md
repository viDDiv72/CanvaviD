# CanvaviD 1.3: plantillas de empresa e IA

## Preparar tu identidad y una plantilla

1. En **Plantillas empresa**, pulsa **Configurar mi identidad corporativa**. Introduce el nombre de tu empresa, tu logo, colores, tipografía, tamaños y estilos de títulos y cuerpo.
2. Crea un **modelo de presupuesto** o un **modelo de manual**. Los nuevos modelos usan tu identidad. También puedes diseñar todas las páginas desde cero.
3. Ajusta libremente estructura, páginas, posiciones, colores y estilos. Los modelos iniciales son un punto de partida editable.
4. Selecciona una imagen. En su inspector, elige **Mi logo · conservar** para tu marca o **Logo del cliente · sustituir** para los marcos que cambiarán en cada entrega. Tu logo puede estar bloqueado. Cada página puede llevar ambos logos.
5. En los textos utiliza campos como `{{cliente}}`, `{{titulo}}`, `{{fecha}}`, `{{referencia}}`, `{{contacto}}` y `{{condiciones}}`. Puedes crear campos propios, por ejemplo `{{plazo_entrega}}`. El nombre debe empezar por una letra y contener letras sin acentos, números o guiones bajos, hasta 50 caracteres.
6. Pulsa **Guardar diseño como plantilla**, elige nombre y tipo. Se guarda una copia de todas las páginas, estilos, fotos y campos. La plantilla no cambia al generar entregas.

La identidad corporativa se guarda con el documento y la plantilla. Guardarla actualiza los logos y nombres marcados de tu empresa en ese documento; no recolorea ni rediseña automáticamente los elementos de una composición existente. Los nuevos modelos usan la configuración guardada.

## Generar un presupuesto

1. Busca la plantilla en la biblioteca y pulsa **Usar con nuevos datos**.
2. Introduce el nombre del documento, el logo del cliente y los valores de los campos detectados.
3. Añade servicios, uno por línea, con este formato: `descripción | cantidad | precio unitario`. Por ejemplo: `Diseño de aplicación | 1 | 1200` y `Soporte mensual | 12 | 50`. Se admite coma o punto decimal, sin separadores de miles.
4. Indica el IVA. Se calculan importes en EUR, redondeados a céntimos por línea, subtotal, IVA y total. No se aplican automáticamente descuentos, retenciones ni reglas fiscales adicionales.
5. Pulsa **Vista previa**. Después, **Generar y editar** crea un documento nuevo, independiente y editable. Los campos sin datos quedan vacíos; si no subes un logo se conserva la imagen del marco de cliente de la plantilla.
6. Revisa, guarda como `.canvavid` y exporta. La plantilla original, tu logo y el branding se conservan.

Campos calculados: `{{servicios}}`, `{{subtotal}}`, `{{tipo_iva}}`, `{{iva}}` y `{{total}}`. La página que contiene un marco de texto `{{servicios}}` se repite si la lista necesita continuación. Para una paginación predecible, usa un marco dedicado a ese campo, suficientemente grande y sin texto fijo adicional dentro del mismo marco. Máximo 200 líneas de servicios y 100 páginas finales.

## Generar un manual

Prepara una página de sección con los campos `{{seccion_titulo}}` y `{{seccion_contenido}}`. Se conservarán sus elementos, logos, estilos y geometría, y se repetirá para cada sección. Las páginas de portada y cierre siguen formando parte del documento.

En la ventana de nuevos datos, escribe el título de cada sección en su primera línea y el contenido debajo. Separa secciones con una línea que contenga únicamente `---`:

```text
Instalación
Descarga el instalador y sigue los pasos.
---
Primeros pasos
Abre la aplicación y crea un proyecto.
```

Los contenidos largos continúan en copias de la página de sección. La paginación usa el ancho, alto y tamaño de texto del marco; el ajuste tipográfico es aproximado. Revisa la vista previa y los avisos en **Revisión**. Máximo 90 secciones de 30000 caracteres y 100 páginas finales. Las capturas de pantalla adicionales pueden incorporarse después en el editor.

**Editar copia** abre el diseño de una plantilla sin modificar el ejemplar guardado. Para guardar una revisión, vuelve a capturarlo con otro nombre. **Exportar** guarda un `.cvtemplate` con recursos incrustados; **Importar plantilla** lo añade a la biblioteca de otro equipo.

## Conectores de IA

En **Asistente IA → Configurar proveedor y modelo** puedes guardar configuraciones separadas:

| Proveedor | URL predeterminada | Credenciales |
| --- | --- | --- |
| Ollama | `http://127.0.0.1:11434` | Modelo instalado y servicio en ejecución |
| ChatGPT / OpenAI · API compatible | `https://api.openai.com/v1/chat/completions` | Clave API y modelo habilitado |
| Google Gemini | `https://generativelanguage.googleapis.com/v1beta/models` | Clave API y nombre del modelo |
| Anthropic Claude | `https://api.anthropic.com/v1/messages` | Clave API; workspace si la clave lo requiere |

CanvaviD usa las API, no automatiza las aplicaciones web de chat. Configura tus credenciales y consulta las condiciones de acceso y tarifas de cada proveedor. No se incluyen claves, saldo ni modelos en el instalador. **Consultar modelos** comprueba el servicio y muestra identificadores; introduce el que quieras utilizar. El modelo debe soportar el protocolo del proveedor y la salida JSON solicitada. Para visión debe admitir imágenes.

Puedes solicitar revisión, traducción, adaptación de textos, cambios de paleta, alineación y tamaños o composiciones multipágina editables. La capacidad y calidad dependen del modelo. Las propuestas tienen hasta 30 acciones y se validan; no ejecutan código generado. **Vista previa** muestra el resultado antes de **Aplicar**. Aplicar cambios sobre una página modificada desde la consulta exige pedir una propuesta nueva.

Cada petición requiere confirmar el envío. De forma predeterminada se envían la petición y los textos, datos, posiciones y estilos de la página actual, sin imágenes, notas ni otras páginas. **Analizar imágenes** permite adjuntar hasta tres imágenes de esa página, de 2 MB por imagen. Enviar imágenes puede incrementar consumo y revelar información contenida en ellas; el destino aparece en el panel.

**Comparar proveedores configurados** envía la misma petición, por separado, a los proveedores guardados con modelo y credenciales disponibles, indicados sobre el botón. Las propuestas aparecen separadas; tú eliges cuál aplicar. Se muestran tokens de entrada y salida declarados por el proveedor y duración; cuando no se informa consumo se muestra cero. No se calcula una factura ni se garantiza un coste. Cancelar detiene la consulta actual y las siguientes de esa comparación.

Las claves pueden mantenerse solo en memoria o guardarse cifradas con Windows para el usuario actual. No se incorporan a documentos o plantillas. Cambiar de endpoint no reutiliza la clave del destino anterior. Las consultas pueden producir cargos del proveedor.

Referencias oficiales de los protocolos: [OpenAI Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create), [Gemini generateContent](https://ai.google.dev/api/generate-content), [Claude Messages](https://platform.claude.com/docs/en/api/messages/create) y [Ollama Chat](https://docs.ollama.com/api/chat).

## Edición, revisión y rendimiento

- **Agrupar / Desagrupar:** selecciona varios elementos con Mayús y agrúpalos para moverlos juntos. Los elementos bloqueados permanecen protegidos. Las opciones de alineación operan sobre los elementos seleccionados.
- **Alinear:** izquierda, derecha, arriba, abajo, centro y distribución horizontal. **Ajustar a guías** muestra ejes centrales y ajusta al soltar cerca de los bordes, centros o posiciones de otros elementos.
- **Revisión:** comentarios de página o vinculados al elemento seleccionado, con autor y resolución. Se guardan en el `.canvavid` como parte del documento.
- **Versiones:** guarda puntos de recuperación explícitos y restáuralos. Restaurar conserva antes una copia del estado actual. Cambiar de documento desde las plantillas conserva una versión si había cambios pendientes.
- **Rendimiento:** nodos de lienzo reutilizados, miniaturas en caché y bajo demanda, historial que reutiliza cadenas de imágenes, y recuperación incremental por proyecto con imágenes deduplicadas. La recuperación y la preparación de PPTX trabajan en un hilo separado.
- **Optimizar imágenes grandes al importar:** opción para reducir a un máximo de 4096 px por lado. Déjala desactivada para conservar la resolución original.

La versión 1.3 no dispone de colaboración en red; la sección Equipo se ha retirado. PDF y PPTX contienen páginas rasterizadas; guarda el `.canvavid` para mantener los elementos editables. La comprobación de protocolos de IA con servidores simulados no verifica la calidad de modelos reales ni el acceso de tu cuenta.

## Fuentes de Windows y menú visual

Los selectores de tipografía muestran las familias instaladas en el Windows de ese equipo e incluyen un buscador. Se aplican al texto seleccionado, a la fuente de marca y a la identidad corporativa. Si instalas una fuente mientras CanvaviD está abierta, pulsa Cargar fuentes del sistema para actualizar el catálogo. Los proyectos conservan el nombre de la fuente; en otro equipo conviene instalarla por separado si no está disponible. No se incorporan archivos de fuentes en los documentos ni en el instalador.

El menú izquierdo se organiza en una columna de tarjetas grandes. Cada herramienta tiene un icono y un color propios; la herramienta activa se marca con borde y fondo resaltados.

## Fuente por nombre — versión 1.3.2

En el cuadro de fuente escribe sus primeras letras (por ejemplo, `aria`) y pulsa la coincidencia deseada. También puedes escribir el nombre completo y pulsar Enter o Aplicar. Con una única coincidencia, Enter aplica esa fuente. Las flechas permiten recorrer las coincidencias; Escape cancela la búsqueda. El selector clásico con toda la lista está sustituido por este campo editable en Texto, Marca e Identidad corporativa.

El botón Cargar fuentes del sistema vuelve a consultar todas las familias instaladas en Windows, sin reiniciar ni borrar los demás campos del formulario. No descarga ni instala fuentes externas; muestra el catálogo propio de cada equipo.

## Inicio y colección — versión 1.4

La aplicación abre en ¿Qué diseñamos hoy?, con búsqueda local, categorías, filtros de estilo y procedencia, favoritos y vista previa multipágina. Incluye 384 combinaciones propias de 32 formatos y 12 estilos, más cuatro adaptaciones MIT con atribución y licencias incluidas. No es una copia del catálogo de Canva ni contiene millones de plantillas. Para los formatos, fuentes y condiciones de uso de esta colección, consulta COLECCION-1.4.md.

## Menú e interfaz — versión 1.4.1

Los botones grandes de la izquierda permanecen visibles también en Inicio, en una sola columna. ¿Qué diseñamos hoy? ocupa el área central. Pulsa cualquier herramienta lateral para volver al editor sin cambiar de proyecto; Inicio recupera el buscador. El tema de la interfaz usa tonos azul grisáceo oscuros, botones coloreados y texto claro. Los colores del documento y sus exportaciones se conservan.
