import styled from 'styled-components'

export const Wrapper = styled.div`
  > * {
    margin: 0 auto;
    flex: none;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    min-height: unset;
    place-self: center;
  }
`
