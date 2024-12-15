import {ThemeProvider} from "styled-components";
import Button from "./components/Button.tsx";
import {defaultTheme} from "./styles/themes/default.ts";

function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
          <Button color="primary"/>
          <Button color="secondary"/>
          <Button color="success"/>
          <Button color="danger"/>
          <Button />
      </ThemeProvider>
  )
}

export default App
