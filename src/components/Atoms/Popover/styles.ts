import styled from 'styled-components'
import { Shadow } from 'styles'
import { PopoverContentProps } from './types'

export const PopoverReference = styled.div`
  cursor: pointer;
`

export const PopoverContent = styled.div<PopoverContentProps>`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 5px;

  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};

  z-index: 51;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease-out;

  ${Shadow}
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
`
