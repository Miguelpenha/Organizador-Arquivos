import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = window.electron.theme.get.used()

export default theme