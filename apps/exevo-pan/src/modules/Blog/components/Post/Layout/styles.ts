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
