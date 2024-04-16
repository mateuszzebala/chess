import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './theme/defaultTheme'
import { GlobalStyles } from './theme/globalStyles'
import React from 'react'
import { Layers } from './Layers'
import { BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <GlobalStyles />
                <Layers />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
