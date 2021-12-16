import styled from 'styled-components'

export const Grid = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (min-width: 768px) {
    width: max-content;
  }
`

export const Group = styled.div`
  font-size: 10px;

  @media (min-width: 768px) {
    * {
      font-size: 12px;
    }
  }
`

export const Title = styled.h5`
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--primary);
  filter: brightness(130%);
`
