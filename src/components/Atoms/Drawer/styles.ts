import styled from 'styled-components'
import { Smooth, Shadow } from 'styles'
import { WrapperProps } from './types'

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 75;

  height: 100vh;
  width: 90vw;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.surface};

  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  ${Smooth}
  ${Shadow}
`
