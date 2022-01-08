import styled, { css } from 'styled-components'
import { Smooth } from 'styles'
import { ToggleStyleProps } from './types'

export const Switch = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
`

const activeToggleStyle = css`
  background-color: var(--primaryVariant);
  > *,
  &::after {
    left: calc(100% - 16px);
  }
  > * {
    fill: var(--onPrimary);
  }
  &::after {
    background-color: var(--primary);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.3);
  }
`

const activeToggleWithIconStyle = css`
  > *,
  &::after {
    left: calc(100% - 32px);
  }
`

export const ToggleButton = styled.div<ToggleStyleProps>`
  position: relative;
  margin-right: 8px;
  width: ${({ hasIcon }) => (hasIcon ? '52px' : '28px')};
  height: ${({ hasIcon }) => (hasIcon ? '16px' : '8px')};
  border-radius: 16px;
  background-color: var(--separator);
  transition: background 0.2s ease-out;

  > *,
  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    ${Smooth}
  }
  > * {
    fill: var(--onSurface);
    z-index: 1;
    transform: translate(4px, -50%);
  }
  &::after {
    content: '';
    width: ${({ hasIcon }) => (hasIcon ? '32px' : '16px')};
    height: ${({ hasIcon }) => (hasIcon ? '32px' : '16px')};
    border-radius: 50%;
    background-color: var(--surface);
    transform: translate(0, -50%);
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.3);
  }

  ${({ active }) => active && activeToggleStyle}
  ${({ active, hasIcon }) => active && hasIcon && activeToggleWithIconStyle}
`
