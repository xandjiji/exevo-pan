import styled, { css } from 'styled-components'

export const Grid = styled.section<{ empty: boolean }>`
  height: 100%;
  flex-grow: 1;

  display: grid;
  gap: 32px;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  ${({ empty }) =>
    empty &&
    css`
      justify-self: center;
      align-self: center;
    `}
`

export const LazyWatcher = styled.div.attrs({ role: 'none' })`
  position: absolute;
  bottom: 200px;
  left: 0;
`
