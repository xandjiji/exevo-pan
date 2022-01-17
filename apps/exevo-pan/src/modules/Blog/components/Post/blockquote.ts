import { css } from 'styled-components'

export const blockquote = css`
  blockquote {
    margin: 0;
    padding: 16px 24px;
    border-radius: 5px;
    background-color: var(--background);

    font-size: 19px;
    letter-spacing: 0.5px;
    color: var(--primary);

    p {
      filter: brightness(130%);
    }
  }
`
