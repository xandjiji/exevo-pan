import { css } from 'styled-components'

const NegativeContainer = css`
  margin-left: -20px;
  margin-right: -20px;

  @media (min-width: 768px) {
    margin-left: -40px;
    margin-right: -40px;
  }

  @media (min-width: 1024px) {
    margin-left: -96px;
    margin-right: -96px;
  }

  @media (min-width: 1400px) {
    margin-left: -176px;
    margin-right: -176px;
  }
`

export default NegativeContainer
