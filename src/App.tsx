import {ThemeProvider} from "styled-components";
import { BrowserRouter } from 'react-router-dom'
import {defaultTheme} from "./styles/themes/default.ts";
import {GlobalStyle} from "./styles/global.ts";
import Router from "./components/Router.tsx";
import {CyclesContextProvider} from "./contexts/CyclesContext.tsx";

function App() {
     return (
      <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <CyclesContextProvider>
                <Router />
            </CyclesContextProvider>
          </BrowserRouter>
          <GlobalStyle />
      </ThemeProvider>
  )
}

export default App
