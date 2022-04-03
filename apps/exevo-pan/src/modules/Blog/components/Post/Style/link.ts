import { css } from 'styled-components'

export const link = css`
  a {
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
  }
`
