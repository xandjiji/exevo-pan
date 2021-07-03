import styled from 'styled-components'
import { Shadow } from 'styles'
import { TooltipContentProps } from './types'

export const TooltipReference = styled.div`
  cursor: pointer;
`

export const TooltipContent = styled.div<TooltipContentProps>`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 5px;

  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};

  z-index: 10;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease-out;

  ${Shadow}
`
