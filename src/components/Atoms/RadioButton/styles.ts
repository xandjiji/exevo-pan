import styled from 'styled-components'
import { RadioStyleProps, WrapperStyleProps } from './types'

export const Radio = styled.div<RadioStyleProps>`
  position: relative;
  margin-right: 6px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: solid 2px ${({ theme }) => theme.colors.separator};
  transition: box-shadow 0.2s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ active }) => (active ? '1' : '0')};
    transition: opacity 0.2s ease-out;
  }
`
export const Wrapper = styled.div<WrapperStyleProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};

  &:hover {
    ${Radio} {
      box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.09);
    }
  }

  &:active {
    ${Radio} {
      box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
    }
  }
`
