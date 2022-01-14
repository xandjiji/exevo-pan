import styled from 'styled-components'

export const Grid = styled.section`
  position: relative;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 1fr;

  height: 100%;
`

export const LazyWatcher = styled.div.attrs({ role: 'none' })`
  position: absolute;
  bottom: 200px;
  left: 0;
`
