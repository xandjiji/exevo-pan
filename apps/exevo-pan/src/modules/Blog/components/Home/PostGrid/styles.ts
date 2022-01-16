import styled from 'styled-components'
import BaseEmptyState from 'components/EmptyState'

export const Grid = styled.section`
  padding-bottom: 32px;
  position: relative;
  height: 100%;

  display: grid;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`

export const EmptyState = styled(BaseEmptyState)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const LazyWatcher = styled.div.attrs({ role: 'none' })`
  position: absolute;
  bottom: 200px;
  left: 0;
`
