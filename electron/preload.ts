const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

// api type definitions are in react-app-env.d.ts

//#region Window Controls
contextBridge.exposeInMainWorld('windowControl', {
	isMaximized: () => ipcRenderer.invoke('is-maximized'),
	maximize: () => ipcRenderer.invoke('maximize'),
	unmaximize: () => ipcRenderer.invoke('unmaximize'),
	minimize: () => ipcRenderer.invoke('minimize'),
	close: () => ipcRenderer.invoke('close')
});

// Handle events from main
ipcRenderer.on('maximize', () => {
	const maximizedEvent = new CustomEvent('maximized');
	window.dispatchEvent(maximizedEvent);
});

ipcRenderer.on('unmaximize', () => {
	const unmaximizedEvent = new CustomEvent('unmaximized');
	window.dispatchEvent(unmaximizedEvent);
});
//#endregion

//#region File Operations
contextBridge.exposeInMainWorld('fileOperations', {
	writeFile: (path: string, data: string) => fs.writeFileSync(path, JSON.stringify(data)),
	readFile: (path: string) => JSON.parse(fs.readFileSync(path, 'utf8')),
	getPath: (filename: string) => ipcRenderer.invoke('get-path', filename)
});
//#endregion

//#region Browser
contextBridge.exposeInMainWorld('browser', {
	openExternal: (url: string) => ipcRenderer.invoke('open-external', url)
});
