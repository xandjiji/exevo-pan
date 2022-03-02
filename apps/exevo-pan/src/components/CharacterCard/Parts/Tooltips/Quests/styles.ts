import styled from 'styled-components'
import { CustomScrollbar } from 'styles'

export const Grid = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  width: calc(100vw - 36px);
  max-width: max-content;
  overflow-x: auto;
  ${CustomScrollbar}

  @media (min-width: 768px) {
    width: max-content;
  }
`

export const Group = styled.div`
  flex-shrink: 0;
  font-size: 12px;
`

export const Title = styled.h5`
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--primary);
  filter: brightness(130%);
  text-align: center;
`
