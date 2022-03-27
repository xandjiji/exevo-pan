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
    --kwai: #ff7705;
    --kwaiSurface: #fff7f0;
    --kwaiVariant: #ffc696;
  }

  [data-theme='dark'] {
    --background: #202225;
    --surface: #36393f;
    --onsurface: #ffffff;
    --separator: #72767d;
    --primary: #9857e7;
    --onprimary: #ffffff;
    --primaryvariant: #5e4480;
    --darkerprimary: #581f9b;
    --green: #5a9935;
    --red: #ff5b5b;
    --alert: #f9eec1;
    --battlegreen: #43b600;
    --battleyellow: #ffdd00;
    --primaryvarianthighlight: #714ca1;
    --kwai: #ff7705;
    --kwaisurface: #453d3c;
    --kwaivariant: #995f2e;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    background-color: var(--background);
    color: var(--onSurface);
    transition: background-color 0.2s ease-out;
    ${CustomScrollbar}

    *::selection {
      color: var(--onSurface);
      background: var(--primaryVariant);
    }
  }

  #__next > div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    main {
      flex-grow: 1;
    }
  }

  svg {
    transition: fill 0.2s ease-out;
  }
`

export default GlobalStyles
