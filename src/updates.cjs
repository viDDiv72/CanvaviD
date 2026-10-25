'use strict';
const {EventEmitter}=require('node:events');
class Updates extends EventEmitter{
 constructor(backend,{version,enabled,repository}){super();this.backend=backend;this.enabled=enabled;this.pending=false;this.state={version,repository,phase:enabled?'idle':'disabled',message:enabled?'Pulsa Buscar actualizaciones para consultar GitHub.':'Las actualizaciones se comprueban desde la aplicación instalada.',percent:0};backend.autoDownload=false;backend.autoInstallOnAppQuit=false;backend.allowDowngrade=false;backend.allowPrerelease=false;
  backend.on('checking-for-update',()=>this.set({phase:'checking',message:'Buscando una nueva versión en GitHub…',percent:0}));
  backend.on('update-available',info=>this.set({phase:'available',availableVersion:String(info.version).slice(0,80),notes:typeof info.releaseNotes==='string'?info.releaseNotes.slice(0,12000):'',message:'Hay una nueva versión disponible: '+info.version,percent:0}));
  backend.on('update-not-available',()=>this.set({phase:'current',availableVersion:null,message:'Tienes la última versión publicada.',percent:0}));
  backend.on('download-progress',p=>this.set({phase:'downloading',percent:Math.max(0,Math.min(100,Number(p.percent)||0)),message:'Descargando la actualización…'}));
  backend.on('update-downloaded',info=>this.set({phase:'downloaded',availableVersion:String(info.version).slice(0,80),percent:100,message:'Actualización descargada y verificada. Puedes instalarla cuando hayas guardado tu trabajo.'}));
  backend.on('error',e=>this.fail(e));
 }
 snapshot(){return {...this.state};}
 set(values){Object.assign(this.state,values);this.emit('state',this.snapshot());}
 fail(error){const text=String(error?.message||error).slice(0,1200);this.set({phase:'error',message:'No se pudo completar la actualización. '+text});}
 async check(){if(!this.enabled)throw Error(this.state.message);if(this.pending||this.state.phase==='downloading')throw Error('Espera a que termine la operación actual.');if(this.state.phase==='downloaded')return this.snapshot();this.pending=true;try{await this.backend.checkForUpdates();return this.snapshot();}catch(e){this.fail(e);throw e;}finally{this.pending=false;}}
 async download(){if(this.pending||this.state.phase!=='available')throw Error('Busca primero una actualización disponible.');this.pending=true;this.set({phase:'downloading',message:'Preparando la descarga…',percent:0});try{await this.backend.downloadUpdate();if(this.state.phase!=='downloaded')throw Error('La descarga no se ha completado.');return this.snapshot();}catch(e){this.fail(e);throw e;}finally{this.pending=false;}}
 assertInstallable(){if(this.pending||this.state.phase!=='downloaded')throw Error('La actualización debe estar descargada y verificada antes de instalar.');}
 install(){this.assertInstallable();this.backend.quitAndInstall(false,true);}
}
module.exports={Updates};
