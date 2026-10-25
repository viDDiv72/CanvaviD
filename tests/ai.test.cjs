'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),http=require('node:http');
const CV=require('../src/core.js'),AI=require('../src/ai.cjs');
test('AI actions need approval, reject unsafe operations, locked elements and stale pages',()=>{
  const d=CV.document();const e=CV.element('text',{text:'Original',font:'Arial',fontSize:40});d.pages[0].elements.push(e);
  const p=AI.validateProposal({title:'Mejora',actions:[{type:'set_text',id:e.id,text:'En equipo'}]},d,d.pages[0].id);
  assert.equal(d.pages[0].elements[0].text,'Original');assert.equal(AI.applyProposal(d,p).pages[0].elements[0].text,'En equipo');
  assert.throws(()=>AI.validateProposal({actions:[{type:'execute',code:'alert(1)'}]},d,d.pages[0].id));
  e.text='Otra revisión';assert.throws(()=>AI.applyProposal(d,p),/cambiado/);e.locked=true;assert.throws(()=>AI.validateProposal({actions:[{type:'set_text',id:e.id,text:'No'}]},d,d.pages[0].id),/bloqueado/);
});
test('AI context excludes embedded images and notes',()=>{const d=CV.document();d.pages[0].notes='Nota privada';d.pages[0].elements.push(CV.element('image',{src:'data:image/png;base64,aGVsbG8='}));const text=JSON.stringify(AI.context(d,d.pages[0].id));assert.ok(!text.includes('aGVsbG8'));assert.ok(!text.includes('Nota privada'));});
test('both provider HTTP adapters parse and validate proposals (simulated models, not inference quality)',async t=>{
  const observed=[];const server=http.createServer(async(req,res)=>{let body='';for await(const c of req)body+=c;const b=JSON.parse(body);observed.push({url:req.url,headers:req.headers,payload:b});const output=JSON.stringify({title:'Una propuesta',explanation:'Texto de prueba',actions:[{type:'add_text',text:'Hecho en equipo',x:20,y:20,w:400,h:100,fontSize:40,bold:true,fill:'#6633aa'}]});res.setHeader('Content-Type','application/json');res.end(JSON.stringify(req.url==='/api/chat'?{message:{content:output}}:{choices:[{message:{content:output}}]}));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const base='http://127.0.0.1:'+server.address().port;const d=CV.document();
  for(const provider of ['ollama','openai']){const p=await AI.generate({config:{provider,model:'simulado',endpoint:provider==='ollama'?base:base+'/v1/chat/completions'},key:provider==='openai'?'clave-de-prueba':'',doc:d,pageId:d.pages[0].id,prompt:'Añade un título'});assert.equal(p.actions[0].text,'Hecho en equipo');assert.equal(d.pages[0].elements.length,0);assert.equal(AI.applyProposal(d,p).pages[0].elements.length,1);}
  assert.equal(observed[0].url,'/api/chat');assert.equal(observed[0].payload.stream,false);assert.equal(observed[1].headers.authorization,'Bearer clave-de-prueba');assert.deepEqual(observed[1].payload.response_format,{type:'json_object'});
});
test('provider errors and cancellation do not silently fabricate a proposal',async t=>{
  const server=http.createServer((_req,res)=>{res.writeHead(401);res.end('{}');});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const d=CV.document();const config={provider:'openai',model:'simulado',endpoint:'http://127.0.0.1:'+server.address().port+'/v1/chat/completions'};
  await assert.rejects(AI.generate({config,key:'test',doc:d,pageId:d.pages[0].id,prompt:'hola'}),/401/);
  const ac=new AbortController();ac.abort();await assert.rejects(AI.generate({config,key:'test',doc:d,pageId:d.pages[0].id,prompt:'hola',signal:ac.signal}));
});
