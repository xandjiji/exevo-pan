import styled from 'styled-components'

const Aside = styled.aside`
  display: grid;
  gap: 32px;

  width: 100%;
  height: min-content;

  @media (min-width: 1024px) {
    position: sticky;
    top: 88px;
    z-index: 5;
    width: fit-content;
    max-width: 280px;
  }
`

export default Aside
