import { app, BrowserWindow, ipcMain } from 'electron';
import { initDbConnection, severDbConnection } from './Database/dbHelper';
import { User } from './types';
import { validateUser } from './Database/dbContentProvider';
const path = require('path');
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
	severDbConnection();
	app.quit();
}

ipcMain.on('validate-user', (event, user: User) => validateUser(event, user))

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		height: 800,
		width: 800,
		minHeight: 800,
		minWidth: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		}
	});
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	initDbConnection();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		severDbConnection();
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
