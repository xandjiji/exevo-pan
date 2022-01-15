import { createGlobalStyle } from 'styled-components'
import Reset from './Reset'
import CustomScrollbar from './CustomScrollbar'

const GlobalStyles = createGlobalStyle`
  ${Reset}

  :root {
    --background: #eeeeee;
    --surface: #ffffff;
    --onSurface: #000000;
    --separator: #b4b4b4;
    --primary: #3f51b5;
    --onPrimary: #ffffff;
    --primaryVariant: #c5cae9;
    --darkerPrimary: #323d8e;
    --green: #377712;
    --red: #c51313;
    --alert: #f9eec1;
    --battleGreen: #43b600;
    --battleYellow: #ffdd00;
    --primaryVariantHighlight: #e7e8ee;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: var(--background);
    color: var(--onSurface);
    ${CustomScrollbar}

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
