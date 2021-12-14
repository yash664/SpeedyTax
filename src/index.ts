import { app, BrowserWindow, ipcMain } from 'electron';
import { initDB } from './Database/db';
const path = require('path');
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	initDB();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
