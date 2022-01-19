import styled from 'styled-components'
import BaseEmptyState from 'components/EmptyState'

export const Grid = styled.section`
  position: relative;
  height: 100%;
  width: 100%;

  display: grid;
  gap: 32px;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
