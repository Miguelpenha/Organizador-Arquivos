import { useState } from 'react'
import themeDefault from './theme'
import Itheme from '../electron/types/theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import Index from './pages'
import GlobalStyle from './styles/GlobalStyle'

export default function App() {
    const [theme, setTheme] = useState(themeDefault)

    function mutateTheme(themeName: string) {
        const themeSelect: Itheme = window.electron.theme.get.themes().filter(theme => theme.name == themeName)[0]
        
        setTheme(themeSelect)
        window.electron.theme.set(themeSelect.name)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Index
                    themeUsed={theme.name}
                    mutateTheme={mutateTheme}
                    themes={window.electron.theme.get.themes()}
                />
                <GlobalStyle/>
            </BrowserRouter>
        </ThemeProvider>
    )
}