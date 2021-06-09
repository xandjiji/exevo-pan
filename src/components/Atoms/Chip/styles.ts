import styled, { css } from 'styled-components'
import { Shadow, Clickable } from '../../../styles'
import { ChipStyleProps } from './types'

const activeStyle = css`
  background-color: var(--primary);
  color: var(--onPrimary);
`

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
  background-color: var(--primaryVariant);
  color: var(--onSurface);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  border: none;
  transition: 0.2s ease-out !important;

  ${({ active }) => active && activeStyle}
  ${({ clickable }) => clickable && clickableStyle}
`

export const CloseButton = styled.button`
  ${Clickable}

  position: relative;
  margin-left: 8px;
  display: inline-block;
  width: 16px;
  height: 16px;
  outline: none;
  border-radius: 50%;
  background-color: var(--primary);
  opacity: 0.75;
  transition: box-shadow 0.1s ease-out;
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
    background-color: var(--onPrimary);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
