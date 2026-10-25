const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktop',{
  libraryList:kind=>ipcRenderer.invoke('library:list',kind),libraryRead:(kind,id)=>ipcRenderer.invoke('library:read',kind,id),librarySave:(kind,input)=>ipcRenderer.invoke('library:save',kind,input),libraryRemove:(kind,id)=>ipcRenderer.invoke('library:remove',kind,id),templateExport:input=>ipcRenderer.invoke('template:export',input),templateImport:()=>ipcRenderer.invoke('template:import'),
  updatesStatus:()=>ipcRenderer.invoke('updates:status'),updatesCheck:()=>ipcRenderer.invoke('updates:check'),updatesDownload:()=>ipcRenderer.invoke('updates:download'),updatesInstall:()=>ipcRenderer.invoke('updates:install'),onUpdates:fn=>ipcRenderer.on('updates:state',(_event,status)=>fn(status)),
  open:()=>ipcRenderer.invoke('project:open'), save:(data,path)=>ipcRenderer.invoke('project:save',{data,path}),
  recover:()=>ipcRenderer.invoke('project:recover'), autosave:data=>ipcRenderer.invoke('project:autosave',data),
  exportFile:(kind,data,name)=>ipcRenderer.invoke('export:file',{kind,data,name}),
  pdf:(pages,w,h,name)=>ipcRenderer.invoke('export:pdf',{pages,w,h,name}),
  pptx:(pages,w,h,name)=>ipcRenderer.invoke('export:pptx',{pages,w,h,name}),
  qr:text=>ipcRenderer.invoke('qr',text), search:query=>ipcRenderer.invoke('online:search',query),
  external:url=>ipcRenderer.invoke('external',url),closeReady:()=>ipcRenderer.send('close-ready'),
  onClosing:fn=>ipcRenderer.on('closing',()=>fn()),
  catalogueLicenses:()=>ipcRenderer.invoke('catalogue:licenses'),
  systemFonts:refresh=>ipcRenderer.invoke('fonts:list',refresh===true),
  aiSettings:()=>ipcRenderer.invoke('ai:settings'), aiConfigure:config=>ipcRenderer.invoke('ai:configure',config),
  aiModels:()=>ipcRenderer.invoke('ai:models'), aiGenerate:input=>ipcRenderer.invoke('ai:generate',input),
  aiCancel:()=>ipcRenderer.invoke('ai:cancel'), aiApply:input=>ipcRenderer.invoke('ai:apply',input),
});
