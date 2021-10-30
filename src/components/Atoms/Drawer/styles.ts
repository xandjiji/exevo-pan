import styled from 'styled-components'
import { Smooth, Shadow, InnerPadding, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 75;

  display: flex;
  flex-direction: column;

  width: 90vw;
  height: 100vh;
  max-width: 600px;
  outline: none;
  background-color: var(--surface);
  transform: translateX(0);

  ${Smooth}
  ${Shadow}
  transition-property: opacity, transform, visibility;

  &[aria-hidden='true'] {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100%);
  }

  animation: slideIn 0.2s ease-out;
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

export const DrawerBody = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  ${InnerPadding}

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
    background-image: linear-gradient(to top, var(--surface), rgba(0, 0, 0, 0));
  }

  > * {
    color: var(--onSurface);
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 70;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  ${Smooth}

  &[aria-hidden='true'] {
    opacity: 0;
    pointer-events: none;
  }

  animation: fadeIn 0.2s ease-out;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
