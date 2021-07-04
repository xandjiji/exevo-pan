import styled, { css } from 'styled-components'
import { PopoverReferenceProps, PopoverContentProps } from './types'

const increaseHoverAreaStyle = css<PopoverReferenceProps>`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: calc(100% + ${({ padX }) => padX}px);
    height: calc(100% + ${({ padY }) => padY}px);
  }
`

export const PopoverReference = styled.div<PopoverReferenceProps>`
  cursor: pointer;
  ${({ increaseHoverArea }) => increaseHoverArea && increaseHoverAreaStyle}
`

export const PopoverContent = styled.div<PopoverContentProps>`
  z-index: 51;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease-out;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
`
