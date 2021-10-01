import styled from 'styled-components'
import CopySvg from 'assets/svgs/copy.svg'
import { Clickable } from 'styles'

export const Button = styled.button``

export const CopyIcon = styled(CopySvg)`
  ${Clickable}
  padding: 3px;
  margin-left: 2px;

  width: 24px;
  height: 24px;
  border-radius: 4px;
  transform: translateY(6px);

  fill: var(--onSurface);
`
