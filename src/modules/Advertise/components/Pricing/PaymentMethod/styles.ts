import styled from 'styled-components'
import { Smooth } from 'styles'

export const Button = styled.button`
  padding: 8px 16px;
  display: block;
  width: 100%;
  background-color: var(--surface);
  border-left: solid 6px transparent;

  font-size: 12px;
  letter-spacing: 1px;
  color: var(--onSurface);

  cursor: pointer;
  ${Smooth}

  &[aria-selected='true'] {
    border-left-color: var(--primary);
  }

  &:hover {
    filter: brightness(90%);
  }
`

export const Content = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`
