import styled from 'styled-components'
import { Shadow } from 'styles'

export const TooltipWrapper = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 5px;

  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};

  ${Shadow}
`
