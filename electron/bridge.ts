import { contextBridge, ipcRenderer } from 'electron'
import { get } from './store/index'
import fs from 'fs'
import path from 'path'
import Itheme from './types/theme'

export const api = {
  theme: {
    get: () => {
      const caminhoPD: Array<string> = ['..', '..', '..', 'themes', `${get('theme')}.json`]
      const caminhoDev: string = path.resolve(__dirname, ...caminhoPD)
      const caminhoProd: string = path.resolve(__dirname, '..', ...caminhoPD)

      const theme: Itheme = JSON.parse(
        fs.readFileSync(
          process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
        ).toString('utf-8')
      )

      return theme
    },
    set: (theme: string) => ipcRenderer.send('setTheme', theme),
  },
  files: {
    get: async () => {
      const files: Array<string> = await ipcRenderer.invoke('getFiles')

      return files
    },
    organize: async () => ipcRenderer.send('organize')
  }
}

contextBridge.exposeInMainWorld('electron', api)