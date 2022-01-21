import styled from 'styled-components'
import { InnerContainer } from 'styles'

export const Wrapper = styled.div`
  padding-bottom: 32px;
  ${InnerContainer}

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 640px;
  }

  @media (min-width: 1024px) {
    margin: unset;
    max-width: unset;
    align-items: unset;
    justify-content: unset;

    flex-direction: row;
    display: grid;

    grid-template-columns: 1fr clamp(45ch, 50%, 75ch) 1fr;
  }
`
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

export const Center = styled.div`
  max-width: 100%;
`

export const Left = styled(Aside)`
  flex-direction: column-reverse;
  justify-self: right;

  @media (min-width: 1024px) {
    flex-direction: column;
    max-width: 172px;
  }

  @media (min-width: 1200px) {
    max-width: 216px;
  }

  @media (min-width: 1600px) {
    max-width: 276px;
  }
`

export const Right = styled(Aside)`
  justify-self: left;
  z-index: 4;
`
