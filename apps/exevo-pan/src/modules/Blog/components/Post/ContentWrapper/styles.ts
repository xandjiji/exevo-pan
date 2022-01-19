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
    flex-direction: row;
    align-items: unset;
    justify-content: unset;

    display: grid;

    grid-template-columns: 1fr clamp(45ch, 50%, 75ch) 1fr;
  }
`
