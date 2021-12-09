import { createGlobalStyle } from 'styled-components'

const theme = window.electron.theme()

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${theme.backgroundColor};
    color: ${theme.color};
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`