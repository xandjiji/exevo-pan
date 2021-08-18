import styled from 'styled-components'
import Image from 'next/image'
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
  color: var(--onSurface);
  background-color: var(--surface);
  user-select: none;
`

export const Wrapper = styled.div<WrapperStyleProps>`
  padding: 10px 12px 8px 12px;
  position: relative;
  border-radius: 5px;
  border: solid 1px;
  border-color: ${({ warning }) =>
    warning ? 'var(--red)' : 'var(--separator)'};

  ${Label} {
    color: ${({ warning }) => warning && 'var(--red)'};
  }
`

export const WarningIcon = styled(Image).attrs({ src: WarningImg })`
  transform: translate(1px, -1px) scale(0.75);
`
