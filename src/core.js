(function(root){
  'use strict';
  const fonts=['Arial','Georgia','Verdana','Trebuchet MS','Courier New','Times New Roman'];
  const fontName=value=>typeof value==='string'&&/^[^\x00-\x1f<>;{}]{1,150}$/u.test(value)?value:'Arial';
  function setFonts(values){fonts.splice(0,fonts.length,...[...new Set(values.map(fontName))].sort((a,b)=>a.localeCompare(b,'es',{sensitivity:'base'})));}
  const id=()=>globalThis.crypto.randomUUID();
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const color=(s,f='#26304a')=>/^#[0-9a-f]{3,8}$/i.test(s||'')?s:f;
  const num=(n,d=0,min=-20000,max=20000)=>Number.isFinite(Number(n))?Math.max(min,Math.min(max,Number(n))):d;
  function element(type, props={}) {return {id:id(),type,x:100,y:100,w:240,h:140,rotation:0,fill:'#7856ff',stroke:'#000000',strokeWidth:0,opacity:1,locked:false,...props};}
  function page(name='Página 1'){return {id:id(),name,background:'#ffffff',notes:'',elements:[]};}
  function document(name='Diseño sin título',w=1280,h=720){return {format:'canvavid',version:1,id:id(),name,width:w,height:h,pages:[page()],brand:{colors:['#7856ff','#15b8a6','#172239'],font:'Arial'}};}
  function validate(input){
    if(!input||input.format!=='canvavid'||input.version!==1||!Array.isArray(input.pages)||input.pages.length<1||input.pages.length>100)throw Error('Archivo CanvaviD no válido. Se admiten de 1 a 100 páginas.');
    const d=document(String(input.name||'Proyecto').slice(0,200),num(input.width,1280,100,8000),num(input.height,720,100,8000));
    if(typeof input.id==='string'&&input.id.length<=100)d.id=input.id;
    const ids=new Set();const pageIds=new Set();
    d.pages=input.pages.map((p,i)=>{
      if(!p||!Array.isArray(p.elements)||p.elements.length>1500)throw Error('Página no válida o con demasiados elementos.');
      const out=page(String(p.name||`Página ${i+1}`).slice(0,120));if(typeof p.id==='string'&&p.id.length<=100&&!pageIds.has(p.id))out.id=p.id;pageIds.add(out.id);out.background=color(p.background,'#ffffff');out.notes=String(p.notes||'').slice(0,100000);out.comments=Array.isArray(p.comments)?p.comments.slice(-200).map(c=>({id:String(c.id||id()).slice(0,100),elementId:String(c.elementId||'').slice(0,100),author:String(c.author||'Yo').slice(0,80),text:String(c.text||'').slice(0,3000),resolved:!!c.resolved,createdAt:num(c.createdAt,Date.now(),0,1e15)})):[];
      out.elements=p.elements.map(e=>{
        if(!e||!['text','rect','ellipse','line','image','pen','chart','table','star'].includes(e.type))throw Error('Tipo de elemento no admitido.');
        if(e.type==='image'&&!/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$/.test(e.src||''))throw Error('La imagen debe estar incrustada en un formato seguro.');
        const v=element(e.type,{x:num(e.x),y:num(e.y),w:num(e.w,200,1,16000),h:num(e.h,100,1,16000),rotation:num(e.rotation),fill:color(e.fill),stroke:color(e.stroke,'#000000'),strokeWidth:num(e.strokeWidth,0,0,60),opacity:num(e.opacity,1,0,1),locked:!!e.locked});
        if(typeof e.id==='string'&&!ids.has(e.id)){v.id=e.id;}ids.add(v.id);
        if(['clientLogo','companyLogo','companyName'].includes(e.slot))v.slot=e.slot;if(typeof e.group==='string')v.group=e.group.slice(0,100);
        if(e.type==='text')Object.assign(v,{text:String(e.text||'').slice(0,30000),font:fontName(e.font),fontSize:num(e.fontSize,40,4,500),bold:!!e.bold,italic:!!e.italic,align:['left','center','right'].includes(e.align)?e.align:'left'});
        if(e.type==='image')Object.assign(v,{src:e.src,fit:e.fit==='contain'?'contain':'cover',brightness:num(e.brightness,1,0,3),grayscale:!!e.grayscale,attribution:String(e.attribution||'').slice(0,2000)});
        if(e.type==='pen'){v.points=Array.isArray(e.points)?e.points.slice(0,20000).map(p=>[num(p[0]),num(p[1])]):[];v.baseW=num(e.baseW,v.w,1,16000);v.baseH=num(e.baseH,v.h,1,16000);}
        if(e.type==='rect')v.radius=num(e.radius,0,0,1000);
        if(e.type==='chart')Object.assign(v,{data:String(e.data||'Enero,40\nFebrero,65\nMarzo,90').slice(0,10000),chartType:e.chartType==='pie'?'pie':'bar'});
        if(e.type==='table')v.data=String(e.data||'Columna 1,Columna 2\nDato,Dato').slice(0,20000);
        return v;
      });return out;
    });
    if(input.brand){d.brand={colors:(input.brand.colors||[]).slice(0,12).map(c=>color(c)),font:fontName(input.brand.font),companyName:String(input.brand.companyName||'').slice(0,200),headingSize:num(input.brand.headingSize,40,8,200),bodySize:num(input.brand.bodySize,25,8,100),headingBold:input.brand.headingBold!==false,bodyItalic:!!input.brand.bodyItalic};if(/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$/.test(input.brand.companyLogo||''))d.brand.companyLogo=input.brand.companyLogo;}
    return d;
  }
  function content(e){
    const w=e.w,h=e.h;
    if(e.type==='text'){
      const size=e.fontSize||40,align=e.align||'left',anchor={left:'start',center:'middle',right:'end'}[align],x={left:0,center:w/2,right:w}[align];
      const lines=[];for(const paragraph of (e.text||'').split('\n')){const words=paragraph.split(' ');let line='';for(const word of words){if(line.length&&((line+' '+word).length*size*.55>w)){lines.push(line);line=word;}else line+=(line?' ':'')+word;}lines.push(line);}
      return `<text fill="${color(e.fill)}" font-family="${esc(e.font||'Arial')}" font-size="${size}" font-weight="${e.bold?'700':'400'}" font-style="${e.italic?'italic':'normal'}" text-anchor="${anchor}" xml:space="preserve">${lines.map((l,i)=>`<tspan x="${x}" y="${size*(1+i*1.22)}">${esc(l)}</tspan>`).join('')}</text>`;
    }
    const style=`fill="${color(e.fill)}" stroke="${color(e.stroke,'#000000')}" stroke-width="${e.strokeWidth||0}"`;
    if(e.type==='rect')return `<rect width="${w}" height="${h}" rx="${e.radius||0}" ${style}/>`;
    if(e.type==='ellipse')return `<ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" ${style}/>`;
    if(e.type==='star'){const points=Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,r=i%2?.22:.5;return `${w/2+Math.cos(a)*w*r},${h/2+Math.sin(a)*h*r}`;}).join(' ');return `<polygon points="${points}" ${style}/>`;}
    if(e.type==='line')return `<line x1="0" y1="0" x2="${w}" y2="${h}" stroke="${color(e.fill)}" stroke-width="${e.strokeWidth||4}" stroke-linecap="round"/>`;
    if(e.type==='image')return `<svg width="${w}" height="${h}" overflow="hidden"><image href="${esc(e.src)}" width="${w}" height="${h}" preserveAspectRatio="${e.fit==='contain'?'xMidYMid meet':'xMidYMid slice'}" style="filter:brightness(${e.brightness??1}) grayscale(${e.grayscale?1:0})"/></svg>`;
    if(e.type==='pen')return `<svg width="${w}" height="${h}" viewBox="0 0 ${e.baseW||w} ${e.baseH||h}" overflow="visible"><polyline points="${(e.points||[]).map(p=>p.join(',')).join(' ')}" fill="none" stroke="${color(e.fill)}" stroke-width="${e.strokeWidth||3}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    if(e.type==='table'){
      const rows=(e.data||'').split('\n').slice(0,30).map(r=>r.split(',').slice(0,12)),cols=Math.max(1,...rows.map(r=>r.length)),cw=w/cols,rh=h/Math.max(1,rows.length);
      return rows.map((r,i)=>Array.from({length:cols},(_,j)=>`<rect x="${j*cw}" y="${i*rh}" width="${cw}" height="${rh}" fill="${i===0?color(e.fill):i%2?'#f2f4fa':'#ffffff'}" stroke="#d8ddeb"/><text x="${j*cw+8}" y="${i*rh+rh*.6}" font-family="Arial" font-size="${Math.min(22,rh*.4,cw*.16)}" fill="${i===0?'#ffffff':'#26304a'}">${esc(r[j]||'')}</text>`).join('')).join('');
    }
    if(e.type==='chart'){
      const rows=(e.data||'').split('\n').map(r=>{const parts=r.split(',');return [parts[0],num(parts[1],0,0,1e9)];}).slice(0,30),max=Math.max(1,...rows.map(r=>r[1])),total=rows.reduce((s,r)=>s+r[1],0)||1,palette=[color(e.fill),'#14b8a6','#f5ab54','#ed6c8e','#6485ea'];
      if(e.chartType==='pie'){let a=-Math.PI/2;return rows.map((r,i)=>{const b=a+r[1]/total*Math.PI*2,cx=w/2,cy=h/2,rad=Math.min(w,h)*.45;const path=r[1]===total?`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${palette[i%5]}"/>`:`<path d="M${cx},${cy} L${cx+Math.cos(a)*rad},${cy+Math.sin(a)*rad} A${rad},${rad} 0 ${b-a>Math.PI?1:0},1 ${cx+Math.cos(b)*rad},${cy+Math.sin(b)*rad} Z" fill="${palette[i%5]}"/>`;a=b;return path;}).join('');}
      const bw=w/Math.max(1,rows.length);return rows.map((r,i)=>{const bh=(h-40)*r[1]/max;return `<rect x="${i*bw+8}" y="${h-30-bh}" width="${Math.max(1,bw-16)}" height="${bh}" rx="5" fill="${palette[i%5]}"/><text x="${i*bw+bw/2}" y="${h-8}" text-anchor="middle" font-size="${Math.min(18,bw*.2)}" font-family="Arial">${esc(r[0])}</text><text x="${i*bw+bw/2}" y="${h-36-bh}" text-anchor="middle" font-family="Arial" font-size="16">${r[1]}</text>`;}).join('');
    }
    return '';
  }
  function markup(e){return `<g data-id="${esc(e.id)}" opacity="${num(e.opacity,1,0,1)}" transform="translate(${e.x} ${e.y}) rotate(${e.rotation||0} ${e.w/2} ${e.h/2})">${content(e)}</g>`;}
  function svg(d,p){return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${d.width}" height="${d.height}" viewBox="0 0 ${d.width} ${d.height}"><rect width="100%" height="100%" fill="${color(p.background,'#ffffff')}"/>${p.elements.map(markup).join('')}</svg>`;}
  function fontOptions(selected){const list=fonts.includes(selected)?fonts:[selected,...fonts];return list.filter(Boolean).map(f=>`<option value="${esc(f)}" ${f===selected?'selected':''}>${esc(f)}${fonts.includes(f)?'':' (no instalada)'}</option>`).join('');}
  const api={fonts,fontName,setFonts,fontOptions,id,esc,color,element,page,document,validate,markup,svg};
  if(typeof module!=='undefined')module.exports=api;else root.CV=api;
})(typeof window!=='undefined'?window:globalThis);
