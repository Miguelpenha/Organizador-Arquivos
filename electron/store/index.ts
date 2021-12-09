import fs from 'fs'
import path from 'path'

const caminho = path.resolve(process.env.USERPROFILE, 'AppData', 'Roaming', 'organizador-arquivos', 'settings.json')

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

export function set(key: string, value: string, ignoreDot: boolean=true) {
    createFile()

    const content = getContent()

    content[key] = value

    if (ignoreDot) {
        fs.writeFileSync(caminho, JSON.stringify(content, null, '   '))
    } else {

    }
}

export function getContent() {
    createFile()

    const content = JSON.parse(fs.readFileSync(caminho).toString('utf-8'))
    
    return content
}

export function createFile(content: object = {}) {
    if (!fs.existsSync(caminho)) {
        fs.writeFileSync(caminho, JSON.stringify(content, null, '   '))
    }
}