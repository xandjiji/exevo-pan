import styled from 'styled-components'
import { Smooth, Shadow, InnerContainer, CustomScrollbar } from 'styles'
import { WrapperProps, BackdropProps } from './types'

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 75;

  display: flex;
  flex-direction: column;

  width: 90vw;
  height: 100vh;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.surface};

  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  ${Smooth}
  transition-property: transform, opacity;
  ${Shadow}
`

export const DrawerBody = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  ${InnerContainer}

  position: relative;
  height: 100%;

  overflow: auto;
  ${CustomScrollbar}

  &::after {
    content: '';
    position: fixed;
    bottom: 60px;
    left: 0;
    z-index: 2;
    width: calc(100% - 6px);
    height: 24px;
    pointer-events: none;
    background-image: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.surface},
      rgba(0, 0, 0, 0)
    );
  }

  > * {
    color: ${({ theme }) => theme.colors.onSurface};
  }
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
