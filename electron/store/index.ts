import fs from 'fs'
import path from 'path'
import Icontent from '../types/content'

const caminho: string = path.resolve(process.env.LOCALAPPDATA, 'Programs', 'Organizador de arquivos', 'resources', 'configs', 'settings.json')

export function get(key: string, ignoreDot: boolean=true) {
    createFile()

    const content = getContent()

    if (ignoreDot) {
        return content[key]
    } else {
        const keySplit = key.split('.')

        let value = content

        keySplit.map(key => value = value[key])

        return value
    }
}

export function set(key: string, value: string | object) {
    createFile()

    const content = getContent()

    content[key] = value

    fs.writeFileSync(caminho, JSON.stringify(content, null, '   '))
}

export function getContent() {
    createFile()

    const content: Icontent = JSON.parse(fs.readFileSync(caminho).toString('utf-8'))

    return content
}

export function createFile(content: object = {}) {
    const exists: boolean = fs.existsSync(caminho)

    if (!exists) {
        fs.writeFileSync(caminho, JSON.stringify(content, null, '   '))
    }
}