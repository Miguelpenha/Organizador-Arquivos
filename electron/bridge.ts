import { contextBridge, ipcRenderer } from 'electron'
import { get } from './store/index'
import fs from 'fs'
import path from 'path'
import Itheme from './types/theme'

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },
  on: (channel: string, callback?: Function) => {
    ipcRenderer.once(channel, (ev, data) => {
      callback && callback(data)
    })
  },
  send: (channel: string, data?:any) => {
    ipcRenderer.send(channel, data)
  },
  theme: () => {
    let theme: Itheme = process.env.NODE_DEVELOPMENT ? JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'themes', `${get('theme')}.json`)).toString('utf-8')) : JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', '..', '..', 'themes', `${get('theme')}.json`)).toString('utf-8'))
    
    return theme
  },
  setTheme: (theme: string) => {
    ipcRenderer.send('setTheme', theme)
  },
  getFiles: async () => {
    const files = await ipcRenderer.invoke('getFiles')
    
    return files
  }
}

contextBridge.exposeInMainWorld('electron', api)