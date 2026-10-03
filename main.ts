
import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    fullscreen: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });
  win.loadURL('http://localhost:3001');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
