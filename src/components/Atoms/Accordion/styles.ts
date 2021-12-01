import styled from 'styled-components'
import ArrowSvg from 'assets/svgs/chevronDown.svg'
import { Clickable, Smooth } from 'styles'

export const Wrapper = styled.div``

export const ArrowIcon = styled(ArrowSvg)`
  ${Clickable}
  margin-left: auto;
  border-radius: 4px;
  fill: var(--onSurface);
  ${Smooth}
`

export const Button = styled.button`
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  cursor: pointer;
`

export const Content = styled.div``
