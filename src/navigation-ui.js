'use strict';
const navigationStyles={
 home:{color:'#ad9cff',label:'Inicio',icon:'<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>'},
 templates:{color:'#9b7bff',label:'Diseños',icon:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/>'},
 elements:{color:'#47d5b5',label:'Elementos',icon:'<rect x="3" y="3" width="8" height="8" rx="2"/><circle cx="17" cy="7" r="4"/><path d="m7 14 5 7H2zM15 15h7v7h-7z"/>'},
 text:{color:'#ffbf65',label:'Texto',icon:'<path d="M4 6V3h16v3M12 3v18M8 21h8"/>'},
 images:{color:'#ff81aa',label:'Imágenes',icon:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="2"/><path d="m3 18 6-6 4 4 3-4 5 6"/>'},
 data:{color:'#69c9ff',label:'Datos y QR',icon:'<path d="M3 21V10h4v11M10 21V3h4v18M17 21V7h4v14"/>'},
 brand:{color:'#ed9aff',label:'Mi marca',icon:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>'},
 layers:{color:'#a7b4ff',label:'Capas',icon:'<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>'},
 online:{color:'#7cddb5',label:'Consulta web',icon:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18z"/>'},
 ai:{color:'#ffcc70',label:'Asistente IA',icon:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>'},
 business:{color:'#7dceff',label:'Plantillas empresa',icon:'<rect x="4" y="3" width="16" height="19" rx="2"/><path d="M8 7h8M8 11h8M8 15h4M8 18h8"/>'},
 review:{color:'#b6e88a',label:'Revisión',icon:'<path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M8 13l3 3L22 5M9 2h6v6H9z"/>'},
 help:{color:'#c8cddd',label:'Ayuda',icon:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01"/>'}
};
for(const button of $('nav').querySelectorAll('[data-panel]')){const item=navigationStyles[button.dataset.panel];if(!item)continue;button.style.setProperty('--nav-color',item.color);button.setAttribute('aria-label',item.label);button.title=item.label;button.innerHTML=`<span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg></span><span class="nav-label">${item.label}</span>`;}
