import styled, { css } from 'styled-components'

export const Ul = styled.ul<{ maxLines?: number }>`
  ${({ maxLines }) =>
    maxLines &&
    css`
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(${maxLines}, 1fr);
    `}
`

export const Li = styled.li`
  display: block;
  font-size: 12px;
  text-align: left;
  color: var(--onSurface);
  font-weight: 300;

  opacity: 0.5;

  &[data-active='true'] {
    font-weight: 400;
    opacity: 1;
  }

  &::before {
    content: '·';
    margin-right: 4px;
    font-weight: 800;
    font-weight: var(--onSurface);
  }

  &:not(:last-child) {
    margin-bottom: 2px;
  }
`
