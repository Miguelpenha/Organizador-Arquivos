import { contextBridge, ipcRenderer } from 'electron'
import theme from './theme'

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },
  on: (channel: string, callback?: Function) => {
    ipcRenderer.on(channel, (ev, data) => {
      callback && callback(data)
    })
  },
  send: (channel: string, data?:any) => {
    ipcRenderer.send(channel, data)
  },
  theme: () => theme,
  setTheme: (theme: string) => ipcRenderer.send('setTheme', theme)
}

contextBridge.exposeInMainWorld('electron', api)