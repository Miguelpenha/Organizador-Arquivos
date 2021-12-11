import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${props => props.theme.backgroundColor};
  }

  & ul.MuiList-root.MuiMenu-list.MuiList-padding {
    background-color: ${props => props.theme.currentLine}
  }
`

export default GlobalStyle