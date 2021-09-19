import styled from 'styled-components'
import { Shadow, Smooth } from 'styles'

export const Button = styled.button`
  padding: 12px 24px;

  border-radius: 12px;
  background-color: var(--primary);

  font-size: 24px;
  color: var(--onPrimary);
  cursor: pointer;
  ${Shadow}
  ${Smooth}

  &:hover {
    filter: brightness(110%);
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.14);
  }
`
