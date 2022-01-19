import styled from 'styled-components'

const Aside = styled.aside`
  display: flex;
  gap: 32px;

  width: 100%;
  height: min-content;

  @media (min-width: 1024px) {
    position: sticky;
    top: 88px;
    z-index: 5;
    width: fit-content;
  }
`

const Left = styled(Aside)`
  flex-direction: column-reverse;
  justify-self: right;

  @media (min-width: 1024px) {
    flex-direction: column;
    max-width: 280px;
  }
`

const Right = styled(Aside)`
  justify-self: left;
  z-index: 4;
`

export default {
  Left,
  Right,
}
