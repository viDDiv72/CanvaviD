'use strict';
const fs=require('node:fs/promises');const path=require('node:path');const CV=require('./core.js');const Business=require('./business.js');
class Library{
 constructor(root){this.root=root;this.queue=Promise.resolve();}
 serial(fn){const job=this.queue.catch(()=>{}).then(fn);this.queue=job;return job;}
 async directory(kind){const dir=path.join(this.root,kind);await fs.mkdir(dir,{recursive:true});return dir;}
 async list(kind){if(!['templates','versions'].includes(kind))throw Error('Biblioteca no válida.');const dir=await this.directory(kind),out=[];for(const name of await fs.readdir(dir)){if(!/^[a-f0-9-]+\.json$/.test(name))continue;try{const x=JSON.parse(await fs.readFile(path.join(dir,name),'utf8'));out.push({id:name.slice(0,-5),name:x.name,kind:x.kind,createdAt:x.createdAt,projectId:x.projectId});}catch{}}return out.sort((a,b)=>b.createdAt-a.createdAt);}
 async read(kind,id){if(!['templates','versions'].includes(kind)||! /^[a-f0-9-]{36}$/.test(id))throw Error('Identificador no válido.');const x=JSON.parse(await fs.readFile(path.join(await this.directory(kind),id+'.json'),'utf8'));return kind==='templates'?Business.validate(x):{...x,doc:CV.validate(x.doc)};}
 save(kind,input){return this.serial(async()=>{let x;if(kind==='templates')x=Business.validate(input);else if(kind==='versions'){const doc=CV.validate(input.doc);x={id:CV.id(),name:String(input.name||doc.name).slice(0,150),projectId:doc.id,doc};}else throw Error('Biblioteca no válida.');x.id=CV.id();x.createdAt=Date.now();const dir=await this.directory(kind),file=path.join(dir,x.id+'.json');await fs.writeFile(file+'.writing',JSON.stringify(x));await fs.rename(file+'.writing',file);return x.id;});}
 remove(kind,id){return this.serial(async()=>{await this.read(kind,id);await fs.unlink(path.join(await this.directory(kind),id+'.json'));});}
}
module.exports={Library};
