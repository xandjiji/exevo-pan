import { css } from 'styled-components'

export const link = css`
  a {
    position: relative;
    color: var(--primaryHighlight);

    &::selection {
      background: var(--primary);
      color: var(--onPrimary);
    }

    &:hover {
      opacity: 0.75;
    }
  }
`
