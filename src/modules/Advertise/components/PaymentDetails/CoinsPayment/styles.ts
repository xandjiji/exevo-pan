import styled from 'styled-components'
import CopySvg from 'assets/svgs/copy.svg'
import { Clickable } from 'styles'

export const Text = styled.p`
  font-size: 14px;
  line-height: 1.6;
`

export const Strong = styled.strong`
  white-space: nowrap;
`

export const Link = styled.a`
  color: var(--primary);
  font-weight: 700;
  letter-spacing: 0.5px;
  filter: brightness(130%);
`

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
