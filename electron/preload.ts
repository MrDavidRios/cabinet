const { contextBridge, ipcRenderer } = require('electron');

// api type definitions are in react-app-env.d.ts

contextBridge.exposeInMainWorld('windowControl', {
	isMaximized: () => ipcRenderer.invoke('is-maximized'),
	maximize: () => ipcRenderer.invoke('maximize'),
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
