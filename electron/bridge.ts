import { contextBridge, ipcRenderer } from 'electron'
import { get } from './store/index'
import fs from 'fs'
import path from 'path'
import Itheme from './types/theme'

const api = {
  theme: {
    get: {
      used: () => {
        const caminhoPD: Array<string> = ['..', '..', '..', 'configs', 'themes', `${get('theme')}.json`]
        const caminhoDev: string = path.resolve(__dirname, ...caminhoPD)
        const caminhoProd: string = path.resolve(__dirname, '..', ...caminhoPD)
        const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
        
        const theme: Itheme = JSON.parse(fs.readFileSync(caminhoAtual).toString('utf-8'))
  
        return theme
      },
      themes: () => {
        const caminhoPD: Array<string> = ['..', '..', '..', 'configs', 'themes']
        const caminhoDev: string = path.resolve(__dirname, ...caminhoPD)
        const caminhoProd: string = path.resolve(__dirname, '..', ...caminhoPD)
        const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
        
        const themesBrutos: Array<string> = fs.readdirSync(caminhoAtual)

        const themes: Array<Itheme> = themesBrutos.map(theme => JSON.parse(
          fs.readFileSync(
            path.resolve(caminhoAtual, theme)
          ).toString('utf-8')
        ))
        
        return themes
      }
    },
    set: (theme: string) => ipcRenderer.send('setTheme', theme),
  },
  files: {
    get: async () => {
      const files: Array<string> = await ipcRenderer.invoke('getFiles')

      return files
    },
    organize: () => ipcRenderer.send('organize')
  }
}

contextBridge.exposeInMainWorld('electron', api)

export default api