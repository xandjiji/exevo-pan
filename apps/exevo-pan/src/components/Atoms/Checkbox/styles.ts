import styled, { css } from 'styled-components'
import TickSvg from 'assets/svgs/check.svg'
import { Smooth } from 'styles'

export const Input = styled.input`
  appearance: none;
  margin: 0;

  height: 16px;
  width: 16px;
  border: 1px solid var(--separator);
  border-radius: 3px;

  cursor: pointer;
  ${Smooth}

  &:checked {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  &:disabled {
    background-color: var(--separator);
    border-color: var(--separator);
  }
`

export const Label = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 12px;

  cursor: pointer;

  &:hover ${Input} {
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.09);
  }

  &:active ${Input} {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`

export const TickIcon = styled(TickSvg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 14px;
  height: 14px;

  fill: transparent;
`

export const InputWrapper = styled.div`
  height: 16px;
  position: relative;

  > :checked ~ ${TickIcon} {
    fill: var(--onPrimary);
  }
`
