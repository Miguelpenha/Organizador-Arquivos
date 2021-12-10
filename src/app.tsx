import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Index from './pages'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import themeDefault from './theme'
import Itheme from '../electron/types/theme'

function App() {
    const [theme, setTheme] = useState(themeDefault)

    function mutateTheme(themeName: string) {
        const themeSelect: Itheme = window.electron.theme.get.themes().filter(theme => theme.name == themeName)[0]
        
        setTheme(themeSelect)
        window.electron.theme.set(themeSelect.name)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Index themes={window.electron.theme.get.themes()} themeUsed={theme.name} mutateTheme={mutateTheme}/>
                <GlobalStyle/>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App