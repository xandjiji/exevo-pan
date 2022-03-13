import styled from 'styled-components'
import { Shadow, Smooth } from 'styles'

export const ActiveIcon = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: var(--battleYellow);
  cursor: default;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #000;

  ${Shadow}
  ${Smooth}

  &[aria-hidden='true'] {
    opacity: 0;
  }
`
