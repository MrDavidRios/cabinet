import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		minWidth: 600,

		height: 600,
		minHeight: 400,

		frame: false,

		webPreferences: {
			// contextIsolation: false,
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	ipcMain.handle('is-maximized', () => {
		return win.isMaximized();
	});

	ipcMain.handle('minimize', () => {
		return win.minimize();
	});

	ipcMain.handle('maximize', () => {
		return win.maximize();
	});

	ipcMain.handle('unmaximize', () => {
		return win.unmaximize();
	});

	ipcMain.handle('close', () => {
		return win.close();
	});

	win.on('maximize', () => {
		win.webContents.send('maximize');
	});

	win.on('unmaximize', () => {
		win.webContents.send('unmaximize');
	});

	if (app.isPackaged) {
		// 'build/index.html'
		win.loadURL(`file://${__dirname}/../index.html`);
	} else {
		win.loadURL('http://localhost:3000/index.html');

		win.webContents.openDevTools();

		// Hot Reloading on 'node_modules/.bin/electronPath'
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron' + (process.platform === 'win32' ? '.cmd' : '')),
			forceHardReset: true,
			hardResetMethod: 'exit'
		});
	}
}

ipcMain.handle('get-path', (event, filename) => {
	return app.getPath('userData') + `\\${filename}`;
});

ipcMain.handle('open-external', (event, url) => {
	return shell.openExternal(url);
});

app.whenReady().then(() => {
	// DevTools
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
});
