# CanvaviD 1.4.1 — menú permanente e interfaz oscura

25 de octubre de 2026.

Los botones grandes en una columna permanecen visibles a la izquierda también en Inicio. La pantalla ¿Qué diseñamos hoy? ocupa el área central restante. Al pulsar una herramienta lateral se vuelve al editor y se conserva el proyecto; Inicio vuelve al buscador y se resalta como opción activa.

La interfaz utiliza tonos azul grisáceo oscuros, campos y paneles de alto contraste visual, textos claros y las tarjetas de navegación coloreadas existentes. El cambio de tema no modifica los colores de los elementos del documento ni las páginas exportadas.

Se revisó visualmente la captura `test-results/CanvaviD-inicio-1.4.png`. Las pruebas de interfaz de catálogo, fuentes/asistente personal, plantillas corporativas y editor pasaron en desarrollo. La prueba de catálogo pasó además sobre el ejecutable empaquetado y el instalado: menú visible junto a Inicio, geometría de las áreas separada, acceso directo a Texto, retorno a Inicio con estado activo y conservación del identificador del proyecto durante la navegación, además de búsqueda, favoritos, presentaciones, PDF, licencias y presupuesto desde plantilla.

Informe instalado: `test-results/catalogue-packaged-report.json`. Se abrió CanvaviD 1.4.1.0 y Windows indicó que respondía. Las pruebas usan perfiles independientes del perfil habitual.

Instalador: `release/CanvaviD-Instalador-1.4.1-x64.exe`. Suma de integridad: `release/SHA256SUMS-1.4.1.txt`.
