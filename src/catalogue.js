(function(root){
'use strict';
const CV=typeof module!=='undefined'?require('./core.js'):root.CV;
const styles=[
 ['minimal','Minimal claro','#fafbf9','#18252c','#3269df','#e5ecf8','Arial','line'],
 ['editorial','Editorial cálido','#f5eee3','#382b26','#aa513a','#e3d6c3','Georgia','frame'],
 ['corporate','Corporativo azul','#f5f8fd','#142d4e','#2163c8','#d9e5f6','Arial','rail'],
 ['geometry','Geometría viva','#fff7e8','#262340','#7351dd','#eadcff','Trebuchet MS','blocks'],
 ['organic','Orgánico verde','#eef1e3','#1b3d32','#517d51','#d4dfbe','Georgia','circles'],
 ['pastel','Pastel creativo','#fff1f4','#473453','#aa4e87','#eadcf3','Trebuchet MS','dots'],
 ['night','Nocturno','#151c30','#f8f9ff','#b0e978','#2d3950','Arial','orbit'],
 ['retro','Retro naranja','#f6e4c8','#43291b','#c8552c','#e9c192','Georgia','arches'],
 ['bold','Tipografía potente','#f8eb50','#181818','#252525','#e3d43b','Arial Black','type'],
 ['tech','Tecnológico','#0d2434','#eafcff','#48d5dc','#193c50','Courier New','grid'],
 ['elegant','Elegante','#faf7ef','#302e2c','#947749','#ebe2d0','Times New Roman','double'],
 ['playful','Aula y color','#f5f8ff','#2f3653','#df5b68','#dce7ff','Trebuchet MS','play']
].map(([id,name,bg,ink,accent,soft,font,decor])=>({id,name,bg,ink,accent,soft,font,decor}));
const formats=[
 ['presentation','Presentación','Presentaciones',1280,720,'deck','Ideas que merecen avanzar',8],
 ['pitch','Pitch de negocio','Presentaciones',1280,720,'deck','Una solución con futuro',8],
 ['lesson','Clase y taller','Educación',1280,720,'deck','Aprender haciendo',8],
 ['proposal','Propuesta de proyecto','Empresa',1280,720,'deck','Tu próximo gran proyecto',8],
 ['portfolio','Portfolio creativo','Presentaciones',1280,720,'portfolio','Diseño con intención',5],
 ['report','Informe','Documentos',1240,1754,'report','Resultados con perspectiva',4],
 ['brandbook','Manual de marca','Empresa',1280,720,'brand','Una identidad con sentido',5],
 ['manual','Manual de aplicación','Empresa',1280,720,'manual','{{titulo}}',3],
 ['budget','Presupuesto','Empresa',1240,1754,'budget','{{titulo}}',3],
 ['invoice','Factura','Empresa',1240,1754,'invoice','FACTURA',1],
 ['cv','Currículum','Documentos',1240,1754,'cv','Tu nombre y apellidos',1],
 ['letter','Carta corporativa','Documentos',1240,1754,'letter','Una conversación que importa',1],
 ['infographic','Infografía','Educación',1080,1920,'infographic','Ideas claras, paso a paso',1],
 ['poster','Cartel A3','Impresión',1754,2480,'poster','Encuentra tu próxima idea',1],
 ['flyer','Folleto A4','Impresión',1240,1754,'flyer','Haz espacio para algo nuevo',1],
 ['invitation','Invitación','Eventos',1080,1440,'invite','Celebremos juntos',1],
 ['businesscard','Tarjeta de visita','Impresión',1004,650,'card','Tu nombre · Tu profesión',2],
 ['logo','Logotipo geométrico','Marca',1080,1080,'logo','TU MARCA',1],
 ['instagram','Publicación cuadrada','Redes sociales',1080,1080,'post','Una idea para compartir',1],
 ['instagram-portrait','Publicación vertical','Redes sociales',1080,1350,'post','Cambia la forma de mirar',1],
 ['story','Historia vertical','Redes sociales',1080,1920,'story','Hoy empieza algo nuevo',1],
 ['carousel','Carrusel social','Redes sociales',1080,1350,'carousel','Cinco ideas para avanzar',5],
 ['facebook','Portada de Facebook','Redes sociales',1640,624,'banner','Tu espacio. Tu comunidad.',1],
 ['linkedin','Cabecera de LinkedIn','Redes sociales',1584,396,'banner','Conectamos ideas y personas',1],
 ['youtube','Miniatura de YouTube','Redes sociales',1280,720,'video','LO QUE NECESITAS SABER',1],
 ['menu','Carta de restaurante','Hostelería',1240,1754,'menu','Sabor a buenos momentos',2],
 ['pricelist','Lista de precios','Empresa',1080,1350,'prices','Servicios a tu medida',1],
 ['certificate','Certificado','Educación',1754,1240,'certificate','CERTIFICADO',1],
 ['calendar','Calendario mensual','Organización',1754,1240,'calendar','Planifica tu mes',1],
 ['planner','Planificador semanal','Organización',1240,1754,'planner','Una semana con intención',1],
 ['collage','Collage de recuerdos','Fotografía',1080,1350,'collage','Pequeños grandes momentos',1],
 ['brochure','Tríptico','Impresión',1754,1240,'brochure','Todo empieza con una idea',2]
].map(([id,name,category,width,height,layout,title,pages])=>({id,name,category,width,height,layout,title,pages}));
const categories=[...new Set(formats.map(f=>f.category))];
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function fit(text,w,h,size){let n=size;const height=()=>{let count=0;for(const paragraph of String(text).split('\n')){let line='';for(const word of paragraph.split(' ')){if(line&&((line+' '+word).length*n*.55>w)){count++;line=word;}else line+=(line?' ':'')+word;}count++;}return n*(1+(count-1)*1.22);};while(n>5&&height()>h)n*=.94;return Math.max(4,Math.floor(n*10)/10);}
function painter(doc,theme,name){const p=CV.page(name);p.background=theme.bg;const W=doc.width/100,H=doc.height/100,U=Math.min(W,H);
 const rect=(x,y,w,h,fill=theme.soft,radius=0,extra={})=>{const e=CV.element('rect',{x:x*W,y:y*H,w:w*W,h:h*H,fill,radius:radius*U,...extra});p.elements.push(e);return e;};
 const ellipse=(x,y,w,h,fill=theme.accent,extra={})=>{const e=CV.element('ellipse',{x:x*W,y:y*H,w:w*W,h:h*H,fill,...extra});p.elements.push(e);return e;};
 const text=(value,x,y,w,h,size=5,extra={})=>{const e=CV.element('text',{text:String(value),x:x*W,y:y*H,w:w*W,h:h*H,font:theme.font,fontSize:fit(value,w*W,h*H,size*U),fill:theme.ink,align:'left',...extra});p.elements.push(e);return e;};
 const line=(x,y,w,fill=theme.accent)=>rect(x,y,w,.22,fill);
 const art=(x,y,w,h)=>{rect(x,y,w,h,theme.soft,2);ellipse(x+w*.12,y+h*.12,w*.6,h*.6,theme.accent,{opacity:.32});rect(x+w*.4,y+h*.4,w*.43,h*.43,theme.ink,1,{opacity:.13});text('TU IMAGEN',x+w*.1,y+h*.78,w*.8,h*.12,2,{align:'center',fill:theme.ink});};
 const chrome=(index=1)=>{if(doc.brand.companyLogo)p.elements.push(CV.element('image',{x:6*W,y:4*H,w:20*W,h:7*H,src:doc.brand.companyLogo,slot:'companyLogo',fit:'contain',locked:true}));else text(doc.brand.companyName||'CANVAVID · ESTUDIO',6,5,70,4,1.6,{bold:true});text(String(index).padStart(2,'0'),88,93,6,3,1.5,{align:'right'});};
 const decor=()=>{switch(theme.decor){case 'line':line(6,15,12);break;case 'frame':rect(3,3,94,94,theme.bg,0,{stroke:theme.accent,strokeWidth:U*.15});break;case 'rail':rect(0,0,1.6,100,theme.accent);break;case 'blocks':rect(79,0,21,17,theme.accent);rect(88,17,12,12,theme.soft);break;case 'circles':ellipse(82,3,12,12,theme.soft);ellipse(87,8,7,7,theme.accent);break;case 'dots':for(let i=0;i<6;i++)ellipse(81+i%3*5,4+Math.floor(i/3)*5,2,2,theme.accent,{opacity:.4});break;case 'orbit':ellipse(82,3,12,12,theme.bg,{stroke:theme.accent,strokeWidth:U*.3});break;case 'arches':rect(83,3,11,12,theme.accent,5);break;case 'type':rect(0,0,100,1.5,theme.ink);break;case 'grid':for(let i=0;i<7;i++){rect(80+i*2,3,.15,12,theme.accent,0,{opacity:.2});}break;case 'double':rect(2,2,96,96,theme.bg,0,{stroke:theme.accent,strokeWidth:U*.15});rect(3,3,94,94,theme.bg,0,{stroke:theme.accent,strokeWidth:U*.1});break;case 'play':ellipse(84,3,7,7,theme.accent);rect(89,10,5,5,theme.soft,1);break;}};
 return {p,rect,ellipse,text,line,art,chrome,decor,W,H,U};}
function themeFor(id,brand){const original=styles.find(s=>s.id===id);if(!original)throw Error('Estilo no disponible.');const s={...original};if(brand){s.accent=brand.colors?.[0]||s.accent;s.soft=brand.colors?.[1]||s.soft;s.ink=brand.colors?.[2]||s.ink;s.font=brand.font||s.font;}return s;}
function make(formatId,styleId,options={}){const f=formats.find(f=>f.id===formatId);if(!f)throw Error('Formato no disponible.');const s=themeFor(styleId,options.brand),d=CV.document(`${f.name} · ${s.name}`,f.width,f.height);d.brand={colors:[s.accent,s.soft,s.ink],font:s.font,...(options.brand?structuredClone(options.brand):{})};const pages=[];
 const page=(name,index)=>{const b=painter(d,s,name);b.decor();b.chrome(index);pages.push(b.p);return b;};
 const bullets=['Una idea clara y relevante','Una experiencia fácil de entender','Resultados que puedes medir'];
 if(['deck','portfolio','brand'].includes(f.layout)){
  const b=page('Portada',1),shift=styles.indexOf(styles.find(x=>x.id===styleId))%4;
  if(shift===0){b.rect(66,20,28,62,s.soft,3);b.ellipse(71,27,18,31,s.accent);b.text(f.title,6,28,57,35,10,{bold:true});b.text('Una visión clara. Un siguiente paso.',6,70,56,10,3);}
  if(shift===1){b.line(38,25,24);b.text(f.title,12,33,76,28,10,{align:'center'});b.text('Diseña el cambio que quieres ver',18,69,64,10,3,{align:'center'});}
  if(shift===2){b.rect(6,23,88,59,s.accent,2);b.text(f.title,12,34,76,34,10,{bold:true,fill:s.bg});b.text('Ideas · Estrategia · Acción',12,71,76,7,2.5,{fill:s.bg});}
  if(shift===3){b.text('01',6,23,30,25,21,{fill:s.accent,bold:true});b.text(f.title,40,30,54,36,9,{bold:true});b.text('Empieza por lo que importa.',40,73,52,8,3);}
  const names=f.layout==='portfolio'?['Sobre mí','Selección de proyectos','Proceso de trabajo','Hablemos']:f.layout==='brand'?['Nuestra esencia','Paleta de color','Tipografía y estilo','Aplicaciones']:f.id==='lesson'?['Objetivos de aprendizaje','Conceptos clave','Ejemplo práctico','Actividad en grupo','Ideas que conectan','Lo que hemos aprendido','Próximos pasos']:f.id==='pitch'?['El problema','Nuestra solución','Oportunidad','Cómo funciona','Modelo de negocio','Hoja de ruta','Hablemos']:['Nuestra visión','Tres ideas esenciales','Un método sencillo','Datos con contexto','Un plan para avanzar','Próximos pasos','Gracias'];
  names.forEach((name,i)=>{const a=page(name,i+2);a.text(name,6,18,88,15,7,{bold:true});if(name==='Gracias'||name==='Hablemos'){a.text('Hagamos realidad la próxima idea.',12,42,76,22,8,{align:'center',bold:true});a.text('Tu nombre · correo@ejemplo.es',12,73,76,9,3,{align:'center',fill:s.accent});}
   else if(f.layout==='brand'&&i===1){[s.accent,s.soft,s.ink,s.bg].forEach((c,j)=>{a.rect(6+j*23,43,20,30,c,2,{stroke:s.ink,strokeWidth:1});a.text(c,6+j*23,77,20,7,2,{align:'center'});});}
   else if(i%4===0){a.text('Las mejores ideas empiezan con una pregunta.',6,42,45,26,6);a.art(58,40,36,43);}
   else if(i%4===1){bullets.forEach((v,j)=>{a.rect(6+j*30,42,27,39,s.soft,2);a.text('0'+(j+1),9+j*30,47,21,10,5,{fill:s.accent,bold:true});a.text(v,9+j*30,61,21,15,3.2,{bold:true});});}
   else if(i%4===2){a.line(12,56,76);['Explorar','Diseñar','Compartir','Mejorar'].forEach((v,j)=>{a.ellipse(11+j*24,52,4,8,s.accent);a.text(v,6+j*24,65,20,10,3,{align:'center'});});}
   else {a.p.elements.push(CV.element('chart',{x:8*a.W,y:40*a.H,w:53*a.W,h:43*a.H,fill:s.accent,data:'Inicio,20\nAvance,45\nMeta,80',chartType:'bar'}));a.text('80 %',67,41,26,19,11,{bold:true,fill:s.accent});a.text('Un indicador de ejemplo. Sustituye estos datos por los tuyos.',67,65,26,18,2.6);}});
 }else if(['manual','budget','report'].includes(f.layout)){
  const a=page('Portada',1);a.text(f.layout==='manual'?'MANUAL DE APLICACIÓN':f.layout==='budget'?'PRESUPUESTO':'INFORME',6,24,87,8,4,{bold:true,fill:s.accent});a.text(f.title,6,37,88,23,9,{bold:true});a.text(f.layout==='report'?'Un análisis para tomar mejores decisiones':'Preparado para {{cliente}}\n{{fecha}} · {{referencia}}',6,69,78,17,3);
  const b=page(f.layout==='manual'?'Sección reutilizable':f.layout==='budget'?'Servicios':'Resumen ejecutivo',2);b.text(f.layout==='manual'?'{{seccion_titulo}}':f.layout==='budget'?'Servicios y alcance':'Resumen ejecutivo',6,18,88,14,6,{bold:true,fill:s.accent});b.text(f.layout==='manual'?'{{seccion_contenido}}':f.layout==='budget'?'{{servicios}}':'Escribe aquí los hallazgos principales de tu informe.\n\nOrganiza la información en conclusiones claras, datos verificables y recomendaciones concretas.',6,37,88,46,3.5);
  const c=page(f.layout==='budget'?'Importes y condiciones':'Conclusiones y contacto',3);c.text(f.layout==='budget'?'Resumen económico':'Siguientes pasos',6,18,88,14,6,{bold:true});c.text(f.layout==='budget'?'Base imponible: {{subtotal}}\nIVA ({{tipo_iva}} %): {{iva}}\nTOTAL: {{total}}':f.layout==='manual'?'{{contacto}}':'1. Define las prioridades.\n2. Comparte los resultados.\n3. Revisa el progreso.',6,39,88,30,4);c.text('{{condiciones}}',6,74,88,12,2.5);
  if(f.layout==='report'){const v=page('Indicadores',4);v.text('Indicadores de ejemplo',6,18,88,12,6,{bold:true});v.p.elements.push(CV.element('chart',{x:8*v.W,y:37*v.H,w:84*v.W,h:43*v.H,fill:s.accent,data:'Trimestre 1,35\nTrimestre 2,48\nTrimestre 3,65\nTrimestre 4,80',chartType:'bar'}));}
 }else if(f.layout==='invoice'){
  const a=page('Factura',1);a.text('FACTURA',6,18,88,10,8,{bold:true,fill:s.accent});a.text('N.º {{referencia}}\nFecha: {{fecha}}',56,33,38,11,2.8,{align:'right'});a.text('EMISOR\nTu empresa · NIF\nDirección y contacto',6,33,46,14,2.8);a.text('CLIENTE\n{{cliente}}\n{{direccion_cliente}}',6,51,88,13,2.8);a.rect(6,68,88,6,s.soft);a.text('Concepto / importe',9,69,82,4,2.5,{bold:true});a.text('{{servicios}}',9,77,82,7,2.7);a.text('TOTAL: {{total}}',50,86,44,5,3,{bold:true,align:'right'});
 }else if(f.layout==='cv'){
  const a=page('Currículum',1);a.rect(6,19,29,69,s.soft,1);a.text('TU NOMBRE',40,20,54,13,7,{bold:true});a.text('Especialidad profesional',40,34,54,7,3,{fill:s.accent});a.text('CONTACTO\n\ncorreo@ejemplo.es\nCiudad · Teléfono\n\nHABILIDADES\n\nComunicación\nPlanificación\nCreatividad\n\nIDIOMAS\n\nEspañol · Inglés',10,25,21,57,2.7);a.text('PERFIL\n\nDescribe brevemente tu experiencia y la aportación que puedes hacer.\n\nEXPERIENCIA\n\nPuesto · Empresa\nLogros principales y responsabilidades.\n\nFORMACIÓN\n\nTitulación · Centro\nAño de finalización',40,47,54,40,2.9);
 }else if(f.layout==='letter'){
  const a=page('Carta',1);a.text('{{fecha}}',6,21,88,5,2.5,{align:'right'});a.text('A la atención de {{cliente}}',6,32,88,9,4,{bold:true});a.text('Asunto: {{titulo}}',6,46,88,7,3.5,{fill:s.accent});a.text('Estimado/a {{cliente}}:\n\n{{contenido}}\n\nGracias por tu atención.\n\nAtentamente,\n{{firma}}',6,58,88,29,3.1);
 }else if(f.layout==='infographic'){
  const a=page('Infografía',1);a.text(f.title,7,18,86,15,10,{bold:true});['Observa','Pregunta','Conecta','Crea','Comparte'].forEach((name,i)=>{const y=39+i*10;a.ellipse(7,y,13,7,s.accent);a.text('0'+(i+1),8,y+1,11,4,3,{bold:true,align:'center',fill:s.bg});a.text(name,25,y,68,5,4,{bold:true});a.text('Una acción pequeña para una idea más grande.',25,y+5,68,4,2.4);});
 }else if(['poster','flyer','invite'].includes(f.layout)){
  const a=page(f.name,1);if(f.layout==='invite'){a.ellipse(27,19,46,26,s.soft);a.text('ESTÁS INVITADO/A',10,29,80,6,3,{align:'center',fill:s.accent});a.text(f.title,10,49,80,20,10,{align:'center'});a.text('Fecha · Hora\nLugar de celebración',10,75,80,10,3,{align:'center'});}else {a.text(f.layout==='poster'?'EXPERIENCIAS QUE INSPIRAN':'DESCUBRE LO QUE VIENE',7,20,86,7,3,{bold:true,fill:s.accent});a.text(f.title,7,34,86,25,12,{bold:true});a.art(7,66,37,20);a.text('Fecha y lugar\nInscripciones abiertas\nwww.ejemplo.es',51,67,42,18,3.7);}
 }else if(f.layout==='card'){
  const a=page('Anverso',1);a.ellipse(8,30,14,23,s.accent);a.text('TU MARCA',30,28,62,18,8,{bold:true});a.text('Una forma diferente de hacer las cosas',30,53,62,14,3);const b=page('Reverso',2);b.text('Nombre Apellido',8,26,84,15,7,{bold:true});b.text('Cargo profesional',8,44,84,10,3.5,{fill:s.accent});b.text('correo@ejemplo.es  ·  +34 600 000 000\nwww.ejemplo.es',8,65,84,16,3);
 }else if(f.layout==='logo'){
  const a=page('Logotipo',1);a.ellipse(39,24,22,22,s.accent);a.rect(45,30,10,10,s.bg,0,{rotation:45});a.text('TU MARCA',10,56,80,13,10,{align:'center',bold:true});a.text('Tu esencia, en pocas palabras',10,74,80,7,3,{align:'center'});
 }else if(['post','story','carousel','video','banner'].includes(f.layout)){
  const titles=f.layout==='carousel'?['Cinco ideas para avanzar','Empieza con una pregunta','Elige lo que importa','Hazlo sencillo','Comparte lo aprendido']:[f.title];titles.forEach((title,i)=>{const a=page(i?'Idea '+i:'Portada',i+1);if(f.layout==='banner'){a.text(title,7,31,63,35,11,{bold:true});a.ellipse(79,23,14,55,s.accent);a.text('TU MARCA · www.ejemplo.es',7,76,65,9,2.8);}else {const variant=styles.indexOf(styles.find(x=>x.id===styleId))%3;if(variant===0){a.text(title,8,22,84,29,f.layout==='video'?11:10,{bold:true});a.art(8,58,84,22);}if(variant===1){a.rect(7,21,86,62,s.accent,3);a.text(title,14,31,72,35,11,{fill:s.bg,align:'center',bold:true});a.text('GUARDA · COMPARTE · CREA',14,72,72,6,2.5,{fill:s.bg,align:'center'});}if(variant===2){a.art(56,22,37,61);a.text(title,7,28,44,37,9,{bold:true});a.text('Cada idea merece su espacio.',7,71,43,9,3);}if(f.layout==='story')a.text('DESLIZA PARA DESCUBRIR MÁS',9,85,82,5,2,{align:'center'});}});
 }else if(['menu','prices'].includes(f.layout)){
  const titles=f.layout==='menu'?['Nuestra carta','Dulces y bebidas']:['Servicios y tarifas'];titles.forEach((title,index)=>{const a=page(title,index+1);a.text(title,7,20,86,13,9,{align:'center'});a.line(35,36,30);const rows=index?['Café de especialidad','Infusión de la casa','Tarta del día','Postre de temporada','Agua y refrescos']:f.layout==='menu'?['Un comienzo para compartir','Nuestra especialidad','Sabores de temporada','La opción vegetal','Un final inolvidable']:['Servicio esencial','Servicio completo','Asesoramiento','Mantenimiento','Plan a medida'];rows.forEach((label,i)=>{const y=43+i*8;a.text(label,8,y,66,5,3.3);a.text((i+1)*5+',00 €',75,y,17,5,3.1,{align:'right',bold:true});a.line(8,y+6,84,s.soft);});a.text('Consulta disponibilidad y detalles.',8,86,84,4,2,{align:'center'});});
 }else if(f.layout==='certificate'){
  const a=page('Certificado',1);a.text('CERTIFICADO',10,22,80,12,10,{align:'center'});a.text('Se concede a',10,42,80,7,3,{align:'center'});a.text('{{nombre}}',10,53,80,12,8,{align:'center',fill:s.accent});a.text('Por completar {{curso}}\n{{fecha}}',15,70,70,11,3,{align:'center'});a.line(31,87,38);a.text('Firma · Organización',31,88,38,4,1.8,{align:'center'});
 }else if(f.layout==='calendar'){
  const a=page('Calendario',1);a.text('MES / AÑO',7,17,86,12,7,{bold:true});const names=['L','M','X','J','V','S','D'];names.forEach((n,i)=>a.text(n,7+i*12.3,34,11,5,2.5,{bold:true,align:'center'}));for(let i=0;i<35;i++){const x=7+(i%7)*12.3,y=42+Math.floor(i/7)*9.3;a.rect(x,y,11,8.5,s.soft,.5);a.text(i<31?String(i+1):'',x+1,y+1,9,5,2.4);}a.text('Calendario sin mes asignado: ajusta los días al mes elegido.',7,90,86,3,1.5);
 }else if(f.layout==='planner'){
  const a=page('Plan semanal',1);a.text('Esta semana',7,18,86,11,9,{bold:true});['Lunes','Martes','Miércoles','Jueves','Viernes','Fin de semana'].forEach((v,i)=>{const x=i%2?52:7,y=36+Math.floor(i/2)*16;a.rect(x,y,41,14,s.soft,1);a.text(v,x+2,y+1,37,4,3,{bold:true});a.line(x+2,y+8,37,s.bg);a.line(x+2,y+11,37,s.bg);});a.text('Mi prioridad: ______________________',7,87,86,5,3);
 }else if(f.layout==='collage'){
  const a=page('Recuerdos',1);a.text(f.title,7,18,86,15,8,{align:'center'});a.art(7,38,41,23);a.art(52,38,41,23);a.art(7,65,41,23);a.art(52,65,41,23);
 }else if(f.layout==='brochure'){
  for(let i=0;i<2;i++){const a=page(i?'Interior':'Exterior',i+1);for(let j=0;j<3;j++){const x=5+j*31;a.rect(x,19,28,68,j%2?s.soft:s.bg,1,{stroke:s.soft,strokeWidth:1});a.text((i?['Nuestra propuesta','Cómo trabajamos','Qué te ofrecemos']:['Una historia propia','Descubre tu siguiente paso','Hablemos'])[j],x+2,24,24,20,5,{bold:true});a.art(x+2,48,24,18);a.text('Tu contenido, explicado con claridad. Añade aquí los detalles y los datos de contacto.',x+2,70,24,12,2.4);}}}
 d.pages=pages;return CV.validate(d);
}
const entries=formats.flatMap(f=>styles.map(s=>({id:f.id+':'+s.id,formatId:f.id,styleId:s.id,name:f.name+' · '+s.name,category:f.category,width:f.width,height:f.height,pages:f.pages,source:'original',tags:[f.id,f.layout,f.name,f.category,s.name,f.title].join(' ')})));
function search({query='',category='',style='',source=''}={}){const stop=new Set(['para','de','del','el','la','los','las','un','una','mi','mis','quiero','crear','plantilla','plantillas','diseno','disenos','con','y']);const words=normalize(query).split(/\s+/).filter(w=>w&&!stop.has(w));return entries.filter(e=>(!category||e.category===category)&&(!style||e.styleId===style)&&(!source||e.source===source)&&words.every(w=>normalize(e.tags).includes(w)||w.length>4&&w.endsWith('s')&&normalize(e.tags).includes(w.slice(0,w.endsWith('ciones')?-2:-1))));}
const api={styles,formats,categories,entries,search,make,fit,painter};if(typeof module!=='undefined')module.exports=api;else root.Catalogue=api;
})(typeof window!=='undefined'?window:globalThis);
