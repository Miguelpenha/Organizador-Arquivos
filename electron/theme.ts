import fs from 'fs'
import path from 'path'
import Itheme from './types/theme'

let theme: Itheme = process.env.NODE_DEVELOPMENT ? JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'themes', 'omni.json')).toString('utf-8')) : JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', '..', '..', 'themes', 'omni.json')).toString('utf-8'))

export default theme