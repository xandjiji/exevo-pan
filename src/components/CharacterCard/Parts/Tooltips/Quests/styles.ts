import styled from 'styled-components'

export const Grid = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`

export const Group = styled.div`
  @media (max-width: 460px) {
    * {
      font-size: 10px;
    }
  }
`

export const Title = styled.h5`
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--primary);
  filter: brightness(130%);
`
