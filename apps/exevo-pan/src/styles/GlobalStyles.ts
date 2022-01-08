import { createGlobalStyle } from 'styled-components'
import Reset from './Reset'

const GlobalStyles = createGlobalStyle`
  ${Reset}

  :root {
    --background: #EEEEEE;
    --surface: #FFFFFF;
    --onSurface: #000000;
    --separator: #B4B4B4;
    --primary: #3F51B5;
    --onPrimary: #FFFFFF;
    --primaryVariant: #C5CAE9;
    --darkerPrimary: #323D8E;
    --green: #377712;
    --red: #C51313;
    --alert: #F9EEC1;
    --battleGreen: #43B600;
    --battleYellow: #FFDD00;
    --primaryVariantHighlight: #E7E8EE;
  }

  html, body, #root {
    overflow-x: hidden;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: var(--background);
    color: var(--onSurface);

    *::selection {
        color: var(--onSurface);
        background: var(--primaryVariant);
    }
  }

  svg {
    transition: fill 0.2s ease-out;
  }
`

export default GlobalStyles
