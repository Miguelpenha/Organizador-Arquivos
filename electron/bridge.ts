import { contextBridge, ipcRenderer } from 'electron'
import { get } from './store/index'
import fs from 'fs'
import path from 'path'
import Itheme from './types/theme'

const api = {
  theme: {
    get: {
      used: () => {
        const caminhoPD: string[] = ['configs', 'themes', `${get('theme')}.json`]
        const caminhoDev: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPD)
        const caminhoProd: string = path.resolve(__dirname.split('\app')[0], ...caminhoPD)
        const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
        
        const theme: Itheme = JSON.parse(fs.readFileSync(caminhoAtual).toString('utf-8'))
  
        return theme
      },
      themes: () => {
        const caminhoPD: string[] = ['configs', 'themes']
        const caminhoDev: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPD)
        const caminhoProd: string = path.resolve(__dirname.split('\app')[0], ...caminhoPD)
        const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd
        
        const themesBrutos: string[] = fs.readdirSync(caminhoAtual)

        const themes: Itheme[] = themesBrutos.map(theme => JSON.parse(
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
      const files: string[] = await ipcRenderer.invoke('getFiles')

      return files
    },
    organize: () => ipcRenderer.send('organize')
  },
  configsFiles: {
    get: () => {
      const caminhoPD: string[] = ['configs', 'folders']
      const caminhoDev: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPD)
      const caminhoProd: string = path.resolve(__dirname.split('\app')[0], ...caminhoPD)
      const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd

      interface Iconfig {
        name: string
        path: string
        types: string[]
      }

      const configs: Iconfig[] = []

      fs.readdirSync(caminhoAtual).map(config => {
        const caminhoPDConfig: string[] = ['configs', 'folders', config]
        const caminhoDevConfig: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPDConfig)
        const caminhoProdConfig: string = path.resolve(__dirname.split('\app')[0], ...caminhoPDConfig)
        const caminhoAtualConfig = process.env.NODE_DEVELOPMENT ? caminhoDevConfig : caminhoProdConfig

        configs.push(JSON.parse(fs.readFileSync(caminhoAtualConfig).toString('utf-8')))
      })

      return configs
    },
    openDialog: async () => await ipcRenderer.invoke('opendialogConfigFiles'),
    set: (name: string, pathBruto: string) => {
      const caminhoPD: string[] = ['configs', 'folders']
      const caminhoDev: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPD)
      const caminhoProd: string = path.resolve(__dirname.split('\app')[0], ...caminhoPD)
      const caminhoAtual = process.env.NODE_DEVELOPMENT ? caminhoDev : caminhoProd

      interface Iconfig {
        name: string
        path: string
        types: string[]
      }

      const configs: Iconfig[] = []

      fs.readdirSync(caminhoAtual).map(config => {
        const caminhoPDConfig: string[] = ['configs', 'folders', config]
        const caminhoDevConfig: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPDConfig)
        const caminhoProdConfig: string = path.resolve(__dirname.split('\app')[0], ...caminhoPDConfig)
        const caminhoAtualConfig = process.env.NODE_DEVELOPMENT ? caminhoDevConfig : caminhoProdConfig

        configs.push(JSON.parse(fs.readFileSync(caminhoAtualConfig).toString('utf-8')))
      })

      configs.map(config => {
        if (config.name === name) {
          const caminhoPDConfig: string[] = ['configs', 'folders', `${config.name}.json`]
          const caminhoDevConfig: string = path.resolve(__dirname.split('\.webpack')[0], ...caminhoPDConfig)
          const caminhoProdConfig: string = path.resolve(__dirname.split('\app')[0], ...caminhoPDConfig)
          const caminhoAtualConfig = process.env.NODE_DEVELOPMENT ? caminhoDevConfig : caminhoProdConfig

          config.path = pathBruto

          fs.writeFileSync(caminhoAtualConfig, JSON.stringify(config, null, '   '))
        }
      })
    },
  },
  openConfigFolder: () => ipcRenderer.send('openConfigFolder')
}

contextBridge.exposeInMainWorld('electron', api)

export default api