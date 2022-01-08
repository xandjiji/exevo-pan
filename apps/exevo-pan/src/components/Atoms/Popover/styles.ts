import styled, { css } from 'styled-components'
import { PopoverReferenceProps } from './types'

const increaseHoverAreaStyle = css<PopoverReferenceProps>`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: calc(100% + ${({ padX }) => padX + 8}px);
    height: calc(100% + ${({ padY }) => padY + 8}px);
  }
`

export const PopoverReference = styled.div<PopoverReferenceProps>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  ${({ increaseHoverArea }) => increaseHoverArea && increaseHoverAreaStyle}

  > * {
    position: relative;
    z-index: 1;
  }
`

const fadeInStyle = css`
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

export const PopoverContent = styled.div`
  z-index: 51;
  ${fadeInStyle}
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);

  ${fadeInStyle}
`
