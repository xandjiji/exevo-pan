import { createGlobalStyle } from 'styled-components'
import { Reset } from './Reset'

export const GlobalStyles = createGlobalStyle`
  ${Reset}


  html, body, #root {
    overflow-x: hidden;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.onSurface};
  }

  svg {
    transition: fill 0.2s ease-out;
  }
`
