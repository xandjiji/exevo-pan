import styled from 'styled-components'

const Aside = styled.aside`
  position: sticky;
  top: 120px;
  height: min-content;
  width: 100%;
  z-index: 5;

  @media (min-width: 1024px) {
    width: fit-content;
  }
`

export default Aside
