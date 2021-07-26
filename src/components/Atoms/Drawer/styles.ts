import styled from 'styled-components'
import { Smooth, Shadow } from 'styles'
import { WrapperProps, BackdropProps } from './types'

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 75;

  width: 90vw;
  height: 100vh;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.surface};

  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  ${Smooth}
  ${Shadow}
`

export const Backdrop = styled.div<BackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 70;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'unset' : 'none')};
  ${Smooth}
`
