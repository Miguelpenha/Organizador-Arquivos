import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { get, set } from './store'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: process.env.NODE_DEVELOPMENT ? path.resolve(__dirname, '..', '..', 'assets', 'icon.ico') : path.resolve(__dirname, '..', '..', '..', 'assets', 'icon.ico'),
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.maximize()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => mainWindow = null)
}


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERPROFILE: string
    }
  }
}

function registerListeners() {
  if (!get('theme')) {
    console.log(get('theme'))
    set('theme', 'omni')
  }

  ipcMain.on('message', (ev, message) => console.log(message))

  ipcMain.on('setTheme', (ev, theme) => {
    set('theme', theme)
    mainWindow?.reload()
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(error => console.error(error))

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())