import styled, { css } from 'styled-components'
import { Smooth } from 'styles'
import { InputWrapperProps } from './types'

export const Wrapper = styled.div``

export const Input = styled.input`
  padding: 10px 16px;
  width: 100%;

  border: none;
  outline: none;
  background-color: transparent;

  font-size: 12px;
  color: var(--onSurface);

  ${Smooth}
  transition-property: border-color, padding;
`

export const ErrorMessage = styled.span`
  padding: 0px 10px;

  font-size: 10px;
  color: var(--red);

  transition: opacity 0.2s ease-out;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`

export const ClearButton = styled.button`
  position: relative;
  width: 42px;
  flex-shrink: 0;
  pointer-events: none;
  opacity: 0;
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
    background-color: var(--onSurface);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  width: 100%;
  border-radius: 5px;
  border: solid 1px var(--separator);
  background-color: var(--surface);
  cursor: text;

  ${Smooth}
  transition-property: border-color;

  &:focus-within {
    border-color: var(--primary);
  }

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      border-color: var(--red);
      &:focus-within {
        border-color: var(--red);
      }
    `}

  ${({ isClearButtonActive }) =>
    isClearButtonActive &&
    css`
      ${ClearButton} {
        opacity: 1;
        cursor: pointer;
        pointer-events: unset;
      }

      ${Input} {
        padding-right: 0;
      }
    `}
`
