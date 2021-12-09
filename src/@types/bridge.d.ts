import { api } from '../../electron/bridge'

declare global {
  interface Window {
    electron: typeof api
  }
}