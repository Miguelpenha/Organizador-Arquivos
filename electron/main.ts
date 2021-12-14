import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'
import path from 'path'
import { get, set } from './store'
import fs from 'fs'
import Itheme from './types/theme'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  const caminhoPD: Array<string> = ['configs', 'themes', `${get('theme')}.json`]
  const caminhoDev: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPD)
  const caminhoProd: string = path.resolve(__dirname.split('\app')[0], ...caminhoPD)
  const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
  
  const theme: Itheme = JSON.parse(fs.readFileSync(caminhoAtual).toString('utf-8'))

  mainWindow = new BrowserWindow({
    icon: process.env.NODE_DEVELOPMENT ? path.resolve(__dirname.split('\.webpack')[0], 'assets', 'icon.ico') : path.resolve(__dirname.split('\app')[0], 'assets', 'icon.ico'),
    darkTheme: true,
    resizable: true,
    titleBarStyle: 'customButtonsOnHover',
    movable: true,
    backgroundColor: theme.backgroundColor,
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
      NODE_DEVELOPMENT: 'development' | undefined,
      LOCALAPPDATA: string
    }
  }
}

function registerListeners() {
  if (!get('theme')) set('theme', 'omni')
  ipcMain.on('setTheme', (ev, themeName: string) => set('theme', themeName))

  ipcMain.handle('getFiles', () => {
    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))

    return files
  })

  ipcMain.on('organize', async () => {
    interface IfileType {
      name: string,
      path: string,
      types: Array<string>
    }

    interface IfilesBrutos {
      name: string,
      path: string,
      files: Array<string>
    }
    
    const files: Array<string> = fs.readdirSync(path.resolve(app.getPath('desktop')))
    const caminhoProd = [__dirname.split('\app')[0], 'configs', 'folders']
    const caminhoDev = [__dirname.split('\.webpack')[0], 'configs', 'folders']
    const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
    const folders: Array<string> = fs.readdirSync(path.resolve(...caminhoAtual))
  
    const filesTypes: Array<IfileType> = folders.map(folder => JSON.parse(fs.readFileSync(path.resolve(...caminhoAtual, folder)).toString()))

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

        const resu: IfilesBrutos = {
          name: fileType.name,
          path: fileType.path === 'desktop' ? app.getPath('desktop') : fileType.path,
          files: testeasd123
        }

        return resu
      })
    )

    filesBruto.map(fileBruto => {
      if (fileBruto.files.length > 0) {
        try {
          fs.mkdirSync(path.resolve(fileBruto.path, fileBruto.name))
        } catch {

        }
      }

      fileBruto.files.map(file => {
        try {
          fs.renameSync(path.resolve(app.getPath('desktop'), file), path.resolve(fileBruto.path, fileBruto.name, file))
        } catch {
          
        }
      })
    })
  })

  ipcMain.on('openConfigFolder', () => {
    if (process.env.NODE_DEVELOPMENT) {
      shell.openPath(path.resolve(__dirname.split('\.webpack')[0], 'configs'))
    } else {
      shell.openPath(path.resolve(__dirname.split('\app')[0], 'configs'))
    }
  })

  ipcMain.handle('opendialogConfigFiles', async () => {
    let pathBruto = await dialog.showOpenDialog({properties: ['openDirectory']})

    if (pathBruto.canceled) {
      return undefined 
    } else {
      const path = pathBruto.filePaths[0]
      
      if (path === app.getPath('desktop')) {
        return 'desktop'
      } else {
        return path
      }
    }
  })
}

app.whenReady()
  .then(() => {
    createWindow()
    registerListeners()

    app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
  })
  .catch(error => console.error(error))
  
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())