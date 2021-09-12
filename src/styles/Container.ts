import { css } from 'styled-components'

const Container = css`
  margin-left: 20px;
  margin-right: 20px;

  @media (min-width: 768px) {
    margin-left: 40px;
    margin-right: 40px;
  }

  @media (min-width: 1024px) {
    margin-left: 140px;
    margin-right: 140px;
  }

  @media (min-width: 1400px) {
    margin-left: 180px;
    margin-right: 180px;
  }
`

export default Container
