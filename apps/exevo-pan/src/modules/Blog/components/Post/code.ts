import { css } from 'styled-components'
import { Code } from 'styles'

export const code = css`
  pre {
    margin: 0;

    code {
      padding: 16px 24px;
      width: 100%;
    }
  }

  code {
    ${Code}
    padding: 4px 12px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
`
