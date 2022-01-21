import { css } from 'styled-components'

export const lists = css`
  ul,
  ol {
    ul,
    ol {
      padding-left: 16px;
    }
  }

  li::before {
    content: '•';
    margin-right: 8px;
    font-weight: 400;
    color: var(--primary);
  }

  ol {
    list-style: none;
    counter-reset: li;

    li {
      counter-increment: li;
    }
  }

  ol li::before {
    content: counter(li) ' -';
    margin-right: 8px;
    font-weight: 400;
    color: var(--primary);
  }
`
