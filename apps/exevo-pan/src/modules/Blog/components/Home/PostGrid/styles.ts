import styled from 'styled-components'
import BaseEmptyState from 'components/EmptyState'

export const Grid = styled.section`
  padding-bottom: 32px;
  position: relative;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 1fr;

  height: 100%;
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
