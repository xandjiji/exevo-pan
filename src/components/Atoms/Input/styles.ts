import styled, { css } from 'styled-components'
import { Smooth } from 'styles'
import { InputWrapperProps } from './types'

export const Input = styled.input`
  padding: 10px 16px;
  flex-grow: 1;

  border: none;
  outline: none;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurface};

  ${Smooth}
  transition-property: border-color;
`
export const ClearButton = styled.button`
  position: relative;
  width: 42px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-out;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    height: 12px;
    width: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.onSurface};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  width: 100%;
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.colors.separator};
  background-color: ${({ theme }) => theme.colors.surface};

  ${({ isClearButtonActive }) =>
    isClearButtonActive &&
    css`
      ${ClearButton} {
        opacity: 1;
        pointer-events: unset;
      }

      ${Input} {
        padding-right: 0;
      }
    `}
`
