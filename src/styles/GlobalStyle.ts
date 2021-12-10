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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    background-color: ${props => props.theme.backgroundColor};
  }
`

export default GlobalStyle