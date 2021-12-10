import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { get, set } from './store'
import fs from 'fs'
import Itheme from './types/theme'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: process.env.NODE_DEVELOPMENT ? path.resolve(__dirname, '..', '..', 'assets', 'icon.ico') : path.resolve(__dirname, '..', '..', '..', 'assets', 'icon.ico'),
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
      USERPROFILE: string,
      NODE_DEVELOPMENT: 'development' | undefined
    }
  }
}

function registerListeners() {
  if (!get('theme')) set('theme', 'omni')

  ipcMain.on('setTheme', (ev, themeName: string) => {
    set('theme', themeName)
    // mainWindow?.reload()
  })

  ipcMain.handle('getFiles', () => {
    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))

    return files
  })

  ipcMain.on('organize', async () => {
    interface IfileType {
      name: string,
      types: Array<string>
    }

    interface IfilesBrutos {
      name: string,
      files: Array<string>
    }

    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))
    const caminhoProd = ['..', '..', '..', 'configs', 'folders']
    const caminhoDev = ['..', '..', 'configs', 'folders']
    const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
    const folders: Array<string> = fs.readdirSync(path.resolve(__dirname, ...caminhoAtual))
    
    const filesTypes: Array<IfileType> = folders.map(folder => JSON.parse(fs.readFileSync(path.resolve(__dirname, ...caminhoAtual, folder)).toString()))

    let filesBruto: Array<IfilesBrutos> = await Promise.all(
      filesTypes.map(async fileType => {
        const filesSelect = Promise.all(
          files.map((file: string) => {
            const teste1: Array<string | null> = fileType.types.map((type: string) => {
              if (file.includes(`.${type}`)) {
                return file
              } else {
                return null
              }
            })

            const teste1filter: Array<string | null> = teste1.filter(el => el != null)

            return teste1filter[0]
          })
        )

        const testeasd: Array<string | null> = (await filesSelect).filter(el => el != undefined)

        const testeasd123: Array<string> = testeasd.map(value => String(value))

        return {
          name: fileType.name,
          files: testeasd123
        }
      })
    )

    filesBruto.map(fileBruto => {
      if (fileBruto.files.length > 0) {
        try {
          fs.mkdirSync(path.resolve(app.getPath('desktop'), fileBruto.name))
        } catch {

        }
      }

      fileBruto.files.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(app.getPath('desktop'), fileBruto.name, file))
        } catch {
          
        }
      })
    })
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(error => console.error(error))
  
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())

app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())