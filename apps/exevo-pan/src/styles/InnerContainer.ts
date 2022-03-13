import { css } from 'styled-components'

const InnerContainer = css`
  padding-left: 20px;
  padding-right: 20px;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1024px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media (min-width: 1400px) {
    padding-left: 180px;
    padding-right: 180px;
  }
`

export default InnerContainer
