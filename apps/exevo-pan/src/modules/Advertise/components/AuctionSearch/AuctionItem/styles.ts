import styled from 'styled-components'
import NextSvg from 'assets/svgs/next.svg'
import { Smooth } from 'styles'

export const Arrow = styled(NextSvg)`
  width: 32px;
  fill: var(--onSurface);
`

export const Button = styled.button`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;

  :hover,
  &[aria-selected='true'] {
    transform: translateX(6px);
  }

  &[aria-selected='true'] {
    > * > *:first-child {
      background-color: var(--primary);
      filter: brightness(130%) saturate(80%);
    }
  }

  &:not(:last-child) ::after {
    content: '';
    position: absolute;
    top: calc(100% + 4px);
    right: 8px;
    width: calc(100% - 80px);
    height: 1px;
    background-color: var(--separator);
    opacity: 0.3;
    pointer-events: none;
  }

  ${Smooth}
`
