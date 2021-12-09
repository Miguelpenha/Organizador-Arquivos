import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Index from './pages'
import { GlobalStyle } from './styles/GlobalStyle'

const rootElement = document.getElementById('root')

render(
  <BrowserRouter>
    <Index/>
    <GlobalStyle/>
  </BrowserRouter>,
  rootElement
)