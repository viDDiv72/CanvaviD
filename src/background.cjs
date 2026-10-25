'use strict';
const {Worker}=require('node:worker_threads');const path=require('node:path');
let worker,sequence=0;const pending=new Map();
function run(type,payload){if(!worker){worker=new Worker(path.join(__dirname,'jobs.cjs'));worker.unref();worker.on('message',r=>{const p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(r.error)):p.resolve(r.value);}});worker.on('error',e=>{for(const p of pending.values())p.reject(e);pending.clear();worker=null;});}return new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});worker.postMessage({id,type,payload});});}
module.exports={run};
