import { css } from 'styled-components'

export const link = css`
  a {
    display: inline-block;
    position: relative;
    color: var(--primary);
    filter: brightness(130%);

    &::selection {
      background: var(--primary);
      color: var(--onPrimary);
    }

    &:hover {
      opacity: 0.75;
    }

    &::first-letter {
      border-bottom: solid 1px var(--primary);
    }
  }
`
