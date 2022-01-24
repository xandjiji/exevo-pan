import styled, { css } from 'styled-components'

export const Grid = styled.ul<{ empty: boolean }>`
  position: relative;
  height: 100%;
  flex-grow: 1;

  display: grid;
  gap: 32px;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  ${({ empty }) =>
    empty
      ? css`
          justify-self: center;
          align-self: center;
        `
      : css`
          &::after {
            content: '';
            grid-column: 1 / -1;
          }
        `}
`

export const LazyWatcher = styled.div.attrs({ role: 'none' })`
  position: absolute;
  bottom: 80px;
  left: 0;
`
