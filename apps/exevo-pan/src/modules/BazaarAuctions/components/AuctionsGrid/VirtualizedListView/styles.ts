import styled from 'styled-components'
import { InnerContainer, CustomScrollbar } from 'styles'

export const Grid = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  position: relative;
  height: calc(100% - 72px);
  background-color: var(--background);
  overflow: auto;
  ${CustomScrollbar}

  display: grid;
  grid-gap: 16px;
  grid-auto-rows: auto;

  grid-template-columns: repeat(auto-fit, minmax(0, 440px));
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  ${InnerContainer}
`
