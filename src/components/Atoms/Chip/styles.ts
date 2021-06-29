import styled, { css } from 'styled-components'
import { Shadow, Clickable } from 'styles'
import { ChipStyleProps } from './types'

const clickableStyle = css`
  cursor: pointer;
  &:active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }
`

export const Chip = styled.div<ChipStyleProps>`
  ${Shadow}

  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  border: none;
  transition: 0.2s ease-out !important;

  ${({ active }) =>
    active
      ? css`
          background-color: ${({ theme }) => theme.colors.primary};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.primaryVariant};
        `}

  ${({ active }) =>
    active
      ? css`
          color: ${({ theme }) => theme.colors.onPrimary};
        `
      : css`
          color: ${({ theme }) => theme.colors.onSurface};
        `}

  ${({ clickable }) => clickable && clickableStyle}
`

export const CloseButton = styled.button`
  ${Clickable}

  position: relative;
  margin-left: 8px;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.75;
  transition: 0.1s ease-out;
  border: none;

  &::after,
  &::before {
    content: '';
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    height: 8px;
    width: 1px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.onPrimary};
    transition: background-color 0.1s ease-out;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
