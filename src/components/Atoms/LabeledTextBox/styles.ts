import styled from 'styled-components'
import WarningImg from 'assets/warning.png'
import { WrapperStyleProps } from './types'

export const Label = styled.span`
  padding: 0 4px;
  position: absolute;
  top: 0;
  left: 9px;
  transform: translateY(-50%);

  display: flex;
  align-items: center;

  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onSurface};
  background-color: ${({ theme }) => theme.colors.surface};
  user-select: none;
`

export const Wrapper = styled.div<WrapperStyleProps>`
  padding: 10px 12px 8px 12px;
  position: relative;
  border-radius: 5px;
  border: solid 1px;
  border-color: ${({ warning, theme }) =>
    warning ? theme.colors.red : theme.colors.separator};

  ${Label} {
    ${({ warning, theme }) => warning && `color: ${theme.colors.red};`};
  }
`

export const WarningIcon = styled.img.attrs({ src: WarningImg as string })`
  margin-left: 1px;
  transform: translateY(-1px) scale(0.75);
`
