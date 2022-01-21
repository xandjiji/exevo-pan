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

    &::after {
      content: '';
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      width: 16px;
      height: 1px;
      background-color: var(--primary);
      opacity: 0.75;
    }
  }
`
