import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { get, set } from './store'
import fs from 'fs'
import configFiles from '../assets/configFiles.json'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: process.env.NODE_DEVELOPMENT ? path.resolve(__dirname, '..', '..', 'assets', 'icon.ico') : path.resolve(__dirname, '..', '..', '..', 'assets', 'icon.ico'),
    backgroundColor: '#191622',
    darkTheme: true,
    resizable: true,
    titleBarStyle: 'customButtonsOnHover',
    movable: true,
    title: 'Organizador de arquivos',
    closable: true,
    center: true,
    maximizable: true,
    minimizable: true,
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
    set('theme', 'omni')
  }

  ipcMain.on('setTheme', (ev, theme: string) => {
    set('theme', theme)
    mainWindow?.reload()
  })

  ipcMain.handle('getFiles', () => {
    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))

    console.log(files)
  })

  ipcMain.on('organize', () => {
    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))

    const planilhas: Array<string> = []
    const textos: Array<string> = []
    const pdfs: Array<string> = []
    const vídeos: Array<string> = []
    const áudios: Array<string> = []
    const dev: Array<string> = []
    const imagens: Array<string> = []
    const slides: Array<string> = []
    
    files.map(file => {
      configFiles.planilhas.map(type => file.includes(`.${type}`) && planilhas.push(file))
      configFiles.textos.map(type => file.includes(`.${type}`) && textos.push(file))
      configFiles.pdfs.map(type => file.includes(`.${type}`) && pdfs.push(file))
      configFiles.vídeos.map(type => file.includes(`.${type}`) && vídeos.push(file))
      configFiles.áudios.map(type => file.includes(`.${type}`) && áudios.push(file))
      configFiles.dev.map(type => file.includes(`.${type}`) && dev.push(file))
      configFiles.imagens.map(type => file.includes(`.${type}`) && imagens.push(file))
      configFiles.slides.map(type => file.includes(`.${type}`) && slides.push(file))
    })

    try {
      planilhas.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'planilhas'))
    } catch {

    }
    try {
      textos.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'textos'))
    } catch {

    }
    try {
      pdfs.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'pdfs'))
    } catch {

    }
    try {
      vídeos.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'vídeos'))
    } catch {

    }
    try {
      áudios.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'áudios'))
    } catch {

    }
    try {
      dev.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'dev'))
    } catch {

    }
    try {
      imagens.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'imagens'))
    } catch {

    }
    try {
      slides.length > 0 && fs.mkdirSync(path.resolve(app.getPath('desktop'), 'slides'))
    } catch {

    }
    try {
      planilhas.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'planilhas', file))
        } catch {
          
        }
      })
    } catch {

    }
    try {
      textos.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'textos', file))
        } catch {

        }
      })
    } catch {

    }
    try {
      pdfs.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'pdfs', file))
        } catch {

        }
      })
    } catch {

    }
    try {
      vídeos.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'vídeos', file))
        } catch {

        }
      })
    } catch {

    }
    try {
      áudios.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'áudios', file))
        } catch {

        }
      })
    } catch {

    }
    try {
      dev.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'dev', file))
        } catch {

        }
      })
    } catch {
      
    }
    try {
      imagens.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'imagens', file))
        } catch {

        }
      })
    } catch {

    }
    try {
      slides.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), 'slides', file))
        } catch {
          
        }
      })
    } catch {

    }
    
    return files
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(error => console.error(error))

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())