import styled from 'styled-components'

export const Wrapper = styled.div`
  img {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &[data-loaded='true'] img {
    opacity: 1;
  }
`
