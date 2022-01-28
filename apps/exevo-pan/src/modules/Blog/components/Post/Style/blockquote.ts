import { css } from 'styled-components'

export const blockquote = css`
  blockquote {
    border-left: solid 6px var(--primary);
    margin: 0;
    padding: 16px 24px;
    border-radius: 4px;
    background-color: var(--background);

    font-size: 19px;
    letter-spacing: 0.5px;
    color: var(--primary);

    p {
      font-weight: 400;
      filter: brightness(130%);
    }
  }
`
